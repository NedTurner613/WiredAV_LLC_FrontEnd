"use client";

import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";

import { AppSidebar } from "@/components/app-sidebar";
import {
  AddClientModal,
  type NewClientValues,
} from "@/components/add-client-modal";
import {
  DataTable,
  type Client,
  type TechnicianOption,
} from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { apiClient } from "@/src/app/services/apiClient";
import { useApi } from "@/hooks/useApi";

type ApiClientRow = {
  clientId?: number;
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  phoneNumber?: string;
  status?: string;
};

type PaginatedClientsResponse = {
  content?: ApiClientRow[];
  data?: ApiClientRow[];
};

type ClientsApiResponse = ApiClientRow[] | PaginatedClientsResponse | null;

type ApiClientRecord = Partial<Client> & {
  clientId?: number;
  phoneNumber?: string;
};

type ClientsResponse =
  | ApiClientRecord[]
  | {
      content?: ApiClientRecord[];
      data?: ApiClientRecord[];
    };

type AppointmentApiEntry = {
  apptId: number;
  status: number;
  apptType: number;
  clientInfo?: {
    clientId?: number;
    firstName?: string;
    lastName?: string;
  } | null;
  personnelInfo?: {
    personnelId?: number;
    firstName?: string;
    lastName?: string;
  } | null;
  timeslot?: {
    timeslotId?: number;
    startTime?: string;
    endTime?: string;
  } | null;
  createdAt?: string | null;
};

type AppointmentListResponse = { appointments?: AppointmentApiEntry[] };

type AppointmentListRequest = {
  personnelIds: number[];
  timeFrame: { startTime: string; endTime: string };
};

type AppointmentUpdateBody = {
  apptId: number;
  status: number;
  appType: number;
  timeslot: { startTime: string; endTime: string };
  clientId: number | null;
  personnelId: number | null;
  createdAt: string | null;
};

type PersonnelApiEntry = {
  personnelId: number;
  firstName?: string;
  lastName?: string;
};

type PersonnelListResponse =
  | { personnelList?: PersonnelApiEntry[] }
  | PersonnelApiEntry[];

const APPOINTMENTS_URL = "/api/appointments/list";
const APPOINTMENT_UPDATE_URL = "/api/appointments";
const PERSONNEL_URL = "/api/v1/personnel";

const toLocalIso = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm:ss");

// The list endpoint requires a time frame. Use a wide one so a client's
// appointment is found regardless of when it is scheduled.
const currentYear = new Date().getFullYear();
const TIME_FRAME = {
  startTime: toLocalIso(new Date(currentYear - 2, 0, 1)),
  endTime: toLocalIso(new Date(currentYear + 2, 11, 31, 23, 59, 59)),
};

function fullName(firstName?: string, lastName?: string): string {
  return `${firstName ?? ""} ${lastName ?? ""}`.trim();
}

/** Statuses that still need a technician: requested (1) and assigned (2). */
function isPending(status: number): boolean {
  return status === 1 || status === 2;
}

function timeslotStart(entry: AppointmentApiEntry): number {
  const value = new Date(entry.timeslot?.startTime ?? "").getTime();
  return Number.isNaN(value) ? Number.POSITIVE_INFINITY : value;
}

/**
 * A client can have several appointments. Assigning from the clients table
 * targets the one the admin is most likely working on: the earliest upcoming
 * pending appointment, otherwise the most recent one.
 */
function pickAppointment(
  current: AppointmentApiEntry | undefined,
  candidate: AppointmentApiEntry,
): AppointmentApiEntry {
  if (!current) return candidate;

  const currentPending = isPending(current.status);
  const candidatePending = isPending(candidate.status);
  if (currentPending !== candidatePending) {
    return candidatePending ? candidate : current;
  }

  const currentStart = timeslotStart(current);
  const candidateStart = timeslotStart(candidate);
  if (currentStart === candidateStart) return current;
  if (candidatePending) {
    return candidateStart < currentStart ? candidate : current;
  }
  return candidateStart > currentStart ? candidate : current;
}

export default function ClientsPage() {
  // GET api/v1/clients — ask for a full page so every client can be assigned
  // (the endpoint defaults to 10 rows).
  const { data, loading, error, refetch, post } = useApi<ClientsApiResponse>(
    "/api/v1/clients?size=200",
  );

  const [technicianOptions, setTechnicianOptions] = useState<
    TechnicianOption[]
  >([]);
  const [appointmentByClient, setAppointmentByClient] = useState<
    Map<number, AppointmentApiEntry>
  >(() => new Map());
  const [assignmentError, setAssignmentError] = useState<string | null>(null);

  /** Load the technicians plus each client's appointment, so the clients
   *  table can show and assign the appointment's technician. */
  const load = useCallback(async () => {
    const personnelPayload =
      await apiClient.get<PersonnelListResponse>(PERSONNEL_URL);
    const personnel = Array.isArray(personnelPayload)
      ? personnelPayload
      : (personnelPayload?.personnelList ?? []);

    const personnelIds = personnel
      .map((person) => person.personnelId)
      .filter((id): id is number => typeof id === "number");

    const payload = await apiClient.post<
      AppointmentListResponse,
      AppointmentListRequest
    >(APPOINTMENTS_URL, { personnelIds, timeFrame: TIME_FRAME });

    const appointmentByClient = new Map<number, AppointmentApiEntry>();
    for (const entry of payload?.appointments ?? []) {
      const clientId = entry.clientInfo?.clientId;
      if (clientId == null) continue;
      appointmentByClient.set(
        clientId,
        pickAppointment(appointmentByClient.get(clientId), entry),
      );
    }

    return {
      technicianOptions: personnel.map((person) => ({
        value: String(person.personnelId),
        label:
          fullName(person.firstName, person.lastName) ||
          `Technician ${person.personnelId}`,
      })),
      appointmentByClient,
    };
  }, []);

  const reloadAssignments = useCallback(async () => {
    const result = await load();
    setTechnicianOptions(result.technicianOptions);
    setAppointmentByClient(result.appointmentByClient);
    return result;
  }, [load]);

  useEffect(() => {
    let cancelled = false;

    load()
      .then((result) => {
        if (cancelled) return;
        setTechnicianOptions(result.technicianOptions);
        setAppointmentByClient(result.appointmentByClient);
      })
      .catch(() => {
        if (cancelled) return;
        setAssignmentError("Could not load technician assignments.");
      });

    return () => {
      cancelled = true;
    };
  }, [load]);

  const handleTechnicianChange = useCallback(
    async (clientId: number, personnelId: number | null) => {
      setAssignmentError(null);

      const appointment = appointmentByClient.get(clientId);
      if (!appointment) {
        setAssignmentError(
          "This client has no appointment to assign a technician to.",
        );
        return;
      }

      try {
        const current = await apiClient.get<AppointmentApiEntry>(
          `${APPOINTMENT_UPDATE_URL}/${appointment.apptId}`,
        );

        const body: AppointmentUpdateBody = {
          apptId: current.apptId,
          status: current.status,
          appType: current.apptType,
          timeslot: {
            startTime: current.timeslot?.startTime ?? "",
            endTime: current.timeslot?.endTime ?? "",
          },
          clientId: current.clientInfo?.clientId ?? null,
          personnelId,
          createdAt: current.createdAt ?? null,
        };

        await apiClient.put<AppointmentApiEntry, AppointmentUpdateBody>(
          APPOINTMENT_UPDATE_URL,
          body,
          undefined,
          true,
        );

        await reloadAssignments();
      } catch {
        setAssignmentError(
          "Could not assign the technician. Please try again.",
        );
        await reloadAssignments().catch(() => undefined);
      }
    },
    [appointmentByClient, reloadAssignments],
  );

  const rawRows = Array.isArray(data)
    ? data
    : Array.isArray(data?.content)
      ? data.content
      : Array.isArray(data?.data)
        ? data.data
        : [];

  const normalizedRows = rawRows.map((client, index): Client => {
    const id = client.clientId ?? client.id ?? -(index + 1);
    return {
      id,
      firstName: client.firstName ?? "",
      lastName: client.lastName ?? "",
      email: client.email ?? "",
      phone: client.phone ?? client.phoneNumber ?? "",
      status: client.status ?? "Open",
      personnelId:
        appointmentByClient.get(id)?.personnelInfo?.personnelId ?? null,
    };
  });

  const handleAddClient = async (newClient: NewClientValues) => {
    await post<Client, NewClientValues>("/api/v1/clients", newClient, true);
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
          <h1 className="text-2xl font-semibold">Client List</h1>
          {loading && !data && (
            <p className="text-sm text-muted-foreground">Loading...</p>
          )}
          {error && (
            <p className="text-sm text-red-600">
              {error.message}
              {!data && (
                <button
                  onClick={() => void refetch()}
                  className="ml-2 underline"
                >
                  Retry
                </button>
              )}
            </p>
          )}
          {assignmentError && (
            <p className="text-sm text-red-600">{assignmentError}</p>
          )}
          {!loading && !error && (
            <DataTable
              data={normalizedRows}
              technicianOptions={technicianOptions}
              onTechnicianChange={(clientId, personnelId) => {
                void handleTechnicianChange(clientId, personnelId);
              }}
              actions={<AddClientModal onAdd={handleAddClient} />}
            />
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

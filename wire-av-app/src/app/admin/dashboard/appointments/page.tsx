"use client";

import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";

import { AppSidebar } from "@/components/app-sidebar";
import { AppointmentDataTable } from "@/components/appointment-data-table";
import {
  EditAppointmentModal,
  appointmentStatusName,
  appointmentTypeName,
  type AppointmentSelectOption,
} from "@/components/edit-appointment-modal";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { apiClient } from "@/src/app/services/apiClient";
import type { AppointmentChanges, AppointmentRow } from "@/src/types";

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

type ClientApiEntry = {
  clientId: number;
  firstName?: string;
  lastName?: string;
};

type PersonnelApiEntry = {
  personnelId: number;
  firstName?: string;
  lastName?: string;
};

type ClientListResponse = { content?: ClientApiEntry[] } | ClientApiEntry[];

type PersonnelListResponse =
  | { personnelList?: PersonnelApiEntry[] }
  | PersonnelApiEntry[];

const APPOINTMENTS_URL = "/api/appointments/list";
const APPOINTMENT_UPDATE_URL = "/api/appointments";
const CLIENTS_URL = "/api/v1/clients?size=200";
const PERSONNEL_URL = "/api/v1/personnel";

const toLocalIso = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm:ss");

// The list endpoint requires a time frame. Use a wide one so the admin table
// is not limited to the current week like the calendar view.
const currentYear = new Date().getFullYear();
const TIME_FRAME = {
  startTime: toLocalIso(new Date(currentYear - 2, 0, 1)),
  endTime: toLocalIso(new Date(currentYear + 2, 11, 31, 23, 59, 59)),
};

function fullName(firstName?: string, lastName?: string): string {
  return `${firstName ?? ""} ${lastName ?? ""}`.trim();
}

function normalizeEntry(entry: AppointmentApiEntry): AppointmentRow {
  const clientId = entry.clientInfo?.clientId ?? null;
  const personnelId = entry.personnelInfo?.personnelId ?? null;
  const timeslotId = entry.timeslot?.timeslotId;

  return {
    id: String(entry.apptId),
    apptId: entry.apptId,
    statusValue: entry.status,
    status: appointmentStatusName(entry.status),
    appTypeValue: entry.apptType,
    appType: appointmentTypeName(entry.apptType),
    client: entry.clientInfo
      ? [
          {
            id: clientId != null ? String(clientId) : `client-${entry.apptId}`,
            name: fullName(
              entry.clientInfo.firstName,
              entry.clientInfo.lastName,
            ),
            email: "",
          },
        ]
      : [],
    personnel:
      entry.personnelInfo && personnelId != null
        ? [
            {
              id: personnelId,
              firstName: entry.personnelInfo.firstName ?? "",
              lastName: entry.personnelInfo.lastName ?? "",
              email: "",
              role: "technician",
            },
          ]
        : [],
    timeslot: entry.timeslot
      ? [
          {
            // id:
            //   timeslotId != null
            //     ? String(timeslotId)
            //     : `timeslot-${entry.apptId}`,
            startTime: entry.timeslot.startTime ?? "",
            endTime: entry.timeslot.endTime ?? "",
          },
        ]
      : [],
    clientId,
    personnelId,
    createdAt: entry.createdAt ?? null,
  };
}

type LoadedAppointments = {
  rows: AppointmentRow[];
  clientOptions: AppointmentSelectOption[];
  personnelOptions: AppointmentSelectOption[];
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentRow[]>([]);
  const [clientOptions, setClientOptions] = useState<AppointmentSelectOption[]>(
    [],
  );
  const [personnelOptions, setPersonnelOptions] = useState<
    AppointmentSelectOption[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [editing, setEditing] = useState<AppointmentRow | null>(null);

  const load = useCallback(async (): Promise<LoadedAppointments> => {
    const [personnelPayload, clientsPayload] = await Promise.all([
      apiClient.get<PersonnelListResponse>(PERSONNEL_URL),
      apiClient.get<ClientListResponse>(CLIENTS_URL),
    ]);

    const personnel = Array.isArray(personnelPayload)
      ? personnelPayload
      : (personnelPayload?.personnelList ?? []);
    const clients = Array.isArray(clientsPayload)
      ? clientsPayload
      : (clientsPayload?.content ?? []);

    const personnelIds = personnel
      .map((person) => person.personnelId)
      .filter((id): id is number => typeof id === "number");

    const payload = await apiClient.post<
      AppointmentListResponse,
      AppointmentListRequest
    >(APPOINTMENTS_URL, { personnelIds, timeFrame: TIME_FRAME });

    return {
      rows: (payload?.appointments ?? []).map(normalizeEntry),
      clientOptions: clients.map((client) => ({
        value: String(client.clientId),
        label:
          fullName(client.firstName, client.lastName) ||
          `Client ${client.clientId}`,
      })),
      personnelOptions: personnel.map((person) => ({
        value: String(person.personnelId),
        label:
          fullName(person.firstName, person.lastName) ||
          `Technician ${person.personnelId}`,
      })),
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    load()
      .then((result) => {
        if (cancelled) return;
        setAppointments(result.rows);
        setClientOptions(result.clientOptions);
        setPersonnelOptions(result.personnelOptions);
      })
      .catch((caughtError) => {
        if (cancelled) return;
        setError(
          caughtError instanceof Error
            ? caughtError
            : new Error("Failed to load appointments"),
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [load]);

  const reloadAppointments = useCallback(async () => {
    const result = await load();
    setAppointments(result.rows);
    return result.rows;
  }, [load]);

  const handleRetry = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await load();
      setAppointments(result.rows);
      setClientOptions(result.clientOptions);
      setPersonnelOptions(result.personnelOptions);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError
          : new Error("Failed to load appointments"),
      );
    } finally {
      setLoading(false);
    }
  }, [load]);

  /**
   * Re-read the appointment from the API and send the merged record back, so a
   * partial change never clears fields the update endpoint expects.
   */
  const applyChanges = useCallback(
    async (apptId: number, changes: Partial<AppointmentChanges>) => {
      const current = await apiClient.get<AppointmentApiEntry>(
        `${APPOINTMENT_UPDATE_URL}/${apptId}`,
      );

      const body: AppointmentChanges = {
        apptId: current.apptId,
        status: changes.status ?? current.status,
        appType: changes.appType ?? current.apptType,
        timeslot: changes.timeslot ?? {
          startTime: current.timeslot?.startTime ?? "",
          endTime: current.timeslot?.endTime ?? "",
        },
        clientId:
          changes.clientId !== undefined
            ? changes.clientId
            : (current.clientInfo?.clientId ?? null),
        personnelId:
          changes.personnelId !== undefined
            ? changes.personnelId
            : (current.personnelInfo?.personnelId ?? null),
        createdAt: current.createdAt ?? null,
      };

      await apiClient.put<AppointmentApiEntry, AppointmentChanges>(
        APPOINTMENT_UPDATE_URL,
        body,
        undefined,
        true,
      );

      await reloadAppointments();
    },
    [reloadAppointments],
  );

  const handleEdit = useCallback(async (appointment: AppointmentRow) => {
    setEditing(appointment);
    try {
      const detail = await apiClient.get<AppointmentApiEntry>(
        `${APPOINTMENT_UPDATE_URL}/${appointment.apptId}`,
      );
      // Only swap in the detail if this appointment is still the one being
      // edited — the dialog may have been closed (or another row opened) while
      // the request was in flight.
      setEditing((current) =>
        current && current.apptId === appointment.apptId
          ? normalizeEntry(detail)
          : current,
      );
    } catch {
      // Keep the row loaded from the list when the detail lookup fails.
    }
  }, []);

  const handleStatusChange = useCallback(
    (appointment: AppointmentRow, statusValue: number) => {
      setActionError(null);
      void applyChanges(appointment.apptId, { status: statusValue }).catch(
        () => {
          setActionError(
            "Could not update the appointment status. Please try again.",
          );
          void reloadAppointments().catch(() => undefined);
        },
      );
    },
    [applyChanges, reloadAppointments],
  );

  const handlePersonnelChange = useCallback(
    (appointment: AppointmentRow, personnelId: number | null) => {
      setActionError(null);
      void applyChanges(appointment.apptId, { personnelId }).catch(() => {
        setActionError(
          "Could not assign the technician. Please try again.",
        );
        void reloadAppointments().catch(() => undefined);
      });
    },
    [applyChanges, reloadAppointments],
  );

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
          <h1 className="text-2xl font-semibold">Appointment List</h1>
          {loading && (
            <p className="text-sm text-muted-foreground">Loading...</p>
          )}
          {error && (
            <p className="text-sm text-red-600">
              {error.message}
              <button
                onClick={() => void handleRetry()}
                className="ml-2 underline"
              >
                Retry
              </button>
            </p>
          )}
          {actionError && <p className="text-sm text-red-600">{actionError}</p>}
          {!loading && !error && (
            <AppointmentDataTable
              data={appointments}
              personnelOptions={personnelOptions}
              onEdit={handleEdit}
              onStatusChange={handleStatusChange}
              onPersonnelChange={handlePersonnelChange}
            />
          )}
        </main>
      </SidebarInset>
      <EditAppointmentModal
        appointment={editing}
        open={editing !== null}
        onOpenChange={(open) => {
          if (!open) setEditing(null);
        }}
        clientOptions={clientOptions}
        personnelOptions={personnelOptions}
        onSave={(changes) => applyChanges(changes.apptId, changes)}
      />
    </SidebarProvider>
  );
}

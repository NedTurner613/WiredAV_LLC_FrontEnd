"use client";

import { useEffect, useState } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import {
  AddPersonnelModal,
  type NewPersonnelValues,
} from "@/components/add-personnel-modal";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DataTable, type Personnel } from "@/components/data-table";
import { useApi } from "@/hooks/useApi";
import { apiClient } from "@/src/app/services/apiClient";
import type { User } from "@/src/types";

type ApiPersonnel = {
  personnelId: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: number;
};

/* GET /api/v1/personnel */
type PersonnelListResponse =
  | ApiPersonnel[]
  | { personnelList?: ApiPersonnel[] };

/* POST /api/v1/personnel/register */
type RegisterPersonnelBody = {
  firstName: string;
  lastName: string;
  email: string;
  role: number;
};

const PERSONNEL_URL = "/api/v1/personnel";

/** POST on /api/v1/personnel*/
const REGISTER_PERSONNEL_URL = "/api/v1/personnel/register";

/** Role codes stored on the personnel table: 1 = ADMIN, 2 = TECHNICIAN. */
const ROLE_CODES: Record<NewPersonnelValues["role"], number> = {
  admin: 1,
  technician: 2,
};

function roleName(role?: number): Personnel["role"] {
  if (role === ROLE_CODES.admin) return "admin";
  if (role === ROLE_CODES.technician) return "technician";
  return undefined;
}

function toPersonnelRow(
  person: ApiPersonnel,
  index: number,
  emailById?: Map<number, string>,
): Personnel {
  const id = person.personnelId ?? -(index + 1);
  return {
    id,
    firstName: person.firstName ?? "",
    lastName: person.lastName ?? "",
    email: person.email ?? emailById?.get(id) ?? "",
    role: roleName(person.role),
  };
}

function toPersonnelRows(
  payload: PersonnelListResponse | null,
  emailById?: Map<number, string>,
): Personnel[] {
  const rows = Array.isArray(payload)
    ? payload
    : (payload?.personnelList ?? []);
  return rows.map((person, index) => toPersonnelRow(person, index, emailById));
}

function personnelIds(payload: PersonnelListResponse | null): number[] {
  const rows = Array.isArray(payload)
    ? payload
    : (payload?.personnelList ?? []);
  return rows
    .map((person) => person.personnelId)
    .filter((id): id is number => typeof id === "number");
}

function getCurrentUser(): User {
  return { name: "Jane", role: "admin" };
}

export default function PersonnelPage() {
  const user = getCurrentUser();

  // GET api/v1/personnel
  const { data, loading, error, refetch, post } =
    useApi<PersonnelListResponse>(PERSONNEL_URL);

  // The list response carries no email, so look up each person's detail to
  // fill the Email Address column.
  const [emailById, setEmailById] = useState<Map<number, string>>(
    () => new Map(),
  );

  useEffect(() => {
    const ids = personnelIds(data);
    if (ids.length === 0) return;

    let cancelled = false;
    void Promise.all(
      ids.map(async (id): Promise<[number, string]> => {
        try {
          const detail = await apiClient.get<ApiPersonnel>(
            `${PERSONNEL_URL}/${id}`,
          );
          return [id, detail.email ?? ""];
        } catch {
          return [id, ""];
        }
      }),
    ).then((entries) => {
      if (!cancelled) setEmailById(new Map(entries));
    });

    return () => {
      cancelled = true;
    };
  }, [data]);

  const handleAddPersonnel = async (newPersonnel: NewPersonnelValues) => {
    const body: RegisterPersonnelBody = {
      firstName: newPersonnel.firstName,
      lastName: newPersonnel.lastName,
      email: newPersonnel.email,
      role: ROLE_CODES[newPersonnel.role],
    };
    await post<unknown, RegisterPersonnelBody>(
      REGISTER_PERSONNEL_URL,
      body,
      true,
    );
  };

  const personnel = toPersonnelRows(data, emailById);

  const heading =
    user.role === "admin"
      ? `Welcome, Admin ${user.name}`
      : `Welcome, Technician ${user.name}`;

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
          <h1 className="text-2xl font-semibold">Personnel List</h1>
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
          {data && (
            <DataTable
              data={personnel}
              variant="personnel"
              actions={<AddPersonnelModal onAdd={handleAddPersonnel} />}
            />
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  AddClientModal,
  type NewClientValues,
} from "@/components/add-client-modal";
import { DataTable, type Client } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
  reviewer?: string;
};

type PaginatedClientsResponse = {
  content?: ApiClientRow[];
  data?: ApiClientRow[];
};

type ClientsApiResponse = ApiClientRow[] | PaginatedClientsResponse | null;


export default function ClientsPage() {
  // GET api/v1/clients
  const { data, loading, error, refetch, post } = useApi<ClientsApiResponse>(
    "/api/v1/clients",
  );

  const rawRows = Array.isArray(data)
    ? data
    : Array.isArray(data?.content)
      ? data.content
      : Array.isArray(data?.data)
        ? data.data
        : [];

  const normalizedRows = rawRows.map((client) => ({
    id: client.clientId ?? client.id ?? 0,
    firstName: client.firstName ?? "",
    lastName: client.lastName ?? "",
    email: client.email ?? "",
    phone: client.phone ?? client.phoneNumber ?? "",
    status: client.status ?? "Open",
    reviewer: client.reviewer ?? "",
  }));

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
          {!loading && !error && <DataTable data={normalizedRows} actions={<AddClientModal onAdd={handleAddClient}/>} />}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

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

export default function ClientsPage() {
  // GET api/v1/clients
  const { data, loading, error, refetch, post } = useApi<Client[]>("/api/v1/clients");

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
          {data && (
            <DataTable
              data={data}
              actions={<AddClientModal onAdd={handleAddClient} />}
            />
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

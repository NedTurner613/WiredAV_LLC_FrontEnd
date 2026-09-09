"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { DataTable, type Client } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useApi } from "@/hooks/useApi";

export default function ClientsPage() {
  // GET api/v1/clients
  const { data, loading, error, refetch } = useApi<Client[]>("/api/v1/clients");

  const handleAddClient = async (newClient: Omit<Client, "id">) => {
    try {
      await post<Client, Omit<Client, "id">>(
        "/api/v1/clients",
        newClient,
        true,
      );
    } catch {
      // error state set in use
    }
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
          {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
          {error && (
            <p className="text-sm text-red-600">
              {error.message}
              <button onClick={() => void refetch()} className="ml-2 underline">
                Retry
              </button>
            </p>
          )}
          {!loading && !error && <DataTable data={data ?? []} />}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

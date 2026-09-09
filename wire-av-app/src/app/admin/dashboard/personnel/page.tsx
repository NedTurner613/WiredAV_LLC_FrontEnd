"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  AddPersonnelModal,
  type NewPersonnelValues,
} from "@/components/add-personnel-modal";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DataTable, type Personnel } from "@/components/data-table";
import { useApi } from "@/hooks/useApi";

function getCurrentUser(): User {
  return { name: "Jane", role: "admin" };
}

export default function PersonnelPage() {
  const user = getCurrentUser();

  // GET api/v1/personnel
  const { data, loading, error, refetch, post } =
    useApi<Personnel[]>("/api/v1/personnel");

  const handleAddPersonnel = async (newPersonnel: NewPersonnelValues) => {
    await post<Personnel, NewPersonnelValues>(
      "/api/v1/personnel",
      newPersonnel,
      true,
    );
  };

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
              data={data}
              actions={<AddPersonnelModal onAdd={handleAddPersonnel} />}
            />
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

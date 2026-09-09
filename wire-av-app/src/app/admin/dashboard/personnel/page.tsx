"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DataTable, type Personnel } from "@/components/data-table";
import { useApi } from "@/hooks/useApi";

// Placeholder for once the authentication has been set up
// const user = await getServerSession(authOpt);
// const user = await AuthenticatorAssertionResponse;

function getCurrentUser(): User {
  return { name: "Jane", role: "admin" };
}

export default function PersonnelPage() {
  const user = getCurrentUser();
  const { data, loading, error, refetch } =
    useApi<Personnel[]>("/api/v1/personnel");

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
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="rounded-2xl border border-slate-200/70 bg-linear-to-br from-slate-50 to-white p-5 shadow-sm">
                <div className="flex flex-col gap-6">
                  <h1 className="text-xl font-semibold">{heading}</h1>
                  <DataTable data={data ?? []} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

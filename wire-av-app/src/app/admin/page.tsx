import CalendarPicker from "@/components/CalendarPicker";
import { AppSidebar } from "@/components/app-sidebar";
// import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import data from "./dashboard/data.json";

// Placeholder for once the authentication has been set up
// const user = await getServerSession(authOpt);
// const user = await AuthenticatorAssertionResponse;

async function getCurrentUser(): Promise<User> {
  return { name: "Jane", role: "admin" };
}

export default async function AdminPage(role: Role) {
  const user = await getCurrentUser();

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
                  <SectionCards />
                  {/* <DataTable data={data} /> */}
                  <CalendarPicker />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

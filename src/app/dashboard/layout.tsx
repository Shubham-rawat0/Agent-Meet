import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

interface Props {
    children : React.ReactNode
}

export default function Layout ({children}:Props){
    return (
      <div className="overflow-hidden">
        <SidebarProvider>
          <DashboardSidebar />
          <main className="flex flex-col h-screen w-screen ">
            <SidebarInset>
              <DashboardNavbar />
              <div className="bg-muted h-screen">{children}</div>
            </SidebarInset>
          </main>
        </SidebarProvider>
      </div>
    );
}
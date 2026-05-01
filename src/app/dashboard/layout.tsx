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
          <main className="flex flex-col h-screen w-screen bg-muted">
            <SidebarInset>
              <DashboardNavbar />
              <>{children}</>
            </SidebarInset>
          </main>
        </SidebarProvider>
      </div>
    );
}
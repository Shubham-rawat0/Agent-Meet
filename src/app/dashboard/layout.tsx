import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { syncUser } from "@/lib/syncUser";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await syncUser();

  return (
    <div className="overflow-hidden">
      <SidebarProvider>
        <DashboardSidebar />

        <main className="flex flex-col h-screen w-screen">
          <SidebarInset>
            <DashboardNavbar />

            <div className="bg-muted h-screen">{children}</div>
          </SidebarInset>
        </main>
      </SidebarProvider>
    </div>
  );
}

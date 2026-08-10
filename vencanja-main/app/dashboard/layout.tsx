import { redirect } from "next/navigation";
import { getCurrentClient } from "@/lib/client/getCurrentClient";
import { DashboardProvider } from "@/components/dashboard/context/DashboardContext";
import { ProjectProvider } from "@/components/dashboard/context/ProjectContext";
import { Toaster } from "@/components/ui/sonner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const current = await getCurrentClient();

  if (!current) {
    redirect("/login");
  }
  return (
    <DashboardProvider
      user={{
        id: current.user.id,
        email: current.user.email,
      }}
      client={current.client}
      projects={current.projects}
    >
      <ProjectProvider>{children}</ProjectProvider>
      <Toaster />
    </DashboardProvider>
  );
}

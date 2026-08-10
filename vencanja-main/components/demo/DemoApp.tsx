"use client";

import { useEffect, useState } from "react";
import { GuestsProvider } from "@/components/dashboard/context/GuestContext";
import { DialogProvider } from "@/components/dashboard/context/ModalContext";
import { TableProvider } from "@/components/dashboard/context/TableContext";
import { BudgetProvider } from "@/components/dashboard/context/BudgetContext";
import { PlannerProvider } from "@/components/dashboard/context/PlannerContext";
import { GuestPhotosProvider } from "@/components/dashboard/context/GuestPhotosContext";
import { DashboardProvider } from "@/components/dashboard/context/DashboardContext";
import { ProjectProvider } from "@/components/dashboard/context/ProjectContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { UserLayout } from "@/app/dashboard/user/UserLayout";
import { DemoBanner } from "@/components/demo/DemoBanner";
import { createDemoSnapshot } from "@/lib/demo/seed";
import { disableDemoMode, enableDemoMode } from "@/lib/demo/mode";
import type { DemoSnapshot } from "@/lib/demo/types";

function DemoSession({ onReset }: { onReset: () => void }) {
  const [snapshot] = useState<DemoSnapshot>(() => {
    const seed = createDemoSnapshot();
    enableDemoMode(seed);
    return seed;
  });

  useEffect(() => {
    return () => {
      disableDemoMode();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f4f1]">
      <DemoBanner onReset={onReset} />
      <DashboardProvider
        user={snapshot.user}
        client={snapshot.client}
        projects={snapshot.projects}
        persistActiveProject={false}
      >
        <ProjectProvider>
          <TooltipProvider>
            <DialogProvider>
              <GuestsProvider>
                <TableProvider>
                  <BudgetProvider>
                    <PlannerProvider>
                      <GuestPhotosProvider>
                        <UserLayout />
                      </GuestPhotosProvider>
                    </PlannerProvider>
                  </BudgetProvider>
                </TableProvider>
              </GuestsProvider>
            </DialogProvider>
          </TooltipProvider>
        </ProjectProvider>
        <Toaster />
      </DashboardProvider>
    </div>
  );
}

export function DemoApp() {
  const [sessionKey, setSessionKey] = useState(0);

  return (
    <DemoSession
      key={sessionKey}
      onReset={() => setSessionKey((value) => value + 1)}
    />
  );
}

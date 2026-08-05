"use client";

import { GuestsProvider } from "@/components/dashboard/context/GuestContext";
import { UserLayout } from "./user/UserLayout";
import { DialogProvider } from "@/components/dashboard/context/ModalContext";
import { TableProvider } from "@/components/dashboard/context/TableContext";
import { BudgetProvider } from "@/components/dashboard/context/BudgetContext";
import { PlannerProvider } from "@/components/dashboard/context/PlannerContext";
import { TooltipProvider } from "@/components/ui/tooltip";

const Dashboard = () => {
  return (
    <TooltipProvider>
      <DialogProvider>
        <GuestsProvider>
          <TableProvider>
            <BudgetProvider>
              <PlannerProvider>
                <UserLayout />
              </PlannerProvider>
            </BudgetProvider>
          </TableProvider>
        </GuestsProvider>
      </DialogProvider>
    </TooltipProvider>
  );
};
export default Dashboard;

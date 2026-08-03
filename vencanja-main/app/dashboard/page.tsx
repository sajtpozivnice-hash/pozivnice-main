"use client";

import { GuestsProvider } from "@/components/dashboard/context/GuestContext";
import { UserLayout } from "./user/UserLayout";
import { DialogProvider } from "@/components/dashboard/context/ModalContext";
import { TableProvider } from "@/components/dashboard/context/TableContext";
import { TooltipProvider } from "@/components/ui/tooltip";

const Dashboard = () => {
  return (
    <TooltipProvider>
      <DialogProvider>
        <GuestsProvider>
          <TableProvider>
            <UserLayout />
          </TableProvider>
        </GuestsProvider>
      </DialogProvider>
    </TooltipProvider>
  );
};
export default Dashboard;

"use client";

import { useState } from "react";
import { Download, FileDown, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGuests } from "../context/GuestContext";
import { useProject } from "../context/ProjectContext";
import { useTables } from "../context/TableContext";
import {
  downloadSeatingExportCsv,
  downloadSeatingExportPdf,
  seatingExportOptions,
  SeatingExportType,
} from "./seatingExport";

const SeatingDownloadMenu = () => {
  const { tables } = useTables();
  const { guests } = useGuests();
  const { project } = useProject();
  const [busyType, setBusyType] = useState<SeatingExportType | null>(null);

  const meta = { projectTitle: project?.title };

  const handlePdf = async (type: SeatingExportType) => {
    try {
      setBusyType(type);
      await downloadSeatingExportPdf(type, tables, guests, meta);
      toast.success("PDF fajl je preuzet.", { position: "top-center" });
    } catch {
      toast.error("Preuzimanje PDF fajla nije uspelo.", {
        position: "top-center",
      });
    } finally {
      setBusyType(null);
    }
  };

  const handleCsv = (type: SeatingExportType) => {
    try {
      downloadSeatingExportCsv(type, tables, guests, meta);
      toast.success("CSV fajl je preuzet.", { position: "top-center" });
    } catch {
      toast.error("Preuzimanje CSV fajla nije uspelo.", {
        position: "top-center",
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger
        className="w-full"
        render={
          <Button variant="outline" className="h-9 w-full cursor-pointer" />
        }
      >
        <Download className="h-4 w-4" />
        <span className="min-[420px]:hidden">Preuzmi</span>
        <span className="hidden min-[420px]:inline">Preuzmi raspored</span>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[min(20rem,calc(100vw-1.5rem))] max-h-[min(70vh,32rem)] overflow-y-auto p-2"
      >
        <PopoverHeader className="px-2 pt-1 pb-2">
          <PopoverTitle>Preuzmi raspored sedenja</PopoverTitle>
          <PopoverDescription>
            Skida se PDF ili CSV fajl na uređaj.
          </PopoverDescription>
        </PopoverHeader>

        <div className="flex flex-col gap-1">
          {seatingExportOptions.map((option) => (
            <div
              key={option.type}
              className="rounded-lg border border-transparent px-2 py-2 hover:border-border hover:bg-muted/40"
            >
              <div className="mb-1.5">
                <p className="text-sm font-medium text-foreground">
                  {option.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {option.description}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 cursor-pointer"
                  disabled={busyType !== null}
                  onClick={() => handlePdf(option.type)}
                >
                  <FileDown className="h-3.5 w-3.5" />
                  {busyType === option.type ? "..." : "PDF"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 cursor-pointer"
                  disabled={busyType !== null}
                  onClick={() => handleCsv(option.type)}
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  CSV
                </Button>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SeatingDownloadMenu;

"use client";

import { useState } from "react";
import ModalContainer from "@/components/dashboard/Modal/ModalContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PotvrdjeniDolasci from "@/components/dashboard/PotvrdjeniDolasci/PotvrdjeniDolasci";
import Sections from "@/components/dashboard/Sections/Sections";
import Images from "@/components/dashboard/Images/Images";
import RasporedSedenja from "@/components/dashboard/RasporedSedenja/RasporedSedenja";
import Finansije from "@/components/dashboard/Finansije/Finansije";
import PlanerZadataka from "@/components/dashboard/PlanerZadataka/PlanerZadataka";
import DashboardHome from "@/components/dashboard/Home/DashboardHome";
import SectionPageShell from "@/components/dashboard/shared/SectionPageShell";
import LogoutButton from "@/components/dashboard/LogoutButton";
import { useDashboard } from "@/components/dashboard/context/DashboardContext";
import SelectInput from "@/components/dashboard/SelectInput";
import { DASHBOARD_ACCENTS } from "@/components/dashboard/theme";
import { cn } from "@/lib/utils";
import {
  CalendarCheck2,
  Home,
  Images as ImagesIcon,
  LayoutTemplate,
  ListTodo,
  Users,
  Wallet,
} from "lucide-react";

const tabTriggerClass =
  "shrink-0 gap-1.5 rounded-xl px-3 py-2 text-xs transition-all duration-200 sm:text-sm data-active:shadow-sm";

export const UserLayout = () => {
  const { projects, activeProjectId, setActiveProject, activeProject } =
    useDashboard();
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="dashboard-shell">
      <div className="mx-auto w-full min-w-0 max-w-7xl space-y-5 overflow-x-hidden p-3 sm:p-5 md:p-7">
        <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-white/75 p-4 shadow-[0_8px_30px_rgb(15_23_42_/_0.04)] backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="min-w-0">
            <p className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Wedding dashboard
            </p>
            <h1 className="truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {activeProject?.title ?? "Vaše venčanje"}
            </h1>
          </div>
          <div className="flex w-full flex-col gap-2 min-[420px]:flex-row min-[420px]:items-center sm:w-auto">
            {projects.length > 1 ? (
              <div className="min-w-0 flex-1 sm:w-56">
                <SelectInput
                  items={projects.map((project) => ({
                    label: project.title,
                    value: project.id,
                  }))}
                  value={activeProjectId ?? undefined}
                  onChange={(value) => {
                    if (value) setActiveProject(value);
                  }}
                  placeholder="Izaberite projekat"
                />
              </div>
            ) : null}
            <LogoutButton />
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            if (typeof value === "string") setActiveTab(value);
          }}
          className="w-full min-w-0 gap-5"
        >
          <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <TabsList className="h-auto min-h-11 w-max max-w-none gap-1 rounded-2xl bg-white/80 p-1.5 shadow-sm ring-1 ring-border/50">
              <TabsTrigger
                className={cn(tabTriggerClass, DASHBOARD_ACCENTS.home.ring)}
                value="home"
              >
                <Home className="h-3.5 w-3.5" />
                Pregled
              </TabsTrigger>
              <TabsTrigger
                className={cn(tabTriggerClass, DASHBOARD_ACCENTS.sections.ring)}
                value="sections"
              >
                <LayoutTemplate className="h-3.5 w-3.5" />
                Sekcije
              </TabsTrigger>
              <TabsTrigger
                className={cn(tabTriggerClass, DASHBOARD_ACCENTS.gallery.ring)}
                value="images"
              >
                <ImagesIcon className="h-3.5 w-3.5" />
                Slike
              </TabsTrigger>
              <TabsTrigger
                className={cn(tabTriggerClass, DASHBOARD_ACCENTS.guests.ring)}
                value="coming"
              >
                <Users className="h-3.5 w-3.5" />
                Gosti
              </TabsTrigger>
              <TabsTrigger
                className={cn(tabTriggerClass, DASHBOARD_ACCENTS.seating.ring)}
                value="seating"
              >
                <CalendarCheck2 className="h-3.5 w-3.5" />
                Raspored
              </TabsTrigger>
              <TabsTrigger
                className={cn(tabTriggerClass, DASHBOARD_ACCENTS.budget.ring)}
                value="finansije"
              >
                <Wallet className="h-3.5 w-3.5" />
                Finansije
              </TabsTrigger>
              <TabsTrigger
                className={cn(tabTriggerClass, DASHBOARD_ACCENTS.planner.ring)}
                value="planer"
              >
                <ListTodo className="h-3.5 w-3.5" />
                Planer
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="home" className="min-w-0">
            <DashboardHome onNavigate={setActiveTab} />
          </TabsContent>

          <TabsContent value="sections" className="min-w-0">
            <SectionPageShell
              accent="sections"
              title="Sekcije"
              description="Prilagodite izgled i sadržaj pozivnice — tekstove, slike i vidljivost."
            >
              <Sections />
            </SectionPageShell>
          </TabsContent>

          <TabsContent value="images" className="min-w-0">
            <SectionPageShell
              accent="gallery"
              title="Slike"
              description="Pregled fotografija iz galerije na pozivnici."
            >
              <Images />
            </SectionPageShell>
          </TabsContent>

          <TabsContent value="coming" className="min-w-0">
            <SectionPageShell
              accent="guests"
              title="Gosti"
              description="Upravljajte potvrdama dolaska, dodajte goste i preuzmite spisak."
            >
              <PotvrdjeniDolasci />
            </SectionPageShell>
          </TabsContent>

          <TabsContent value="seating" className="min-w-0">
            <SectionPageShell
              accent="seating"
              title="Raspored sedenja"
              description="Kreirajte stolove, rasporedite goste i izvezite raspored za štampu."
            >
              <RasporedSedenja />
            </SectionPageShell>
          </TabsContent>

          <TabsContent value="finansije" className="min-w-0">
            <SectionPageShell
              accent="budget"
              title="Finansije"
              description="Pratite budžet, uplate, dobavljače i dokumenta."
            >
              <Finansije />
            </SectionPageShell>
          </TabsContent>

          <TabsContent value="planer" className="min-w-0">
            <SectionPageShell
              accent="planner"
              title="Planer zadataka"
              description="Organizujte obaveze do dana venčanja i pratite napredak."
            >
              <PlanerZadataka />
            </SectionPageShell>
          </TabsContent>
        </Tabs>
        <ModalContainer />
      </div>
    </div>
  );
};

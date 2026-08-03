"use client";

import { FC } from "react";
import { useEditor } from "./EditorProvider";
import { panelRegistry } from "./panelRegistry";
import StructurePanel from "./panels/StructurePanel";
import GeneralInfoPanel from "./panels/GeneralInfoPanel";
import FontsAndColorsPanel from "./panels/FontsAndColorsPanel";
import InvitationContactForm from "@/components/shared/InvitationContactForm/InvitationContactForm";

const Sidebar: FC<{ viewMode: "edit" | "preview" }> = ({ viewMode }) => {
  const { config } = useEditor();

  const visibleSections = config.sections
    .filter((section) => section.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <aside
      className={`
        w-[480px] shrink-0 h-full border-r overflow-y-auto p-6 bg-white
        ${viewMode === "preview" ? "hidden lg:block" : "block"}
      `}
    >
      <h2 className="text-lg font-bold ">Podešavanja izgleda</h2>
      <p className="text-md opacity-60 mb-4">
        Prilagodite sadržaj i izgled stranice – menjajte tekst, slike, boje i
        fontove, kao i vidljivost sekcija.
      </p>
      <StructurePanel />
      <GeneralInfoPanel />
      <FontsAndColorsPanel />
      {visibleSections.map((section) => {
        const PanelComponent = panelRegistry[section.type];
        if (!PanelComponent) return null;
        return <PanelComponent key={section.id} />;
      })}
      <InvitationContactForm config={config} />
    </aside>
  );
};

export default Sidebar;

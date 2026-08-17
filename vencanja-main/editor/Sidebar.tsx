"use client";

import { FC } from "react";
import { useEditor } from "./EditorProvider";
import { panelRegistry } from "./panelRegistry";
import StructurePanel from "./panels/StructurePanel";
import GeneralInfoPanel from "./panels/GeneralInfoPanel";
import FontsAndColorsPanel from "./panels/FontsAndColorsPanel";
import InvitationContactForm from "@/components/shared/InvitationContactForm/InvitationContactForm";

const Sidebar: FC = () => {
  const { config, viewMode } = useEditor();

  const visibleSections = config.sections
    .filter((section) => section.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <aside
      data-editor-sidebar
      className={`
        flex h-full min-h-0 flex-col overflow-hidden border-black/5 bg-white
        ${
          viewMode === "edit"
            ? "fixed inset-0 z-20 w-full pt-[3.25rem] lg:static lg:z-auto lg:w-[min(420px,38vw)] lg:max-w-[480px] lg:shrink-0 lg:border-l lg:pt-0"
            : "hidden lg:flex lg:w-[min(420px,38vw)] lg:max-w-[480px] lg:shrink-0 lg:border-l"
        }
      `}
    >
      <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-4 py-4 sm:px-5 lg:px-6 lg:py-6">
        <div className="mb-4 lg:mb-5">
          <h2 className="text-base font-bold tracking-tight lg:text-lg">
            Podešavanja izgleda
          </h2>
          <p className="mt-1 text-sm leading-snug text-black/55 lg:text-[15px]">
            Menjajte tekst, slike, boje i vidljivost sekcija.
          </p>
        </div>

        <div className="min-w-0">
          <StructurePanel />
          <GeneralInfoPanel />
          <FontsAndColorsPanel />
          {visibleSections.map((section) => {
            const PanelComponent = panelRegistry[section.type];
            if (!PanelComponent) return null;
            return <PanelComponent key={section.id} />;
          })}
        </div>

        <div className="mt-6 min-w-0 overflow-hidden border-t border-black/5 pt-5 [&_*]:max-w-full">
          <InvitationContactForm config={config} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

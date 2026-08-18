"use client";

import { useState } from "react";
import { useEditor } from "./EditorProvider";
import InvitationContactForm from "@/components/shared/InvitationContactForm/InvitationContactForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const OrderCta = () => {
  const { config, viewMode, setViewMode } = useEditor();
  const [open, setOpen] = useState(false);

  // Mobile edit is full-screen — hide bar. Desktop keeps it visible while editing.
  const hideOnMobileEdit = viewMode === "edit";

  return (
    <>
      {!open ? (
        <div
          className={`
            pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 lg:px-4
            ${hideOnMobileEdit ? "hidden lg:block" : "block"}
          `}
        >
          <div className="pointer-events-auto mx-auto flex w-full max-w-3xl flex-col gap-2 rounded-2xl border border-black/8 bg-white/95 p-3 shadow-[0_8px_40px_rgba(0,0,0,0.14)] backdrop-blur-md sm:flex-row sm:items-center sm:gap-4 sm:p-3.5">
            <p className="text-center text-[12px] leading-snug text-black/60 sm:flex-1 sm:text-left sm:text-[13px]">
              Pre porudžbine unesite svoja{" "}
              <strong className="font-semibold text-black/80">imena</strong>,{" "}
              <strong className="font-semibold text-black/80">datume</strong>,{" "}
              <strong className="font-semibold text-black/80">tekstove</strong>,
              fotografije i ostale detalje u editoru.
            </p>
            <div className="flex shrink-0 items-stretch gap-2">
              <button
                type="button"
                onClick={() => setViewMode("edit")}
                className="rounded-xl border border-[color-mix(in_srgb,var(--color-hot)_45%,transparent)] px-3 py-3 text-sm font-bold text-[var(--color-hot)] transition hover:bg-[color-mix(in_srgb,var(--color-hot)_8%,transparent)]"
              >
                Uredi
              </button>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--color-hot)] px-4 py-3 text-sm font-bold text-white shadow-md transition hover:brightness-105 sm:flex-none"
              >
                Naruči
                <span className="rounded-md bg-white/20 px-2 py-0.5 text-xs font-extrabold tracking-wide">
                  3.999 RSD
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-full gap-0 overflow-hidden p-0 sm:max-w-lg"
        >
          <div className="flex h-full flex-col">
            <SheetHeader className="shrink-0 border-b border-black/5 px-5 py-4 text-left">
              <SheetTitle className="font-[family-name:var(--font-playfair)] text-xl">
                Naručite pozivnicu
              </SheetTitle>
              <SheetDescription className="sr-only">
                Forma za naručivanje pozivnice. Pre porudžbine unesite imena,
                datume, tekstove i fotografije u editoru.
              </SheetDescription>
              <div className="space-y-2 text-[13px] leading-relaxed text-black/65">
                <p>
                  Pre nego što pošaljete porudžbinu, proverite da ste uneli sve
                  svoje podatke u editoru:
                </p>
                <ul className="list-disc space-y-1 pl-4 font-medium text-black/75">
                  <li>imena (npr. mladenaca / slavljenika)</li>
                  <li>datume i lokacije</li>
                  <li>tekstove i poruke</li>
                  <li>fotografije i ostale detalje</li>
                </ul>
                <p>
                  Pozivnica treba da izgleda tačno kako želite — to kasnije i
                  dalje možete menjati iz naloga.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setViewMode("edit");
                }}
                className="mt-1 w-fit text-left text-sm font-bold text-[var(--color-hot)] underline-offset-2 hover:underline"
              >
                Vrati se u editor i dopuni detalje
              </button>
            </SheetHeader>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
              <InvitationContactForm config={config} compact />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default OrderCta;

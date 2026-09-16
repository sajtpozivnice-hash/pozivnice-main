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
  const isMobileEdit = viewMode === "edit";

  return (
    <>
      {!open ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 lg:px-4">
          <div
            className={`pointer-events-auto mx-auto flex w-full max-w-3xl gap-2 rounded-2xl border border-black/8 bg-white/95 p-3 shadow-[0_8px_40px_rgba(0,0,0,0.14)] backdrop-blur-md ${
              isMobileEdit
                ? "flex-row items-center lg:flex-row lg:items-center lg:gap-4 lg:p-3.5"
                : "flex-col sm:flex-row sm:items-center sm:gap-4 sm:p-3.5"
            }`}
          >
            {!isMobileEdit ? (
              <p className="text-center text-[14px] leading-snug text-black/65 sm:flex-1 sm:text-left sm:text-[15px]">
                Unesite imena, datum i tekstove, pa naručite. Šaljemo uputstvo za
                uplatu (
                <strong className="font-semibold text-black/80">3.999 RSD</strong>
                ). Posle porudžbine i dalje možete menjati sve iz svog naloga. Ako
                niste zadovoljni — povrat novca u roku od 7 dana.
              </p>
            ) : (
              <p className="hidden flex-1 text-[14px] text-black/65 lg:block">
                Kad ste spremni — naručite. Posle uplate i dalje menjate iz
                naloga.
              </p>
            )}
            <div className="flex min-w-0 flex-1 shrink-0 items-stretch gap-2 lg:flex-none">
              {!isMobileEdit ? (
                <button
                  type="button"
                  onClick={() => setViewMode("edit")}
                  className="rounded-xl border border-[color-mix(in_srgb,var(--color-hot)_45%,transparent)] px-3 py-3 text-sm font-bold text-[var(--color-hot)] transition hover:bg-[color-mix(in_srgb,var(--color-hot)_8%,transparent)]"
                >
                  Uredi
                </button>
              ) : null}
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
                Forma za naručivanje pozivnice.
              </SheetDescription>
              <div className="space-y-2 text-[13px] leading-relaxed text-black/65">
                <p>
                  <strong>Šta sledi:</strong> pošaljete podatke → mi šaljemo
                  uputstvo za uplatu (3.999 RSD) → posle uplate dobijate link za
                  goste. Imate garanciju povrata novca u roku od 7 dana ako
                  niste zadovoljni.
                </p>
              </div>
              {isMobileEdit ? null : (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setViewMode("edit");
                  }}
                  className="mt-1 w-fit text-left text-sm font-bold text-[var(--color-hot)] underline-offset-2 hover:underline"
                >
                  Još da doradim u editoru
                </button>
              )}
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

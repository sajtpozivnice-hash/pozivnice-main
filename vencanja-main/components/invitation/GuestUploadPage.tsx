"use client";

import { InvitationProjectProvider } from "@/components/invitation/InvitationProjectContext";
import GuestPhotoUploadControl from "@/components/shared/GuestPhotoUploadControl";

type Props = {
  projectId: string;
  title: string;
  eventDate?: string;
};

function formatDate(value?: string) {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  const d = match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("sr-Latn-RS", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function GuestUploadPage({
  projectId,
  title,
  eventDate,
}: Props) {
  const dateLabel = formatDate(eventDate);

  return (
    <InvitationProjectProvider projectId={projectId}>
      <div className="min-h-dvh bg-[radial-gradient(ellipse_at_top,_#f8fafc_0%,_#eef2f7_45%,_#e8eef5_100%)] px-4 py-10 text-slate-900">
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-900/5 backdrop-blur sm:p-8">
            <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-teal-700">
              Galerija gostiju
            </p>
            <h1 className="mt-3 text-center font-serif text-3xl leading-tight tracking-tight">
              {title}
            </h1>
            {dateLabel ? (
              <p className="mt-2 text-center text-sm text-slate-500">
                {dateLabel}
              </p>
            ) : null}

            <p className="mt-5 text-center text-sm leading-relaxed text-slate-600">
              Podelite trenutak sa nama — izaberite jednu ili više fotografija
              odjednom. Pojaviće se u našoj galeriji.
            </p>

            <div className="mt-8">
              <GuestPhotoUploadControl
                buttonText="Pošalji fotografije"
                buttonClassName="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-teal-700 px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
                inputClassName="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                stackClassName="flex w-full flex-col gap-3"
              />
            </div>
          </div>
        </div>
      </div>
    </InvitationProjectProvider>
  );
}

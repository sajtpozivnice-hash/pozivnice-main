"use client";

import { useMemo, useRef } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { Download, Printer, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGuestUploadUrl } from "@/lib/invitationUrl";

type Props = {
  subdomain: string;
  title: string;
  eventDate?: string | null;
};

function formatDate(value?: string | null) {
  if (!value) return null;
  // Parse YYYY-MM-DD as local calendar date to avoid SSR/client timezone mismatch.
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

export default function GuestUploadQrCard({
  subdomain,
  title,
  eventDate,
}: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const uploadUrl = useMemo(() => getGuestUploadUrl(subdomain), [subdomain]);
  const dateLabel = formatDate(eventDate);

  const downloadPng = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `qr-upload-${subdomain}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const printPoster = () => {
    const node = printRef.current;
    if (!node) return;

    const win = window.open("", "_blank", "noopener,noreferrer,width=800,height=900");
    if (!win) return;

    win.document.write(`<!doctype html>
<html lang="sr">
<head>
  <meta charset="utf-8" />
  <title>QR upload – ${title}</title>
  <style>
    @page { size: A5; margin: 16mm; }
    body {
      font-family: Georgia, "Times New Roman", serif;
      color: #0f172a;
      text-align: center;
      margin: 0;
      padding: 24px;
    }
    h1 { font-size: 28px; margin: 0 0 8px; font-weight: 600; }
    .date { color: #64748b; font-size: 14px; margin-bottom: 24px; }
    .qr { margin: 24px auto; }
    .hint { font-size: 15px; line-height: 1.5; margin-top: 20px; }
    .url { font-family: ui-monospace, monospace; font-size: 11px; color: #64748b; word-break: break-all; margin-top: 16px; }
  </style>
</head>
<body>
  ${node.innerHTML}
  <script>window.onload = () => { window.print(); };<\/script>
</body>
</html>`);
    win.document.close();
  };

  if (!subdomain.trim()) {
    return (
      <div className="rounded-2xl border border-dashed border-rose-200 bg-rose-50/40 p-4 text-sm text-muted-foreground">
        Dodajte subdomain projektu da biste dobili QR kod za upload fotografija.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-rose-200/70 bg-gradient-to-br from-rose-50/80 via-white to-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-1 inline-flex items-center gap-2 text-sm font-semibold text-rose-900">
            <QrCode className="h-4 w-4" />
            QR za upload fotografija
          </div>
          <p className="text-sm text-muted-foreground">
            Odštampajte i stavite na stolove. Gosti skeniraju i otvaraju samo
            stranicu za slanje fotografija — ne celu pozivnicu.
          </p>
          <p className="mt-2 break-all font-mono text-xs text-slate-500">
            {uploadUrl}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={downloadPng}
            >
              <Download className="h-4 w-4" />
              Preuzmi PNG
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={printPoster}
            >
              <Printer className="h-4 w-4" />
              Štampaj poster
            </Button>
          </div>
        </div>

        <div className="mx-auto shrink-0 rounded-2xl border border-rose-100 bg-white p-3 shadow-sm sm:mx-0">
          <div ref={canvasRef} className="hidden">
            <QRCodeCanvas value={uploadUrl} size={512} level="M" includeMargin />
          </div>
          <QRCodeSVG value={uploadUrl} size={148} level="M" includeMargin />
        </div>
      </div>

      {/* Print payload (cloned into print window) */}
      <div ref={printRef} className="hidden" aria-hidden>
        <p style={{ letterSpacing: "0.18em", textTransform: "uppercase", fontSize: 11, color: "#0f766e", marginBottom: 12 }}>
          Galerija gostiju
        </p>
        <h1>{title}</h1>
        {dateLabel ? <p className="date">{dateLabel}</p> : null}
        <div className="qr">
          <QRCodeSVG value={uploadUrl} size={280} level="M" includeMargin />
        </div>
        <p className="hint">
          Skenirajte QR kod telefonom
          <br />
          i pošaljite fotografiju sa proslave.
        </p>
        <p className="url">{uploadUrl}</p>
      </div>
    </div>
  );
}

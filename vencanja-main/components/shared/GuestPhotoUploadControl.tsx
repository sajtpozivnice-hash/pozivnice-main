"use client";

import { CSSProperties, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { useInvitationProject } from "@/components/invitation/InvitationProjectContext";
import { prepareImageDataUrl } from "@/helpers/prepareImageForUpload";

type GuestPhotoUploadControlProps = {
  buttonText: string;
  buttonClassName?: string;
  buttonStyle?: CSSProperties;
  inputClassName?: string;
  stackClassName?: string;
  /** Stable id — avoid useId() (SSR/client mismatch in editor tree). */
  inputId?: string;
};

function toErrorMessage(err: unknown): string {
  if (err instanceof Error && err.message) return err.message;
  if (typeof err === "string" && err.trim()) return err;
  if (
    err &&
    typeof err === "object" &&
    "message" in err &&
    typeof (err as { message: unknown }).message === "string"
  ) {
    return (err as { message: string }).message;
  }
  return "Upload nije uspeo. Pokušajte ponovo.";
}

const GuestPhotoUploadControl = ({
  buttonText,
  buttonClassName,
  buttonStyle,
  inputClassName,
  stackClassName,
  inputId = "guest-photo-file-input",
}: GuestPhotoUploadControlProps) => {
  const { projectId } = useInvitationProject();
  const [guestName, setGuestName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const disabled = !projectId || uploading;

  const handleFile = async (file: File | null) => {
    if (!file || !projectId) return;

    setUploading(true);
    setError(null);
    setMessage(null);

    try {
      const prepared = await prepareImageDataUrl(file);

      const res = await fetch("/api/guest-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          projectId,
          image: prepared.dataUrl,
          fileName: prepared.fileName,
          guestName: guestName.trim() || null,
        }),
      });

      const body = (await res.json().catch(() => null)) as {
        error?: string;
        success?: boolean;
      } | null;

      if (!res.ok || !body?.success) {
        throw new Error(
          body?.error ||
            (res.status === 413
              ? "Fotografija je prevelika."
              : `Upload nije uspeo (${res.status}).`),
        );
      }

      setMessage("Hvala! Fotografija je poslata.");
      setGuestName("");
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={
        stackClassName ?? "mx-auto flex w-full max-w-sm flex-col gap-3"
      }
    >
      <input
        type="text"
        value={guestName}
        onChange={(event) => setGuestName(event.target.value)}
        placeholder="Vaše ime (opciono)"
        className={
          inputClassName ??
          "w-full rounded-full border border-black/10 bg-white/90 px-4 py-3 text-sm outline-none"
        }
        disabled={uploading}
      />

      <label
        htmlFor={disabled ? undefined : inputId}
        style={buttonStyle}
        className={`${
          buttonClassName ??
          "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold"
        } ${disabled ? "pointer-events-none opacity-60" : ""}`}
        aria-disabled={disabled}
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Upload className="h-4 w-4" />
        )}
        <span>{uploading ? "Slanje…" : buttonText}</span>
      </label>

      <input
        id={inputId}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        disabled={disabled}
        onChange={(event) => {
          const file = event.target.files?.[0] ?? null;
          void handleFile(file);
          event.target.value = "";
        }}
      />

      {!projectId ? (
        <p className="text-center text-xs opacity-70">
          Upload je dostupan na objavljenoj pozivnici.
        </p>
      ) : null}
      {message ? (
        <p className="text-center text-sm text-emerald-700">{message}</p>
      ) : null}
      {error ? (
        <p className="text-center text-sm text-red-600">{error}</p>
      ) : null}
    </div>
  );
};

export default GuestPhotoUploadControl;

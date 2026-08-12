"use client";

import { CSSProperties, useId, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { useInvitationProject } from "@/components/invitation/InvitationProjectContext";
import { uploadImageToCloudinaryDetailed } from "@/helpers/uploadImageToCloudinary";
import { createGuestPhotoService } from "@/components/dashboard/services/guestPhotos.service";

type GuestPhotoUploadControlProps = {
  buttonText: string;
  buttonClassName?: string;
  buttonStyle?: CSSProperties;
  inputClassName?: string;
  stackClassName?: string;
};

const GuestPhotoUploadControl = ({
  buttonText,
  buttonClassName,
  buttonStyle,
  inputClassName,
  stackClassName,
}: GuestPhotoUploadControlProps) => {
  const inputId = useId();
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
      const uploaded = await uploadImageToCloudinaryDetailed(file, {
        fileName: file.name,
        purpose: "guest-photo",
        projectId,
      });

      await createGuestPhotoService(projectId, {
        public_id: uploaded.public_id,
        secure_url: uploaded.secure_url,
        file_name: file.name,
        guest_name: guestName.trim() || null,
        width: uploaded.width ?? null,
        height: uploaded.height ?? null,
        bytes: uploaded.bytes ?? null,
        format: uploaded.format ?? null,
      });

      setMessage("Hvala! Fotografija je poslata.");
      setGuestName("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Upload nije uspeo. Pokušajte ponovo.",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={stackClassName ?? "mx-auto flex w-full max-w-sm flex-col gap-3"}>
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

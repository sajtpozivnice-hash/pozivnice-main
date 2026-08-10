import { createClient } from "@/lib/supabase/client";
import { CreateGuestPhotoDto, GuestPhoto } from "../types";
import { isDemoMode } from "@/lib/demo/mode";
import {
  demoCreateGuestPhoto,
  demoDeleteGuestPhoto,
  demoGetGuestPhotos,
} from "@/lib/demo/adapters";

const supabase = createClient();

export const getGuestPhotosByProjectService = async (
  projectId: string,
): Promise<GuestPhoto[]> => {
  if (isDemoMode()) return demoGetGuestPhotos(projectId);

  const { data, error } = await supabase
    .from("guest_photos")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as GuestPhoto[];
};

export const createGuestPhotoService = async (
  projectId: string,
  photo: CreateGuestPhotoDto,
): Promise<GuestPhoto> => {
  if (isDemoMode()) return demoCreateGuestPhoto(projectId, photo);

  const { data, error } = await supabase
    .from("guest_photos")
    .insert({
      project_id: projectId,
      public_id: photo.public_id,
      secure_url: photo.secure_url,
      file_name: photo.file_name ?? null,
      guest_name: photo.guest_name?.trim() || null,
      width: photo.width ?? null,
      height: photo.height ?? null,
      bytes: photo.bytes ?? null,
      format: photo.format ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data as GuestPhoto;
};

export const deleteGuestPhotoService = async (id: string): Promise<void> => {
  if (isDemoMode()) {
    demoDeleteGuestPhoto(id);
    return;
  }

  const { error } = await supabase.from("guest_photos").delete().eq("id", id);
  if (error) throw error;
};

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useDashboard } from "./DashboardContext";
import { GuestPhoto } from "../types";
import {
  deleteGuestPhotoService,
  getGuestPhotosByProjectService,
} from "../services/guestPhotos.service";

type GuestPhotosContextType = {
  photos: GuestPhoto[];
  loading: boolean;
  refresh: () => Promise<void>;
  deletePhoto: (id: string) => Promise<void>;
  projectId: string | null;
};

const GuestPhotosContext = createContext<GuestPhotosContextType | undefined>(
  undefined,
);

export const GuestPhotosProvider = ({ children }: { children: ReactNode }) => {
  const { activeProject } = useDashboard();
  const projectId = activeProject?.id ?? null;
  const [photos, setPhotos] = useState<GuestPhoto[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!projectId) {
      setPhotos([]);
      return;
    }

    setLoading(true);
    try {
      const next = await getGuestPhotosByProjectService(projectId);
      setPhotos(next);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const deletePhoto = useCallback(async (id: string) => {
    await deleteGuestPhotoService(id);
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  }, []);

  return (
    <GuestPhotosContext.Provider
      value={{
        photos,
        loading,
        refresh,
        deletePhoto,
        projectId,
      }}
    >
      {children}
    </GuestPhotosContext.Provider>
  );
};

export function useGuestPhotos() {
  const context = useContext(GuestPhotosContext);
  if (!context) {
    throw new Error("useGuestPhotos must be used inside GuestPhotosProvider");
  }
  return context;
}

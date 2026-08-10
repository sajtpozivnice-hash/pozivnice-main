"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

import { useDashboard } from "./DashboardContext";
import { CreateGuestDto, Guest } from "../types";
import {
  createGuestService,
  deleteGuestService,
  getGuestsByProjectService,
  updateGuestService,
} from "../services/guests.service";

type GuestsContextType = {
  guests: Guest[];
  loading: boolean;
  refresh: () => Promise<void>;
  createGuest: (guest: CreateGuestDto) => Promise<void>;
  updateGuest: (id: string, updates: Partial<CreateGuestDto>) => Promise<void>;
  deleteGuest: (id: string) => Promise<void>;
};

const GuestsContext = createContext<GuestsContextType | undefined>(undefined);

export const GuestsProvider = ({ children }: { children: ReactNode }) => {
  const { activeProject } = useDashboard();

  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!activeProject?.id) {
      setGuests([]);
      return;
    }

    setLoading(true);

    try {
      const data = await getGuestsByProjectService(activeProject.id);
      setGuests(data);
    } catch (error) {
      console.error(error);
      setGuests([]);
    } finally {
      setLoading(false);
    }
  }, [activeProject?.id]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const createGuest = async (guest: CreateGuestDto) => {
    if (!activeProject?.id) return;

    setLoading(true);
    try {
      const created = await createGuestService(activeProject.id, guest);
      setGuests((prev) => [created, ...prev]);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateGuest = async (
    id: string,
    updates: Partial<CreateGuestDto>,
  ) => {
    setLoading(true);
    try {
      const updated = await updateGuestService(id, updates);
      setGuests((prev) =>
        prev.map((guest) => (guest.id === id ? updated : guest)),
      );
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteGuest = async (id: string) => {
    setLoading(true);
    try {
      await deleteGuestService(id);
      setGuests((prev) => prev.filter((guest) => guest.id !== id));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuestsContext.Provider
      value={{
        guests,
        loading,
        refresh,
        createGuest,
        updateGuest,
        deleteGuest,
      }}
    >
      {children}
    </GuestsContext.Provider>
  );
};

export function useGuests() {
  const context = useContext(GuestsContext);

  if (!context) {
    throw new Error("useGuests must be used inside GuestsProvider");
  }

  return context;
}

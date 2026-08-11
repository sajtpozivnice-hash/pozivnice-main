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
import { CreateGuestDto, Guest, ResolvePartyPersonInput } from "../types";
import {
  createGuestService,
  deleteGuestService,
  getGuestsByProjectService,
  resolvePartyNamesService,
  updateGuestService,
} from "../services/guests.service";

type GuestsContextType = {
  guests: Guest[];
  loading: boolean;
  refresh: () => Promise<void>;
  createGuest: (guest: CreateGuestDto) => Promise<void>;
  updateGuest: (id: string, updates: Partial<CreateGuestDto>) => Promise<void>;
  deleteGuest: (id: string) => Promise<void>;
  resolvePartyNames: (
    contactId: string,
    people: ResolvePartyPersonInput[],
  ) => Promise<void>;
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
      await createGuestService(activeProject.id, {
        party_size: 1,
        is_child: false,
        name_pending: false,
        parent_guest_id: null,
        ...guest,
      });
      await refresh();
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
      await updateGuestService(id, updates, {
        projectId: activeProject?.id,
      });
      await refresh();
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
      await deleteGuestService(id, { projectId: activeProject?.id });
      await refresh();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resolvePartyNames = async (
    contactId: string,
    people: ResolvePartyPersonInput[],
  ) => {
    if (!activeProject?.id) return;

    setLoading(true);
    try {
      await resolvePartyNamesService(activeProject.id, contactId, people);
      await refresh();
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
        resolvePartyNames,
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

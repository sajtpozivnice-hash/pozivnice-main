import { UniversalProjectConfig } from "@/types/config";
export type RSVPStatus = "pending" | "accepted" | "declined" | "";

export type Guest = {
  id: string;
  project_id: string;
  name: string;
  email?: string | null;
  rsvp_status: RSVPStatus;
  message?: string | null;
  notes?: string | null;
  table_id?: string | null;
  created_at: string;
  updated_at: string;
  tables?: {
    id: string;
    name: string;
  } | null;
};

export type CreateGuestDto = {
  name: string;
  email?: string | null;
  rsvp_status?: RSVPStatus;
  message?: string | null;
  notes?: string | null;
  table_id?: string | null;
};

export type Table = {
  id: string;
  name: string;
  project_id: string;
  number_of_guests: number;
};

export type CreateTableDto = {
  name: string;
  number_of_guests: number;
};

export type User = {
  id: string;
  email: string | undefined;
};
export type Client = {
  id: string;
  auth_user_id: string;
  name: string;
  email: string;
  phone: string;
};
export type Project = {
  paid: boolean;
  published: boolean;
  client_id: string;
  id: string;
  title: string;
  config_json: UniversalProjectConfig;
  subdomain: string;
  created_at: string;
  updated_at: string | null;
};

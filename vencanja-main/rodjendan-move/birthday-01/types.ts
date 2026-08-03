import { Attendance } from "./components/RSVP";

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface RSVPFormData {
  name: string;
  email: string;
  attending: Attendance;
  guests: number;
  message: string;
}

export enum SectionId {
  HERO = "hero",
  STORY = "story",
  DETAILS = "details",
  RSVP = "rsvp",
  ASSISTANT = "assistant",
}

// Core domain types shared between web and native.
// These mirror the intended Supabase schema; refine as the schema is finalized.

export type EventPlan = "prueba" | "fiesta" | "boda" | "boda_total";

export interface Event {
  id: string;
  slug: string;
  coupleNames: string;
  date: string; // ISO date
  venue: string;
  city: string;
  revealAt: string; // ISO datetime — when the gallery unlocks
  plan: EventPlan;
  maxPhotosPerGuest: number;
  moments: string[]; // e.g. ["ceremonia", "cóctel", "fiesta"]
  createdAt: string;
}

export interface Guest {
  id: string;
  eventId: string;
  name: string;
  whatsapp: string;
  createdAt: string;
}

export interface Photo {
  id: string;
  eventId: string;
  guestId: string;
  url: string;
  moment: string | null;
  approved: boolean; // curated into the public album
  createdAt: string;
}

export interface Vote {
  id: string;
  eventId: string;
  photoId: string;
  guestId: string;
  createdAt: string;
}

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

export type RewardType = "flowers" | "sweets" | "liquor" | "custom" | "none";
export type VotingOpen = "guests" | "anyone";
export type EventStatus = "draft" | "active" | "revealed" | "archived";
export type PaymentStatus = "unpaid" | "paid";

// Mirrors public.events exactly (supabase/migrations/0001_init.sql). Snake_case
// to match the raw row shape returned by `.select("*")` — no client-side mapping.
export interface EventRow {
  id: string;
  host_id: string;
  slug: string;
  partner1: string;
  partner2: string;
  event_date: string | null;
  reveal_at: string | null;
  venue: string | null;
  city: string | null;
  max_photos_per_guest: number;
  unlimited_photos: boolean;
  moments: string[];
  reward_type: RewardType | null;
  reward_label: string | null;
  banner_url: string | null;
  allow_sharing: boolean;
  voting_open: VotingOpen;
  status: EventStatus;
  payment_status: PaymentStatus;
  created_at: string;
  updated_at: string;
}

export interface Guest {
  id: string;
  eventId: string;
  name: string;
  whatsapp: string;
  createdAt: string;
}

// Mirrors public.guests exactly (supabase/migrations/0001_init.sql + 0002_guest_join.sql).
export interface GuestRow {
  id: string;
  event_id: string;
  name: string;
  whatsapp: string;
  submitted_at: string | null;
  created_at: string;
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

// Mirrors public.photos exactly (0001_init.sql + 0003_guest_photo_management.sql).
export interface PhotoRow {
  id: string;
  event_id: string;
  guest_id: string;
  storage_path: string;
  position: number;
  moment: string | null;
  approved: boolean;
  is_contest_entry: boolean;
  created_at: string;
}

export interface Vote {
  id: string;
  eventId: string;
  photoId: string;
  guestId: string;
  createdAt: string;
}

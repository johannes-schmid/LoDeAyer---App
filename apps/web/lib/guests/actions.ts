"use server";

import { cookies } from "next/headers";
import type { GuestRow, PhotoRow } from "@lodeayer/shared";
import { createClient } from "@/lib/supabase/server";

const PERU_DIAL_CODE = "+51";
const GUEST_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days — matches post-event album access window.
const SIGNED_URL_TTL = 60 * 60; // 1 hour — plenty for a single carrete session.

export interface GuestPhoto {
  id: string;
  url: string;
  isFavorite: boolean;
}

export interface GuestPhotoState {
  guestId: string;
  guestName: string;
  submittedAt: string | null;
  revealAt: string | null;
  maxPhotos: number;
  unlimited: boolean;
  photos: GuestPhoto[];
}

async function getGuestId(eventId: string): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(`guest_${eventId}`)?.value ?? null;
}

async function signPhotos(
  supabase: Awaited<ReturnType<typeof createClient>>,
  photos: PhotoRow[],
): Promise<GuestPhoto[]> {
  if (photos.length === 0) return [];

  const { data: signed, error } = await supabase.storage
    .from("event-photos")
    .createSignedUrls(photos.map(p => p.storage_path), SIGNED_URL_TTL);
  if (error || !signed) throw error ?? new Error("No se pudieron cargar las fotos.");

  return photos.map((photo, i) => ({
    id: photo.id,
    url: signed[i].signedUrl ?? "",
    isFavorite: photo.is_contest_entry,
  }));
}

export async function joinGuest(eventId: string, name: string, phone: string): Promise<GuestRow> {
  const supabase = await createClient();
  const whatsapp = `${PERU_DIAL_CODE}${phone.replace(/\D/g, "")}`;

  const { data: guest, error } = await supabase
    .rpc("join_guest", { p_event_id: eventId, p_name: name, p_whatsapp: whatsapp })
    .single<GuestRow>();

  if (error || !guest) throw error ?? new Error("No se pudo registrar el invitado.");

  const cookieStore = await cookies();
  cookieStore.set(`guest_${eventId}`, guest.id, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: GUEST_COOKIE_MAX_AGE,
    path: "/",
  });

  return guest;
}

export async function getGuestPhotoState(eventId: string): Promise<GuestPhotoState | null> {
  const guestId = await getGuestId(eventId);
  if (!guestId) return null;

  const supabase = await createClient();

  const { data: status, error: statusError } = await supabase
    .rpc("get_guest_upload_status", { p_guest_id: guestId })
    .single<{ name: string; submitted_at: string | null; reveal_at: string | null; max_photos_per_guest: number; unlimited_photos: boolean }>();
  if (statusError || !status) throw statusError ?? new Error("No se pudo cargar tu carrete.");

  const { data: photoRows, error: photosError } = await supabase.rpc("list_guest_photos", { p_guest_id: guestId });
  if (photosError) throw photosError;

  return {
    guestId,
    guestName: status.name,
    submittedAt: status.submitted_at,
    revealAt: status.reveal_at,
    maxPhotos: status.max_photos_per_guest,
    unlimited: status.unlimited_photos,
    photos: await signPhotos(supabase, (photoRows ?? []) as PhotoRow[]),
  };
}

export async function uploadGuestPhoto(eventId: string, formData: FormData): Promise<GuestPhoto> {
  const guestId = await getGuestId(eventId);
  if (!guestId) throw new Error("No estas registrado en este evento.");

  const file = formData.get("file");
  if (!(file instanceof File)) throw new Error("Archivo invalido.");

  const supabase = await createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const storagePath = `${eventId}/${guestId}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("event-photos")
    .upload(storagePath, file, { contentType: file.type });
  if (uploadError) throw uploadError;

  const { data: photo, error: rpcError } = await supabase
    .rpc("add_guest_photo", { p_guest_id: guestId, p_storage_path: storagePath })
    .single<PhotoRow>();
  if (rpcError || !photo) throw rpcError ?? new Error("No se pudo guardar la foto.");

  const [signed] = await signPhotos(supabase, [photo]);
  return signed;
}

export async function deleteGuestPhoto(eventId: string, photoId: string): Promise<void> {
  const guestId = await getGuestId(eventId);
  if (!guestId) throw new Error("No estas registrado en este evento.");

  const supabase = await createClient();
  const { error } = await supabase.rpc("delete_guest_photo", { p_photo_id: photoId, p_guest_id: guestId });
  if (error) throw error;
}

export async function reorderGuestPhotos(eventId: string, orderedIds: string[]): Promise<void> {
  const guestId = await getGuestId(eventId);
  if (!guestId) throw new Error("No estas registrado en este evento.");

  const supabase = await createClient();
  const { error } = await supabase.rpc("reorder_guest_photos", { p_guest_id: guestId, p_photo_ids: orderedIds });
  if (error) throw error;
}

export async function setFavoritePhoto(eventId: string, photoId: string): Promise<void> {
  const guestId = await getGuestId(eventId);
  if (!guestId) throw new Error("No estas registrado en este evento.");

  const supabase = await createClient();
  const { error } = await supabase.rpc("set_favorite_photo", { p_photo_id: photoId, p_guest_id: guestId });
  if (error) throw error;
}

export async function submitGuestPhotos(eventId: string): Promise<void> {
  const guestId = await getGuestId(eventId);
  if (!guestId) throw new Error("No estas registrado en este evento.");

  const supabase = await createClient();
  const { error } = await supabase.rpc("submit_guest_photos", { p_guest_id: guestId });
  if (error) throw error;
}

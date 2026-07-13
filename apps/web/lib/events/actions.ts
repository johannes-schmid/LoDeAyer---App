"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify, randomSuffix } from "@/lib/slug";
import type { EventInfo } from "@/components/organizer/CreateStep1";
import type { EventSettings } from "@/components/organizer/CreateStep2";

// Peru has no DST; a fixed -05:00 offset is correct for the launch market.
const PERU_UTC_OFFSET = "-05:00";

export async function createEvent(
  info: EventInfo,
  settings: EventSettings,
  bannerUrl: string | null,
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/organizer");

  const baseSlug = slugify(`${info.partner1}-${info.partner2}`);
  let slug = "";
  let insertedId: string | null = null;

  for (let attempt = 0; attempt < 5; attempt++) {
    slug = `${baseSlug}-${randomSuffix()}`;

    const revealAt = info.date && info.revealTime
      ? `${info.date}T${info.revealTime}:00${PERU_UTC_OFFSET}`
      : null;

    const { data, error } = await supabase
      .from("events")
      .insert({
        host_id: user.id,
        slug,
        partner1: info.partner1,
        partner2: info.partner2,
        event_date: info.date || null,
        reveal_at: revealAt,
        venue: info.venue || null,
        city: info.city || null,
        max_photos_per_guest: settings.maxPhotos,
        unlimited_photos: settings.unlimitedPhotos,
        reward_type: settings.rewardType,
        reward_label: settings.rewardLabel,
        banner_url: bannerUrl,
        allow_sharing: settings.allowSharing,
        voting_open: settings.votingOpen,
      })
      .select("id")
      .single();

    if (!error && data) {
      insertedId = data.id;
      break;
    }

    // Unique violation on slug — retry with a new suffix.
    if (error?.code !== "23505") {
      throw error;
    }
  }

  if (!insertedId) {
    throw new Error("Could not create event: slug collisions exhausted retries.");
  }

  redirect(`/organizer/evento/${insertedId}`);
}

export async function updateEventBanner(eventId: string, bannerUrl: string | null) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/organizer");

  const { error } = await supabase
    .from("events")
    .update({ banner_url: bannerUrl })
    .eq("id", eventId)
    .eq("host_id", user.id);

  if (error) throw error;

  redirect(`/organizer/evento/${eventId}`);
}

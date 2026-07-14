"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CreateStepBanner from "@/components/organizer/CreateStepBanner";
import CreatingEventOverlay from "@/components/organizer/CreatingEventOverlay";
import type { EventInfo } from "@/components/organizer/CreateStep1";
import { createClient } from "@/lib/supabase/client";
import { updateEventBanner } from "@/lib/events/actions";

interface EditBannerClientProps {
  eventId: string;
  info: EventInfo;
  currentBannerUrl: string | null;
}

export default function EditBannerClient({ eventId, info, currentBannerUrl }: EditBannerClientProps) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [removed, setRemoved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      let bannerUrl: string | null = removed ? null : currentBannerUrl;
      if (file) {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const ext = file.name.split(".").pop() || "jpg";
          const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
          const { error: uploadError } = await supabase.storage
            .from("event-banners")
            .upload(path, file, { contentType: file.type });
          if (!uploadError) {
            bannerUrl = supabase.storage.from("event-banners").getPublicUrl(path).data.publicUrl;
          }
        }
      }
      await updateEventBanner(eventId, bannerUrl);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <CreateStepBanner
        file={file}
        existingBannerUrl={removed ? null : currentBannerUrl}
        onChange={f => {
          setFile(f);
          setRemoved(!f);
        }}
        onNext={saving ? () => {} : handleSave}
        onBack={() => router.push(`/organizer/evento/${eventId}`)}
        info={info}
        editMode
      />
      <CreatingEventOverlay show={saving} message="Guardando foto" />
    </>
  );
}

"use client";
import { useState } from "react";
import CreateStep1, { type EventInfo } from "@/components/organizer/CreateStep1";
import CreateStepBanner from "@/components/organizer/CreateStepBanner";
import CreateStep2, { type EventSettings } from "@/components/organizer/CreateStep2";
import CreateStep3 from "@/components/organizer/CreateStep3";
import CreatingEventOverlay from "@/components/organizer/CreatingEventOverlay";
import { createEvent } from "@/lib/events/actions";
import { createClient } from "@/lib/supabase/client";

type Step = "info" | "banner" | "settings" | "confirm";

const DEFAULT_INFO: EventInfo = { partner1: "", partner2: "", date: "", revealTime: "09:00", venue: "", city: "" };
const DEFAULT_SETTINGS: EventSettings = {
  maxPhotos: 20,
  unlimitedPhotos: false,
  rewardType: "flowers",
  rewardLabel: "Flores",
  votingOpen: "guests",
  allowSharing: true,
};

export default function NuevoEventoPage() {
  const [step, setStep] = useState<Step>("info");
  const [info, setInfo] = useState<EventInfo>(DEFAULT_INFO);
  const [banner, setBanner] = useState<File | null>(null);
  const [settings, setSettings] = useState<EventSettings>(DEFAULT_SETTINGS);
  const [submitting, setSubmitting] = useState(false);

  async function handleConfirm() {
    setSubmitting(true);
    try {
      let bannerUrl: string | null = null;
      if (banner) {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const ext = banner.name.split(".").pop() || "jpg";
          const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
          const { error: uploadError } = await supabase.storage
            .from("event-banners")
            .upload(path, banner, { contentType: banner.type });
          if (!uploadError) {
            bannerUrl = supabase.storage.from("event-banners").getPublicUrl(path).data.publicUrl;
          }
        }
      }
      await createEvent(info, settings, bannerUrl);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0b0c] flex items-start justify-center">
      <div className="relative w-full max-w-[430px] min-h-screen bg-[#0b0b0c] overflow-hidden" style={{ touchAction: "manipulation" }}>
        {step === "info" && (
          <CreateStep1 data={info} onChange={setInfo} onNext={() => setStep("banner")} onBack={() => window.history.back()} />
        )}
        {step === "banner" && (
          <CreateStepBanner file={banner} onChange={setBanner} onNext={() => setStep("settings")} onBack={() => setStep("info")} info={info} />
        )}
        {step === "settings" && (
          <CreateStep2 data={settings} onChange={setSettings} onNext={() => setStep("confirm")} onBack={() => setStep("banner")} />
        )}
        {step === "confirm" && (
          <CreateStep3
            info={info}
            settings={settings}
            onConfirm={submitting ? () => {} : handleConfirm}
            onBack={() => setStep("settings")}
          />
        )}
      </div>
      <CreatingEventOverlay show={submitting} />
    </div>
  );
}

"use client";
import { useState } from "react";
import OrgLanding from "@/components/organizer/OrgLanding";
import CreateStep1, { type EventInfo } from "@/components/organizer/CreateStep1";
import CreateStep2, { type EventSettings } from "@/components/organizer/CreateStep2";
import CreateStep3 from "@/components/organizer/CreateStep3";
import OrgDashboard from "@/components/organizer/OrgDashboard";
import CurationScreen from "@/components/organizer/CurationScreen";
import GalleryVoteScreen from "@/components/organizer/GalleryVoteScreen";
import PrizeScreen from "@/components/organizer/PrizeScreen";

type Screen = "landing" | "step1" | "step2" | "step3" | "dashboard" | "curation" | "gallery" | "prize";

const ALL_SCREENS: Screen[] = ["landing", "step1", "step2", "step3", "dashboard", "curation", "gallery", "prize"];

const DEFAULT_INFO: EventInfo = { partner1: "", partner2: "", date: "2025-11-14", revealTime: "09:00", venue: "", city: "" };
const DEFAULT_SETTINGS: EventSettings = { maxPhotos: 20, moments: ["ceremonia", "cocktail", "cena", "baile"], prize: "Botella de champagne Moët", votingOpen: "guests", allowSharing: true };

export default function OrganizerPage() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [info, setInfo] = useState<EventInfo>(DEFAULT_INFO);
  const [settings, setSettings] = useState<EventSettings>(DEFAULT_SETTINGS);

  const eventName = info.partner1 && info.partner2
    ? `Boda de ${info.partner1} & ${info.partner2}`
    : "Boda de Ana & Carlos";

  return (
    <div className="min-h-screen bg-[#0b0b0c] flex items-start justify-center">
      <div className="relative w-full max-w-[430px] min-h-screen bg-[#0b0b0c] overflow-hidden" style={{ touchAction: "manipulation" }}>
        {ALL_SCREENS.map(s => (
          <div
            key={s}
            className={`absolute inset-0 transition-all duration-300 ${
              screen === s
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            {s === "landing" && (
              <OrgLanding onCreate={() => setScreen("step1")} onDemo={() => setScreen("dashboard")} />
            )}
            {s === "step1" && (
              <CreateStep1 data={info} onChange={setInfo} onNext={() => setScreen("step2")} onBack={() => setScreen("landing")} />
            )}
            {s === "step2" && (
              <CreateStep2 data={settings} onChange={setSettings} onNext={() => setScreen("step3")} onBack={() => setScreen("step1")} />
            )}
            {s === "step3" && (
              <CreateStep3 info={info} settings={settings} onConfirm={() => setScreen("dashboard")} onBack={() => setScreen("step2")} />
            )}
            {s === "dashboard" && (
              <OrgDashboard eventName={eventName} onCurate={() => setScreen("curation")} />
            )}
            {s === "curation" && (
              <CurationScreen onPublish={() => setScreen("gallery")} onBack={() => setScreen("dashboard")} />
            )}
            {s === "gallery" && (
              <GalleryVoteScreen onSeePrize={() => setScreen("prize")} onBack={() => setScreen("dashboard")} />
            )}
            {s === "prize" && (
              <PrizeScreen prize={settings.prize} onBack={() => setScreen("gallery")} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

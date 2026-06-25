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

import WelcomeScreen from "@/components/guest/WelcomeScreen";
import NameScreen from "@/components/guest/NameScreen";
import CarreteScreen from "@/components/guest/CarreteScreen";
import ScanScreen from "@/components/guest/ScanScreen";
import SuccessScreen from "@/components/guest/SuccessScreen";
import VoteScreen from "@/components/guest/VoteScreen";
import RevealScreen from "@/components/guest/RevealScreen";

type OrgScreen = "landing" | "step1" | "step2" | "step3" | "dashboard" | "curation" | "gallery" | "prize";
type GuestScreen = "locked" | "welcome" | "name" | "carrete" | "scan" | "success" | "vote" | "reveal";

const DEFAULT_INFO: EventInfo = { partner1: "", partner2: "", date: "", revealTime: "09:00", venue: "", city: "" };
const DEFAULT_SETTINGS: EventSettings = { maxPhotos: 20, unlimitedPhotos: false, moments: ["ceremonia", "cocktail", "baile"], prize: "Botella de champagne", votingOpen: "guests", allowSharing: true };

function PhoneFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 shrink-0">
      <p className="text-[#f4efe7]/40 text-[11px] uppercase tracking-widest">{label}</p>
      <div
        className="relative bg-[#0b0b0c] overflow-hidden text-[#f4efe7]"
        style={{
          width: 390,
          height: 820,
          borderRadius: 50,
          border: "2px solid rgba(255,255,255,0.12)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#0b0b0c] rounded-b-2xl z-50" />
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden" style={{ borderRadius: 48 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function DemoPage() {
  const [orgScreen, setOrgScreen] = useState<OrgScreen>("landing");
  const [guestScreen, setGuestScreen] = useState<GuestScreen>("locked");
  const [eventInfo, setEventInfo] = useState<EventInfo>(DEFAULT_INFO);
  const [eventSettings, setEventSettings] = useState<EventSettings>(DEFAULT_SETTINGS);
  const [eventCreated, setEventCreated] = useState(false);

  const [guestName, setGuestName] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [pendingPhoto, setPendingPhoto] = useState("");

  const eventName = eventInfo.partner1 && eventInfo.partner2
    ? `Boda de ${eventInfo.partner1} & ${eventInfo.partner2}`
    : "Tu evento";

  const handleEventCreated = () => {
    setEventCreated(true);
    setGuestScreen("welcome");
    setOrgScreen("dashboard");
  };

  const handlePhotoSelected = (dataUrl: string) => {
    setPendingPhoto(dataUrl);
    setGuestScreen("scan");
  };

  const handleScanApproved = () => {
    setUploadedPhotos(prev => [pendingPhoto, ...prev]);
    setGuestScreen("success");
  };

  return (
    <div className="min-h-screen bg-[#070708] flex flex-col items-center py-12 px-6">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="font-serif italic text-[#d9b98a] text-3xl mb-2">LoDeAyer</p>
        <p className="text-[#f4efe7]/30 text-sm">Demo interactiva · Usa ambos teléfonos para ver la experiencia completa</p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-3 mb-10">
        {[
          { label: "Organizar crea evento", done: eventCreated },
          { label: "Invitado sube fotos", done: guestScreen !== "locked" && guestScreen !== "welcome" && guestScreen !== "name" },
          { label: "Selección y álbum", done: orgScreen === "curation" || orgScreen === "gallery" || orgScreen === "prize" },
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            {i > 0 && <div className={`w-8 h-px ${step.done ? "bg-[#d9b98a]/50" : "bg-white/10"}`} />}
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${step.done ? "bg-[#d9b98a] text-[#0b0b0c]" : "bg-white/[0.07] border border-white/[0.12] text-[#f4efe7]/30"}`}>
                {step.done ? "✓" : i + 1}
              </div>
              <span className={`text-xs ${step.done ? "text-[#f4efe7]/60" : "text-[#f4efe7]/25"}`}>{step.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Phones */}
      <div className="flex gap-10 items-start">

        {/* — ORGANIZER PHONE — */}
        <PhoneFrame label="Organizador">
          {orgScreen === "landing" && (
            <OrgLanding onCreate={() => setOrgScreen("step1")} onDemo={() => setOrgScreen("step1")} />
          )}
          {orgScreen === "step1" && (
            <CreateStep1 data={eventInfo} onChange={setEventInfo} onNext={() => setOrgScreen("step2")} onBack={() => setOrgScreen("landing")} />
          )}
          {orgScreen === "step2" && (
            <CreateStep2 data={eventSettings} onChange={setEventSettings} onNext={() => setOrgScreen("step3")} onBack={() => setOrgScreen("step1")} />
          )}
          {orgScreen === "step3" && (
            <CreateStep3 info={eventInfo} settings={eventSettings} onConfirm={handleEventCreated} onBack={() => setOrgScreen("step2")} />
          )}
          {orgScreen === "dashboard" && (
            <OrgDashboard eventName={eventName} onCurate={() => setOrgScreen("curation")} />
          )}
          {orgScreen === "curation" && (
            <CurationScreen onPublish={() => setOrgScreen("gallery")} onBack={() => setOrgScreen("dashboard")} />
          )}
          {orgScreen === "gallery" && (
            <GalleryVoteScreen onSeePrize={() => setOrgScreen("prize")} onBack={() => setOrgScreen("dashboard")} />
          )}
          {orgScreen === "prize" && (
            <PrizeScreen prize={eventSettings.prize} onBack={() => setOrgScreen("gallery")} />
          )}
        </PhoneFrame>

        {/* — GUEST PHONE — */}
        <PhoneFrame label="Invitado">
          {guestScreen === "locked" && (
            <div className="flex flex-col h-full items-center justify-center px-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-6">
                <div className="w-6 h-8 rounded-sm border-2 border-white/20 relative"><div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white/20" /></div>
              </div>
              <h3 className="font-serif italic text-xl mb-3 text-[#f4efe7]/70">Esperando al organizador</h3>
              <p className="text-[#f4efe7]/30 text-sm leading-relaxed">
                El organizador está configurando el evento en el teléfono de la izquierda.
                <br /><br />
                Una vez que lo cree, los invitados podrán acceder.
              </p>
              <div className="mt-8 flex items-center gap-2 text-[#f4efe7]/20 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f4efe7]/20 animate-pulse" />
                Esperando evento…
              </div>
            </div>
          )}
          {guestScreen === "welcome" && (
            <WelcomeScreen onNext={() => setGuestScreen("name")} />
          )}
          {guestScreen === "name" && (
            <NameScreen onNext={(name) => { setGuestName(name); setGuestScreen("carrete"); }} onBack={() => setGuestScreen("welcome")} />
          )}
          {guestScreen === "carrete" && (
            <CarreteScreen name={guestName} uploadedPhotos={uploadedPhotos} onPhotoUpload={handlePhotoSelected} onVote={() => setGuestScreen("vote")} />
          )}
          {guestScreen === "scan" && (
            <ScanScreen photoSrc={pendingPhoto} onApproved={handleScanApproved} />
          )}
          {guestScreen === "success" && (
            <SuccessScreen name={guestName} uploadedPhotos={uploadedPhotos.length} onContinue={() => setGuestScreen("carrete")} onVote={() => setGuestScreen("vote")} />
          )}
          {guestScreen === "vote" && (
            <VoteScreen onSeeReveal={() => setGuestScreen("reveal")} onBack={() => setGuestScreen("carrete")} />
          )}
          {guestScreen === "reveal" && (
            <RevealScreen onBack={() => setGuestScreen("vote")} />
          )}
        </PhoneFrame>

      </div>

      {/* Hint when event is created */}
      {eventCreated && orgScreen === "dashboard" && (
        <div className="mt-8 bg-[#d9b98a]/[0.07] border border-[#d9b98a]/20 rounded-2xl px-5 py-3 text-center max-w-lg">
          <p className="text-[#d9b98a] text-sm font-semibold mb-1">Evento creado — invitado desbloqueado</p>
          <p className="text-[#f4efe7]/40 text-xs">Cuando el invitado haya subido fotos, vuelve al panel izquierdo → Curar fotos para el álbum</p>
        </div>
      )}
    </div>
  );
}

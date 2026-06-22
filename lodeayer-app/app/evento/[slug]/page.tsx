"use client";
import { useState } from "react";
import WelcomeScreen from "@/components/guest/WelcomeScreen";
import NameScreen from "@/components/guest/NameScreen";
import CarreteScreen from "@/components/guest/CarreteScreen";
import ScanScreen from "@/components/guest/ScanScreen";
import SuccessScreen from "@/components/guest/SuccessScreen";
import VoteScreen from "@/components/guest/VoteScreen";
import RevealScreen from "@/components/guest/RevealScreen";

type Screen = "welcome" | "name" | "carrete" | "scan" | "success" | "vote" | "reveal";

const ALL_SCREENS: Screen[] = ["welcome", "name", "carrete", "scan", "success", "vote", "reveal"];

export default function EventoPage() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [guestName, setGuestName] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [pendingPhoto, setPendingPhoto] = useState("");

  const handlePhotoSelected = (dataUrl: string) => {
    setPendingPhoto(dataUrl);
    setScreen("scan");
  };

  const handleScanApproved = () => {
    setUploadedPhotos(prev => [pendingPhoto, ...prev]);
    setScreen("success");
  };

  return (
    <div className="min-h-screen bg-[#0b0b0c] flex items-start justify-center">
      <div
        className="relative w-full max-w-[430px] min-h-screen bg-[#0b0b0c] overflow-hidden"
        style={{ touchAction: "manipulation" }}
      >
        {ALL_SCREENS.map(s => (
          <div
            key={s}
            className={`absolute inset-0 transition-all duration-300 ${
              screen === s
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            {s === "welcome" && <WelcomeScreen onNext={() => setScreen("name")} />}
            {s === "name" && (
              <NameScreen
                onNext={(name) => { setGuestName(name); setScreen("carrete"); }}
                onBack={() => setScreen("welcome")}
              />
            )}
            {s === "carrete" && (
              <CarreteScreen
                name={guestName}
                uploadedPhotos={uploadedPhotos}
                onPhotoUpload={handlePhotoSelected}
              />
            )}
            {s === "scan" && (
              <ScanScreen photoSrc={pendingPhoto} onApproved={handleScanApproved} />
            )}
            {s === "success" && (
              <SuccessScreen
                name={guestName}
                uploadedPhotos={uploadedPhotos.length}
                onContinue={() => setScreen("carrete")}
                onVote={() => setScreen("vote")}
              />
            )}
            {s === "vote" && (
              <VoteScreen
                onSeeReveal={() => setScreen("reveal")}
                onBack={() => setScreen("carrete")}
              />
            )}
            {s === "reveal" && (
              <RevealScreen onBack={() => setScreen("vote")} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

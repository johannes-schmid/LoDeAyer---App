"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import OrgLanding from "@/components/organizer/OrgLanding";
import CreateProfileScreen from "@/components/organizer/CreateProfileScreen";

export default function OrgAuthFlow() {
  const [step, setStep] = useState<"landing" | "profile">("landing");

  return (
    <div className="min-h-screen bg-[#0b0b0c] flex items-start justify-center">
      <div className="relative w-full max-w-[430px] min-h-screen bg-[#0b0b0c] overflow-hidden">
        {step === "landing" ? (
          <OrgLanding
            createCta={
              <button
                onClick={() => setStep("profile")}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-champagne-gradient text-sm font-medium tracking-wide text-[#0b0b0c] transition hover:brightness-105"
              >
                Crear mi evento <ArrowRight className="h-4 w-4" />
              </button>
            }
          />
        ) : (
          <CreateProfileScreen next="/organizer/nuevo" onBack={() => setStep("landing")} />
        )}
      </div>
    </div>
  );
}

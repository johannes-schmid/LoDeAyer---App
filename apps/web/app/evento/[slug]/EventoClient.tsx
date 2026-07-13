"use client";
import { useEffect, useRef, useState } from "react";
import WelcomeScreen from "@/components/guest/WelcomeScreen";
import NameScreen from "@/components/guest/NameScreen";
import CarreteScreen from "@/components/guest/CarreteScreen";
import VoteScreen from "@/components/guest/VoteScreen";
import RevealScreen from "@/components/guest/RevealScreen";
import {
  joinGuest,
  uploadGuestPhoto,
  deleteGuestPhoto,
  reorderGuestPhotos,
  setFavoritePhoto,
  submitGuestPhotos,
  type GuestPhoto,
  type GuestPhotoState,
} from "@/lib/guests/actions";

type Screen = "welcome" | "name" | "carrete" | "vote" | "reveal";

const ALL_SCREENS: Screen[] = ["welcome", "name", "carrete", "vote", "reveal"];

interface EventoClientProps {
  eventId: string;
  bannerUrl?: string | null;
  partner1: string;
  partner2: string;
  city: string | null;
  date?: string;
  maxPhotosPerGuest: number;
  revealAt: string | null;
  initialGuestState: GuestPhotoState | null;
}

export default function EventoClient({
  eventId,
  bannerUrl,
  partner1,
  partner2,
  city,
  date,
  maxPhotosPerGuest,
  revealAt,
  initialGuestState,
}: EventoClientProps) {
  const [screen, setScreen] = useState<Screen>(initialGuestState ? "carrete" : "welcome");
  const [guestName, setGuestName] = useState(initialGuestState?.guestName ?? "");
  const [guestId, setGuestId] = useState<string | null>(initialGuestState?.guestId ?? null);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<GuestPhoto[]>(initialGuestState?.photos ?? []);
  const [submittedAt, setSubmittedAt] = useState<string | null>(initialGuestState?.submittedAt ?? null);
  const autoSubmitTriggered = useRef(false);

  useEffect(() => {
    if (autoSubmitTriggered.current) return;
    if (!guestId || submittedAt || !revealAt) return;
    if (Date.now() < new Date(revealAt).getTime()) return;

    autoSubmitTriggered.current = true;
    submitGuestPhotos(eventId)
      .then(() => setSubmittedAt(new Date().toISOString()))
      .catch(() => {});
  }, [guestId, submittedAt, revealAt, eventId]);

  const handleNameSubmit = async (name: string, phone: string) => {
    setGuestName(name);
    setJoinError(null);

    try {
      const guest = await joinGuest(eventId, name, phone);
      setGuestId(guest.id);
      setScreen("carrete");
    } catch {
      setJoinError("No pudimos registrarte. Intenta de nuevo.");
    }
  };

  const handlePhotoSelected = async (file: File) => {
    const tempId = `pending-${crypto.randomUUID()}`;
    const previewUrl = URL.createObjectURL(file);
    setUploadedPhotos(prev => [...prev, { id: tempId, url: previewUrl, isFavorite: false }]);

    try {
      const formData = new FormData();
      formData.set("file", file);
      const uploaded = await uploadGuestPhoto(eventId, formData);
      setUploadedPhotos(prev => prev.map(p => (p.id === tempId ? uploaded : p)));
    } catch {
      setUploadedPhotos(prev => prev.filter(p => p.id !== tempId));
    } finally {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    setUploadedPhotos(prev => prev.filter(p => p.id !== photoId));
    try {
      await deleteGuestPhoto(eventId, photoId);
    } catch {
      // best-effort; a refresh will re-sync from the server
    }
  };

  const handleReorderPhotos = async (orderedIds: string[]) => {
    setUploadedPhotos(prev =>
      orderedIds.map(id => prev.find(p => p.id === id)).filter((p): p is GuestPhoto => !!p),
    );
    try {
      await reorderGuestPhotos(eventId, orderedIds);
    } catch {
      // best-effort; a refresh will re-sync from the server
    }
  };

  const handleSetFavorite = async (photoId: string) => {
    setUploadedPhotos(prev => prev.map(p => ({ ...p, isFavorite: p.id === photoId })));
    try {
      await setFavoritePhoto(eventId, photoId);
    } catch {
      // best-effort; a refresh will re-sync from the server
    }
  };

  const handleSubmit = async () => {
    try {
      await submitGuestPhotos(eventId);
      setSubmittedAt(new Date().toISOString());
    } catch {
      // best-effort; leave unsubmitted so the guest can retry
    }
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
            {s === "welcome" && (
              <WelcomeScreen
                onNext={() => setScreen("name")}
                bannerUrl={bannerUrl}
                partner1={partner1}
                partner2={partner2}
                city={city ?? undefined}
                date={date}
                maxPhotos={maxPhotosPerGuest}
              />
            )}
            {s === "name" && (
              <NameScreen
                onNext={handleNameSubmit}
                onBack={() => setScreen("welcome")}
                error={joinError}
              />
            )}
            {s === "carrete" && (
              <CarreteScreen
                name={guestName}
                partner1={partner1}
                partner2={partner2}
                city={city}
                date={date}
                maxPhotos={maxPhotosPerGuest}
                uploadedPhotos={uploadedPhotos}
                submittedAt={submittedAt}
                onPhotoUpload={handlePhotoSelected}
                onDeletePhoto={handleDeletePhoto}
                onReorderPhotos={handleReorderPhotos}
                onSetFavorite={handleSetFavorite}
                onSubmit={handleSubmit}
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

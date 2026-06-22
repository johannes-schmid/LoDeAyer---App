"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ChevronLeft } from "lucide-react";

interface NameScreenProps {
  onNext: (name: string, phone: string) => void;
  onBack: () => void;
}

export default function NameScreen({ onNext, onBack }: NameScreenProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => { nameRef.current?.focus(); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) onNext(name.trim(), phone.trim());
  };

  return (
    <div className="flex flex-col h-full px-6 py-10">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-[#f4efe7]/30 text-sm hover:text-[#f4efe7]/60 transition-colors mb-auto self-start"
      >
        <ChevronLeft className="w-4 h-4" /> Volver
      </button>

      <div className="flex flex-col items-center justify-center flex-1">
        <div className="w-14 h-14 rounded-2xl bg-[#d9b98a]/10 border border-[#d9b98a]/15 flex items-center justify-center mb-7">
          <span className="text-2xl">👋</span>
        </div>
        <h2 className="font-serif font-light text-3xl text-[#f4efe7] text-center mb-2 tracking-tight">
          ¿Cómo te llamas?
        </h2>
        <p className="text-[#f4efe7]/35 text-sm text-center mb-8 leading-relaxed">
          Tu nombre y WhatsApp. Así tus fotos quedan<br/>a tu nombre y recibes el revelado mañana.
        </p>
        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-3">
          <Input
            ref={nameRef}
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Tu nombre"
            className="bg-[#111113] border-white/[0.08] text-[#f4efe7] placeholder:text-[#f4efe7]/20 text-base h-14 rounded-2xl focus-visible:ring-[#d9b98a]/30 focus-visible:border-[#d9b98a]/40"
          />
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f4efe7]/40 text-sm select-none flex items-center gap-1.5">
              🇵🇪 <span>+51</span>
            </span>
            <Input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="987 654 321"
              className="bg-[#111113] border-white/[0.08] text-[#f4efe7] placeholder:text-[#f4efe7]/20 text-base h-14 rounded-2xl pl-16 focus-visible:ring-[#d9b98a]/30 focus-visible:border-[#d9b98a]/40"
            />
          </div>
          <p className="text-[#f4efe7]/25 text-xs px-1">Para recibir el revelado de mañana por aquí 🎞️</p>
          <Button
            type="submit"
            disabled={!name.trim() || !phone.trim()}
            className="w-full bg-[#d9b98a] text-[#0b0b0c] font-semibold h-14 rounded-2xl text-base hover:bg-[#c9a070] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Entrar <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

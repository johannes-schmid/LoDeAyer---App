"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ChevronLeft } from "lucide-react";

interface NameScreenProps {
  onNext: (name: string, phone: string) => void;
  onBack: () => void;
  error?: string | null;
}

export default function NameScreen({ onNext, onBack, error }: NameScreenProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => { nameRef.current?.focus(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || submitting) return;
    setSubmitting(true);
    await onNext(name.trim(), phone.trim());
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col h-full px-6 py-10">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-[#8a8a8a] text-sm hover:text-[#f4efe7] transition-colors self-start"
      >
        <ChevronLeft className="w-4 h-4" /> Volver
      </button>

      <div className="flex flex-col items-center justify-center flex-1">
        <div className="w-2 h-2 rounded-full bg-[#d9b98a] mb-8" />

        <h2 className="font-serif italic text-3xl font-light text-[#f4efe7] text-center mb-3 leading-tight">
          Como te llamas?
        </h2>
        <p className="text-[#8a8a8a] text-sm text-center mb-9 leading-relaxed max-w-xs">
          Tu nombre y WhatsApp. Tus fotos quedan a tu nombre y recibes el revelado mañana.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-[#8a8a8a] mb-2">
              Nombre
            </label>
            <Input
              ref={nameRef}
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Tu nombre completo"
              className="h-12 bg-[#1e1e20] border-white/[0.08] rounded-xl text-[#f4efe7] placeholder:text-[#8a8a8a] focus-visible:border-[#d9b98a]/40 focus-visible:ring-[3px] focus-visible:ring-[#d9b98a]/10"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-[#8a8a8a] mb-2">
              WhatsApp
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8a8a] text-sm select-none">
                PE +51
              </span>
              <Input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="987 654 321"
                className="h-12 bg-[#1e1e20] border-white/[0.08] rounded-xl text-[#f4efe7] placeholder:text-[#8a8a8a] pl-16 focus-visible:border-[#d9b98a]/40 focus-visible:ring-[3px] focus-visible:ring-[#d9b98a]/10"
              />
            </div>
            <p className="text-[#8a8a8a] text-[11px] mt-2 px-1">
              Te avisamos mañana con el revelado. Si aun no subiste fotos, te recordamos aqui.
            </p>
          </div>

          {error && (
            <p className="text-red-400 text-[13px] text-center px-1">{error}</p>
          )}

          <Button
            type="submit"
            disabled={!name.trim() || !phone.trim() || submitting}
            className="w-full h-12 rounded-2xl text-sm font-medium tracking-wide bg-[#d9b98a] text-[#0b0b0c] hover:bg-[#d9b98a]/90 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? "Entrando..." : "Entrar"} <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

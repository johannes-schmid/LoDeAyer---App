"use client";
import { useState } from "react";
import { X, ArrowRight, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function Modal({ open, onClose }: ModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) setSubmitted(true);
  };

  const waMsg = encodeURIComponent(`Hola! Me interesa LoDeAyer para mi evento. Mi nombre es ${name} y mi email es ${email}`);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0b0b0c]/75 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-[#111113] border border-white/[0.08] rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-[#f4efe7]/40 hover:text-[#f4efe7] hover:bg-white/[0.10] transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <>
            <p className="font-serif italic text-[#d9b98a] text-base mb-1">LoDeAyer</p>
            <h3 className="text-2xl font-serif font-light text-[#f4efe7] mb-1.5 tracking-tight">Crear mi evento</h3>
            <p className="text-[#f4efe7]/40 text-sm mb-7">Te avisamos cuando esté listo para tu fecha.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] text-[#f4efe7]/40 mb-2 block uppercase tracking-[0.12em]">Tu nombre</label>
                <Input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ana García"
                  required
                  className="bg-[#0b0b0c] border-white/[0.08] text-[#f4efe7] placeholder:text-[#f4efe7]/20 rounded-xl h-12 focus-visible:ring-[#d9b98a]/30 focus-visible:border-[#d9b98a]/40"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#f4efe7]/40 mb-2 block uppercase tracking-[0.12em]">Tu email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="ana@ejemplo.com"
                  required
                  className="bg-[#0b0b0c] border-white/[0.08] text-[#f4efe7] placeholder:text-[#f4efe7]/20 rounded-xl h-12 focus-visible:ring-[#d9b98a]/30 focus-visible:border-[#d9b98a]/40"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#d9b98a] text-[#0b0b0c] font-semibold h-12 rounded-xl text-sm hover:bg-[#c9a070] flex items-center justify-center gap-2"
              >
                Crear mi evento gratis <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-7 h-7 text-green-400" />
            </div>
            <h3 className="text-2xl font-serif font-light text-[#f4efe7] mb-2 tracking-tight">Perfecto, {name}!</h3>
            <p className="text-[#f4efe7]/50 text-sm mb-7 leading-relaxed">
              Te escribimos a <strong className="text-[#f4efe7]">{email}</strong> cuando tu evento esté listo.
            </p>
            <a
              href={`https://wa.me/51999999999?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#20bd5a] font-semibold px-6 h-11 rounded-xl text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> Hablar por WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import Modal from "./Modal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Cierre() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d9b98a]/[0.04] to-transparent" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-serif font-light text-[#f4efe7] mb-6 leading-[1.1] tracking-tight">
            Tu boda merece ser recordada{" "}
            <em className="italic text-[#d9b98a]">por todos.</em>
          </h2>
          <p className="text-[#f4efe7]/50 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            En 2 minutos tienes tu evento listo. Sin tarjeta de crédito para empezar.
          </p>
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-[#d9b98a] text-[#0b0b0c] font-semibold px-10 py-6 rounded-full text-base hover:bg-[#c9a070] inline-flex items-center gap-2"
          >
            Crear mi evento gratis <ArrowRight className="w-4 h-4" />
          </Button>
          <p className="text-[#f4efe7]/25 text-xs mt-6 tracking-wide">Sin app · Sin cuenta para invitados · Soporte en español</p>
        </div>
      </section>
      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-serif italic text-xl text-[#f4efe7]">LoDeAyer</span>
          <p className="text-[#f4efe7]/25 text-xs">© 2026 LoDeAyer · Hecho para Perú, Chile & Colombia</p>
          <div className="flex gap-6 text-xs text-[#f4efe7]/25">
            <a href="#" className="hover:text-[#f4efe7]/50 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-[#f4efe7]/50 transition-colors">Términos</a>
            <a href="#" className="hover:text-[#f4efe7]/50 transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

"use client";
import { useState } from "react";
import Modal from "./Modal";
import { Button } from "@/components/ui/button";

export default function Nav() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b0b0c]/70 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-serif italic text-xl text-[#f4efe7] tracking-wide">LoDeAyer</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#f4efe7]/50">
            <a href="#como-funciona" className="hover:text-[#f4efe7]/90 transition-colors duration-200">Cómo funciona</a>
            <a href="#precios" className="hover:text-[#f4efe7]/90 transition-colors duration-200">Precios</a>
            <a href="#faq" className="hover:text-[#f4efe7]/90 transition-colors duration-200">FAQ</a>
          </div>
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-[#f4efe7] text-[#0b0b0c] hover:bg-white rounded-full font-semibold text-sm px-6 h-9"
          >
            Crear mi evento
          </Button>
        </div>
      </nav>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

"use client";
import { useState } from "react";
import Modal from "./Modal";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative h-screen flex flex-col justify-end overflow-hidden">
        <img
          src="https://images.pexels.com/photos/15964956/pexels-photo-15964956.jpeg?auto=compress&cs=tinysrgb&h=1280&w=1920"
          alt="Boda"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient: dark at bottom, fades upward */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-[#0b0b0c]/60 to-[#0b0b0c]/10" />

        {/* Content — bottom left */}
        <div className="relative z-10 max-w-6xl mx-auto w-full px-8 pb-20">
          {/* Eyebrow */}
          <p className="text-[#f4efe7]/50 text-xs uppercase tracking-[0.22em] mb-5 font-medium">
            Tu boda en manos de todos
          </p>

          {/* Headline */}
          <h1 className="font-serif font-bold text-[#f4efe7] text-6xl md:text-7xl lg:text-8xl leading-[1.0] mb-0 max-w-2xl">
            Tu boda, tu día,
          </h1>
          <h1 className="font-serif italic text-[#d9b98a] text-6xl md:text-7xl lg:text-8xl leading-[1.0] mb-8 max-w-3xl">
            visto con los ojos de todos.
          </h1>

          {/* Subtext */}
          <p className="text-[#f4efe7]/65 text-base md:text-lg max-w-sm mb-10 leading-relaxed">
            LoDeAyer convierte los celulares de tus invitados en una cámara colectiva. Sin app, sin cuenta, sin fricción.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 mb-14">
            <Button
              onClick={() => setModalOpen(true)}
              className="bg-[#f4efe7] text-[#0b0b0c] font-semibold px-7 h-12 rounded-full text-sm hover:bg-white"
            >
              Crear mi evento
            </Button>
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 border border-white/20 text-[#f4efe7] font-medium px-7 h-12 rounded-full text-sm hover:bg-white/8 transition-colors duration-200"
            >
              Ver cómo funciona
            </a>
          </div>

        </div>
      </section>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

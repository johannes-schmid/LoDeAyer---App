import Nav from "@/components/landing/Nav";
import QRWidget from "@/components/landing/QRWidget";
import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import BentoGrid from "@/components/landing/BentoGrid";
import ElProblema from "@/components/landing/ElProblema";
import ComoFunciona from "@/components/landing/ComoFunciona";
import ElRevelado from "@/components/landing/ElRevelado";
import Stats from "@/components/landing/Stats";
import LoQueRecibes from "@/components/landing/LoQueRecibes";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Cierre from "@/components/landing/Cierre";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <BentoGrid />
        <ElProblema />
        <ComoFunciona />
        <ElRevelado />
        <Stats />
        <LoQueRecibes />
        <Pricing />
        <FAQ />
        <Cierre />
      </main>
      <QRWidget />
    </>
  );
}

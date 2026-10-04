"use client";

import Image from "next/image";
import Header from "./Header";
import CelestialWheel from "./CelestialWheel";
import MobileTarotDeck from "./MobileTarotDeck";
import { HouseData } from "../data/houses";

interface HeroProps {
  onSelectHouse: (house: HouseData) => void;
}

export default function Hero({ onSelectHouse }: HeroProps) {
  const scrollToFinder = () => {
    const el = document.getElementById("finder");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full overflow-hidden pt-1 pb-10 sm:pb-16 flex flex-col items-center">
      {/* Background Celestial Atmosphere — Authoritative Figma 'Marble heavens' with planets, orbital rings, and cosmic linework */}
      <div className="absolute inset-0 pointer-events-none z-0 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]">
        <Image
          src="/images/bg/marble-heavens.png"
          alt=""
          fill
          className="object-cover object-top opacity-22"
          priority
        />
      </div>

      {/* Decorative Classical Clouds at top corners */}
      <div className="absolute top-0 left-0 w-52 sm:w-80 md:w-[460px] h-40 sm:h-60 pointer-events-none opacity-30 mix-blend-screen z-0">
        <Image
          src="/images/hero/cloud-left.png"
          alt=""
          fill
          className="object-contain object-top-left"
          priority
        />
      </div>
      <div className="absolute top-0 right-0 w-52 sm:w-80 md:w-[460px] h-40 sm:h-60 pointer-events-none opacity-30 mix-blend-screen z-0">
        <Image
          src="/images/hero/cloud-right.png"
          alt=""
          fill
          className="object-contain object-top-right"
          priority
        />
      </div>

      {/* Header */}
      <Header />

      {/* Main Hero Headings */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 mt-5 sm:mt-8 max-w-4xl mx-auto">
        {/* Title: JHALAK '26 */}
        <h1 className="font-cinzel-dec font-extrabold text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-[0.03em] sm:tracking-[0.06em] text-gold-gradient drop-shadow-[0_4px_16px_rgba(212,175,55,0.45)]">
          JHALAK &apos;26
        </h1>

        {/* Subtitle */}
        <p className="font-cinzel text-[10px] sm:text-sm md:text-lg tracking-[0.16em] sm:tracking-[0.26em] text-amber-200/90 font-semibold mt-2.5 uppercase drop-shadow-sm">
          OLYMPUS ASCENDANT • 8 HOUSES, 1 THRONE
        </p>

        {/* Tagline */}
        <p className="font-inter text-[10px] sm:text-xs text-slate-400 tracking-[0.14em] uppercase mt-1.5">
          Intra-Collegiate Cultural Festival • SRMIST
        </p>
      </div>

      {/* Responsive Visual Centerpiece */}
      {/* Desktop / Tablet View: Celestial Wheel */}
      <div className="relative z-20 w-full hidden md:block mt-2">
        <CelestialWheel onSelectHouse={onSelectHouse} />
      </div>

      {/* Mobile View: Tarot Card Deck Carousel */}
      <div className="relative z-20 w-full block md:hidden">
        <MobileTarotDeck onSelectHouse={onSelectHouse} />
      </div>

      {/* Bottom Hero Callout & Scroll Indicator */}
      <div className="relative z-20 flex flex-col items-center text-center mt-8 sm:mt-12 lg:mt-14 px-4">
        <span className="font-inter text-[9px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] text-amber-200/70 font-medium">
          THE GODS HAVE GATHERED. YOUR ASCENT AWAITS.
        </span>
        <button
          onClick={scrollToFinder}
          className="mt-2.5 flex items-center gap-1.5 font-cinzel text-xs sm:text-sm uppercase tracking-[0.2em] text-amber-300 hover:text-amber-100 transition-colors cursor-pointer group"
        >
          <span>CLAIM YOUR THRONE</span>
          <span className="transform transition-transform group-hover:translate-y-1">↓</span>
        </button>
      </div>
    </section>
  );
}

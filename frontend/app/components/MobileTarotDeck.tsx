"use client";

import { useState } from "react";
import Image from "next/image";
import { HOUSES, HouseData } from "../data/houses";

interface MobileTarotDeckProps {
  onSelectHouse: (house: HouseData) => void;
}

export default function MobileTarotDeck({ onSelectHouse }: MobileTarotDeckProps) {
  const [activeIndex, setActiveIndex] = useState(6); // Default to Aakash (index 6) as in Figma Mobile frame!
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const prevIndex = (activeIndex - 1 + HOUSES.length) % HOUSES.length;
  const nextIndex = (activeIndex + 1) % HOUSES.length;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 40) {
      // Swipe left -> next
      setActiveIndex(nextIndex);
    } else if (diff < -40) {
      // Swipe right -> prev
      setActiveIndex(prevIndex);
    }
    setTouchStartX(null);
  };

  const activeHouse = HOUSES[activeIndex];
  const prevHouse = HOUSES[prevIndex];
  const nextHouse = HOUSES[nextIndex];

  return (
    <div
      className="relative w-full max-w-[380px] mx-auto flex flex-col items-center my-6 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Tarot Deck Visual Container */}
      <div className="relative w-full h-[340px] flex items-center justify-center">
        {/* Left Peeking Card */}
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 w-[130px] h-[220px] rounded-lg overflow-hidden border border-amber-400/25 shadow-lg opacity-40 -rotate-12 cursor-pointer transition-all duration-300 transform hover:opacity-60 z-10"
          onClick={() => setActiveIndex(prevIndex)}
        >
          <Image
            src={prevHouse.cardImage}
            alt={prevHouse.name}
            fill
            sizes="130px"
            className="object-cover"
          />
        </div>

        {/* Right Peeking Card */}
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 w-[130px] h-[220px] rounded-lg overflow-hidden border border-amber-400/25 shadow-lg opacity-40 rotate-12 cursor-pointer transition-all duration-300 transform hover:opacity-60 z-10"
          onClick={() => setActiveIndex(nextIndex)}
        >
          <Image
            src={nextHouse.cardImage}
            alt={nextHouse.name}
            fill
            sizes="130px"
            className="object-cover"
          />
        </div>

        {/* Active Center Card */}
        <div
          className="relative z-20 w-[184px] h-[298px] rounded-xl overflow-hidden border-2 border-amber-400/70 shadow-[0_0_30px_rgba(212,175,55,0.45),0_10px_25px_rgba(0,0,0,0.8)] cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
          onClick={() => onSelectHouse(activeHouse)}
        >
          <Image
            src={activeHouse.cardImage}
            alt={`${activeHouse.name} - ${activeHouse.deity}`}
            fill
            sizes="200px"
            className="object-cover"
            priority
          />
          {/* Subtle gold sheen */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-amber-300/10 pointer-events-none" />
        </div>
      </div>

      {/* 8 Pagination Indicators (Dots / Pills) */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {HOUSES.map((house, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={house.id}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                isActive
                  ? "w-6 h-2 bg-gradient-to-r from-amber-400 to-amber-200 shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                  : "w-2 h-2 bg-amber-400/30 hover:bg-amber-400/60"
              }`}
              aria-label={`Select ${house.name}`}
            />
          );
        })}
      </div>
    </div>
  );
}

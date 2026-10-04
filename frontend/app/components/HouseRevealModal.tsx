"use client";

import { useEffect } from "react";
import Image from "next/image";
import { HouseData } from "../data/houses";

interface HouseRevealModalProps {
  house: HouseData;
  academicInfo?: string;
  onClose: () => void;
  onOpenStory: () => void;
}

export default function HouseRevealModal({
  house,
  academicInfo,
  onClose,
  onOpenStory,
}: HouseRevealModalProps) {
  // ESC key listener to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleDownloadBadge = () => {
    const link = document.createElement("a");
    link.href = house.badgeImage;
    link.download = `${house.name}_House_Badge.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[440px] rounded-2xl border border-amber-400/50 bg-[#090d18] shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_30px_rgba(212,175,55,0.25)] flex flex-col items-center overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="w-full flex items-center justify-between px-5 pt-4 pb-2 z-20">
          <span className="px-3 py-1 rounded-full border border-amber-400/40 bg-black/70 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-amber-200 font-semibold shadow-sm">
            HOUSE REVEALED
          </span>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-amber-400/30 bg-black/50 flex items-center justify-center text-amber-200 hover:text-white hover:border-amber-300 transition-colors cursor-pointer"
            title="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Deity Artwork / Visual Hero */}
        <div className="relative w-full h-[220px] sm:h-[250px] overflow-hidden flex items-center justify-center mt-1">
          {/* Ambient Glow */}
          <div
            className="absolute inset-0 opacity-25 blur-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${house.accentColor} 0%, transparent 70%)`,
            }}
          />

          {/* Deity Image inside frame */}
          <div className="relative w-[130px] sm:w-[150px] h-[210px] sm:h-[240px] rounded-lg overflow-hidden border border-amber-400/40 shadow-xl">
            <Image
              src={house.cardImage}
              alt={`${house.name} - ${house.deity}`}
              fill
              sizes="160px"
              className="object-cover"
              priority
            />
          </div>

          {/* Bottom fade into card body */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#090d18] to-transparent pointer-events-none" />
        </div>

        {/* Center Circular Badge Disc */}
        <div className="relative -mt-8 z-20">
          <div
            className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full p-1.5 border-2 border-amber-400/80 bg-[#060913] shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center"
            style={{ borderColor: house.accentColor }}
          >
            <div className="relative w-full h-full">
              <Image
                src={house.badgeImage}
                alt={`${house.name} badge`}
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* House Content */}
        <div className="w-full px-6 pt-3 pb-6 flex flex-col items-center text-center z-10">
          <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-amber-200/80 font-medium">
            YOUR OLYMPIAN SPIRIT
          </span>

          <h2 className="font-playfair text-3xl sm:text-4xl font-extrabold uppercase tracking-widest text-gold-gradient mt-1">
            {house.name}
          </h2>

          <p className="font-playfair italic text-slate-200 text-sm sm:text-base mt-1 font-semibold">
            {house.deity} · {house.deityTitle}
          </p>

          <p className="font-inter italic text-xs sm:text-sm text-slate-300 mt-2 max-w-xs">
            &ldquo;{house.slogan}&rdquo;
          </p>

          <p className="font-inter text-[11px] text-slate-400 tracking-wider uppercase mt-3">
            {academicInfo || house.eligibility}
          </p>

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-2.5 mt-5">
            <button
              onClick={handleDownloadBadge}
              className="w-full h-11 btn-gold rounded-lg flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-bold cursor-pointer"
            >
              <span>Download My House Badge</span>
              <span className="text-sm">⤓</span>
            </button>

            <button
              onClick={onOpenStory}
              className="w-full h-11 rounded-lg border border-amber-400/40 bg-black/40 hover:bg-amber-400/10 text-amber-200 hover:text-amber-100 flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              <span>Share to Story</span>
              <span className="text-sm">⠷</span>
            </button>
          </div>

          {/* Bottom Microcopy */}
          <p className="font-inter text-[10px] text-slate-500 mt-3">
            Concept slogan · static reveal preview
          </p>
        </div>
      </div>
    </div>
  );
}

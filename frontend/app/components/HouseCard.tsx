"use client";

import Image from "next/image";
import { HouseData } from "../data/houses";

interface HouseCardProps {
  house: HouseData;
  onClick: (house: HouseData) => void;
}

export default function HouseCard({ house, onClick }: HouseCardProps) {
  return (
    <div
      onClick={() => onClick(house)}
      className="group relative rounded-xl overflow-hidden border border-slate-800/80 bg-[#0d1220]/90 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-amber-400/80 hover:shadow-[0_0_28px_rgba(212,175,55,0.25)] flex flex-col"
    >
      {/* Top Badge Compartment */}
      <div className="relative w-full h-44 sm:h-48 bg-[#060913]/90 flex items-center justify-center p-6 border-b border-slate-800/60 overflow-hidden">
        {/* Subtle accent halo in background */}
        <div
          className="absolute w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
          style={{ backgroundColor: house.accentColor }}
        />

        <div className="relative w-full h-full max-h-32 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105">
          <Image
            src={house.badgeImage}
            alt={`${house.name} crest`}
            fill
            sizes="(max-width: 640px) 150px, 200px"
            className="object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
          />
        </div>
      </div>

      {/* Bottom Text Compartment */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-gradient-to-b from-[#0d1220] to-[#080c16]">
        <div>
          {/* House Name */}
          <h3 className="font-playfair text-xl sm:text-2xl font-bold tracking-wider text-slate-100 uppercase group-hover:text-amber-200 transition-colors">
            {house.name}
          </h3>

          {/* Deity Name */}
          <p className="font-playfair text-sm font-semibold text-slate-300 mt-1">
            {house.deity}
          </p>

          {/* Deity Domain */}
          <p className="font-inter text-xs text-slate-400">
            {house.deityTitle}
          </p>
        </div>

        {/* Academic Affiliation / Eligibility */}
        <div className="pt-3">
          <p className="font-inter text-[11px] sm:text-xs text-slate-400 leading-relaxed">
            {house.eligibility}
          </p>
        </div>
      </div>
    </div>
  );
}

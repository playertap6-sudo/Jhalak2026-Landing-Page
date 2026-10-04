"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="relative z-30 w-full">
      {/* Institutional masthead — exact Figma layout:
          Desktop/Tablet: row, padding 0 56px, space-between, align-center, h-104
          Mobile:         row, padding 0 20px, align-center, gap-12, h-84 */}
      <div className="flex items-center justify-between w-full px-5 md:px-14 h-[84px] md:h-[104px]">
        {/* Left: DSA Seal — Mobile: 44×44, Desktop/Tablet: 56×56 */}
        <div className="relative shrink-0 rounded-full overflow-hidden w-11 h-11 md:w-14 md:h-14">
          <Image
            src="/images/header/dsa-logo.png"
            alt="Directorate of Student Affairs"
            fill
            sizes="(max-width: 768px) 44px, 56px"
            className="object-cover rounded-full"
            priority
          />
        </div>

        {/* Center: Masthead text */}
        <div className="flex-1 min-w-0 text-center px-3">
          <span className="font-inter text-[7px] md:text-[11px] uppercase tracking-[0.14em] md:tracking-[0.24em] text-[#E9D6A2] font-semibold leading-[1.7] truncate block drop-shadow-sm">
            DIRECTORATE OF STUDENT AFFAIRS PRESENTS
          </span>
        </div>

        {/* Right: SRMIST Seal — Mobile: 44×44, Desktop/Tablet: 56×56 */}
        <div className="relative shrink-0 rounded-full overflow-hidden w-11 h-11 md:w-14 md:h-14">
          <Image
            src="/images/header/srmist-seal.png"
            alt="SRMIST Seal"
            fill
            sizes="(max-width: 768px) 44px, 56px"
            className="object-cover rounded-full"
            priority
          />
        </div>
      </div>
    </header>
  );
}

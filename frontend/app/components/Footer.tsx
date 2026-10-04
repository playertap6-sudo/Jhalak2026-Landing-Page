"use client";

export default function Footer() {
  return (
    <footer className="relative z-20 w-full border-t border-slate-800/80 bg-[#04060c] mt-16 sm:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-center md:text-left">
        {/* Left Column */}
        <div className="flex flex-col items-center md:items-start">
          <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-gold-gradient uppercase">
            JHALAK &apos;26
          </span>
          <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-amber-200/70 font-medium mt-1">
            OLYMPUS ASCENDANT
          </span>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center md:items-end">
          <p className="font-inter text-xs sm:text-sm text-slate-300 font-medium">
            SRM Institute of Science and Technology
          </p>
          <p className="font-inter text-[11px] sm:text-xs text-slate-500 mt-1">
            Organized by the Directorate of Student Affairs
          </p>
        </div>
      </div>
    </footer>
  );
}

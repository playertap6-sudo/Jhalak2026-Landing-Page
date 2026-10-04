"use client";

import { useState } from "react";
import { SCHOOLS, SchoolType, allocateHouse, AllocationResult } from "../data/houses";

interface HouseFinderProps {
  onReveal: (result: AllocationResult) => void;
}

export default function HouseFinder({ onReveal }: HouseFinderProps) {
  const [school, setSchool] = useState<string>("");
  const [program, setProgram] = useState<string>("");
  const [registrationId, setRegistrationId] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const isEngineeringUG = school === "Engineering and Technology" && program === "UG";
  const isIdValid = isEngineeringUG ? /^\d{3}$/.test(registrationId) : true;
  const isIdInvalid = isEngineeringUG && registrationId.length > 0 && !isIdValid;

  // Compute current preview allocation
  const currentAllocation = allocateHouse(school, program, registrationId);

  // Microcopy below button based on Figma states
  const getHelperMessage = () => {
    if (!school) {
      return "Select your school to see the academic program.";
    }
    if (!program) {
      return "Choose an academic program to continue.";
    }
    if (isEngineeringUG) {
      if (!registrationId) {
        return "Enter the last 3 digits of your Register Number.";
      }
      if (isIdInvalid) {
        return "Your house will be revealed after the digits are corrected.";
      }
      if (currentAllocation) {
        return `Leading zero preserved · ${registrationId} → ${currentAllocation.house.name}`;
      }
    }
    if (currentAllocation) {
      return currentAllocation.allocationReason;
    }
    return "";
  };

  const handleReveal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTouched(true);

    if (!school || !program) return;
    if (isEngineeringUG && !isIdValid) return;

    if (currentAllocation) {
      onReveal(currentAllocation);
    }
  };

  const isButtonDisabled = !school || !program || (isEngineeringUG && !isIdValid);

  return (
    <section id="finder" className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 my-12 sm:my-20">
      <div className="relative rounded-2xl border border-amber-500/30 bg-[#090d1a]/85 backdrop-blur-xl p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.12)]">
        {/* Top Gold Accent Line */}
        <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6" />

        {/* Headings */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="font-playfair font-bold text-xl sm:text-3xl md:text-4xl tracking-wider sm:tracking-widest text-slate-100 uppercase">
            CLAIM YOUR THRONE
          </h2>
          <p className="font-inter text-xs sm:text-sm text-slate-400 mt-2">
            Enter your academic credentials to unlock your house affiliation.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleReveal} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
            {/* Field 1: School of study */}
            <div className="flex flex-col gap-2">
              <label className="font-inter text-xs text-slate-300 font-medium">
                School of study
              </label>
              <div className="relative">
                <select
                  value={school}
                  onChange={(e) => {
                    setSchool(e.target.value as SchoolType);
                    setRegistrationId("");
                    setIsTouched(false);
                  }}
                  className="w-full h-12 bg-[#050811]/90 border border-slate-700 hover:border-amber-400/50 focus:border-amber-400 rounded-lg px-3.5 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-400/50 appearance-none cursor-pointer transition-colors"
                >
                  <option value="" disabled className="bg-[#0c101c] text-slate-400">
                    Select Your School...
                  </option>
                  {SCHOOLS.map((s) => (
                    <option key={s} value={s} className="bg-[#0c101c] text-slate-100">
                      {s}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Field 2: Academic Program (Conditional: appears once school is chosen) */}
            {school && (
              <div className="flex flex-col gap-2 animate-fadeIn">
                <label className="font-inter text-xs text-slate-300 font-medium">
                  Academic program
                </label>
                <div className="relative">
                  <select
                    value={program}
                    onChange={(e) => {
                      setProgram(e.target.value);
                      setRegistrationId("");
                      setIsTouched(false);
                    }}
                    className="w-full h-12 bg-[#050811]/90 border border-slate-700 hover:border-amber-400/50 focus:border-amber-400 rounded-lg px-3.5 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-400/50 appearance-none cursor-pointer transition-colors"
                  >
                    <option value="" disabled className="bg-[#0c101c] text-slate-400">
                      Choose Level...
                    </option>
                    <option value="UG" className="bg-[#0c101c] text-slate-100">
                      Undergraduate (UG)
                    </option>
                    <option value="PG" className="bg-[#0c101c] text-slate-100">
                      Postgraduate (PG)
                    </option>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>
            )}

            {/* Field 3: Registration ID Digits (Conditional: appears ONLY for Engineering & Technology + UG) */}
            {isEngineeringUG && (
              <div className="flex flex-col gap-2 animate-fadeIn">
                <label className="font-inter text-xs text-slate-300 font-medium">
                  Registration ID Digits
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={3}
                    placeholder="042"
                    value={registrationId}
                    onChange={(e) => {
                      // Allow only digits
                      const val = e.target.value.replace(/\D/g, "");
                      setRegistrationId(val);
                    }}
                    className={`w-full h-12 bg-[#050811]/90 rounded-lg px-3.5 text-sm text-slate-100 focus:outline-none transition-colors ${
                      isIdInvalid
                        ? "border border-red-500 focus:ring-1 focus:ring-red-500 pr-10"
                        : "border border-slate-700 hover:border-amber-400/50 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50"
                    }`}
                  />
                  {isIdInvalid && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-red-500 font-bold text-sm">
                      !
                    </div>
                  )}
                </div>
                {isIdInvalid ? (
                  <p className="text-[11px] text-red-400 mt-0.5">
                    Enter exactly 3 numeric digits (0–9). Keep leading zeros, e.g. 042.
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Enter the last 3 digits of your Register Number (e.g., 042)
                  </p>
                )}
              </div>
            )}

            {/* CTA Button on Desktop (or standalone column) */}
            <div className={`flex flex-col justify-end ${!school ? "lg:col-start-3" : ""}`}>
              <button
                type="submit"
                disabled={isButtonDisabled}
                className="w-full h-12 btn-gold rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider font-bold cursor-pointer disabled:cursor-not-allowed"
              >
                <span>REVEAL MY HOUSE</span>
                <span className="text-base leading-none">↗</span>
              </button>
            </div>
          </div>

          {/* Microcopy Below Button */}
          <div className="text-center pt-2">
            <span className="font-inter text-[11px] sm:text-xs text-slate-400">
              {getHelperMessage()}
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}

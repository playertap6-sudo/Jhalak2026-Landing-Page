export interface HouseData {
  id: string;
  name: string;
  deity: string;
  deityTitle: string;
  slogan: string;
  eligibility: string;
  accentColor: string;
  accentName: string;
  cardImage: string;
  badgeImage: string;
  storyImage?: string;
  revealImage?: string;
  description: string;
}

export const HOUSES: HouseData[] = [
  {
    id: "trishul",
    name: "TRISHUL",
    deity: "Poseidon",
    deityTitle: "God of the Sea",
    slogan: "Rule the tides. Command the storm.",
    eligibility: "Engineering and Technology UG",
    accentColor: "#0284c7",
    accentName: "Deep Azure",
    cardImage: "/images/cards/trishul.png",
    badgeImage: "/images/badges/trishul.png",
    description: "God of the sea; iconic three-pronged trident",
  },
  {
    id: "brahmos",
    name: "BRAHMOS",
    deity: "Ares",
    deityTitle: "God of War",
    slogan: "Strength forged in combat. Fearless and supreme.",
    eligibility: "Non-Medical PG · Management UG (BBA)",
    accentColor: "#e11d48",
    accentName: "Crimson",
    cardImage: "/images/cards/brahmos.png",
    badgeImage: "/images/badges/brahmos.png",
    description: "God of war; weapons, combat and military power",
  },
  {
    id: "astra",
    name: "ASTRA",
    deity: "Athena",
    deityTitle: "Goddess of Wisdom & Warfare",
    slogan: "Let wisdom lead. Let courage follow.",
    eligibility: "FSH/FLAB and Law UG",
    accentColor: "#10b981",
    accentName: "Emerald",
    cardImage: "/images/cards/astra.png",
    badgeImage: "/images/badges/astra.png",
    revealImage: "/images/reveals/astra-modal-crop.png",
    storyImage: "/images/stories/astra-9_16.png",
    description: "Goddess of wisdom, strategy and warfare",
  },
  {
    id: "prithvi",
    name: "PRITHVI",
    deity: "Gaia",
    deityTitle: "Primordial Earth Mother",
    slogan: "Rooted in power. Unshakable as mountains.",
    eligibility: "Engineering and Technology UG",
    accentColor: "#16a34a",
    accentName: "Verdant Jade",
    cardImage: "/images/cards/prithvi.png",
    badgeImage: "/images/badges/prithvi.png",
    description: "Primordial goddess and personification of Earth",
  },
  {
    id: "agni",
    name: "AGNI",
    deity: "Hephaestus",
    deityTitle: "God of the Forge",
    slogan: "Forged in flame, rising unbound from ashes.",
    eligibility: "Engineering and Technology UG",
    accentColor: "#ea580c",
    accentName: "Blazing Ember",
    cardImage: "/images/cards/agni.png",
    badgeImage: "/images/badges/agni.png",
    description: "God of the forge, fire and metalworking",
  },
  {
    id: "shaurya",
    name: "SHAURYA",
    deity: "Nike",
    deityTitle: "Goddess of Victory",
    slogan: "Carry courage. Claim victory.",
    eligibility: "Medical · UG and PG",
    accentColor: "#eab308",
    accentName: "Gilded wings",
    cardImage: "/images/cards/shaurya.png",
    badgeImage: "/images/badges/shaurya.png",
    revealImage: "/images/reveals/shaurya-modal-clean.png",
    description: "Goddess of victory; wings and triumph",
  },
  {
    id: "aakash",
    name: "AAKASH",
    deity: "Zeus",
    deityTitle: "King of Gods",
    slogan: "Let the skies witness your ascent.",
    eligibility: "Engineering and Technology UG",
    accentColor: "#06b6d4",
    accentName: "Sky Cyan",
    cardImage: "/images/cards/aakash.png",
    badgeImage: "/images/badges/aakash.png",
    revealImage: "/images/reveals/aakash-modal-crop.png",
    storyImage: "/images/stories/aakash-9_16.png",
    description: "King of the gods; sky, thunder and lightning",
  },
  {
    id: "naag",
    name: "NAAG",
    deity: "Hydra",
    deityTitle: "Multi-headed Serpent",
    slogan: "Born to blast. Strike as one.",
    eligibility: "Architecture and Hotel Management UG",
    accentColor: "#84cc16",
    accentName: "Venom Green",
    cardImage: "/images/cards/naag.png",
    badgeImage: "/images/badges/naag.png",
    description: "Mythological multi-headed serpent; fits a serpent-themed emblem",
  },
];

export const SCHOOLS = [
  "Medical",
  "Engineering and Technology",
  "FSH/FLAB",
  "Architecture",
  "Management",
  "Law",
  "Hotel Management",
] as const;

export type SchoolType = (typeof SCHOOLS)[number];

export interface AllocationResult {
  house: HouseData;
  academicInfo: string;
  allocationReason: string;
}

export function allocateHouse(
  school: string,
  program: string,
  registrationId?: string
): AllocationResult | null {
  if (!school || !program) return null;

  const s = school.toLowerCase();
  const isMed = s.includes("medic");
  const isEng = s.includes("engineering");
  const isMgmt = s.includes("management") && !s.includes("hotel") && !s.includes("catering");
  const isLaw = s.includes("law");
  const isFsh = s.includes("fsh") || s.includes("flab") || s.includes("humanities") || s.includes("agricultural");
  const isArch = s.includes("architect");
  const isHotel = s.includes("hotel") || s.includes("catering");

  // 1. Medical UG or PG -> Shaurya (Medical takes priority over the PG rule)
  if (isMed) {
    const house = HOUSES.find((h) => h.id === "shaurya")!;
    return {
      house,
      academicInfo: `Medical · ${program === "PG" ? "Postgraduate (PG)" : "Undergraduate (UG)"}`,
      allocationReason: "Direct allocation · Medical → Shaurya",
    };
  }

  // 2. Every other PG -> Brahmos
  if (program === "PG") {
    const house = HOUSES.find((h) => h.id === "brahmos")!;
    return {
      house,
      academicInfo: `${school} · Postgraduate (PG)`,
      allocationReason: "Non-Medical Postgraduate → Brahmos",
    };
  }

  // 3. UG rules:
  if (isMgmt) {
    const house = HOUSES.find((h) => h.id === "brahmos")!;
    return {
      house,
      academicInfo: "Management · Undergraduate (UG)",
      allocationReason: "Management UG (BBA) → Brahmos",
    };
  }

  if (isFsh || isLaw) {
    const house = HOUSES.find((h) => h.id === "astra")!;
    return {
      house,
      academicInfo: `${school} · Undergraduate (UG)`,
      allocationReason: "FSH/FLAB or Law UG → Astra",
    };
  }

  if (isArch || isHotel) {
    const house = HOUSES.find((h) => h.id === "naag")!;
    return {
      house,
      academicInfo: `${school} · Undergraduate (UG)`,
      allocationReason: "Architecture or Hotel Management UG → Naag",
    };
  }

  if (isEng) {
    if (!registrationId || !/^\d{3}$/.test(registrationId)) {
      return null;
    }
    const num = parseInt(registrationId, 10);
    const mod = num % 4;
    const mapping: Record<number, string> = {
      0: "trishul",
      1: "agni",
      2: "aakash",
      3: "prithvi",
    };
    const targetId = mapping[mod];
    const house = HOUSES.find((h) => h.id === targetId)!;
    return {
      house,
      academicInfo: `Engineering and Technology · UG · ${registrationId}`,
      allocationReason: `Registration Digits ${registrationId} (${num} mod 4 = ${mod}) → ${house.name}`,
    };
  }

  return null;
}

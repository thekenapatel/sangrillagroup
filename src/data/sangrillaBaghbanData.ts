// Sangrilla Baghban Master Data & Content Specifications
// Location: Kamiyala, Nr. Kasthbhanjan Hanuman Temple, Dholera-SIR, Gujarat

export interface BaghbanAmenity {
  name: string;
  category: 'security' | 'leisure' | 'fitness' | 'wellness' | 'community' | 'sports';
  description: string;
  iconName: string;
  image?: string;
}

export interface BaghbanDistance {
  landmark: string;
  distance: string;
  travelTime: string;
  category: 'landmark' | 'transit' | 'smartcity';
  highlight?: boolean;
}

export interface BaghbanMeta {
  projectName: string;
  tagline: string;
  subTagline: string;
  location: string;
  siteAddress: string;
  registeredOffice: string;
  salesOffice: string;
  contactNumbers: string[];
  email: string;
  website: string;
  pdfBrochureUrl: string;
  totalPlots: number;
  roadWidths: string[];
  description: string;
  fullNarrative: string[];
  keyHighlights: string[];
}

export const SAN_GRILLA_BAGHBAN_META: BaghbanMeta = {
  projectName: "Sangrilla Baghban, Dholera-SIR",
  tagline: "A Rare Lifestyle Address in Dholera",
  subTagline: "Residential Plots & Porch Villas",
  location: "Kamiyala, Dholera-SIR, Gujarat",
  siteAddress: "Sangrilla Baghban, Kamiyala, Nr. Kasthbhanjan Hanuman Temple, Dholera-SIR, Gujarat.",
  registeredOffice: "Sangrilla Group, 417, The CBD Mall, Opp. The Hillock Hotel, S.P. Ring Road, Zundal, Ahmedabad – 382424, Gujarat, India.",
  salesOffice: "A/507, Money Plant High Street, Nr. Ganesh Glory 11, Jagatpur, Gota, Ahmedabad – 382470, Gujarat, India.",
  contactNumbers: ["+91 973 7327 999", "+91 973 7328 999"],
  email: "info@sangrillagroup.com",
  website: "www.sangrillagroup.com",
  pdfBrochureUrl: "/sangrilla-baghban-brochure.pdf",
  totalPlots: 96,
  roadWidths: ["9 MT Internal Roads", "12 MT Wide Main Roads"],
  description: "Strategically located at the gateway of Dholera SIR (India's first and fastest-emerging greenfield smart city), Sangrilla Baghban offers well-planned residential plots and luxurious porch villas designed for a refined lifestyle and long-term investment potential.",
  fullNarrative: [
    "Sangrilla Baghban is a premium residential development strategically located at the gateway of Dholera SIR, India's first and fastest-emerging Greenfield Smart City. Offering well-planned residential plots and luxurious porch villas, the project is designed for those seeking a refined lifestyle combined with long-term investment potential.",
    "Thoughtfully planned with modern infrastructure, wide roads (9 mt & 12 mt), landscaped surroundings, and a dedicated residential environment, Sangrilla Baghban delivers the perfect balance of comfort, family living, and secure community ownership. Individual plot ownership provides complete freedom to personalize your future dream villa.",
    "Positioned along key growth corridors with seamless access to Kamiyala Hanumanji Mandir, Pipdi Fedra Road, Diamond Circle, and the Dholera SIR Activation Area, Sangrilla Baghban is an elite gateway to Gujarat's smart urban future."
  ],
  keyHighlights: [
    "96 thoughtfully planned villa plots.",
    "Organized plot arrangement & individual plot ownership.",
    "Freedom to personalize your future villa (villa construction available at additional cost).",
    "Modern infrastructure layout with dedicated residential environment, ideal for family living and long-term ownership.",
    "Spacious 9 mt and 12 mt wide asphalt internal road network.",
    "24/7 CCTV Security and fully gated private township perimeter.",
    "High appreciation location right at the gateway of Dholera-SIR.",
    "Clear title documentation with complete registration and registry support."
  ]
};

export const BAGHBAN_AMENITIES: BaghbanAmenity[] = [
  {
    name: "Plot Demarcation",
    category: "security",
    description: "Clear, precision-surveyed boundary stones and markers for every individual plot.",
    iconName: "Compass",
    image: "/assets/baghban/baghban-amenities.png"
  },
  {
    name: "Internal Roads (9 mt & 12 mt)",
    category: "community",
    description: "Spacious 9-meter and 12-meter wide asphalt roads designed for smooth two-way vehicular flow.",
    iconName: "Layers"
  },
  {
    name: "Boundary Wall",
    category: "security",
    description: "Comprehensive reinforced boundary wall encircling the entire 96-plot development.",
    iconName: "ShieldCheck"
  },
  {
    name: "24/7 CCTV Security / Gated Community",
    category: "security",
    description: "Monumental security entrance with boom barrier and 24x7 high-definition CCTV surveillance.",
    iconName: "Award"
  },
  {
    name: "Garden & Gazebo",
    category: "leisure",
    description: "Serene landscaped green lawns with wooden gazebos for shaded afternoon relaxation.",
    iconName: "Trees"
  },
  {
    name: "Children's Park",
    category: "leisure",
    description: "Dedicated safe play arena equipped with modern slides, swings, and soft turf.",
    iconName: "Sparkles"
  },
  {
    name: "Senior Citizen Park",
    category: "wellness",
    description: "Tranquil garden enclave with comfortable park benches and smooth walking pathways.",
    iconName: "Home"
  },
  {
    name: "Clubhouse",
    category: "community",
    description: "Architectural clubhouse facility for community celebrations, indoor leisure, and gatherings.",
    iconName: "Building2"
  },
  {
    name: "Gym",
    category: "fitness",
    description: "Well-equipped fitness gymnasium for daily cardio and strength training workouts.",
    iconName: "Dumbbell"
  },
  {
    name: "Community Hall",
    category: "community",
    description: "Grand multipurpose banquet and social event space for residents and family functions.",
    iconName: "Users"
  },
  {
    name: "Indoor Games Ground",
    category: "sports",
    description: "Recreational gaming lounge with table tennis, snooker, carrom, and board games.",
    iconName: "Gamepad2"
  },
  {
    name: "Mandir",
    category: "wellness",
    description: "Divine sacred temple within the township grounds offering daily spiritual peace.",
    iconName: "Sun"
  },
  {
    name: "Cricket Ground",
    category: "sports",
    description: "Lush green recreational pitch and cricket ground for weekend matches and sports.",
    iconName: "Trophy"
  },
  {
    name: "Swimming Pool",
    category: "fitness",
    description: "Resort-style outdoor swimming pool with sun lounger deck and crystal-clear filtration.",
    iconName: "Droplets"
  },
  {
    name: "Street Lighting",
    category: "community",
    description: "Energy-efficient LED street poles throughout all internal 9m and 12m roadways.",
    iconName: "Flame"
  },
  {
    name: "Landscaped Green Spaces",
    category: "leisure",
    description: "Lush horticultural plantations, manicured shrubs, and eco-friendly tree-lined avenues.",
    iconName: "CheckCircle2"
  }
];

export const BAGHBAN_LOCATION_ADVANTAGES: BaghbanDistance[] = [
  {
    landmark: "Kamiyala Hanumanji Mandir",
    distance: "700 meters",
    travelTime: "2–5 min",
    category: "landmark",
    highlight: true
  },
  {
    landmark: "Pipdi Fedra Road",
    distance: "1.5 km",
    travelTime: "5–8 min",
    category: "transit",
    highlight: true
  },
  {
    landmark: "Diamond Circle",
    distance: "7 km",
    travelTime: "15–20 min",
    category: "transit",
    highlight: true
  },
  {
    landmark: "Dholera SIR Activation Area",
    distance: "10 km",
    travelTime: "20–25 min",
    category: "smartcity",
    highlight: true
  },
  {
    landmark: "Lothal Museum",
    distance: "10 km",
    travelTime: "20–25 min",
    category: "landmark"
  },
  {
    landmark: "ABCD Building (Command HQ)",
    distance: "20 km",
    travelTime: "35–40 min",
    category: "smartcity"
  },
  {
    landmark: "Dholera Riverfront",
    distance: "20 km",
    travelTime: "35–45 min",
    category: "smartcity"
  }
];

export const BAGHBAN_LAYOUT_STATS = [
  { label: "Total Planned Plots", value: "96 Plots", sub: "Villa Plots" },
  { label: "Road Infrastructure", value: "9 & 12 MT", sub: "Wide internal roads" },
  { label: "Plot Ownership", value: "Individual", sub: "100% Clear Title" },
  { label: "Housing Freedom", value: "Porch Villas", sub: "Freedom to customize" },
  { label: "Common Plot COP-1", value: "715 Sq. Mtr.", sub: "Lush Park & Amenities" },
  { label: "Common Plot COP-2", value: "553 Sq. Mtr.", sub: "Central Green Garden" },
  { label: "Common Plot COP-3", value: "524 Sq. Mtr.", sub: "Recreation & Gazebo" },
];

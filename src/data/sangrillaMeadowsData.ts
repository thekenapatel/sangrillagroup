// Sangrilla Meadows Master Plan & Interactive Map Data
// Location: Aakru Village, Dhandhuka Taluka, Ahmedabad District (Dholera-SIR)
// Survey Numbers: New 642 / Old 420/4/12
// GPS Center: [22.26677, 72.00833]

export interface PlotUnit {
  id: string;
  plotNumber: number;
  type: 'Residential Plot' | 'Luxurious Villa';
  status: 'available' | 'booked' | 'reserved';
  facing: 'North' | 'East' | 'South' | 'West' | 'North-East' | 'North-West';
  areaSqYards: number;
  areaSqFt: number;
  dimensions: string;
  dimensionsMeter?: string;
  pricePerSqYd?: number;
  totalPrice?: number;
  floorPlanImages: string[];
  coordinates: { x: number; y: number; width: number; height: number }; // SVG boundary data
  polygonPoints?: string;
  center?: { x: number; y: number };
  gpsCoordinates?: { lat: number; lng: number };
  gpsPolygon?: [number, number][];
  isCorner?: boolean;
  roadAccess?: string;
  carpetAreaSqYards?: number;
  constructionFeasibility?: string;
}

export interface CommonAmenityArea {
  id: string;
  name: string;
  code: string;
  areaSqMtr: number;
  areaSqYd: number;
  description: string;
  coordinates: { x: number; y: number; width: number; height: number };
  polygonPoints: string;
  gpsPolygon: [number, number][];
  gpsCenter: [number, number];
}

export type LandmarkCategory =
  | 'project'
  | 'expressway'
  | 'transport'
  | 'village'
  | 'temple'
  | 'civic'
  | 'admin'
  | 'industrial'
  | 'airport'
  | 'infrastructure'
  | 'nature'
  | 'city';

export interface SurroundingLandmark {
  id: string;
  name: string;
  nameGujarati?: string;
  category: LandmarkCategory;
  distance: string;
  driveTime: string;
  coordinates: [number, number]; // [lat, lng]
  description: string;
  icon?: string;
  highlight?: boolean;
  group?: 'local' | 'transit' | 'smartcity' | 'industry' | 'cities';
}

export interface ProjectMasterPlanMeta {
  projectName: string;
  subTitle: string;
  location: string;
  googleMapsUrl: string;
  surveyNoNew: string;
  surveyNoOld: string;
  centerCoordinates: [number, number];
  zoomLevel: number;
  siteBounds: [[number, number], [number, number]];
  totalPlotAreaSqYds: number;
  commonPlotAreaSqYds: number;
  carpetAreaSqYds: number;
  totalUnits: number;
  roadNetworks: string[];
  masterPlanImage: string;
  pdfBrochureUrl: string;
  pdfMasterPlanUrl: string;
}

export const SAN_GRILLA_MEADOWS_META: ProjectMasterPlanMeta = {
  projectName: "Sangrilla Meadows",
  subTitle: "Dholera Smart City (SIR)",
  location: "Aakru Village, Dhandhuka, Ahmedabad District, Gujarat",
  googleMapsUrl: "https://maps.app.goo.gl/rPaedTaKUW62Se6V9",
  surveyNoNew: "642",
  surveyNoOld: "420/4/12",
  centerCoordinates: [22.26677, 72.00833],
  zoomLevel: 18,
  siteBounds: [
    [22.2648, 72.0068],
    [22.2686, 72.0098]
  ],
  totalPlotAreaSqYds: 29471.15,
  commonPlotAreaSqYds: 11558.96,
  carpetAreaSqYds: 17912.19,
  totalUnits: 145,
  roadNetworks: ["12 MT Main Spine Road", "7.5 MT Internal Access Roads"],
  masterPlanImage: "/assets/meadows/master-plan-layout.png",
  pdfBrochureUrl: "/sangrilla-meadows-brochure.pdf",
  pdfMasterPlanUrl: "/assets/meadows/Layout-Dholera.pdf"
};

export const TOWNSHIP_BOUNDARY_GPS: [number, number][] = [
  [
    22.2650412,
    72.0073048
  ],
  [
    22.2650184,
    72.0075359
  ],
  [
    22.2652004,
    72.0080915
  ],
  [
    22.2654051,
    72.0081899
  ],
  [
    22.2660421,
    72.0085341
  ],
  [
    22.266952,
    72.0089029
  ],
  [
    22.2678619,
    72.0092717
  ],
  [
    22.2682714,
    72.0093208
  ],
  [
    22.2683396,
    72.0087553
  ],
  [
    22.2676344,
    72.0084603
  ],
  [
    22.2668155,
    72.0081161
  ],
  [
    22.2659966,
    72.0077719
  ],
  [
    22.2654961,
    72.0074277
  ],
  [
    22.2650412,
    72.0073048
  ]
];

export const COMMON_AMENITY_AREAS: CommonAmenityArea[] = [
  {
    "id": "cop-1",
    "code": "COP-1",
    "name": "Zen Garden & Gazebo",
    "areaSqMtr": 300,
    "areaSqYd": 358.8,
    "description": "Quiet landscaped meditation park with stone pathway, gazebo sitouts, and shade trees.",
    "coordinates": {
      "x": 435.0,
      "y": 395.0,
      "width": 32.0,
      "height": 28.0
    },
    "polygonPoints": "444.0,397.0 468.0,406.0 458.0,424.0 434.0,415.0",
    "gpsPolygon": [
      [
        22.268012,
        72.0089225
      ],
      [
        22.2679711,
        72.0090405
      ],
      [
        22.2678892,
        72.0089914
      ],
      [
        22.2679301,
        72.0088734
      ]
    ],
    "gpsCenter": [
      22.2679529,
      72.0089569
    ]
  },
  {
    "id": "cop-2",
    "code": "COP-2",
    "name": "Central Community Green",
    "areaSqMtr": 300,
    "areaSqYd": 358.8,
    "description": "Centrally positioned lush lawn area for neighborhood festivals, evening walks, and relaxation.",
    "coordinates": {
      "x": 386.0,
      "y": 527.0,
      "width": 32.0,
      "height": 28.0
    },
    "polygonPoints": "395.0,528.0 419.0,537.0 409.0,555.0 385.0,546.0",
    "gpsPolygon": [
      [
        22.267416,
        72.0086816
      ],
      [
        22.2673751,
        72.0087996
      ],
      [
        22.2672932,
        72.0087504
      ],
      [
        22.2673341,
        72.0086324
      ]
    ],
    "gpsCenter": [
      22.2673569,
      72.008716
    ]
  },
  {
    "id": "cop-3",
    "code": "COP-3",
    "name": "Children's Play Arena",
    "areaSqMtr": 300,
    "areaSqYd": 358.8,
    "description": "Equipped kids play zone with swings, slides, soft-turf safety surface, and parent benches.",
    "coordinates": {
      "x": 331.0,
      "y": 660.0,
      "width": 32.0,
      "height": 28.0
    },
    "polygonPoints": "340.0,661.0 364.0,670.0 354.0,688.0 330.0,679.0",
    "gpsPolygon": [
      [
        22.2668109,
        72.0084111
      ],
      [
        22.26677,
        72.0085291
      ],
      [
        22.2666881,
        72.00848
      ],
      [
        22.2667291,
        72.008362
      ]
    ],
    "gpsCenter": [
      22.2667518,
      72.0084456
    ]
  },
  {
    "id": "cop-4",
    "code": "COP-4",
    "name": "Senior Citizen Park & Pergola",
    "areaSqMtr": 300,
    "areaSqYd": 358.8,
    "description": "Dedicated tranquil garden with reflexology acupressure pathway, pergola shade, and floral borders.",
    "coordinates": {
      "x": 279.0,
      "y": 789.0,
      "width": 32.0,
      "height": 28.0
    },
    "polygonPoints": "288.0,790.0 312.0,799.0 302.0,817.0 278.0,808.0",
    "gpsPolygon": [
      [
        22.2662241,
        72.0081554
      ],
      [
        22.2661831,
        72.0082735
      ],
      [
        22.2661012,
        72.0082243
      ],
      [
        22.2661422,
        72.0081063
      ]
    ],
    "gpsCenter": [
      22.2661649,
      72.0081899
    ]
  },
  {
    "id": "cop-5",
    "code": "COP-5",
    "name": "Flora Plaza & Fountain",
    "areaSqMtr": 300,
    "areaSqYd": 358.8,
    "description": "Decorative flowering park featuring water fountain display, aromatic shrubs, and ambient night lighting.",
    "coordinates": {
      "x": 228.0,
      "y": 922.0,
      "width": 32.0,
      "height": 28.0
    },
    "polygonPoints": "237.0,923.0 261.0,932.0 251.0,950.0 227.0,941.0",
    "gpsPolygon": [
      [
        22.265619,
        72.0079047
      ],
      [
        22.265578,
        72.0080227
      ],
      [
        22.2654961,
        72.0079735
      ],
      [
        22.2655371,
        72.0078555
      ]
    ],
    "gpsCenter": [
      22.2655598,
      72.0079391
    ]
  },
  {
    "id": "cop-6",
    "code": "COP-6",
    "name": "Grand Clubhouse & Sports Zone",
    "areaSqMtr": 1080,
    "areaSqYd": 1291.7,
    "description": "Major amenity hub with community banquet hall, indoor games, gymnasium, swimming pool, and sports court.",
    "coordinates": {
      "x": 120.0,
      "y": 990.0,
      "width": 95.0,
      "height": 75.0
    },
    "polygonPoints": "123.0,996.0 198.0,1022.0 162.0,1055.0 115.0,1050.0",
    "gpsPolygon": [
      [
        22.2652868,
        72.0073441
      ],
      [
        22.2651686,
        72.0077129
      ],
      [
        22.2650184,
        72.0075359
      ],
      [
        22.2650412,
        72.0073048
      ]
    ],
    "gpsCenter": [
      22.2651549,
      72.0074769
    ]
  },
  {
    "id": "cop-7",
    "code": "COP-7",
    "name": "Entrance Gateway & Welcome Plaza",
    "areaSqMtr": 227,
    "areaSqYd": 271.5,
    "description": "Monumental gated entrance arch, 24x7 security control room, boom barriers, and EV charging bays.",
    "coordinates": {
      "x": 215.0,
      "y": 980.0,
      "width": 45.0,
      "height": 35.0
    },
    "polygonPoints": "225.0,985.0 255.0,996.0 245.0,1015.0 215.0,1005.0",
    "gpsPolygon": [
      [
        22.2653369,
        72.0078457
      ],
      [
        22.2652868,
        72.0079932
      ],
      [
        22.2652004,
        72.007944
      ],
      [
        22.2652459,
        72.0077965
      ]
    ],
    "gpsCenter": [
      22.2652686,
      72.0078948
    ]
  }
];

export const SURROUNDING_LANDMARKS: SurroundingLandmark[] = [
  {
    id: "sangrilla-meadows",
    name: "Sangrilla Meadows (Main Project)",
    nameGujarati: "સાંગ્રિલા મેડોવ્સ",
    category: "project",
    coordinates: [22.26677, 72.00833],
    distance: "0 m (Project Site)",
    driveTime: "Township Center",
    group: "local",
    icon: "🏛️",
    highlight: true,
    description: "The primary 145-plot residential villa development featuring 12m main spine road, luxury villas, landscaped parks, and instant Dastavej in Aakru, Dholera SIR."
  },
  {
    id: "link-road",
    name: "250m Expressway Access Link Road",
    nameGujarati: "એક્સપ્રેસવે લિંક કોરિડોર",
    category: "expressway",
    coordinates: [22.2675, 72.0110],
    distance: "250 m",
    driveTime: "1 min",
    group: "transit",
    icon: "🛣️",
    highlight: true,
    description: "Dedicated wide asphalt link corridor providing uninterrupted direct vehicular access from Sangrilla Meadows entrance to the 10-Lane NH-751 Expressway."
  },
  {
    id: "nh-751",
    name: "Ahmedabad–Dholera 250m Expressway (NH-751)",
    nameGujarati: "અમદાવાદ–ધોલેરા એક્સપ્રેસવે",
    category: "expressway",
    coordinates: [22.2695, 72.0135],
    distance: "250 m",
    driveTime: "2 min",
    group: "transit",
    icon: "🛣️",
    highlight: true,
    description: "10-lane high-speed expressway corridor connecting directly to Ahmedabad in 45-50 minutes and Bhavnagar in 70 minutes."
  },
  {
    id: "aakru-village",
    name: "Aakru Village & Gram Panchayat",
    nameGujarati: "આકરુ ગામ",
    category: "village",
    coordinates: [22.2642, 72.0028],
    distance: "600 m",
    driveTime: "2 min",
    group: "local",
    icon: "🏡",
    description: "Neighboring historic village center of Aakru with local shops, agricultural supplies, and gram panchayat civic administration."
  },
  {
    id: "chamunda-temple",
    name: "Shree Chamunda Mataji Mandir, Aakru",
    nameGujarati: "શ્રી ચામુંડા માતાજી મંદિર (આકરુ)",
    category: "temple",
    coordinates: [22.2635, 72.0045],
    distance: "500 m",
    driveTime: "Walking (3 min)",
    group: "local",
    icon: "🛕",
    description: "Revered spiritual landmark in Aakru village with serene temple grounds and devotional community gatherings."
  },
  {
    id: "meldi-temple",
    name: "Shree Meldi Mataji Mandir, Aakru",
    nameGujarati: "શ્રી મેલડી માતાજી મંદિર",
    category: "temple",
    coordinates: [22.2658, 72.0015],
    distance: "700 m",
    driveTime: "Walking (4 min)",
    group: "local",
    icon: "🛕",
    description: "Prominent heritage village temple known for traditional festivals and peaceful surroundings."
  },
  {
    id: "aakru-school",
    name: "Aakru Primary School & Ground",
    nameGujarati: "સરકારી પ્રાથમિક શાળા, આકરુ",
    category: "civic",
    coordinates: [22.2648, 72.0035],
    distance: "550 m",
    driveTime: "Walking (4 min)",
    group: "local",
    icon: "🏫",
    description: "Government primary educational campus and playground serving local students and families."
  },
  {
    id: "aakru-lake",
    name: "Aakru Gram Talav (Lake)",
    nameGujarati: "આકરુ તળાવ",
    category: "nature",
    coordinates: [22.2625, 72.0060],
    distance: "450 m",
    driveTime: "Walking (3 min)",
    group: "local",
    icon: "🌊",
    description: "Natural scenic village freshwater lake contributing to groundwater recharge and breezy micro-climate."
  },
  {
    id: "metro-rail",
    name: "Proposed Dholera Metro / Rail Transit Station",
    nameGujarati: "ધોલેરા મેટ્રો સ્ટેશન",
    category: "transport",
    coordinates: [22.2618, 72.0160],
    distance: "1.2 km",
    driveTime: "4 min / Walking",
    group: "transit",
    icon: "🚆",
    highlight: true,
    description: "High-speed MRTS and freight rail link connected to Ahmedabad, GIFT City, and Dholera International Airport."
  },
  {
    id: "dholera-metro-city",
    name: "Dholera Metro City",
    nameGujarati: "ધોલેરા મેટ્રો સિટી",
    category: "project",
    coordinates: [22.2720, 72.0180],
    distance: "1.5 km",
    driveTime: "3–4 min",
    group: "local",
    icon: "🏗️",
    description: "Prominent planned residential plotting enclave situated alongside the expressway corridor."
  },
  {
    id: "cher-village",
    name: "Cher Village & Commercial Hub",
    nameGujarati: "ચેર ગામ અને બજાર",
    category: "village",
    coordinates: [22.2530, 72.0290],
    distance: "2.5 km",
    driveTime: "4–5 min",
    group: "local",
    icon: "🏘️",
    description: "Active local crossroads market offering supermarkets, pharmacies, fuel stations, and everyday retail."
  },
  {
    id: "otariya-village",
    name: "Otariya Village",
    nameGujarati: "ઓતરીયા",
    category: "village",
    coordinates: [22.2890, 72.0150],
    distance: "2.6 km",
    driveTime: "5 min",
    group: "local",
    icon: "🏡",
    description: "Well-established agrarian village settlement along the northbound route toward Dhandhuka."
  },
  {
    id: "sandhida-village",
    name: "Sandhida Village",
    nameGujarati: "સાંઢીડા",
    category: "village",
    coordinates: [22.2410, 71.9890],
    distance: "3.5 km",
    driveTime: "6 min",
    group: "local",
    icon: "🏡",
    description: "Rural settlement on the western peripheral boundary of Dholera SIR."
  },
  {
    id: "riverfront",
    name: "Dholera Artificial Riverfront Promenade",
    nameGujarati: "ધોલેરા રિવરફ્રન્ટ",
    category: "nature",
    coordinates: [22.2470, 72.1150],
    distance: "9 km",
    driveTime: "12 min",
    group: "smartcity",
    icon: "⛵",
    description: "Magnificent civic riverfront promenade designed along the Dholera canal system with botanical walkways and boating."
  },
  {
    id: "valinda",
    name: "Valinda Junction (TP-2)",
    nameGujarati: "વાલિંદા જંક્શન",
    category: "village",
    coordinates: [22.2350, 72.1710],
    distance: "12 km",
    driveTime: "14 min",
    group: "local",
    icon: "🏡",
    description: "Key transit junction connecting Town Planning Scheme 2 and eastern smart city industrial sectors."
  },
  {
    id: "abcd-hq",
    name: "ABCD Building (Admin Headquarters)",
    nameGujarati: "એબીસીડી બિલ્ડિંગ (કમાન્ડ સેન્ટર)",
    category: "admin",
    coordinates: [22.2530, 72.1950],
    distance: "18 km",
    driveTime: "15 min",
    group: "smartcity",
    icon: "🏢",
    highlight: true,
    description: "Central administrative headquarters of Dholera Special Investment Region (DSIRDA) and smart city command center."
  },
  {
    id: "tp1-activation",
    name: "Knowledge & IT Zone / Activation Area (TP-1)",
    nameGujarati: "ટીપી-૧ નોલેજ અને આઈટી ઝોન",
    category: "city",
    coordinates: [22.2750, 72.1800],
    distance: "16 km",
    driveTime: "15 min",
    group: "smartcity",
    icon: "💡",
    description: "Fully serviced Smart City core with underground utilities, SCADA controls, fiber-optic backbone, and IT hubs."
  },
  {
    id: "city-centre",
    name: "Dholera City Centre (TP-1 CBD)",
    nameGujarati: "ધોલેરા સિટી સેન્ટર",
    category: "city",
    coordinates: [22.2850, 72.2100],
    distance: "19 km",
    driveTime: "18 min",
    group: "smartcity",
    icon: "🏙️",
    description: "Commercial downtown with retail, corporate offices, hotels, financial centers, and luxury lifestyle arenas."
  },
  {
    id: "tata-semiconductor",
    name: "Tata Semiconductor Mega-Fab ($11B Plant)",
    nameGujarati: "ટાટા સેમિકન્ડક્ટર પ્લાન્ટ",
    category: "industrial",
    coordinates: [22.3100, 72.1900],
    distance: "18 km",
    driveTime: "16 min",
    group: "industry",
    icon: "🔬",
    highlight: true,
    description: "India's landmark $11 Billion semiconductor chip fabrication facility by Tata Electronics creating 50,000+ high-tech jobs."
  },
  {
    id: "dholera-airport",
    name: "Dholera International Airport (DIA Navagam)",
    nameGujarati: "ધોલેરા ઇન્ટરનેશનલ એરપોર્ટ",
    category: "airport",
    coordinates: [22.3800, 72.1800],
    distance: "21 km",
    driveTime: "20 min",
    group: "industry",
    icon: "✈️",
    highlight: true,
    description: "Greenfield international cargo and passenger airport with 4,000m dual runways designed for global logistics."
  },
  {
    id: "solar-park",
    name: "Dholera 5,000 MW Solar Park & 400KV Substation",
    nameGujarati: "ધોલેરા ૫૦૦૦ મેગાવોટ સોલાર પાર્ક",
    category: "infrastructure",
    coordinates: [22.1500, 72.1600],
    distance: "18 km",
    driveTime: "20 min",
    group: "smartcity",
    icon: "⚡",
    description: "One of the world's largest renewable solar energy parks providing clean sustainable power to Dholera SIR."
  },
  {
    id: "dhandhuka",
    name: "Dhandhuka Town & District Center",
    nameGujarati: "ધંધુકા તાલુકા મથક",
    category: "city",
    coordinates: [22.3700, 71.9800],
    distance: "14 km",
    driveTime: "15 min",
    group: "cities",
    icon: "🏛️",
    description: "Sub-district administrative capital with major hospitals, colleges, railway junction, banks, and commercial markets."
  },
  {
    id: "bhavnagar",
    name: "Bhavnagar City & Maritime Port",
    nameGujarati: "ભાવનગર પોર્ટ અને શહેર",
    category: "city",
    coordinates: [21.7645, 72.1519],
    distance: "60 km",
    driveTime: "70 min",
    group: "cities",
    icon: "🚢",
    description: "Historical coastal port city and regional industrial hub connected southward via SH-6 highway."
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad Metropolis",
    nameGujarati: "અમદાવાદ મહાનગર",
    category: "city",
    coordinates: [23.0225, 72.5714],
    distance: "75 km",
    driveTime: "50 min (Expressway)",
    group: "cities",
    icon: "🌆",
    description: "Gujarat's primary financial capital and international transit hub accessible in just 50 minutes via the NH-751 expressway."
  }
];

export const LINK_ROAD_CORRIDOR_GPS: [number, number][] = [
  [22.2660, 72.0085], // Township East Gate
  [22.2668, 72.0098], // Link Midpoint
  [22.2675, 72.0110], // Link Road Node
  [22.2695, 72.0135]  // NH-751 Expressway merge
];

export const METRO_CORRIDOR_GPS: [number, number][] = [
  [22.9200, 72.4800], // Ahmedabad Metro terminus
  [22.7100, 72.3100], // Bavla Station
  [22.5200, 72.1500], // Fedara Junction Station
  [22.3800, 72.1800], // Airport Metro Station
  [22.2618, 72.0160], // Dholera Metro Station (Sangrilla Meadows / Cher node)
  [22.2530, 72.1950], // ABCD Building Station
  [22.2850, 72.2100]  // City Centre CBD Station
];

export const EXPRESSWAY_CORRIDOR_GPS: [number, number][] = [
  [22.1800, 72.0800], // South Dholera SIR junction
  [22.2150, 72.0550], // Dholera Central node
  [22.2530, 72.0290], // Cher node
  [22.2695, 72.0135], // Sangrilla Meadows corridor (250m)
  [22.3100, 71.9950], // Dhandhuka interchange
  [22.3800, 72.0400], // Airport link
  [22.5200, 72.1500], // Fedara junction
  [22.7100, 72.3100], // Bavla interchange
  [22.9200, 72.4800]  // Ahmedabad Ring Road
];

export const SAN_GRILLA_MEADOWS_PLOTS: PlotUnit[] = [
  {
    "id": "plot-1",
    "plotNumber": 1,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "East",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 488.8,
      "y": 350.2,
      "width": 21.1,
      "height": 28.7
    },
    "polygonPoints": "498.4,350.2 509.9,354.8 500.3,378.9 488.8,374.3",
    "center": {
      "x": 499.4,
      "y": 364.5
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2682249,
        72.00919
      ],
      [
        22.268204,
        72.0092466
      ],
      [
        22.2680944,
        72.0091994
      ],
      [
        22.2681153,
        72.0091428
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2681599,
      "lng": 72.0091949
    }
  },
  {
    "id": "plot-2",
    "plotNumber": 2,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1050000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 476.6,
      "y": 348.1,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "486.2,348.1 496.8,352.4 487.2,376.5 476.6,372.3",
    "center": {
      "x": 486.7,
      "y": 362.3
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2682345,
        72.00913
      ],
      [
        22.2682149,
        72.0091822
      ],
      [
        22.2681053,
        72.009135
      ],
      [
        22.2681244,
        72.0090828
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2681699,
      "lng": 72.0091325
    }
  },
  {
    "id": "plot-3",
    "plotNumber": 3,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 463.2,
      "y": 344.3,
      "width": 20.1,
      "height": 28.3
    },
    "polygonPoints": "472.8,344.3 483.3,348.5 473.7,372.6 463.2,368.4",
    "center": {
      "x": 473.2,
      "y": 358.4
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2682518,
        72.0090641
      ],
      [
        22.2682327,
        72.0091158
      ],
      [
        22.268123,
        72.0090686
      ],
      [
        22.2681421,
        72.0090169
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2681876,
      "lng": 72.0090661
    }
  },
  {
    "id": "plot-4",
    "plotNumber": 4,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1200000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 451.3,
      "y": 341.1,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "460.9,341.1 471.5,345.3 461.9,369.4 451.3,365.2",
    "center": {
      "x": 461.4,
      "y": 355.3
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2682663,
        72.0090056
      ],
      [
        22.2682472,
        72.0090578
      ],
      [
        22.2681376,
        72.0090105
      ],
      [
        22.2681567,
        72.0089584
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2682017,
      "lng": 72.0090081
    }
  },
  {
    "id": "plot-5",
    "plotNumber": 5,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 120.0,
    "areaSqFt": 1080.0,
    "dimensions": "15.00 M x 6.00 M (49'-2\" x 19'-8\")",
    "pricePerSqYd": 7500,
    "totalPrice": 900000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 437.8,
      "y": 336.2,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "447.4,336.2 458.0,340.4 448.4,364.6 437.8,360.4",
    "center": {
      "x": 447.9,
      "y": 350.4
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 90.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2682886,
        72.0089392
      ],
      [
        22.2682695,
        72.0089914
      ],
      [
        22.2681594,
        72.0089442
      ],
      [
        22.2681785,
        72.008892
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.268224,
      "lng": 72.0089417
    }
  },
  {
    "id": "plot-6",
    "plotNumber": 6,
    "type": "Residential Plot",
    "status": "available",
    "facing": "North",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1066000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 425.5,
      "y": 333.3,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "435.1,333.3 445.7,337.5 436.1,361.7 425.5,357.5",
    "center": {
      "x": 435.6,
      "y": 347.5
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2683018,
        72.0088788
      ],
      [
        22.2682827,
        72.0089309
      ],
      [
        22.2681726,
        72.0088837
      ],
      [
        22.2681917,
        72.0088316
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2682372,
      "lng": 72.0088812
    }
  },
  {
    "id": "plot-7",
    "plotNumber": 7,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North-West",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 411.3,
      "y": 328.8,
      "width": 21.1,
      "height": 28.8
    },
    "polygonPoints": "420.9,328.8 432.4,333.4 422.8,357.6 411.3,353.0",
    "center": {
      "x": 421.9,
      "y": 343.2
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2683223,
        72.0088089
      ],
      [
        22.2683014,
        72.0088655
      ],
      [
        22.2681913,
        72.0088183
      ],
      [
        22.2682122,
        72.0087617
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2682568,
      "lng": 72.0088139
    }
  },
  {
    "id": "plot-8",
    "plotNumber": 8,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North-West",
    "areaSqYards": 170.5,
    "areaSqFt": 1534.5,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1278750,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 396.3,
      "y": 364.3,
      "width": 21.2,
      "height": 28.8
    },
    "polygonPoints": "405.9,364.3 417.5,368.9 407.9,393.1 396.3,388.5",
    "center": {
      "x": 406.9,
      "y": 378.7
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 127.9,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2681608,
        72.0087352
      ],
      [
        22.2681399,
        72.0087922
      ],
      [
        22.2680298,
        72.008745
      ],
      [
        22.2680507,
        72.008688
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2680953,
      "lng": 72.0087401
    }
  },
  {
    "id": "plot-9",
    "plotNumber": 9,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1200000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 407.3,
      "y": 368.7,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "416.9,368.7 427.5,372.9 417.9,397.1 407.3,392.8",
    "center": {
      "x": 417.4,
      "y": 382.9
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2681408,
        72.0087893
      ],
      [
        22.2681217,
        72.0088414
      ],
      [
        22.2680116,
        72.0087942
      ],
      [
        22.2680311,
        72.0087421
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2680762,
      "lng": 72.0087917
    }
  },
  {
    "id": "plot-10",
    "plotNumber": 10,
    "type": "Residential Plot",
    "status": "reserved",
    "facing": "North",
    "areaSqYards": 120.0,
    "areaSqFt": 1080.0,
    "dimensions": "15.00 M x 6.00 M (49'-2\" x 19'-8\")",
    "pricePerSqYd": 8200,
    "totalPrice": 984000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 418.4,
      "y": 372.9,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "428.0,372.9 438.6,377.1 429.0,401.2 418.4,397.0",
    "center": {
      "x": 428.5,
      "y": 387.1
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 90.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2681217,
        72.0088439
      ],
      [
        22.2681026,
        72.008896
      ],
      [
        22.2679929,
        72.0088488
      ],
      [
        22.268012,
        72.0087966
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2680571,
      "lng": 72.0088463
    }
  },
  {
    "id": "plot-11",
    "plotNumber": 11,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 8200,
    "totalPrice": 3600000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 430.7,
      "y": 377.8,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "440.3,377.8 450.9,382.0 441.3,406.1 430.7,401.9",
    "center": {
      "x": 440.8,
      "y": 391.9
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2680994,
        72.0089043
      ],
      [
        22.2680803,
        72.0089565
      ],
      [
        22.2679706,
        72.0089093
      ],
      [
        22.2679897,
        72.0088571
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2680352,
      "lng": 72.0089068
    }
  },
  {
    "id": "plot-12",
    "plotNumber": 12,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 8200,
    "totalPrice": 3600000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 460.6,
      "y": 389.6,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "470.2,389.6 480.8,393.8 471.2,418.0 460.6,413.8",
    "center": {
      "x": 470.7,
      "y": 403.8
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2680457,
        72.0090514
      ],
      [
        22.2680266,
        72.0091035
      ],
      [
        22.2679165,
        72.0090563
      ],
      [
        22.2679356,
        72.0090042
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2679811,
      "lng": 72.0090538
    }
  },
  {
    "id": "plot-13",
    "plotNumber": 13,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "East",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 474.2,
      "y": 395.0,
      "width": 21.1,
      "height": 28.8
    },
    "polygonPoints": "483.8,395.0 495.3,399.6 485.7,423.8 474.2,419.2",
    "center": {
      "x": 484.7,
      "y": 409.4
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2680211,
        72.0091182
      ],
      [
        22.2680002,
        72.0091748
      ],
      [
        22.2678901,
        72.0091276
      ],
      [
        22.267911,
        72.009071
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2679556,
      "lng": 72.0091227
    }
  },
  {
    "id": "plot-14",
    "plotNumber": 14,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North-East",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 464.0,
      "y": 421.2,
      "width": 21.2,
      "height": 28.7
    },
    "polygonPoints": "473.6,421.2 485.2,425.8 475.5,449.9 464.0,445.3",
    "center": {
      "x": 474.6,
      "y": 435.5
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2679019,
        72.0090681
      ],
      [
        22.267881,
        72.0091251
      ],
      [
        22.2677714,
        72.0090774
      ],
      [
        22.2677923,
        72.0090209
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2678369,
      "lng": 72.009073
    }
  },
  {
    "id": "plot-15",
    "plotNumber": 15,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 120.0,
    "areaSqFt": 1080.0,
    "dimensions": "15.00 M x 6.00 M (49'-2\" x 19'-8\")",
    "pricePerSqYd": 7500,
    "totalPrice": 900000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 450.4,
      "y": 415.8,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "460.0,415.8 470.6,420.0 461.0,444.1 450.4,439.9",
    "center": {
      "x": 460.5,
      "y": 430.0
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 90.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2679265,
        72.0090012
      ],
      [
        22.2679074,
        72.0090533
      ],
      [
        22.2677977,
        72.0090061
      ],
      [
        22.2678169,
        72.008954
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2678619,
      "lng": 72.0090037
    }
  },
  {
    "id": "plot-16",
    "plotNumber": 16,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 7500,
    "totalPrice": 975000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 420.6,
      "y": 403.9,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "430.2,403.9 440.8,408.1 431.2,432.3 420.6,428.1",
    "center": {
      "x": 430.7,
      "y": 418.1
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2679806,
        72.0088547
      ],
      [
        22.2679615,
        72.0089068
      ],
      [
        22.2678514,
        72.0088596
      ],
      [
        22.2678705,
        72.0088075
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.267916,
      "lng": 72.0088571
    }
  },
  {
    "id": "plot-17",
    "plotNumber": 17,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1050000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 408.3,
      "y": 399.0,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "417.9,399.0 428.5,403.2 418.9,427.4 408.3,423.2",
    "center": {
      "x": 418.4,
      "y": 413.2
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2680029,
        72.0087942
      ],
      [
        22.2679838,
        72.0088463
      ],
      [
        22.2678737,
        72.0087991
      ],
      [
        22.2678928,
        72.008747
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2679383,
      "lng": 72.0087966
    }
  },
  {
    "id": "plot-18",
    "plotNumber": 18,
    "type": "Residential Plot",
    "status": "reserved",
    "facing": "South",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1230000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 397.7,
      "y": 394.8,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "407.3,394.8 417.9,399.0 408.3,423.2 397.7,419.0",
    "center": {
      "x": 407.8,
      "y": 409.0
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.268022,
        72.0087421
      ],
      [
        22.2680029,
        72.0087942
      ],
      [
        22.2678928,
        72.008747
      ],
      [
        22.2679119,
        72.0086949
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2679574,
      "lng": 72.0087445
    }
  },
  {
    "id": "plot-19",
    "plotNumber": 19,
    "type": "Residential Plot",
    "status": "available",
    "facing": "North-West",
    "areaSqYards": 170.5,
    "areaSqFt": 1534.5,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 1619750,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 386.7,
      "y": 390.4,
      "width": 21.2,
      "height": 28.8
    },
    "polygonPoints": "396.3,390.4 407.9,395.0 398.3,419.2 386.7,414.6",
    "center": {
      "x": 397.3,
      "y": 404.8
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 127.9,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2680421,
        72.008688
      ],
      [
        22.2680211,
        72.008745
      ],
      [
        22.267911,
        72.0086978
      ],
      [
        22.267932,
        72.0086408
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2679765,
      "lng": 72.0086929
    }
  },
  {
    "id": "plot-20",
    "plotNumber": 20,
    "type": "Residential Plot",
    "status": "available",
    "facing": "North-West",
    "areaSqYards": 170.5,
    "areaSqFt": 1534.5,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 1619750,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 370.9,
      "y": 430.2,
      "width": 21.1,
      "height": 28.7
    },
    "polygonPoints": "380.5,430.2 392.0,434.8 382.4,458.9 370.9,454.3",
    "center": {
      "x": 381.5,
      "y": 444.6
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 127.9,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.267861,
        72.0086103
      ],
      [
        22.2678401,
        72.0086668
      ],
      [
        22.2677304,
        72.0086196
      ],
      [
        22.2677513,
        72.0085631
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2677955,
      "lng": 72.0086152
    }
  },
  {
    "id": "plot-21",
    "plotNumber": 21,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 7500,
    "totalPrice": 975000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 381.9,
      "y": 434.6,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "391.5,434.6 402.1,438.8 392.5,462.9 381.9,458.7",
    "center": {
      "x": 392.0,
      "y": 448.7
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.267841,
        72.0086644
      ],
      [
        22.2678219,
        72.0087165
      ],
      [
        22.2677122,
        72.0086693
      ],
      [
        22.2677313,
        72.0086172
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2677768,
      "lng": 72.0086668
    }
  },
  {
    "id": "plot-22",
    "plotNumber": 22,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1050000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 392.4,
      "y": 438.7,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "402.1,438.7 412.6,443.0 403.0,467.1 392.4,462.9",
    "center": {
      "x": 402.5,
      "y": 452.9
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2678223,
        72.0087165
      ],
      [
        22.2678027,
        72.0087681
      ],
      [
        22.2676931,
        72.0087209
      ],
      [
        22.2677122,
        72.0086688
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2677577,
      "lng": 72.0087185
    }
  },
  {
    "id": "plot-23",
    "plotNumber": 23,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 403.0,
      "y": 442.9,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "412.6,442.9 423.2,447.1 413.6,471.3 403.0,467.1",
    "center": {
      "x": 413.1,
      "y": 457.1
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2678032,
        72.0087681
      ],
      [
        22.2677841,
        72.0088202
      ],
      [
        22.267674,
        72.008773
      ],
      [
        22.2676931,
        72.0087209
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2677386,
      "lng": 72.0087706
    }
  },
  {
    "id": "plot-24",
    "plotNumber": 24,
    "type": "Luxurious Villa",
    "status": "reserved",
    "facing": "North",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 8200,
    "totalPrice": 3600000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 413.5,
      "y": 447.1,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "423.1,447.1 433.7,451.3 424.1,475.5 413.5,471.3",
    "center": {
      "x": 423.6,
      "y": 461.3
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2677841,
        72.0088198
      ],
      [
        22.267765,
        72.0088719
      ],
      [
        22.2676549,
        72.0088247
      ],
      [
        22.267674,
        72.0087726
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2677195,
      "lng": 72.0088222
    }
  },
  {
    "id": "plot-25",
    "plotNumber": 25,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North",
    "areaSqYards": 120.0,
    "areaSqFt": 1080.0,
    "dimensions": "15.00 M x 6.00 M (49'-2\" x 19'-8\")",
    "pricePerSqYd": 8200,
    "totalPrice": 3600000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 424.1,
      "y": 451.3,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "433.7,451.3 444.3,455.5 434.7,479.7 424.1,475.5",
    "center": {
      "x": 434.2,
      "y": 465.5
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 90.0,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.267765,
        72.0088719
      ],
      [
        22.2677459,
        72.008924
      ],
      [
        22.2676358,
        72.0088768
      ],
      [
        22.2676549,
        72.0088247
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2677004,
      "lng": 72.0088743
    }
  },
  {
    "id": "plot-26",
    "plotNumber": 26,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 7500,
    "totalPrice": 975000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 434.6,
      "y": 455.5,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "444.2,455.5 454.8,459.7 445.2,483.9 434.6,479.7",
    "center": {
      "x": 444.7,
      "y": 469.7
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2677459,
        72.0089235
      ],
      [
        22.2677268,
        72.0089756
      ],
      [
        22.2676167,
        72.0089284
      ],
      [
        22.2676358,
        72.0088763
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2676813,
      "lng": 72.008926
    }
  },
  {
    "id": "plot-27",
    "plotNumber": 27,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "East",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 448.2,
      "y": 460.9,
      "width": 21.1,
      "height": 28.8
    },
    "polygonPoints": "457.8,460.9 469.3,465.5 459.7,489.7 448.2,485.1",
    "center": {
      "x": 458.8,
      "y": 475.3
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2677213,
        72.0089904
      ],
      [
        22.2677004,
        72.0090469
      ],
      [
        22.2675903,
        72.0089997
      ],
      [
        22.2676112,
        72.0089432
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2676558,
      "lng": 72.0089953
    }
  },
  {
    "id": "plot-28",
    "plotNumber": 28,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North-East",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 438.0,
      "y": 487.0,
      "width": 21.2,
      "height": 28.8
    },
    "polygonPoints": "447.7,487.0 459.2,491.6 449.6,515.8 438.0,511.2",
    "center": {
      "x": 448.6,
      "y": 501.4
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2676026,
        72.0089407
      ],
      [
        22.2675816,
        72.0089973
      ],
      [
        22.2674715,
        72.0089501
      ],
      [
        22.2674925,
        72.008893
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2675371,
      "lng": 72.0089451
    }
  },
  {
    "id": "plot-29",
    "plotNumber": 29,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1200000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 424.5,
      "y": 481.6,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "434.1,481.6 444.7,485.9 435.0,510.0 424.5,505.8",
    "center": {
      "x": 434.6,
      "y": 495.8
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2676271,
        72.0088738
      ],
      [
        22.2676076,
        72.008926
      ],
      [
        22.2674979,
        72.0088783
      ],
      [
        22.267517,
        72.0088266
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2675625,
      "lng": 72.0088763
    }
  },
  {
    "id": "plot-30",
    "plotNumber": 30,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 120.0,
    "areaSqFt": 1080.0,
    "dimensions": "15.00 M x 6.00 M (49'-2\" x 19'-8\")",
    "pricePerSqYd": 7500,
    "totalPrice": 900000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 413.9,
      "y": 477.5,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "423.5,477.5 434.1,481.7 424.5,505.8 413.9,501.6",
    "center": {
      "x": 424.0,
      "y": 491.6
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 90.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2676458,
        72.0088217
      ],
      [
        22.2676267,
        72.0088738
      ],
      [
        22.267517,
        72.0088266
      ],
      [
        22.2675361,
        72.0087745
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2675816,
      "lng": 72.0088242
    }
  },
  {
    "id": "plot-31",
    "plotNumber": 31,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 7500,
    "totalPrice": 975000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 403.3,
      "y": 473.3,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "413.0,473.3 423.5,477.5 413.9,501.6 403.3,497.4",
    "center": {
      "x": 413.4,
      "y": 487.4
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2676649,
        72.0087701
      ],
      [
        22.2676458,
        72.0088217
      ],
      [
        22.2675361,
        72.0087745
      ],
      [
        22.2675553,
        72.0087224
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2676007,
      "lng": 72.0087721
    }
  },
  {
    "id": "plot-32",
    "plotNumber": 32,
    "type": "Residential Plot",
    "status": "available",
    "facing": "South",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1148000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 392.8,
      "y": 469.1,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "402.4,469.1 413.0,473.3 403.4,497.4 392.8,493.2",
    "center": {
      "x": 402.9,
      "y": 483.3
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.267684,
        72.008718
      ],
      [
        22.2676649,
        72.0087701
      ],
      [
        22.2675553,
        72.0087229
      ],
      [
        22.2675744,
        72.0086708
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2676194,
      "lng": 72.0087204
    }
  },
  {
    "id": "plot-33",
    "plotNumber": 33,
    "type": "Residential Plot",
    "status": "reserved",
    "facing": "South",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1230000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 382.3,
      "y": 464.9,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "391.9,464.9 402.5,469.1 392.9,493.3 382.3,489.0",
    "center": {
      "x": 392.4,
      "y": 479.1
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2677031,
        72.0086663
      ],
      [
        22.267684,
        72.0087185
      ],
      [
        22.2675739,
        72.0086713
      ],
      [
        22.2675935,
        72.0086191
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2676385,
      "lng": 72.0086688
    }
  },
  {
    "id": "plot-34",
    "plotNumber": 34,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1200000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 371.7,
      "y": 460.7,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "381.3,460.7 391.9,464.9 382.3,489.1 371.7,484.9",
    "center": {
      "x": 381.8,
      "y": 474.9
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2677222,
        72.0086142
      ],
      [
        22.2677031,
        72.0086663
      ],
      [
        22.267593,
        72.0086191
      ],
      [
        22.2676121,
        72.008567
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2676576,
      "lng": 72.0086167
    }
  },
  {
    "id": "plot-35",
    "plotNumber": 35,
    "type": "Residential Plot",
    "status": "available",
    "facing": "North-West",
    "areaSqYards": 170.5,
    "areaSqFt": 1534.5,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 1619750,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 360.7,
      "y": 456.3,
      "width": 21.1,
      "height": 28.8
    },
    "polygonPoints": "370.3,456.3 381.8,460.9 372.2,485.1 360.7,480.5",
    "center": {
      "x": 371.3,
      "y": 470.7
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 127.9,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2677422,
        72.0085601
      ],
      [
        22.2677213,
        72.0086167
      ],
      [
        22.2676112,
        72.0085695
      ],
      [
        22.2676321,
        72.0085129
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2676767,
      "lng": 72.008565
    }
  },
  {
    "id": "plot-36",
    "plotNumber": 36,
    "type": "Residential Plot",
    "status": "available",
    "facing": "North-West",
    "areaSqYards": 170.5,
    "areaSqFt": 1534.5,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 1619750,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 344.7,
      "y": 496.1,
      "width": 21.1,
      "height": 28.7
    },
    "polygonPoints": "354.3,496.1 365.8,500.6 356.2,524.8 344.7,520.2",
    "center": {
      "x": 355.2,
      "y": 510.4
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 127.9,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2675612,
        72.0084815
      ],
      [
        22.2675407,
        72.008538
      ],
      [
        22.2674306,
        72.0084908
      ],
      [
        22.2674515,
        72.0084342
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2674961,
      "lng": 72.0084859
    }
  },
  {
    "id": "plot-37",
    "plotNumber": 37,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1050000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 355.7,
      "y": 500.4,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "365.3,500.4 375.9,504.6 366.3,528.8 355.7,524.6",
    "center": {
      "x": 365.8,
      "y": 514.6
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2675416,
        72.0085355
      ],
      [
        22.2675225,
        72.0085877
      ],
      [
        22.2674124,
        72.0085405
      ],
      [
        22.2674315,
        72.0084883
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.267477,
      "lng": 72.008538
    }
  },
  {
    "id": "plot-38",
    "plotNumber": 38,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 366.2,
      "y": 504.6,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "375.8,504.6 386.4,508.8 376.8,533.0 366.2,528.8",
    "center": {
      "x": 376.3,
      "y": 518.8
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2675225,
        72.0085872
      ],
      [
        22.2675034,
        72.0086393
      ],
      [
        22.2673933,
        72.0085921
      ],
      [
        22.2674124,
        72.00854
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2674579,
      "lng": 72.0085896
    }
  },
  {
    "id": "plot-39",
    "plotNumber": 39,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 8200,
    "totalPrice": 3600000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 378.5,
      "y": 509.5,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "388.1,509.5 398.7,513.7 389.1,537.9 378.5,533.7",
    "center": {
      "x": 388.6,
      "y": 523.7
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2675002,
        72.0086477
      ],
      [
        22.2674811,
        72.0086998
      ],
      [
        22.267371,
        72.0086526
      ],
      [
        22.2673901,
        72.0086004
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2674356,
      "lng": 72.0086501
    }
  },
  {
    "id": "plot-40",
    "plotNumber": 40,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North",
    "areaSqYards": 120.0,
    "areaSqFt": 1080.0,
    "dimensions": "15.00 M x 6.00 M (49'-2\" x 19'-8\")",
    "pricePerSqYd": 8200,
    "totalPrice": 3600000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 408.5,
      "y": 521.4,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "418.1,521.4 428.7,525.6 419.0,549.8 408.5,545.5",
    "center": {
      "x": 418.6,
      "y": 535.6
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 90.0,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2674461,
        72.0087952
      ],
      [
        22.267427,
        72.0088473
      ],
      [
        22.2673169,
        72.0087996
      ],
      [
        22.2673364,
        72.008748
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2673815,
      "lng": 72.0087976
    }
  },
  {
    "id": "plot-41",
    "plotNumber": 41,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "East",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 422.0,
      "y": 526.8,
      "width": 21.2,
      "height": 28.7
    },
    "polygonPoints": "431.7,526.8 443.2,531.4 433.6,555.5 422.0,550.9",
    "center": {
      "x": 432.6,
      "y": 541.2
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2674215,
        72.008862
      ],
      [
        22.2674006,
        72.0089186
      ],
      [
        22.2672909,
        72.0088714
      ],
      [
        22.2673119,
        72.0088143
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.267356,
      "lng": 72.0088665
    }
  },
  {
    "id": "plot-42",
    "plotNumber": 42,
    "type": "Luxurious Villa",
    "status": "reserved",
    "facing": "North-East",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 411.9,
      "y": 552.9,
      "width": 21.1,
      "height": 28.8
    },
    "polygonPoints": "421.5,552.9 433.0,557.5 423.4,581.7 411.9,577.1",
    "center": {
      "x": 422.5,
      "y": 567.3
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2673028,
        72.0088119
      ],
      [
        22.2672818,
        72.0088684
      ],
      [
        22.2671717,
        72.0088212
      ],
      [
        22.2671927,
        72.0087647
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2672372,
      "lng": 72.0088168
    }
  },
  {
    "id": "plot-43",
    "plotNumber": 43,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "South",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 8200,
    "totalPrice": 3600000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 398.3,
      "y": 547.5,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "407.9,547.5 418.5,551.7 408.9,575.9 398.3,571.7",
    "center": {
      "x": 408.4,
      "y": 561.7
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2673273,
        72.008745
      ],
      [
        22.2673082,
        72.0087971
      ],
      [
        22.2671981,
        72.0087499
      ],
      [
        22.2672172,
        72.0086978
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2672627,
      "lng": 72.0087475
    }
  },
  {
    "id": "plot-44",
    "plotNumber": 44,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1200000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 368.4,
      "y": 535.6,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "378.1,535.6 388.6,539.8 379.0,564.0 368.4,559.8",
    "center": {
      "x": 378.5,
      "y": 549.8
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2673815,
        72.0085985
      ],
      [
        22.2673624,
        72.0086501
      ],
      [
        22.2672523,
        72.0086029
      ],
      [
        22.2672714,
        72.0085508
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2673169,
      "lng": 72.0086004
    }
  },
  {
    "id": "plot-45",
    "plotNumber": 45,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 120.0,
    "areaSqFt": 1080.0,
    "dimensions": "15.00 M x 6.00 M (49'-2\" x 19'-8\")",
    "pricePerSqYd": 7500,
    "totalPrice": 900000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 356.2,
      "y": 530.7,
      "width": 20.1,
      "height": 28.4
    },
    "polygonPoints": "365.8,530.7 376.3,535.0 366.7,559.1 356.2,554.9",
    "center": {
      "x": 366.2,
      "y": 544.9
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 90.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2674038,
        72.008538
      ],
      [
        22.2673842,
        72.0085896
      ],
      [
        22.2672745,
        72.0085424
      ],
      [
        22.2672937,
        72.0084908
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2673391,
      "lng": 72.00854
    }
  },
  {
    "id": "plot-46",
    "plotNumber": 46,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 7500,
    "totalPrice": 975000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 345.6,
      "y": 526.6,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "355.2,526.6 365.8,530.8 356.2,554.9 345.6,550.7",
    "center": {
      "x": 355.7,
      "y": 540.8
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2674224,
        72.0084859
      ],
      [
        22.2674033,
        72.008538
      ],
      [
        22.2672937,
        72.0084908
      ],
      [
        22.2673128,
        72.0084387
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2673578,
      "lng": 72.0084883
    }
  },
  {
    "id": "plot-47",
    "plotNumber": 47,
    "type": "Residential Plot",
    "status": "reserved",
    "facing": "North-West",
    "areaSqYards": 170.5,
    "areaSqFt": 1534.5,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 1619750,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 334.6,
      "y": 522.2,
      "width": 21.1,
      "height": 28.7
    },
    "polygonPoints": "344.2,522.2 355.7,526.8 346.1,550.9 334.6,546.3",
    "center": {
      "x": 345.2,
      "y": 536.5
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 127.9,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2674424,
        72.0084318
      ],
      [
        22.2674215,
        72.0084883
      ],
      [
        22.2673119,
        72.0084411
      ],
      [
        22.2673328,
        72.0083846
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2673774,
      "lng": 72.0084367
    }
  },
  {
    "id": "plot-48",
    "plotNumber": 48,
    "type": "Residential Plot",
    "status": "available",
    "facing": "North-West",
    "areaSqYards": 170.5,
    "areaSqFt": 1534.5,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 1619750,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 318.6,
      "y": 561.9,
      "width": 21.1,
      "height": 28.8
    },
    "polygonPoints": "328.2,561.9 339.7,566.5 330.1,590.7 318.6,586.1",
    "center": {
      "x": 329.1,
      "y": 576.3
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 127.9,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2672618,
        72.0083531
      ],
      [
        22.2672409,
        72.0084097
      ],
      [
        22.2671308,
        72.0083625
      ],
      [
        22.2671517,
        72.0083059
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2671963,
      "lng": 72.0083575
    }
  },
  {
    "id": "plot-49",
    "plotNumber": 49,
    "type": "Residential Plot",
    "status": "available",
    "facing": "North",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1312000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 329.6,
      "y": 566.3,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "339.2,566.3 349.8,570.5 340.2,594.7 329.6,590.5",
    "center": {
      "x": 339.7,
      "y": 580.5
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2672418,
        72.0084072
      ],
      [
        22.2672227,
        72.0084593
      ],
      [
        22.2671126,
        72.0084121
      ],
      [
        22.2671317,
        72.00836
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2671772,
      "lng": 72.0084097
    }
  },
  {
    "id": "plot-50",
    "plotNumber": 50,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 120.0,
    "areaSqFt": 1080.0,
    "dimensions": "15.00 M x 6.00 M (49'-2\" x 19'-8\")",
    "pricePerSqYd": 7500,
    "totalPrice": 900000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 340.0,
      "y": 570.5,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "349.6,570.5 360.2,574.7 350.6,598.9 340.0,594.7",
    "center": {
      "x": 350.1,
      "y": 584.7
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 90.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2672227,
        72.0084583
      ],
      [
        22.2672036,
        72.0085105
      ],
      [
        22.2670935,
        72.0084633
      ],
      [
        22.2671126,
        72.0084111
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2671581,
      "lng": 72.0084608
    }
  },
  {
    "id": "plot-51",
    "plotNumber": 51,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 7500,
    "totalPrice": 975000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 350.6,
      "y": 574.7,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "360.2,574.7 370.8,578.9 361.2,603.1 350.6,598.8",
    "center": {
      "x": 360.7,
      "y": 588.9
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2672036,
        72.0085105
      ],
      [
        22.2671845,
        72.0085626
      ],
      [
        22.2670744,
        72.0085154
      ],
      [
        22.2670939,
        72.0084633
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.267139,
      "lng": 72.0085129
    }
  },
  {
    "id": "plot-52",
    "plotNumber": 52,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 8200,
    "totalPrice": 3600000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 361.1,
      "y": 578.9,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "370.7,578.9 381.3,583.1 371.7,607.2 361.1,603.0",
    "center": {
      "x": 371.2,
      "y": 593.1
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2671845,
        72.0085621
      ],
      [
        22.2671654,
        72.0086142
      ],
      [
        22.2670557,
        72.008567
      ],
      [
        22.2670748,
        72.0085149
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2671199,
      "lng": 72.0085646
    }
  },
  {
    "id": "plot-53",
    "plotNumber": 53,
    "type": "Luxurious Villa",
    "status": "reserved",
    "facing": "North",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 8200,
    "totalPrice": 3600000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 371.7,
      "y": 583.1,
      "width": 20.1,
      "height": 28.3
    },
    "polygonPoints": "381.3,583.1 391.8,587.3 382.2,611.4 371.7,607.2",
    "center": {
      "x": 381.8,
      "y": 597.3
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2671654,
        72.0086142
      ],
      [
        22.2671462,
        72.0086658
      ],
      [
        22.2670366,
        72.0086186
      ],
      [
        22.2670557,
        72.008567
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2671008,
      "lng": 72.0086167
    }
  },
  {
    "id": "plot-54",
    "plotNumber": 54,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1200000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 382.2,
      "y": 587.3,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "391.8,587.3 402.4,591.5 392.8,615.6 382.2,611.4",
    "center": {
      "x": 392.3,
      "y": 601.4
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2671462,
        72.0086658
      ],
      [
        22.2671271,
        72.008718
      ],
      [
        22.2670175,
        72.0086708
      ],
      [
        22.2670366,
        72.0086186
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2670821,
      "lng": 72.0086683
    }
  },
  {
    "id": "plot-55",
    "plotNumber": 55,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "East",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 395.8,
      "y": 592.7,
      "width": 21.1,
      "height": 28.7
    },
    "polygonPoints": "405.4,592.7 416.9,597.2 407.3,621.4 395.8,616.8",
    "center": {
      "x": 406.3,
      "y": 607.0
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2671217,
        72.0087327
      ],
      [
        22.2671012,
        72.0087893
      ],
      [
        22.2669911,
        72.0087421
      ],
      [
        22.267012,
        72.0086855
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2670566,
      "lng": 72.0087371
    }
  },
  {
    "id": "plot-56",
    "plotNumber": 56,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North-East",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 385.6,
      "y": 618.8,
      "width": 21.2,
      "height": 28.7
    },
    "polygonPoints": "395.2,618.8 406.8,623.4 397.2,647.5 385.6,643.0",
    "center": {
      "x": 396.2,
      "y": 633.2
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2670029,
        72.0086826
      ],
      [
        22.266982,
        72.0087396
      ],
      [
        22.2668724,
        72.0086924
      ],
      [
        22.2668928,
        72.0086354
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2669374,
      "lng": 72.0086875
    }
  },
  {
    "id": "plot-57",
    "plotNumber": 57,
    "type": "Residential Plot",
    "status": "available",
    "facing": "South",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1148000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 372.0,
      "y": 613.4,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "381.6,613.4 392.2,617.6 382.6,641.8 372.0,637.5",
    "center": {
      "x": 382.1,
      "y": 627.6
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2670275,
        72.0086157
      ],
      [
        22.2670084,
        72.0086678
      ],
      [
        22.2668983,
        72.0086206
      ],
      [
        22.2669179,
        72.0085685
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2669629,
      "lng": 72.0086181
    }
  },
  {
    "id": "plot-58",
    "plotNumber": 58,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 361.5,
      "y": 609.2,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "371.1,609.2 381.7,613.4 372.1,637.6 361.5,633.4",
    "center": {
      "x": 371.6,
      "y": 623.4
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2670466,
        72.0085641
      ],
      [
        22.2670275,
        72.0086162
      ],
      [
        22.2669174,
        72.008569
      ],
      [
        22.2669365,
        72.0085169
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.266982,
      "lng": 72.0085665
    }
  },
  {
    "id": "plot-59",
    "plotNumber": 59,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1200000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 351.0,
      "y": 605.0,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "360.6,605.0 371.2,609.2 361.6,633.4 351.0,629.2",
    "center": {
      "x": 361.1,
      "y": 619.2
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2670657,
        72.0085124
      ],
      [
        22.2670466,
        72.0085646
      ],
      [
        22.2669365,
        72.0085173
      ],
      [
        22.2669556,
        72.0084652
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2670011,
      "lng": 72.0085149
    }
  },
  {
    "id": "plot-60",
    "plotNumber": 60,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 120.0,
    "areaSqFt": 1080.0,
    "dimensions": "15.00 M x 6.00 M (49'-2\" x 19'-8\")",
    "pricePerSqYd": 7500,
    "totalPrice": 900000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 340.4,
      "y": 600.8,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "350.0,600.8 360.6,605.0 351.0,629.2 340.4,625.0",
    "center": {
      "x": 350.5,
      "y": 615.0
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 90.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2670848,
        72.0084603
      ],
      [
        22.2670657,
        72.0085124
      ],
      [
        22.2669556,
        72.0084652
      ],
      [
        22.2669747,
        72.0084131
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2670202,
      "lng": 72.0084628
    }
  },
  {
    "id": "plot-61",
    "plotNumber": 61,
    "type": "Residential Plot",
    "status": "available",
    "facing": "South",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1066000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 329.9,
      "y": 596.6,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "339.5,596.6 350.1,600.8 340.5,625.0 329.9,620.8",
    "center": {
      "x": 340.0,
      "y": 610.8
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2671039,
        72.0084087
      ],
      [
        22.2670848,
        72.0084608
      ],
      [
        22.2669747,
        72.0084136
      ],
      [
        22.2669938,
        72.0083615
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2670393,
      "lng": 72.0084111
    }
  },
  {
    "id": "plot-62",
    "plotNumber": 62,
    "type": "Residential Plot",
    "status": "reserved",
    "facing": "South",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1148000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 319.4,
      "y": 592.4,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "329.0,592.4 339.6,596.7 329.9,620.8 319.4,616.6",
    "center": {
      "x": 329.5,
      "y": 606.6
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.267123,
        72.008357
      ],
      [
        22.2671035,
        72.0084092
      ],
      [
        22.2669938,
        72.0083615
      ],
      [
        22.2670129,
        72.0083098
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2670584,
      "lng": 72.0083595
    }
  },
  {
    "id": "plot-63",
    "plotNumber": 63,
    "type": "Residential Plot",
    "status": "available",
    "facing": "North-West",
    "areaSqYards": 170.5,
    "areaSqFt": 1534.5,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 1619750,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 308.4,
      "y": 588.1,
      "width": 21.1,
      "height": 28.7
    },
    "polygonPoints": "318.0,588.1 329.5,592.7 319.9,616.8 308.4,612.2",
    "center": {
      "x": 318.9,
      "y": 602.4
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 127.9,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2671426,
        72.008303
      ],
      [
        22.2671217,
        72.0083595
      ],
      [
        22.267012,
        72.0083123
      ],
      [
        22.267033,
        72.0082557
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2670775,
      "lng": 72.0083074
    }
  },
  {
    "id": "plot-64",
    "plotNumber": 64,
    "type": "Residential Plot",
    "status": "available",
    "facing": "North-West",
    "areaSqYards": 170.5,
    "areaSqFt": 1534.5,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 1619750,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 292.3,
      "y": 627.8,
      "width": 21.1,
      "height": 28.8
    },
    "polygonPoints": "301.9,627.8 313.4,632.4 303.8,656.6 292.3,652.0",
    "center": {
      "x": 302.9,
      "y": 642.2
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 127.9,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.266962,
        72.0082238
      ],
      [
        22.2669411,
        72.0082803
      ],
      [
        22.266831,
        72.0082331
      ],
      [
        22.2668519,
        72.0081766
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2668965,
      "lng": 72.0082287
    }
  },
  {
    "id": "plot-65",
    "plotNumber": 65,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 120.0,
    "areaSqFt": 1080.0,
    "dimensions": "15.00 M x 6.00 M (49'-2\" x 19'-8\")",
    "pricePerSqYd": 7500,
    "totalPrice": 900000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 303.3,
      "y": 632.2,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "312.9,632.2 323.5,636.4 313.9,660.6 303.3,656.3",
    "center": {
      "x": 313.4,
      "y": 646.4
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 90.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.266942,
        72.0082779
      ],
      [
        22.2669229,
        72.00833
      ],
      [
        22.2668128,
        72.0082828
      ],
      [
        22.2668323,
        72.0082307
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2668774,
      "lng": 72.0082803
    }
  },
  {
    "id": "plot-66",
    "plotNumber": 66,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 7500,
    "totalPrice": 975000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 313.9,
      "y": 636.4,
      "width": 20.1,
      "height": 28.3
    },
    "polygonPoints": "323.5,636.4 334.0,640.6 324.4,664.7 313.9,660.5",
    "center": {
      "x": 324.0,
      "y": 650.6
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2669229,
        72.00833
      ],
      [
        22.2669038,
        72.0083816
      ],
      [
        22.2667941,
        72.0083344
      ],
      [
        22.2668132,
        72.0082828
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2668583,
      "lng": 72.0083325
    }
  },
  {
    "id": "plot-67",
    "plotNumber": 67,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 8200,
    "totalPrice": 3600000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 326.1,
      "y": 641.3,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "335.8,641.3 346.3,645.5 336.7,669.6 326.1,665.4",
    "center": {
      "x": 336.2,
      "y": 655.5
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2669006,
        72.0083905
      ],
      [
        22.2668815,
        72.0084421
      ],
      [
        22.2667718,
        72.0083949
      ],
      [
        22.2667909,
        72.0083428
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.266836,
      "lng": 72.0083924
    }
  },
  {
    "id": "plot-68",
    "plotNumber": 68,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 8200,
    "totalPrice": 3600000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 356.0,
      "y": 653.1,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "365.6,653.1 376.2,657.3 366.6,681.5 356.0,677.3",
    "center": {
      "x": 366.1,
      "y": 667.3
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2668469,
        72.008537
      ],
      [
        22.2668278,
        72.0085891
      ],
      [
        22.2667177,
        72.0085419
      ],
      [
        22.2667368,
        72.0084898
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2667823,
      "lng": 72.0085395
    }
  },
  {
    "id": "plot-69",
    "plotNumber": 69,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "East",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 369.6,
      "y": 658.5,
      "width": 21.1,
      "height": 28.8
    },
    "polygonPoints": "379.2,658.5 390.7,663.1 381.1,687.3 369.6,682.7",
    "center": {
      "x": 380.2,
      "y": 672.9
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2668223,
        72.0086039
      ],
      [
        22.2668014,
        72.0086604
      ],
      [
        22.2666913,
        72.0086132
      ],
      [
        22.2667122,
        72.0085567
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2667568,
      "lng": 72.0086088
    }
  },
  {
    "id": "plot-70",
    "plotNumber": 70,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North-East",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 359.4,
      "y": 684.7,
      "width": 21.2,
      "height": 28.7
    },
    "polygonPoints": "369.0,684.7 380.6,689.3 370.9,713.4 359.4,708.8",
    "center": {
      "x": 370.0,
      "y": 699.0
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2667031,
        72.0085537
      ],
      [
        22.2666822,
        72.0086108
      ],
      [
        22.2665725,
        72.0085631
      ],
      [
        22.2665935,
        72.0085065
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2666381,
      "lng": 72.0085587
    }
  },
  {
    "id": "plot-71",
    "plotNumber": 71,
    "type": "Residential Plot",
    "status": "reserved",
    "facing": "South",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1066000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 345.8,
      "y": 679.3,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "355.4,679.3 366.0,683.5 356.4,707.6 345.8,703.4",
    "center": {
      "x": 355.9,
      "y": 693.5
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2667277,
        72.0084869
      ],
      [
        22.2667086,
        72.008539
      ],
      [
        22.2665989,
        72.0084918
      ],
      [
        22.266618,
        72.0084397
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2666631,
      "lng": 72.0084893
    }
  },
  {
    "id": "plot-72",
    "plotNumber": 72,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1050000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 316.0,
      "y": 667.4,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "325.6,667.4 336.2,671.6 326.6,695.8 316.0,691.6",
    "center": {
      "x": 326.1,
      "y": 681.6
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2667818,
        72.0083403
      ],
      [
        22.2667627,
        72.0083924
      ],
      [
        22.2666526,
        72.0083452
      ],
      [
        22.2666717,
        72.0082931
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2667172,
      "lng": 72.0083428
    }
  },
  {
    "id": "plot-73",
    "plotNumber": 73,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 303.7,
      "y": 662.5,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "313.3,662.5 323.9,666.7 314.3,690.9 303.7,686.7",
    "center": {
      "x": 313.8,
      "y": 676.7
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2668041,
        72.0082798
      ],
      [
        22.266785,
        72.008332
      ],
      [
        22.2666749,
        72.0082848
      ],
      [
        22.266694,
        72.0082326
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2667395,
      "lng": 72.0082823
    }
  },
  {
    "id": "plot-74",
    "plotNumber": 74,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1200000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 293.1,
      "y": 658.3,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "302.7,658.3 313.3,662.5 303.7,686.7 293.1,682.5",
    "center": {
      "x": 303.2,
      "y": 672.5
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2668232,
        72.0082277
      ],
      [
        22.2668041,
        72.0082798
      ],
      [
        22.266694,
        72.0082326
      ],
      [
        22.2667131,
        72.0081805
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2667586,
      "lng": 72.0082302
    }
  },
  {
    "id": "plot-75",
    "plotNumber": 75,
    "type": "Residential Plot",
    "status": "available",
    "facing": "North-West",
    "areaSqYards": 170.5,
    "areaSqFt": 1534.5,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 1619750,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 282.1,
      "y": 653.9,
      "width": 21.2,
      "height": 28.8
    },
    "polygonPoints": "291.7,653.9 303.3,658.5 293.7,682.7 282.1,678.1",
    "center": {
      "x": 292.7,
      "y": 668.3
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 127.9,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2668432,
        72.0081736
      ],
      [
        22.2668223,
        72.0082307
      ],
      [
        22.2667122,
        72.0081835
      ],
      [
        22.2667331,
        72.0081264
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2667777,
      "lng": 72.0081785
    }
  },
  {
    "id": "plot-76",
    "plotNumber": 76,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North-West",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 255.5,
      "y": 689.5,
      "width": 21.2,
      "height": 28.7
    },
    "polygonPoints": "265.2,689.5 276.7,694.1 267.1,718.2 255.5,713.6",
    "center": {
      "x": 266.1,
      "y": 703.9
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2666813,
        72.0080433
      ],
      [
        22.2666604,
        72.0080999
      ],
      [
        22.2665507,
        72.0080527
      ],
      [
        22.2665716,
        72.0079956
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2666158,
      "lng": 72.0080478
    }
  },
  {
    "id": "plot-77",
    "plotNumber": 77,
    "type": "Residential Plot",
    "status": "available",
    "facing": "North",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1148000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 266.6,
      "y": 693.9,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "276.2,693.9 286.8,698.1 277.1,722.2 266.6,718.0",
    "center": {
      "x": 276.7,
      "y": 708.0
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2666613,
        72.0080974
      ],
      [
        22.2666422,
        72.0081495
      ],
      [
        22.2665325,
        72.0081018
      ],
      [
        22.2665516,
        72.0080502
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2665971,
      "lng": 72.0080999
    }
  },
  {
    "id": "plot-78",
    "plotNumber": 78,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 277.1,
      "y": 698.1,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "286.7,698.1 297.3,702.3 287.7,726.4 277.1,722.2",
    "center": {
      "x": 287.2,
      "y": 712.2
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2666422,
        72.008149
      ],
      [
        22.266623,
        72.0082012
      ],
      [
        22.2665134,
        72.008154
      ],
      [
        22.2665325,
        72.0081018
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.266578,
      "lng": 72.0081515
    }
  },
  {
    "id": "plot-79",
    "plotNumber": 79,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1200000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 287.6,
      "y": 702.2,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "297.2,702.2 307.8,706.5 298.2,730.6 287.6,726.4",
    "center": {
      "x": 297.7,
      "y": 716.4
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2666235,
        72.0082007
      ],
      [
        22.2666039,
        72.0082528
      ],
      [
        22.2664943,
        72.0082056
      ],
      [
        22.2665134,
        72.0081535
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2665589,
      "lng": 72.0082031
    }
  },
  {
    "id": "plot-80",
    "plotNumber": 80,
    "type": "Residential Plot",
    "status": "reserved",
    "facing": "North",
    "areaSqYards": 120.0,
    "areaSqFt": 1080.0,
    "dimensions": "15.00 M x 6.00 M (49'-2\" x 19'-8\")",
    "pricePerSqYd": 8200,
    "totalPrice": 984000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 298.2,
      "y": 706.4,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "307.8,706.4 318.4,710.6 308.8,734.8 298.2,730.6",
    "center": {
      "x": 308.3,
      "y": 720.6
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 90.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2666044,
        72.0082528
      ],
      [
        22.2665853,
        72.0083049
      ],
      [
        22.2664752,
        72.0082577
      ],
      [
        22.2664943,
        72.0082056
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2665398,
      "lng": 72.0082553
    }
  },
  {
    "id": "plot-81",
    "plotNumber": 81,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 8200,
    "totalPrice": 3600000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 308.7,
      "y": 710.6,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "318.3,710.6 328.9,714.8 319.3,739.0 308.7,734.8",
    "center": {
      "x": 318.8,
      "y": 724.8
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2665853,
        72.0083044
      ],
      [
        22.2665662,
        72.0083566
      ],
      [
        22.2664561,
        72.0083093
      ],
      [
        22.2664752,
        72.0082572
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2665207,
      "lng": 72.0083069
    }
  },
  {
    "id": "plot-82",
    "plotNumber": 82,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1050000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 319.3,
      "y": 714.8,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "328.9,714.8 339.5,719.0 329.9,743.2 319.3,739.0",
    "center": {
      "x": 329.4,
      "y": 729.0
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2665662,
        72.0083566
      ],
      [
        22.2665471,
        72.0084087
      ],
      [
        22.266437,
        72.0083615
      ],
      [
        22.2664561,
        72.0083093
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2665016,
      "lng": 72.008359
    }
  },
  {
    "id": "plot-83",
    "plotNumber": 83,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 329.8,
      "y": 719.0,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "339.4,719.0 350.0,723.2 340.4,747.4 329.8,743.2",
    "center": {
      "x": 339.9,
      "y": 733.2
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2665471,
        72.0084082
      ],
      [
        22.266528,
        72.0084603
      ],
      [
        22.2664179,
        72.0084131
      ],
      [
        22.266437,
        72.008361
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2664825,
      "lng": 72.0084106
    }
  },
  {
    "id": "plot-84",
    "plotNumber": 84,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North-East",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 343.4,
      "y": 724.4,
      "width": 21.1,
      "height": 28.8
    },
    "polygonPoints": "353.0,724.4 364.5,729.0 354.9,753.2 343.4,748.6",
    "center": {
      "x": 354.0,
      "y": 738.8
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2665225,
        72.0084751
      ],
      [
        22.2665016,
        72.0085316
      ],
      [
        22.2663915,
        72.0084844
      ],
      [
        22.2664124,
        72.0084279
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.266457,
      "lng": 72.00848
    }
  },
  {
    "id": "plot-85",
    "plotNumber": 85,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "East",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 333.3,
      "y": 750.5,
      "width": 21.1,
      "height": 28.8
    },
    "polygonPoints": "342.9,750.5 354.4,755.1 344.8,779.3 333.3,774.7",
    "center": {
      "x": 343.8,
      "y": 764.9
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2664038,
        72.0084254
      ],
      [
        22.2663828,
        72.0084819
      ],
      [
        22.2662727,
        72.0084347
      ],
      [
        22.2662937,
        72.0083782
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2663382,
      "lng": 72.0084298
    }
  },
  {
    "id": "plot-86",
    "plotNumber": 86,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 7500,
    "totalPrice": 975000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 319.7,
      "y": 745.1,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "329.3,745.1 339.9,749.4 330.3,773.5 319.7,769.3",
    "center": {
      "x": 329.8,
      "y": 759.3
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2664283,
        72.0083585
      ],
      [
        22.2664088,
        72.0084106
      ],
      [
        22.2662991,
        72.0083634
      ],
      [
        22.2663182,
        72.0083113
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2663637,
      "lng": 72.008361
    }
  },
  {
    "id": "plot-87",
    "plotNumber": 87,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1050000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 309.1,
      "y": 741.0,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "318.7,741.0 329.3,745.2 319.7,769.3 309.1,765.1",
    "center": {
      "x": 319.2,
      "y": 755.1
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.266447,
        72.0083064
      ],
      [
        22.2664279,
        72.0083585
      ],
      [
        22.2663182,
        72.0083113
      ],
      [
        22.2663373,
        72.0082592
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2663828,
      "lng": 72.0083089
    }
  },
  {
    "id": "plot-88",
    "plotNumber": 88,
    "type": "Residential Plot",
    "status": "reserved",
    "facing": "South",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1230000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 298.6,
      "y": 736.8,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "308.2,736.8 318.8,741.0 309.2,765.1 298.6,760.9",
    "center": {
      "x": 308.7,
      "y": 751.0
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2664661,
        72.0082548
      ],
      [
        22.266447,
        72.0083069
      ],
      [
        22.2663373,
        72.0082597
      ],
      [
        22.2663564,
        72.0082076
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2664015,
      "lng": 72.0082572
    }
  },
  {
    "id": "plot-89",
    "plotNumber": 89,
    "type": "Residential Plot",
    "status": "reserved",
    "facing": "South",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1312000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 288.0,
      "y": 732.6,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "297.6,732.6 308.2,736.8 298.6,760.9 288.0,756.7",
    "center": {
      "x": 298.1,
      "y": 746.8
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2664852,
        72.0082026
      ],
      [
        22.2664661,
        72.0082548
      ],
      [
        22.2663564,
        72.0082076
      ],
      [
        22.2663756,
        72.0081554
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2664206,
      "lng": 72.0082051
    }
  },
  {
    "id": "plot-90",
    "plotNumber": 90,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 120.0,
    "areaSqFt": 1080.0,
    "dimensions": "15.00 M x 6.00 M (49'-2\" x 19'-8\")",
    "pricePerSqYd": 7500,
    "totalPrice": 900000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 277.5,
      "y": 728.4,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "287.1,728.4 297.7,732.6 288.1,756.8 277.5,752.5",
    "center": {
      "x": 287.6,
      "y": 742.6
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 90.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2665043,
        72.008151
      ],
      [
        22.2664852,
        72.0082031
      ],
      [
        22.2663751,
        72.0081559
      ],
      [
        22.2663947,
        72.0081038
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2664397,
      "lng": 72.0081535
    }
  },
  {
    "id": "plot-91",
    "plotNumber": 91,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 7500,
    "totalPrice": 975000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 267.0,
      "y": 724.2,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "276.6,724.2 287.2,728.4 277.6,752.6 267.0,748.4",
    "center": {
      "x": 277.1,
      "y": 738.4
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2665234,
        72.0080994
      ],
      [
        22.2665043,
        72.0081515
      ],
      [
        22.2663942,
        72.0081043
      ],
      [
        22.2664133,
        72.0080522
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2664588,
      "lng": 72.0081018
    }
  },
  {
    "id": "plot-92",
    "plotNumber": 92,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1050000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 256.4,
      "y": 720.0,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "266.0,720.0 276.6,724.2 267.0,748.4 256.4,744.2",
    "center": {
      "x": 266.5,
      "y": 734.2
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2665425,
        72.0080473
      ],
      [
        22.2665234,
        72.0080994
      ],
      [
        22.2664133,
        72.0080522
      ],
      [
        22.2664324,
        72.0080001
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2664779,
      "lng": 72.0080497
    }
  },
  {
    "id": "plot-93",
    "plotNumber": 93,
    "type": "Residential Plot",
    "status": "available",
    "facing": "North-West",
    "areaSqYards": 170.5,
    "areaSqFt": 1534.5,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 1619750,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 245.4,
      "y": 715.6,
      "width": 21.1,
      "height": 28.8
    },
    "polygonPoints": "255.0,715.6 266.5,720.2 256.9,744.4 245.4,739.8",
    "center": {
      "x": 256.0,
      "y": 730.0
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 127.9,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2665625,
        72.0079932
      ],
      [
        22.2665416,
        72.0080497
      ],
      [
        22.2664315,
        72.0080025
      ],
      [
        22.2664524,
        72.007946
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.266497,
      "lng": 72.0079981
    }
  },
  {
    "id": "plot-94",
    "plotNumber": 94,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North-West",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 229.4,
      "y": 755.4,
      "width": 21.1,
      "height": 28.7
    },
    "polygonPoints": "239.0,755.4 250.5,759.9 240.9,784.1 229.4,779.5",
    "center": {
      "x": 239.9,
      "y": 769.7
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2663815,
        72.0079145
      ],
      [
        22.266361,
        72.007971
      ],
      [
        22.2662509,
        72.0079238
      ],
      [
        22.2662718,
        72.0078673
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2663164,
      "lng": 72.0079189
    }
  },
  {
    "id": "plot-95",
    "plotNumber": 95,
    "type": "Residential Plot",
    "status": "available",
    "facing": "North",
    "areaSqYards": 120.0,
    "areaSqFt": 1080.0,
    "dimensions": "15.00 M x 6.00 M (49'-2\" x 19'-8\")",
    "pricePerSqYd": 8200,
    "totalPrice": 984000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 240.4,
      "y": 759.7,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "250.0,759.7 260.6,764.0 251.0,788.1 240.4,783.9",
    "center": {
      "x": 250.5,
      "y": 773.9
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 90.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2663619,
        72.0079686
      ],
      [
        22.2663423,
        72.0080207
      ],
      [
        22.2662327,
        72.0079735
      ],
      [
        22.2662518,
        72.0079214
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2662973,
      "lng": 72.007971
    }
  },
  {
    "id": "plot-96",
    "plotNumber": 96,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 7500,
    "totalPrice": 975000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 250.9,
      "y": 763.9,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "260.5,763.9 271.1,768.1 261.5,792.3 250.9,788.1",
    "center": {
      "x": 261.0,
      "y": 778.1
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2663428,
        72.0080202
      ],
      [
        22.2663237,
        72.0080723
      ],
      [
        22.2662136,
        72.0080251
      ],
      [
        22.2662327,
        72.007973
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2662782,
      "lng": 72.0080227
    }
  },
  {
    "id": "plot-97",
    "plotNumber": 97,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1050000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 261.5,
      "y": 768.1,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "271.1,768.1 281.7,772.3 272.0,796.5 261.5,792.3",
    "center": {
      "x": 271.6,
      "y": 782.3
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2663237,
        72.0080723
      ],
      [
        22.2663046,
        72.0081245
      ],
      [
        22.2661945,
        72.0080768
      ],
      [
        22.2662136,
        72.0080251
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2662591,
      "lng": 72.0080748
    }
  },
  {
    "id": "plot-98",
    "plotNumber": 98,
    "type": "Luxurious Villa",
    "status": "reserved",
    "facing": "North",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 8200,
    "totalPrice": 3600000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 273.8,
      "y": 773.0,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "283.4,773.0 294.0,777.2 284.3,801.4 273.8,797.2",
    "center": {
      "x": 283.9,
      "y": 787.2
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2663014,
        72.0081328
      ],
      [
        22.2662823,
        72.0081849
      ],
      [
        22.2661722,
        72.0081372
      ],
      [
        22.2661913,
        72.0080856
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2662368,
      "lng": 72.0081353
    }
  },
  {
    "id": "plot-99",
    "plotNumber": 99,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 8200,
    "totalPrice": 3600000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 303.6,
      "y": 784.9,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "313.2,784.9 323.8,789.1 314.2,813.3 303.6,809.0",
    "center": {
      "x": 313.7,
      "y": 799.1
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2662473,
        72.0082794
      ],
      [
        22.2662281,
        72.0083315
      ],
      [
        22.266118,
        72.0082843
      ],
      [
        22.2661376,
        72.0082321
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2661827,
      "lng": 72.0082818
    }
  },
  {
    "id": "plot-100",
    "plotNumber": 100,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North-East",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 315.5,
      "y": 789.4,
      "width": 21.1,
      "height": 28.7
    },
    "polygonPoints": "325.1,789.4 336.6,794.0 327.0,818.1 315.5,813.5",
    "center": {
      "x": 326.0,
      "y": 803.7
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2662268,
        72.0083379
      ],
      [
        22.2662059,
        72.0083944
      ],
      [
        22.2660962,
        72.0083472
      ],
      [
        22.2661171,
        72.0082907
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2661617,
      "lng": 72.0083423
    }
  },
  {
    "id": "plot-101",
    "plotNumber": 101,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "East",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 305.3,
      "y": 815.5,
      "width": 21.1,
      "height": 28.7
    },
    "polygonPoints": "314.9,815.5 326.4,820.1 316.8,844.2 305.3,839.7",
    "center": {
      "x": 315.9,
      "y": 829.9
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.266108,
        72.0082877
      ],
      [
        22.2660871,
        72.0083443
      ],
      [
        22.2659775,
        72.0082971
      ],
      [
        22.2659979,
        72.0082405
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2660425,
      "lng": 72.0082926
    }
  },
  {
    "id": "plot-102",
    "plotNumber": 102,
    "type": "Residential Plot",
    "status": "available",
    "facing": "South",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1148000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 294.0,
      "y": 811.0,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "303.6,811.0 314.2,815.2 304.6,839.4 294.0,835.2",
    "center": {
      "x": 304.1,
      "y": 825.2
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2661285,
        72.0082321
      ],
      [
        22.2661094,
        72.0082843
      ],
      [
        22.2659993,
        72.0082371
      ],
      [
        22.2660184,
        72.0081849
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2660639,
      "lng": 72.0082346
    }
  },
  {
    "id": "plot-103",
    "plotNumber": 103,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 264.2,
      "y": 799.1,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "273.8,799.1 284.4,803.4 274.8,827.5 264.2,823.3",
    "center": {
      "x": 274.3,
      "y": 813.3
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2661827,
        72.0080856
      ],
      [
        22.2661631,
        72.0081377
      ],
      [
        22.2660534,
        72.0080905
      ],
      [
        22.2660726,
        72.0080384
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.266118,
      "lng": 72.0080881
    }
  },
  {
    "id": "plot-104",
    "plotNumber": 104,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1200000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 251.9,
      "y": 794.3,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "261.5,794.3 272.1,798.5 262.5,822.6 251.9,818.4",
    "center": {
      "x": 262.0,
      "y": 808.4
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2662045,
        72.0080251
      ],
      [
        22.2661854,
        72.0080773
      ],
      [
        22.2660757,
        72.00803
      ],
      [
        22.2660948,
        72.0079779
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2661403,
      "lng": 72.0080276
    }
  },
  {
    "id": "plot-105",
    "plotNumber": 105,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 120.0,
    "areaSqFt": 1080.0,
    "dimensions": "15.00 M x 6.00 M (49'-2\" x 19'-8\")",
    "pricePerSqYd": 7500,
    "totalPrice": 900000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 241.3,
      "y": 790.1,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "250.9,790.1 261.5,794.3 251.9,818.4 241.3,814.2",
    "center": {
      "x": 251.4,
      "y": 804.2
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 90.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2662236,
        72.007973
      ],
      [
        22.2662045,
        72.0080251
      ],
      [
        22.2660948,
        72.0079779
      ],
      [
        22.266114,
        72.0079258
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2661595,
      "lng": 72.0079755
    }
  },
  {
    "id": "plot-106",
    "plotNumber": 106,
    "type": "Residential Plot",
    "status": "reserved",
    "facing": "South",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1066000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 230.8,
      "y": 785.9,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "240.4,785.9 251.0,790.1 241.4,814.2 230.8,810.0",
    "center": {
      "x": 240.9,
      "y": 800.1
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2662427,
        72.0079214
      ],
      [
        22.2662236,
        72.0079735
      ],
      [
        22.266114,
        72.0079263
      ],
      [
        22.2661331,
        72.0078742
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2661781,
      "lng": 72.0079238
    }
  },
  {
    "id": "plot-107",
    "plotNumber": 107,
    "type": "Residential Plot",
    "status": "available",
    "facing": "North-West",
    "areaSqYards": 170.5,
    "areaSqFt": 1534.5,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 1619750,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 219.8,
      "y": 781.5,
      "width": 21.1,
      "height": 28.7
    },
    "polygonPoints": "229.4,781.5 240.9,786.1 231.3,810.2 219.8,805.7",
    "center": {
      "x": 230.3,
      "y": 795.9
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 127.9,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2662627,
        72.0078673
      ],
      [
        22.2662418,
        72.0079238
      ],
      [
        22.2661322,
        72.0078766
      ],
      [
        22.2661526,
        72.0078201
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2661972,
      "lng": 72.0078717
    }
  },
  {
    "id": "plot-108",
    "plotNumber": 108,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North-West",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 203.7,
      "y": 821.2,
      "width": 21.2,
      "height": 28.8
    },
    "polygonPoints": "213.3,821.2 224.9,825.8 215.3,850.0 203.7,845.4",
    "center": {
      "x": 214.3,
      "y": 835.6
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2660821,
        72.0077881
      ],
      [
        22.2660612,
        72.0078452
      ],
      [
        22.2659511,
        72.007798
      ],
      [
        22.265972,
        72.0077409
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2660166,
      "lng": 72.007793
    }
  },
  {
    "id": "plot-109",
    "plotNumber": 109,
    "type": "Residential Plot",
    "status": "available",
    "facing": "North",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1312000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 214.7,
      "y": 825.6,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "224.3,825.6 234.9,829.8 225.3,854.0 214.7,849.8",
    "center": {
      "x": 224.8,
      "y": 839.8
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2660621,
        72.0078422
      ],
      [
        22.266043,
        72.0078943
      ],
      [
        22.2659329,
        72.0078471
      ],
      [
        22.265952,
        72.007795
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2659975,
      "lng": 72.0078447
    }
  },
  {
    "id": "plot-110",
    "plotNumber": 110,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 120.0,
    "areaSqFt": 1080.0,
    "dimensions": "15.00 M x 6.00 M (49'-2\" x 19'-8\")",
    "pricePerSqYd": 7500,
    "totalPrice": 900000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 225.3,
      "y": 829.8,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "234.9,829.8 245.5,834.0 235.9,858.2 225.3,854.0",
    "center": {
      "x": 235.4,
      "y": 844.0
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 90.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.266043,
        72.0078943
      ],
      [
        22.2660239,
        72.0079465
      ],
      [
        22.2659138,
        72.0078993
      ],
      [
        22.2659329,
        72.0078471
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2659784,
      "lng": 72.0078968
    }
  },
  {
    "id": "plot-111",
    "plotNumber": 111,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 7500,
    "totalPrice": 975000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 235.8,
      "y": 834.0,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "245.4,834.0 256.0,838.2 246.4,862.4 235.8,858.2",
    "center": {
      "x": 245.9,
      "y": 848.2
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2660239,
        72.007946
      ],
      [
        22.2660048,
        72.0079981
      ],
      [
        22.2658947,
        72.0079509
      ],
      [
        22.2659138,
        72.0078988
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2659593,
      "lng": 72.0079484
    }
  },
  {
    "id": "plot-112",
    "plotNumber": 112,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1050000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 246.4,
      "y": 838.2,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "256.0,838.2 266.6,842.4 257.0,866.6 246.4,862.3",
    "center": {
      "x": 256.5,
      "y": 852.4
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2660048,
        72.0079981
      ],
      [
        22.2659857,
        72.0080502
      ],
      [
        22.2658756,
        72.008003
      ],
      [
        22.2658951,
        72.0079509
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2659402,
      "lng": 72.0080005
    }
  },
  {
    "id": "plot-113",
    "plotNumber": 113,
    "type": "Residential Plot",
    "status": "available",
    "facing": "North",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1230000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 256.9,
      "y": 842.4,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "266.5,842.4 277.1,846.6 267.5,870.7 256.9,866.5",
    "center": {
      "x": 267.0,
      "y": 856.6
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2659857,
        72.0080497
      ],
      [
        22.2659665,
        72.0081018
      ],
      [
        22.2658569,
        72.0080546
      ],
      [
        22.265876,
        72.0080025
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2659211,
      "lng": 72.0080522
    }
  },
  {
    "id": "plot-114",
    "plotNumber": 114,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1200000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 267.4,
      "y": 846.6,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "277.0,846.6 287.6,850.8 278.0,874.9 267.4,870.7",
    "center": {
      "x": 277.5,
      "y": 860.8
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2659665,
        72.0081013
      ],
      [
        22.2659474,
        72.0081535
      ],
      [
        22.2658378,
        72.0081063
      ],
      [
        22.2658569,
        72.0080541
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2659019,
      "lng": 72.0081038
    }
  },
  {
    "id": "plot-115",
    "plotNumber": 115,
    "type": "Residential Plot",
    "status": "reserved",
    "facing": "North",
    "areaSqYards": 120.0,
    "areaSqFt": 1080.0,
    "dimensions": "15.00 M x 6.00 M (49'-2\" x 19'-8\")",
    "pricePerSqYd": 8200,
    "totalPrice": 984000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 278.0,
      "y": 850.8,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "287.6,850.8 298.2,855.0 288.6,879.1 278.0,874.9",
    "center": {
      "x": 288.1,
      "y": 864.9
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 90.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2659474,
        72.0081535
      ],
      [
        22.2659283,
        72.0082056
      ],
      [
        22.2658187,
        72.0081584
      ],
      [
        22.2658378,
        72.0081063
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2658833,
      "lng": 72.0081559
    }
  },
  {
    "id": "plot-116",
    "plotNumber": 116,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North-East",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 291.6,
      "y": 856.2,
      "width": 21.1,
      "height": 28.7
    },
    "polygonPoints": "301.2,856.2 312.7,860.7 303.1,884.9 291.6,880.3",
    "center": {
      "x": 302.1,
      "y": 870.5
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2659229,
        72.0082203
      ],
      [
        22.2659024,
        72.0082769
      ],
      [
        22.2657923,
        72.0082297
      ],
      [
        22.2658132,
        72.0081731
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2658578,
      "lng": 72.0082248
    }
  },
  {
    "id": "plot-117",
    "plotNumber": 117,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "East",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 281.4,
      "y": 882.3,
      "width": 21.2,
      "height": 28.7
    },
    "polygonPoints": "291.0,882.3 302.6,886.9 292.9,911.0 281.4,906.5",
    "center": {
      "x": 292.0,
      "y": 896.7
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2658041,
        72.0081702
      ],
      [
        22.2657832,
        72.0082272
      ],
      [
        22.2656736,
        72.0081795
      ],
      [
        22.265694,
        72.008123
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2657386,
      "lng": 72.0081751
    }
  },
  {
    "id": "plot-118",
    "plotNumber": 118,
    "type": "Residential Plot",
    "status": "available",
    "facing": "South",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1230000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 267.8,
      "y": 876.9,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "277.4,876.9 288.0,881.1 278.4,905.3 267.8,901.1",
    "center": {
      "x": 277.9,
      "y": 891.1
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2658287,
        72.0081033
      ],
      [
        22.2658096,
        72.0081554
      ],
      [
        22.2656995,
        72.0081082
      ],
      [
        22.2657186,
        72.0080561
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2657641,
      "lng": 72.0081058
    }
  },
  {
    "id": "plot-119",
    "plotNumber": 119,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1200000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 257.3,
      "y": 872.7,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "266.9,872.7 277.5,876.9 267.9,901.1 257.3,896.9",
    "center": {
      "x": 267.4,
      "y": 886.9
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2658478,
        72.0080517
      ],
      [
        22.2658287,
        72.0081038
      ],
      [
        22.2657186,
        72.0080566
      ],
      [
        22.2657377,
        72.0080045
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2657832,
      "lng": 72.0080541
    }
  },
  {
    "id": "plot-120",
    "plotNumber": 120,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 120.0,
    "areaSqFt": 1080.0,
    "dimensions": "15.00 M x 6.00 M (49'-2\" x 19'-8\")",
    "pricePerSqYd": 7500,
    "totalPrice": 900000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 246.8,
      "y": 868.5,
      "width": 20.1,
      "height": 28.4
    },
    "polygonPoints": "256.4,868.5 266.9,872.7 257.3,896.9 246.8,892.7",
    "center": {
      "x": 256.9,
      "y": 882.7
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 90.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2658669,
        72.0080001
      ],
      [
        22.2658478,
        72.0080517
      ],
      [
        22.2657377,
        72.0080045
      ],
      [
        22.2657568,
        72.0079528
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2658023,
      "lng": 72.0080025
    }
  },
  {
    "id": "plot-121",
    "plotNumber": 121,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 7500,
    "totalPrice": 975000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 236.2,
      "y": 864.3,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "245.8,864.3 256.4,868.5 246.8,892.7 236.2,888.5",
    "center": {
      "x": 246.3,
      "y": 878.5
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.265886,
        72.0079479
      ],
      [
        22.2658669,
        72.0080001
      ],
      [
        22.2657568,
        72.0079528
      ],
      [
        22.2657759,
        72.0079007
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2658214,
      "lng": 72.0079504
    }
  },
  {
    "id": "plot-122",
    "plotNumber": 122,
    "type": "Residential Plot",
    "status": "available",
    "facing": "South",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1148000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 225.7,
      "y": 860.1,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "235.3,860.1 245.9,864.3 236.3,888.5 225.7,884.3",
    "center": {
      "x": 235.8,
      "y": 874.3
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2659051,
        72.0078963
      ],
      [
        22.265886,
        72.0079484
      ],
      [
        22.2657759,
        72.0079012
      ],
      [
        22.265795,
        72.0078491
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2658405,
      "lng": 72.0078988
    }
  },
  {
    "id": "plot-123",
    "plotNumber": 123,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 215.1,
      "y": 855.9,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "224.7,855.9 235.3,860.2 225.7,884.3 215.1,880.1",
    "center": {
      "x": 225.2,
      "y": 870.1
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2659242,
        72.0078442
      ],
      [
        22.2659047,
        72.0078963
      ],
      [
        22.265795,
        72.0078491
      ],
      [
        22.2658141,
        72.007797
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2658596,
      "lng": 72.0078466
    }
  },
  {
    "id": "plot-124",
    "plotNumber": 124,
    "type": "Residential Plot",
    "status": "reserved",
    "facing": "South",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1312000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 204.6,
      "y": 851.7,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "214.2,851.7 224.8,856.0 215.2,880.1 204.6,875.9",
    "center": {
      "x": 214.7,
      "y": 865.9
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2659433,
        72.0077925
      ],
      [
        22.2659238,
        72.0078447
      ],
      [
        22.2658141,
        72.0077975
      ],
      [
        22.2658332,
        72.0077453
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2658787,
      "lng": 72.007795
    }
  },
  {
    "id": "plot-125",
    "plotNumber": 125,
    "type": "Residential Plot",
    "status": "available",
    "facing": "North-West",
    "areaSqYards": 170.5,
    "areaSqFt": 1534.5,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 1619750,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 193.6,
      "y": 847.4,
      "width": 21.1,
      "height": 28.7
    },
    "polygonPoints": "203.2,847.4 214.7,852.0 205.1,876.1 193.6,871.5",
    "center": {
      "x": 204.1,
      "y": 861.7
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 127.9,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2659629,
        72.0077385
      ],
      [
        22.265942,
        72.007795
      ],
      [
        22.2658323,
        72.0077478
      ],
      [
        22.2658533,
        72.0076913
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2658979,
      "lng": 72.0077429
    }
  },
  {
    "id": "plot-126",
    "plotNumber": 126,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North-West",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 177.5,
      "y": 887.1,
      "width": 21.2,
      "height": 28.8
    },
    "polygonPoints": "187.2,887.1 198.7,891.7 189.1,915.9 177.5,911.3",
    "center": {
      "x": 188.1,
      "y": 901.5
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2657823,
        72.0076598
      ],
      [
        22.2657614,
        72.0077163
      ],
      [
        22.2656513,
        72.0076691
      ],
      [
        22.2656722,
        72.0076121
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2657168,
      "lng": 72.0076642
    }
  },
  {
    "id": "plot-127",
    "plotNumber": 127,
    "type": "Residential Plot",
    "status": "available",
    "facing": "North",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1148000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 188.6,
      "y": 891.5,
      "width": 20.1,
      "height": 28.4
    },
    "polygonPoints": "198.2,891.5 208.7,895.7 199.1,919.9 188.6,915.6",
    "center": {
      "x": 198.6,
      "y": 905.7
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2657623,
        72.0077139
      ],
      [
        22.2657432,
        72.0077655
      ],
      [
        22.2656331,
        72.0077183
      ],
      [
        22.2656526,
        72.0076667
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2656977,
      "lng": 72.0077158
    }
  },
  {
    "id": "plot-128",
    "plotNumber": 128,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 199.1,
      "y": 895.7,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "208.7,895.7 219.3,899.9 209.7,924.1 199.1,919.8",
    "center": {
      "x": 209.2,
      "y": 909.9
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2657432,
        72.0077655
      ],
      [
        22.2657241,
        72.0078176
      ],
      [
        22.265614,
        72.0077704
      ],
      [
        22.2656335,
        72.0077183
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2656786,
      "lng": 72.007768
    }
  },
  {
    "id": "plot-129",
    "plotNumber": 129,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "North",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1200000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 209.6,
      "y": 899.9,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "219.2,899.9 229.8,904.1 220.2,928.2 209.6,924.0",
    "center": {
      "x": 219.7,
      "y": 914.1
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2657241,
        72.0078171
      ],
      [
        22.265705,
        72.0078693
      ],
      [
        22.2655953,
        72.007822
      ],
      [
        22.2656144,
        72.0077699
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2656595,
      "lng": 72.0078196
    }
  },
  {
    "id": "plot-130",
    "plotNumber": 130,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North",
    "areaSqYards": 120.0,
    "areaSqFt": 1080.0,
    "dimensions": "15.00 M x 6.00 M (49'-2\" x 19'-8\")",
    "pricePerSqYd": 8200,
    "totalPrice": 3600000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 221.9,
      "y": 904.8,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "231.5,904.8 242.1,909.0 232.5,933.1 221.9,928.9",
    "center": {
      "x": 232.0,
      "y": 918.9
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 90.0,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2657018,
        72.0078776
      ],
      [
        22.2656827,
        72.0079297
      ],
      [
        22.265573,
        72.0078825
      ],
      [
        22.2655921,
        72.0078304
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2656376,
      "lng": 72.0078801
    }
  },
  {
    "id": "plot-131",
    "plotNumber": 131,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 8200,
    "totalPrice": 3600000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 251.8,
      "y": 916.6,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "261.4,916.6 272.0,920.8 262.4,945.0 251.8,940.8",
    "center": {
      "x": 261.9,
      "y": 930.8
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2656481,
        72.0080246
      ],
      [
        22.265629,
        72.0080768
      ],
      [
        22.2655189,
        72.0080296
      ],
      [
        22.265538,
        72.0079774
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2655835,
      "lng": 72.0080271
    }
  },
  {
    "id": "plot-132",
    "plotNumber": 132,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North-East",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 265.4,
      "y": 922.0,
      "width": 21.1,
      "height": 28.8
    },
    "polygonPoints": "275.0,922.0 286.5,926.6 276.9,950.8 265.4,946.2",
    "center": {
      "x": 275.9,
      "y": 936.4
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2656235,
        72.0080915
      ],
      [
        22.2656026,
        72.0081481
      ],
      [
        22.2654925,
        72.0081009
      ],
      [
        22.2655134,
        72.0080443
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.265558,
      "lng": 72.0080959
    }
  },
  {
    "id": "plot-133",
    "plotNumber": 133,
    "type": "Luxurious Villa",
    "status": "reserved",
    "facing": "East",
    "areaSqYards": 215.0,
    "areaSqFt": 1935.0,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 255.2,
      "y": 948.2,
      "width": 21.2,
      "height": 28.7
    },
    "polygonPoints": "264.8,948.2 276.4,952.8 266.7,976.9 255.2,972.3",
    "center": {
      "x": 265.8,
      "y": 962.5
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 161.2,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2655043,
        72.0080414
      ],
      [
        22.2654834,
        72.0080984
      ],
      [
        22.2653737,
        72.0080507
      ],
      [
        22.2653947,
        72.0079942
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2654393,
      "lng": 72.0080463
    }
  },
  {
    "id": "plot-134",
    "plotNumber": 134,
    "type": "Residential Plot",
    "status": "available",
    "facing": "South",
    "areaSqYards": 160.0,
    "areaSqFt": 1440.0,
    "dimensions": "15.00 M x 8.00 M (49'-2\" x 26'-3\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1312000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 241.6,
      "y": 942.8,
      "width": 20.2,
      "height": 28.3
    },
    "polygonPoints": "251.2,942.8 261.8,947.0 252.2,971.1 241.6,966.9",
    "center": {
      "x": 251.7,
      "y": 957.0
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 120.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2655289,
        72.0079745
      ],
      [
        22.2655098,
        72.0080266
      ],
      [
        22.2654001,
        72.0079794
      ],
      [
        22.2654192,
        72.0079273
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2654643,
      "lng": 72.0079769
    }
  },
  {
    "id": "plot-135",
    "plotNumber": 135,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 120.0,
    "areaSqFt": 1080.0,
    "dimensions": "15.00 M x 6.00 M (49'-2\" x 19'-8\")",
    "pricePerSqYd": 7500,
    "totalPrice": 900000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 211.8,
      "y": 930.9,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "221.4,930.9 232.0,935.1 222.4,959.3 211.8,955.1",
    "center": {
      "x": 221.9,
      "y": 945.1
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 90.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.265583,
        72.007828
      ],
      [
        22.2655639,
        72.0078801
      ],
      [
        22.2654538,
        72.0078329
      ],
      [
        22.2654729,
        72.0077807
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2655184,
      "lng": 72.0078304
    }
  },
  {
    "id": "plot-136",
    "plotNumber": 136,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 130.0,
    "areaSqFt": 1170.0,
    "dimensions": "15.00 M x 6.50 M (49'-2\" x 21'-4\")",
    "pricePerSqYd": 7500,
    "totalPrice": 975000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 199.5,
      "y": 926.0,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "209.1,926.0 219.7,930.2 210.1,954.4 199.5,950.2",
    "center": {
      "x": 209.6,
      "y": 940.2
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 97.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2656053,
        72.0077675
      ],
      [
        22.2655862,
        72.0078196
      ],
      [
        22.2654761,
        72.0077724
      ],
      [
        22.2654952,
        72.0077203
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2655407,
      "lng": 72.0077699
    }
  },
  {
    "id": "plot-137",
    "plotNumber": 137,
    "type": "Residential Plot",
    "status": "available",
    "facing": "South",
    "areaSqYards": 140.0,
    "areaSqFt": 1260.0,
    "dimensions": "15.00 M x 7.00 M (49'-2\" x 22'-11\")",
    "pricePerSqYd": 8200,
    "totalPrice": 1148000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 188.9,
      "y": 921.8,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "198.5,921.8 209.1,926.0 199.5,950.2 188.9,946.0",
    "center": {
      "x": 199.0,
      "y": 936.0
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 105.0,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2656244,
        72.0077153
      ],
      [
        22.2656053,
        72.0077675
      ],
      [
        22.2654952,
        72.0077203
      ],
      [
        22.2655143,
        72.0076681
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2655598,
      "lng": 72.0077178
    }
  },
  {
    "id": "plot-138",
    "plotNumber": 138,
    "type": "Residential Plot",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 150.0,
    "areaSqFt": 1350.0,
    "dimensions": "15.00 M x 7.50 M (49'-2\" x 24'-7\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1125000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 178.4,
      "y": 917.6,
      "width": 20.2,
      "height": 28.4
    },
    "polygonPoints": "188.0,917.6 198.6,921.8 189.0,946.0 178.4,941.8",
    "center": {
      "x": 188.5,
      "y": 931.8
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 112.5,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2656435,
        72.0076637
      ],
      [
        22.2656244,
        72.0077158
      ],
      [
        22.2655143,
        72.0076686
      ],
      [
        22.2655334,
        72.0076165
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2655789,
      "lng": 72.0076662
    }
  },
  {
    "id": "plot-139",
    "plotNumber": 139,
    "type": "Residential Plot",
    "status": "available",
    "facing": "North-West",
    "areaSqYards": 170.5,
    "areaSqFt": 1534.5,
    "dimensions": "15.00 M x 9.50 M (49'-2\" x 31'-2\")",
    "pricePerSqYd": 9500,
    "totalPrice": 1619750,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 167.4,
      "y": 913.2,
      "width": 21.1,
      "height": 28.8
    },
    "polygonPoints": "177.0,913.2 188.5,917.8 178.9,942.0 167.4,937.4",
    "center": {
      "x": 178.0,
      "y": 927.6
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 127.9,
    "constructionFeasibility": "G+1 Residential Independent Bunglow",
    "gpsPolygon": [
      [
        22.2656635,
        72.0076096
      ],
      [
        22.2656426,
        72.0076662
      ],
      [
        22.2655325,
        72.007619
      ],
      [
        22.2655535,
        72.0075624
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.265598,
      "lng": 72.0076145
    }
  },
  {
    "id": "plot-140",
    "plotNumber": 140,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "North-West",
    "areaSqYards": 245.0,
    "areaSqFt": 2205.0,
    "dimensions": "19.25 M x 8.00 M (63'-2\" x 26'-3\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4575000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 136.4,
      "y": 952.0,
      "width": 22.6,
      "height": 32.5
    },
    "polygonPoints": "147.4,952.0 159.0,956.6 147.9,984.5 136.4,979.9",
    "center": {
      "x": 147.7,
      "y": 968.2
    },
    "isCorner": true,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 183.8,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.265487,
        72.0074641
      ],
      [
        22.2654661,
        72.0075211
      ],
      [
        22.2653392,
        72.0074665
      ],
      [
        22.2653601,
        72.00741
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2654133,
      "lng": 72.0074656
    }
  },
  {
    "id": "plot-141",
    "plotNumber": 141,
    "type": "Luxurious Villa",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 184.2,
    "areaSqFt": 1657.8,
    "dimensions": "19.25 M x 8.00 M (63'-2\" x 26'-3\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1381500,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 152.7,
      "y": 958.5,
      "width": 21.6,
      "height": 32.1
    },
    "polygonPoints": "163.7,958.5 174.3,962.7 163.2,990.6 152.7,986.4",
    "center": {
      "x": 163.5,
      "y": 974.5
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 138.1,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2654575,
        72.0075442
      ],
      [
        22.2654383,
        72.0075963
      ],
      [
        22.2653114,
        72.0075418
      ],
      [
        22.2653305,
        72.0074901
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2653847,
      "lng": 72.0075432
    }
  },
  {
    "id": "plot-142",
    "plotNumber": 142,
    "type": "Luxurious Villa",
    "status": "reserved",
    "facing": "South",
    "areaSqYards": 184.2,
    "areaSqFt": 1657.8,
    "dimensions": "19.25 M x 8.00 M (63'-2\" x 26'-3\")",
    "pricePerSqYd": 8200,
    "totalPrice": 3663000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 167.3,
      "y": 963.9,
      "width": 21.6,
      "height": 32.1
    },
    "polygonPoints": "178.3,963.9 188.9,968.1 177.9,996.0 167.3,991.8",
    "center": {
      "x": 178.1,
      "y": 979.9
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 138.1,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2654329,
        72.007616
      ],
      [
        22.2654138,
        72.0076681
      ],
      [
        22.2652868,
        72.0076141
      ],
      [
        22.265306,
        72.0075619
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2653601,
      "lng": 72.007615
    }
  },
  {
    "id": "plot-143",
    "plotNumber": 143,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "South",
    "areaSqYards": 184.2,
    "areaSqFt": 1657.8,
    "dimensions": "19.25 M x 8.00 M (63'-2\" x 26'-3\")",
    "pricePerSqYd": 8200,
    "totalPrice": 3663000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 181.2,
      "y": 969.4,
      "width": 21.6,
      "height": 32.1
    },
    "polygonPoints": "192.2,969.4 202.8,973.6 191.7,1001.5 181.2,997.3",
    "center": {
      "x": 192.0,
      "y": 985.4
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 138.1,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2654079,
        72.0076844
      ],
      [
        22.2653888,
        72.0077365
      ],
      [
        22.2652618,
        72.0076819
      ],
      [
        22.2652809,
        72.0076303
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2653351,
      "lng": 72.0076834
    }
  },
  {
    "id": "plot-144",
    "plotNumber": 144,
    "type": "Luxurious Villa",
    "status": "booked",
    "facing": "South",
    "areaSqYards": 184.2,
    "areaSqFt": 1657.8,
    "dimensions": "19.25 M x 8.00 M (63'-2\" x 26'-3\")",
    "pricePerSqYd": 7500,
    "totalPrice": 1381500,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 195.6,
      "y": 974.0,
      "width": 21.6,
      "height": 32.1
    },
    "polygonPoints": "206.6,974.0 217.2,978.2 206.1,1006.1 195.6,1001.9",
    "center": {
      "x": 206.4,
      "y": 990.0
    },
    "isCorner": false,
    "roadAccess": "7.5 MT Internal Sector Road",
    "carpetAreaSqYards": 138.1,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2653869,
        72.0077552
      ],
      [
        22.2653678,
        72.0078073
      ],
      [
        22.2652409,
        72.0077527
      ],
      [
        22.26526,
        72.0077011
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2653141,
      "lng": 72.0077542
    }
  },
  {
    "id": "plot-145",
    "plotNumber": 145,
    "type": "Luxurious Villa",
    "status": "available",
    "facing": "East",
    "areaSqYards": 245.0,
    "areaSqFt": 2205.0,
    "dimensions": "19.25 M x 8.00 M (63'-2\" x 26'-3\")",
    "pricePerSqYd": 9500,
    "totalPrice": 4575000,
    "floorPlanImages": [
      "/assets/meadows/gf-plan.jpeg",
      "/assets/meadows/loft-floor-plan.jpeg",
      "/assets/meadows/up_res_1.jpg",
      "/assets/meadows/up_res_2.jpg",
      "/assets/meadows/front-view.jpeg",
      "/assets/meadows/living-area.jpeg",
      "/assets/meadows/bedroom.jpeg"
    ],
    "coordinates": {
      "x": 209.8,
      "y": 980.4,
      "width": 22.6,
      "height": 32.5
    },
    "polygonPoints": "220.9,980.4 232.4,985.0 221.4,1012.9 209.8,1008.3",
    "center": {
      "x": 221.1,
      "y": 996.7
    },
    "isCorner": true,
    "roadAccess": "12 MT Main Spine Road",
    "carpetAreaSqYards": 183.8,
    "constructionFeasibility": "Ground + 1 Floor + Terrace Villa",
    "gpsPolygon": [
      [
        22.2653578,
        72.0078255
      ],
      [
        22.2653369,
        72.007882
      ],
      [
        22.26521,
        72.007828
      ],
      [
        22.2652309,
        72.0077709
      ]
    ],
    "gpsCoordinates": {
      "lat": 22.2652837,
      "lng": 72.0078265
    }
  }
];

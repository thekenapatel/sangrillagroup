/**
 * Avirahi City, Dholera Smart City - GIS Dataset & Vector Topology
 * Realistic 1,250 Vector Plot Polygons, TP Schemes, Infrastructure Nodes, & Amenities
 * High-precision WGS84 Geodetic Coordinates (lng, lat)
 */

export type PlotStatus = 'available' | 'sold' | 'reserved';
export type PlotFacing = 'North' | 'East' | 'South' | 'West' | 'North-East' | 'North-West' | 'South-East' | 'South-West';

export interface AvirahiPlotUnit {
  id: string;
  plotNumber: number;
  sector: string;
  sectorName: string;
  block: string;
  status: PlotStatus;
  areaSqYards: number;
  areaSqFt: number;
  areaSqMtr: number;
  dimensions: string;
  dimensionsMeter: string;
  facing: PlotFacing;
  roadWidth: string;
  isCorner: boolean;
  isParkFacing: boolean;
  isLakeFacing: boolean;
  vastuCompliant: boolean;
  pricePerSqYd: number;
  totalPrice: number;
  estimatedEmi: number;
  coordinates: [number, number][]; // [lng, lat] closed polygon
  center: [number, number]; // [lng, lat]
}

export interface AmenityZone {
  id: string;
  name: string;
  category: 'clubhouse' | 'lake' | 'park' | 'sports' | 'commercial' | 'utility';
  areaAcres: number;
  description: string;
  coordinates: [number, number][];
  center: [number, number];
  icon: string;
}

export interface TPSchemeBoundary {
  id: string;
  name: string;
  code: string;
  areaSqKm: number;
  focus: string;
  status: string;
  color: string;
  coordinates: [number, number][];
  center: [number, number];
}

export interface InfrastructureNode {
  id: string;
  name: string;
  category: 'airport' | 'expressway' | 'admin' | 'metro' | 'industrial' | 'solar';
  distanceKm: number;
  driveTimeMins: number;
  coordinates: [number, number]; // [lng, lat]
  description: string;
  badge: string;
}

export interface TownshipRoad {
  id: string;
  name: string;
  widthMeters: number;
  type: 'arterial' | 'boulevard' | 'sector';
  coordinates: [number, number][];
}

// Township Geographic Center & Extents
// Situated near Valinda Village / TP2 corridor, Dholera SIR
export const AVIRAHI_CITY_META = {
  projectName: "Sangrilla Meadows Plan",
  projectTagline: "Dholera Smart City (SIR)",
  subtitle: "Master Planned Residential & Villa Plotting Demarcation",
  reraApproved: "Approved (PR/GJ/AHMEDABAD/DHOLERA/RAA09921)",
  taluka: "Dhandhuka / Dholera Taluka",
  district: "Ahmedabad, Gujarat 382455",
  center: [72.1855, 22.2185] as [number, number], // [lng, lat]
  initialZoom: 16.2,
  minZoom: 11,
  maxZoom: 21,
  pitch: 45,
  bearing: -15,
  bounds: [
    [72.1720, 22.2060], // Southwest
    [72.1990, 22.2310]  // Northeast
  ] as [[number, number], [number, number]],
  totalPlots: 1250,
  townshipAcres: 170,
  contactPhone: "+91 99042 99977",
  whatsappNumber: "919904299977",
  officeAddress: "Sangrilla Meadows Site Office, Dholera-Bhavnagar Expressway Junction, Valinda, Dholera SIR, Gujarat 382455"
};

// Seeded pseudorandom generator for deterministic, consistent attributes
function createSeededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Generate 1,250 realistic vector plot polygons organized across 5 Sectors
 * adhering strictly to standard GIS urban planning geometry.
 */
function generateAvirahiPlots(): AvirahiPlotUnit[] {
  const plots: AvirahiPlotUnit[] = [];
  const rand = createSeededRandom(42991);

  // Geographic anchor
  const originLng = 72.1775;
  const originLat = 22.2110;

  // Degrees per meter at latitude ~22.22° N
  const degPerMeterLat = 0.000009033;
  const degPerMeterLng = 0.000009712;

  // Sector configurations (5 Sectors, 250 plots each = 1,250 plots total)
  const sectorConfigs = [
    {
      sector: "Sector 1",
      sectorName: "Royal Palms Enclave",
      baseStartNum: 1,
      offsetX: 0,
      offsetY: 0,
      baseAreaMin: 350,
      baseAreaMax: 550,
      priceRate: 9200,
      roadDefault: "12m Internal Road"
    },
    {
      sector: "Sector 2",
      sectorName: "Boulevard Greens",
      baseStartNum: 251,
      offsetX: 420,
      offsetY: 0,
      baseAreaMin: 400,
      baseAreaMax: 650,
      priceRate: 9800,
      roadDefault: "18m Boulevard Avenue"
    },
    {
      sector: "Sector 3",
      sectorName: "Lakeview Precinct",
      baseStartNum: 501,
      offsetX: 420,
      offsetY: 420,
      baseAreaMin: 450,
      baseAreaMax: 750,
      priceRate: 11200,
      roadDefault: "18m Waterfront Boulevard"
    },
    {
      sector: "Sector 4",
      sectorName: "Signature Grand Estates",
      baseStartNum: 751,
      offsetX: 0,
      offsetY: 420,
      baseAreaMin: 500,
      baseAreaMax: 900,
      priceRate: 12500,
      roadDefault: "24m Grand Arterial Spine"
    },
    {
      sector: "Sector 5",
      sectorName: "Expressway Commercial & Frontline",
      baseStartNum: 1001,
      offsetX: 210,
      offsetY: 840,
      baseAreaMin: 350,
      baseAreaMax: 850,
      priceRate: 10800,
      roadDefault: "24m Arterial Spine"
    }
  ];

  sectorConfigs.forEach((cfg) => {
    // 10 blocks per sector, 25 plots per block (10 x 25 = 250 plots)
    const blocksCount = 10;
    const plotsPerBlock = 25;

    for (let b = 0; b < blocksCount; b++) {
      const blockName = `Block ${String.fromCharCode(65 + b)}`; // Block A to J
      const blockRow = Math.floor(b / 2); // 0 to 4
      const blockCol = b % 2; // 0 or 1

      // Block local origins in meters
      const blockX = cfg.offsetX + blockCol * 190;
      const blockY = cfg.offsetY + blockRow * 80;

      for (let p = 0; p < plotsPerBlock; p++) {
        const plotIndexInSector = b * plotsPerBlock + p;
        const plotNumber = cfg.baseStartNum + plotIndexInSector;

        // Arranged in 2 rows within the block (13 plots north row, 12 plots south row)
        const isNorthRow = p < 13;
        const colInBlock = isNorthRow ? p : p - 13;

        // Plot dimensions in meters
        const plotWidthM = 13.5 + (plotNumber % 4) * 1.5; // ~13.5m to ~18m
        const plotHeightM = 22.0 + (plotNumber % 3) * 2.0; // ~22m to ~26m

        const localX = blockX + colInBlock * (plotWidthM + 1.2);
        const localY = blockY + (isNorthRow ? plotHeightM + 12 : 0); // 12m street between rows

        // Convert to GPS coordinates [lng, lat]
        const swLng = originLng + localX * degPerMeterLng;
        const swLat = originLat + localY * degPerMeterLat;

        const seLng = originLng + (localX + plotWidthM) * degPerMeterLng;
        const seLat = swLat;

        const neLng = seLng;
        const neLat = originLat + (localY + plotHeightM) * degPerMeterLat;

        const nwLng = swLng;
        const nwLat = neLat;

        // Closed polygon ring
        const coordinates: [number, number][] = [
          [Number(swLng.toFixed(7)), Number(swLat.toFixed(7))],
          [Number(seLng.toFixed(7)), Number(seLat.toFixed(7))],
          [Number(neLng.toFixed(7)), Number(neLat.toFixed(7))],
          [Number(nwLng.toFixed(7)), Number(nwLat.toFixed(7))],
          [Number(swLng.toFixed(7)), Number(swLat.toFixed(7))]
        ];

        const center: [number, number] = [
          Number(((swLng + neLng) / 2).toFixed(7)),
          Number(((swLat + neLat) / 2).toFixed(7))
        ];

        // Area in Sq. Yards (calculated from actual metric geometry, rounded nicely)
        const areaSqM = plotWidthM * plotHeightM;
        let areaSqYd = Math.round(areaSqM * 1.19599);
        // Clamp into user requirement range (350 to 900)
        areaSqYd = Math.max(350, Math.min(900, areaSqYd));

        // Corner / Special Flags
        const isCorner = colInBlock === 0 || colInBlock === 12;
        const isParkFacing = b === 2 || b === 3 || plotNumber % 11 === 0;
        const isLakeFacing = cfg.sector === "Sector 3" && isNorthRow;

        // Facing direction
        let facing: PlotFacing;
        if (isNorthRow) {
          facing = isCorner ? "North-East" : "North";
        } else {
          facing = isCorner ? "South-West" : "South";
        }
        if (plotNumber % 7 === 0) facing = "East";
        if (plotNumber % 9 === 0) facing = "West";

        // Status assignment: ~65% Available, ~25% Sold, ~10% Reserved
        let status: PlotStatus = 'available';
        const statusRand = rand();
        if (statusRand < 0.25) {
          status = 'sold';
        } else if (statusRand < 0.35) {
          status = 'reserved';
        } else {
          status = 'available';
        }

        // Special plot #104:
        // Sector 1, Plot #104 -> Available, 425 Sq. Yd, North-East facing, 12m wide road
        if (plotNumber === 104) {
          status = 'available';
          areaSqYd = 425;
          facing = 'North-East';
        }

        // Exact match for Image 1 from Naavik:
        // Plot No: 826
        // Availability: AVAILABLE
        // Area: 508 SQ. YD.
        // Size (meter): 12.50 x 23.40 x 12.50 x 23.40
        let currentWidthM = plotWidthM;
        let currentHeightM = plotHeightM;
        if (plotNumber === 826) {
          status = 'available';
          areaSqYd = 508;
          currentWidthM = 12.50;
          currentHeightM = 23.40;
        }

        const dimensionsMeter = `${currentWidthM.toFixed(2)} x ${currentHeightM.toFixed(2)} x ${currentWidthM.toFixed(2)} x ${currentHeightM.toFixed(2)}`;

        const areaSqFt = areaSqYd * 9;
        const areaSqMtr = Math.round(areaSqYd * 0.836127 * 10) / 10;

        // Realistic feet dimensions
        const widthFt = Math.round(currentWidthM * 3.28084);
        const lengthFt = Math.round(areaSqFt / widthFt);
        const dimensions = `${widthFt} ft × ${lengthFt} ft`;

        // Road width
        let roadWidth = cfg.roadDefault;
        if (isCorner) roadWidth = "18m Boulevard Corner";

        // Pricing
        let pricePerSqYd = cfg.priceRate;
        if (isCorner) pricePerSqYd += 500;
        if (isLakeFacing) pricePerSqYd += 1200;
        if (isParkFacing) pricePerSqYd += 600;

        const totalPrice = areaSqYd * pricePerSqYd;
        // Estimated monthly EMI (loan 80% @ 8.5% for 15 yrs ~ factor 0.0098)
        const estimatedEmi = Math.round((totalPrice * 0.8) * 0.00984);

        plots.push({
          id: `AVIRAHI_${plotNumber}`,
          plotNumber,
          sector: cfg.sector,
          sectorName: cfg.sectorName,
          block: blockName,
          status,
          areaSqYards: areaSqYd,
          areaSqFt,
          areaSqMtr,
          dimensions,
          dimensionsMeter,
          facing,
          roadWidth,
          isCorner,
          isParkFacing,
          isLakeFacing,
          vastuCompliant: true,
          pricePerSqYd,
          totalPrice,
          estimatedEmi,
          coordinates,
          center
        });
      }
    }
  });

  return plots;
}

export const AVIRAHI_PLOTS: AvirahiPlotUnit[] = generateAvirahiPlots();

// Amenities inside Avirahi City Township
export const AVIRAHI_AMENITIES: AmenityZone[] = [
  {
    id: "amenity_clubhouse",
    name: "The Royal Mirage Club & Resort",
    category: "clubhouse",
    areaAcres: 3.5,
    description: "Olympic Swimming Pool, Squash Courts, Gymnasium, Spa, Banquet Hall & Fine Dining Lounge",
    coordinates: [
      [72.1810, 22.2140],
      [72.1835, 22.2140],
      [72.1835, 22.2162],
      [72.1810, 22.2162],
      [72.1810, 22.2140]
    ],
    center: [72.1822, 22.2151],
    icon: "Building2"
  },
  {
    id: "amenity_lake",
    name: "Sangrilla Serene Lake & Boardwalk",
    category: "lake",
    areaAcres: 6.2,
    description: "Natural Freshwater Lake, Musical Fountain, 1.2km Jogging Track & Lotus Gazebo",
    coordinates: [
      [72.1850, 22.2165],
      [72.1885, 22.2165],
      [72.1895, 22.2195],
      [72.1845, 22.2195],
      [72.1850, 22.2165]
    ],
    center: [72.1868, 22.2180],
    icon: "Waves"
  },
  {
    id: "amenity_sports",
    name: "Township Multi-Sport Arena",
    category: "sports",
    areaAcres: 2.8,
    description: "Floodlit Tennis & Basketball Courts, Cricket Practice Nets, Skating Rink",
    coordinates: [
      [72.1810, 22.2170],
      [72.1835, 22.2170],
      [72.1835, 22.2190],
      [72.1810, 22.2190],
      [72.1810, 22.2170]
    ],
    center: [72.1822, 22.2180],
    icon: "Trophy"
  },
  {
    id: "amenity_park",
    name: "Central Botanical Zen Garden",
    category: "park",
    areaAcres: 4.0,
    description: "Open-Air Amphitheatre, Meditation Deck, 500+ Native Tree Species & Kids Play Kingdom",
    coordinates: [
      [72.1790, 22.2140],
      [72.1808, 22.2140],
      [72.1808, 22.2180],
      [72.1790, 22.2180],
      [72.1790, 22.2140]
    ],
    center: [72.1799, 22.2160],
    icon: "Trees"
  },
  {
    id: "amenity_commercial",
    name: "Sangrilla High-Street Boulevard & Retail Plaza",
    category: "commercial",
    areaAcres: 5.0,
    description: "Grocery Supermarket, Clinics, Banking ATMs, Cafes, Co-working Hub & Convenience Shops",
    coordinates: [
      [72.1810, 22.2210],
      [72.1880, 22.2210],
      [72.1880, 22.2230],
      [72.1810, 22.2230],
      [72.1810, 22.2210]
    ],
    center: [72.1845, 22.2220],
    icon: "ShoppingBag"
  }
];

// Major Roads Network
export const AVIRAHI_ROADS: TownshipRoad[] = [
  {
    id: "road_central_spine",
    name: "Sangrilla Grand Boulevard (24m)",
    widthMeters: 24,
    type: "arterial",
    coordinates: [
      [72.1770, 22.2155],
      [72.1915, 22.2155],
      [72.1930, 22.2180]
    ]
  },
  {
    id: "road_sector_avenue_1",
    name: "Palm Avenue (18m)",
    widthMeters: 18,
    type: "boulevard",
    coordinates: [
      [72.1815, 22.2105],
      [72.1815, 22.2235]
    ]
  },
  {
    id: "road_lake_promenade",
    name: "Lakefront Promenade (18m)",
    widthMeters: 18,
    type: "boulevard",
    coordinates: [
      [72.1855, 22.2105],
      [72.1855, 22.2235]
    ]
  },
  {
    id: "road_expressway_connector",
    name: "Dholera Expressway Feeder Arterial (30m)",
    widthMeters: 30,
    type: "arterial",
    coordinates: [
      [72.1760, 22.2240],
      [72.1940, 22.2240]
    ]
  }
];

// Dholera SIR Town Planning (TP) Schemes
export const DHOLERA_TP_SCHEMES: TPSchemeBoundary[] = [
  {
    id: "tp1",
    name: "Town Planning Scheme 1 (TP1)",
    code: "TP-1",
    areaSqKm: 154,
    focus: "Residential, High-Tech Parks, Public Facilities",
    status: "Infrastructure Development in Progress",
    color: "#3b82f6",
    coordinates: [
      [72.1400, 22.2800],
      [72.2300, 22.2800],
      [72.2300, 22.2300],
      [72.1400, 22.2300],
      [72.1400, 22.2800]
    ],
    center: [72.1850, 22.2550]
  },
  {
    id: "tp2",
    name: "Town Planning Scheme 2 (TP2 - Activation Area)",
    code: "TP-2 (Activation Core)",
    areaSqKm: 102,
    focus: "Administrative, ABCD Hub, Smart Logistics & Manufacturing",
    status: "Active Trunk Infrastructure (Roads, ICT, Water, Power)",
    color: "#10b981",
    coordinates: [
      [72.1600, 22.2300],
      [72.2400, 22.2300],
      [72.2400, 22.1800],
      [72.1600, 22.1800],
      [72.1600, 22.2300]
    ],
    center: [72.2000, 22.2050]
  },
  {
    id: "tp3",
    name: "Town Planning Scheme 3 (TP3)",
    code: "TP-3",
    areaSqKm: 112,
    focus: "Heavy Engineering, Logistics Hub & Seaport Link",
    status: "Under Master Phasing",
    color: "#f59e0b",
    coordinates: [
      [72.2400, 22.2500],
      [72.3100, 22.2500],
      [72.3100, 22.1900],
      [72.2400, 22.1900],
      [72.2400, 22.2500]
    ],
    center: [72.2750, 22.2200]
  },
  {
    id: "tp4",
    name: "Town Planning Scheme 4 (TP4)",
    code: "TP-4",
    areaSqKm: 88,
    focus: "Solar Park Corridor & Clean Renewable Tech",
    status: "Survey & Boundary Markings Completed",
    color: "#8b5cf6",
    coordinates: [
      [72.1500, 22.1800],
      [72.2300, 22.1800],
      [72.2300, 22.1300],
      [72.1500, 22.1300],
      [72.1500, 22.1800]
    ],
    center: [72.1900, 22.1550]
  }
];

// Surrounding Dholera SIR Infrastructure Nodes
export const DHOLERA_INFRASTRUCTURE_NODES: InfrastructureNode[] = [
  {
    id: "node_airport",
    name: "Dholera International Greenfield Airport (Navagam)",
    category: "airport",
    distanceKm: 14.5,
    driveTimeMins: 15,
    coordinates: [72.2700, 22.3600],
    description: "4,000m Dual Runway Cargo & Passenger Hub serving Dholera SIR and Ahmedabad region.",
    badge: "Under Fast-Track Execution"
  },
  {
    id: "node_abcd",
    name: "ABCD Command & Administrative Center",
    category: "admin",
    distanceKm: 7.2,
    driveTimeMins: 8,
    coordinates: [72.2150, 22.2280],
    description: "LEED Gold certified headquarters of DICDL & Smart City Central Nervous System.",
    badge: "100% Operational"
  },
  {
    id: "node_activation",
    name: "Dholera Activation Area (TP2A)",
    category: "industrial",
    distanceKm: 4.8,
    driveTimeMins: 5,
    coordinates: [72.2080, 22.2120],
    description: "22.5 sq. km prime activation core with plug-and-play gas, optic fiber, power & potable water.",
    badge: "Ready for Possession"
  },
  {
    id: "node_expressway",
    name: "Ahmedabad-Dholera 4-Lane Access-Controlled Expressway",
    category: "expressway",
    distanceKm: 2.1,
    driveTimeMins: 3,
    coordinates: [72.1920, 22.2250],
    description: "109km high-speed corridor reducing travel time from Ahmedabad to Dholera to under 45 minutes.",
    badge: "NHAI Highway Corridor"
  },
  {
    id: "node_metro",
    name: "Dholera High-Speed MRTS / Metro Link",
    category: "metro",
    distanceKm: 5.5,
    driveTimeMins: 6,
    coordinates: [72.2100, 22.2350],
    description: "Dedicated rapid rail connecting Gandhinagar, Ahmedabad, and Dholera Smart City terminal.",
    badge: "Proposed Rapid Transit"
  },
  {
    id: "node_solar",
    name: "5,000 MW Dholera Ultra-Mega Solar Park",
    category: "solar",
    distanceKm: 18.0,
    driveTimeMins: 20,
    coordinates: [72.1700, 22.1200],
    description: "World's largest single-location solar power installation providing 100% green energy.",
    badge: "Phase 1 Operational"
  }
];

/**
 * GeoJSON Conversion Utilities
 */
export function getPlotsGeoJSON(filterPredicate?: (p: AvirahiPlotUnit) => boolean): GeoJSON.FeatureCollection<GeoJSON.Polygon> {
  const targetPlots = filterPredicate ? AVIRAHI_PLOTS.filter(filterPredicate) : AVIRAHI_PLOTS;

  return {
    type: "FeatureCollection",
    features: targetPlots.map((plot) => ({
      type: "Feature",
      id: plot.plotNumber,
      geometry: {
        type: "Polygon",
        coordinates: [plot.coordinates]
      },
      properties: {
        id: plot.id,
        plotNumber: plot.plotNumber,
        sector: plot.sector,
        sectorName: plot.sectorName,
        block: plot.block,
        status: plot.status,
        areaSqYards: plot.areaSqYards,
        areaSqFt: plot.areaSqFt,
        areaSqMtr: plot.areaSqMtr,
        dimensions: plot.dimensions,
        dimensionsMeter: plot.dimensionsMeter,
        facing: plot.facing,
        roadWidth: plot.roadWidth,
        isCorner: plot.isCorner,
        isParkFacing: plot.isParkFacing,
        isLakeFacing: plot.isLakeFacing,
        vastuCompliant: plot.vastuCompliant,
        pricePerSqYd: plot.pricePerSqYd,
        totalPrice: plot.totalPrice,
        estimatedEmi: plot.estimatedEmi,
        centerLng: plot.center[0],
        centerLat: plot.center[1]
      }
    }))
  };
}

export function getAmenitiesGeoJSON(): GeoJSON.FeatureCollection<GeoJSON.Polygon> {
  return {
    type: "FeatureCollection",
    features: AVIRAHI_AMENITIES.map((amenity) => ({
      type: "Feature",
      id: amenity.id,
      geometry: {
        type: "Polygon",
        coordinates: [amenity.coordinates]
      },
      properties: {
        id: amenity.id,
        name: amenity.name,
        category: amenity.category,
        areaAcres: amenity.areaAcres,
        description: amenity.description,
        icon: amenity.icon,
        centerLng: amenity.center[0],
        centerLat: amenity.center[1]
      }
    }))
  };
}

export function getTPSchemesGeoJSON(): GeoJSON.FeatureCollection<GeoJSON.Polygon> {
  return {
    type: "FeatureCollection",
    features: DHOLERA_TP_SCHEMES.map((tp) => ({
      type: "Feature",
      id: tp.id,
      geometry: {
        type: "Polygon",
        coordinates: [tp.coordinates]
      },
      properties: {
        id: tp.id,
        name: tp.name,
        code: tp.code,
        areaSqKm: tp.areaSqKm,
        focus: tp.focus,
        status: tp.status,
        color: tp.color,
        centerLng: tp.center[0],
        centerLat: tp.center[1]
      }
    }))
  };
}

export function getRoadsGeoJSON(): GeoJSON.FeatureCollection<GeoJSON.LineString> {
  return {
    type: "FeatureCollection",
    features: AVIRAHI_ROADS.map((road) => ({
      type: "Feature",
      id: road.id,
      geometry: {
        type: "LineString",
        coordinates: road.coordinates
      },
      properties: {
        id: road.id,
        name: road.name,
        widthMeters: road.widthMeters,
        type: road.type
      }
    }))
  };
}

// Surrounding places visible when zoomed out (matching Naavik reference Image 2)
export interface SurroundingPlace {
  id: string;
  name: string;
  category: "village" | "project" | "hotel" | "temple" | "infrastructure" | "expressway";
  coordinates: [number, number]; // [lng, lat]
  tagText: string;
  icon?: string;
  badgeBg?: string;
  badgeBorder?: string;
  distance?: string;
}

export const SURROUNDING_PLACES: SurroundingPlace[] = [
  {
    id: "place_valinda",
    name: "Valinda",
    category: "village",
    coordinates: [72.1710, 22.2350],
    tagText: "Valinda / વાલિંદા",
    distance: "1.2 km"
  },
  {
    id: "place_hinglaj_sound",
    name: "Hinglaj Dj Sound Valinda",
    category: "village",
    coordinates: [72.1640, 22.2385],
    tagText: "Hinglaj Dj Sound Valinda",
    distance: "1.8 km"
  },
  {
    id: "place_bapa_sitaram",
    name: "Bapa Sitaram Madhuli Valinda",
    category: "temple",
    coordinates: [72.1765, 22.2285],
    tagText: "Bapa Sitaram Madhuli Valinda",
    distance: "1.1 km"
  },
  {
    id: "place_hippo_city",
    name: "HIPPO CITY 2",
    category: "project",
    coordinates: [72.1660, 22.2200],
    tagText: "HIPPO CITY 2",
    distance: "900m"
  },
  {
    id: "place_prarambh_city",
    name: "Prarambh City",
    category: "project",
    coordinates: [72.1680, 22.2060],
    tagText: "Prarambh City",
    distance: "800m"
  },
  {
    id: "place_dholera_metro_city",
    name: "Dholera Metro City",
    category: "project",
    coordinates: [72.1765, 22.2170],
    tagText: "Dholera Metro City",
    distance: "400m"
  },
  {
    id: "place_sangrilla_meadows",
    name: "Sangrilla Meadows",
    category: "project",
    coordinates: [72.0083, 22.2668],
    tagText: "🏛️ Sangrilla Meadows (Main Project)",
    distance: "Township"
  },
  {
    id: "place_aakru",
    name: "Aakru Village",
    category: "village",
    coordinates: [72.0028, 22.2642],
    tagText: "Aakru / આકરુ",
    distance: "600m"
  },
  {
    id: "place_chamunda_temple",
    name: "Chamunda Mata Mandir",
    category: "temple",
    coordinates: [72.0045, 22.2635],
    tagText: "Chamunda Mandir Aakru",
    distance: "500m"
  },
  {
    id: "place_metro_station",
    name: "Dholera Metro Station",
    category: "project",
    coordinates: [72.0160, 22.2618],
    tagText: "🚆 Dholera Metro Station",
    distance: "1.2 km"
  },
  {
    id: "place_tata_fab",
    name: "Tata Semiconductor Fab",
    category: "project",
    coordinates: [72.1900, 22.3100],
    tagText: "🔬 Tata Semiconductor Fab ($11B)",
    distance: "18 km"
  },
  {
    id: "place_dholera_airport",
    name: "Dholera International Airport",
    category: "project",
    coordinates: [72.1800, 22.3800],
    tagText: "✈️ Dholera Int'l Airport",
    distance: "21 km"
  },
  {
    id: "place_avirahi_city",
    name: "Avirahi City",
    category: "project",
    coordinates: [72.1855, 22.2185],
    tagText: "Avirahi City",
    distance: "Township"
  },
  {
    id: "place_expressway_corridor",
    name: "Ahmedabad - Dholera Expy",
    category: "expressway",
    coordinates: [72.1990, 22.2350],
    tagText: "Ahmedabad - Dholera Expy",
    distance: "250m"
  },
  {
    id: "place_fedra_substation",
    name: "400KV D/C FEDRA (PACHCHHAM)",
    category: "infrastructure",
    coordinates: [72.2040, 22.2320],
    tagText: "400KV D/C FEDRA (PACHCHHAM)",
    distance: "1.5 km"
  },
  {
    id: "place_aman_hotel",
    name: "Aman Hotel",
    category: "hotel",
    coordinates: [72.1990, 22.2450],
    tagText: "Aman",
    distance: "2.1 km"
  },
  {
    id: "place_ramdevpir_temple",
    name: "Jay Ramdevpir Bapa Kamatalav",
    category: "temple",
    coordinates: [72.2080, 22.2070],
    tagText: "Jay Ramdevpir Bapa Kamatalav",
    distance: "1.8 km"
  },
  {
    id: "place_bhathiji",
    name: "Bhathiii no Rafado",
    category: "temple",
    coordinates: [72.2130, 22.2060],
    tagText: "Bhathiii no Rafado",
    distance: "2.2 km"
  },
  {
    id: "place_anchor_food_park",
    name: "Anchor Food Park",
    category: "hotel",
    coordinates: [72.1730, 22.1970],
    tagText: "Anchor Food Park",
    distance: "1.6 km"
  },
  {
    id: "place_plaza",
    name: "Expressway Plaza",
    category: "infrastructure",
    coordinates: [72.1970, 22.2140],
    tagText: "Plaza",
    distance: "600m"
  },
  {
    id: "place_aaiji_village",
    name: "Aaiji Village By Aaiji",
    category: "village",
    coordinates: [72.2210, 22.2280],
    tagText: "Aaiji Village By Aaiji",
    distance: "2.5 km"
  }
];

// Polygonal boundaries for neighboring projects and zoning (matching Image 2)
export const AVIRAHI_CITY_BOUNDARY_POLYGON: [number, number][] = [
  [72.1795, 22.2110],
  [72.1930, 22.2110],
  [72.1945, 22.2245],
  [72.1865, 22.2265],
  [72.1795, 22.2205],
  [72.1795, 22.2110]
];

export const DHOLERA_METRO_CITY_POLYGON: [number, number][] = [
  [72.1735, 22.2135],
  [72.1790, 22.2135],
  [72.1790, 22.2205],
  [72.1735, 22.2205],
  [72.1735, 22.2135]
];

export const EXPRESSWAY_HIGHWAY_GPS: [number, number][] = [
  [72.1965, 22.2530],
  [72.1985, 22.2350],
  [72.2005, 22.2200],
  [72.2025, 22.2050],
  [72.2045, 22.1880]
];

export const ZONING_POLYGONS = {
  purple: [
    [72.1550, 22.1800],
    [72.2200, 22.1800],
    [72.2200, 22.2080],
    [72.1750, 22.2080],
    [72.1650, 22.2020],
    [72.1550, 22.1950],
    [72.1550, 22.1800]
  ] as [number, number][],
  cyan: [
    [72.1850, 22.2030],
    [72.1905, 22.2030],
    [72.1905, 22.2075],
    [72.1850, 22.2075],
    [72.1850, 22.2030]
  ] as [number, number][]
};


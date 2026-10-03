import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import L from "leaflet";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  MapPin,
  Trees,
  Compass,
  Plane,
  Building2,
  Car,
  Crosshair,
  Sparkles,
  Layers,
  X,
  Search,
  Navigation,
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
  Flame,
  CheckCircle2,
  ShieldCheck,
  Eye,
  Radio
} from "lucide-react";
import type { PlotUnit, CommonAmenityArea, SurroundingLandmark, LandmarkCategory } from "../../data/sangrillaMeadowsData";
import {
  COMMON_AMENITY_AREAS,
  SAN_GRILLA_MEADOWS_META,
  SURROUNDING_LANDMARKS,
  TOWNSHIP_BOUNDARY_GPS,
  EXPRESSWAY_CORRIDOR_GPS,
  LINK_ROAD_CORRIDOR_GPS,
  METRO_CORRIDOR_GPS
} from "../../data/sangrillaMeadowsData";

interface MasterPlanMapCanvasProps {
  plots: PlotUnit[];
  filteredPlotIds: Set<string>;
  selectedPlot: PlotUnit | null;
  onSelectPlot: (plot: PlotUnit) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

type MapTileStyle = "satellite" | "streets" | "dark";
type CategoryFilter = "all" | "local" | "transit" | "smartcity" | "industry" | "cities";

export const MasterPlanMapCanvas: React.FC<MasterPlanMapCanvasProps> = ({
  plots,
  filteredPlotIds,
  selectedPlot,
  onSelectPlot,
  isFullscreen,
  onToggleFullscreen
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Layer groups refs for dynamic updating without remounting map
  const tileLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const plotsLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const corridorsLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const landmarksLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const routeLineLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const blueprintOverlayRef = useRef<L.ImageOverlay | null>(null);
  const plotPolygonsMapRef = useRef<Map<number, L.Polygon>>(new Map());

  // UI States
  const [tileStyle, setTileStyle] = useState<MapTileStyle>("satellite");
  const [showBlueprint, setShowBlueprint] = useState<boolean>(true);
  const [blueprintOpacity, setBlueprintOpacity] = useState<number>(0.85);
  const [showLandmarks, setShowLandmarks] = useState<boolean>(true);
  const [showDistanceRings, setShowDistanceRings] = useState<boolean>(true);
  const [showCorridors, setShowCorridors] = useState<boolean>(true);
  const [currentZoom, setCurrentZoom] = useState<number>(18);
  const [selectedLandmark, setSelectedLandmark] = useState<SurroundingLandmark | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isExplorerOpen, setIsExplorerOpen] = useState<boolean>(false);

  // Center coordinate of Sangrilla Meadows
  const projectCenter: [number, number] = SAN_GRILLA_MEADOWS_META.centerCoordinates;

  // Filtered surrounding landmarks
  const filteredLandmarks = useMemo(() => {
    return SURROUNDING_LANDMARKS.filter((l) => {
      // 1. Category filter
      if (activeCategory !== "all") {
        if (activeCategory === "local" && l.group !== "local") return false;
        if (activeCategory === "transit" && l.group !== "transit") return false;
        if (activeCategory === "smartcity" && l.group !== "smartcity") return false;
        if (activeCategory === "industry" && l.group !== "industry") return false;
        if (activeCategory === "cities" && l.group !== "cities") return false;
      }
      // 2. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = l.name.toLowerCase().includes(q);
        const matchesGuj = l.nameGujarati?.toLowerCase().includes(q) || false;
        const matchesCategory = l.category.toLowerCase().includes(q);
        const matchesDesc = l.description.toLowerCase().includes(q);
        if (!matchesName && !matchesGuj && !matchesCategory && !matchesDesc) return false;
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  // Initialize Leaflet Map with Google Maps
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    try {
      const map = L.map(mapContainerRef.current, {
        center: projectCenter,
        zoom: SAN_GRILLA_MEADOWS_META.zoomLevel,
        minZoom: 6, // Allows zooming out to see all of Gujarat, Ahmedabad, Bhavnagar, Dholera SIR
        maxZoom: 20,
        zoomControl: false,
        attributionControl: false
      });

      mapInstanceRef.current = map;

      // Layer groups
      const tileGroup = L.layerGroup().addTo(map);
      const corridorsGroup = L.layerGroup().addTo(map);
      const plotsGroup = L.layerGroup().addTo(map);
      const routeLineGroup = L.layerGroup().addTo(map);
      const landmarksGroup = L.layerGroup().addTo(map);

      tileLayerGroupRef.current = tileGroup;
      corridorsGroupRef.current = corridorsGroup;
      plotsLayerGroupRef.current = plotsGroup;
      routeLineLayerGroupRef.current = routeLineGroup;
      landmarksLayerGroupRef.current = landmarksGroup;

      // Clean Cropped Blueprint Image Overlay (No white borders)
      const blueprint = L.imageOverlay(
        "/assets/meadows/layout_clean_cropped.png",
        [
          [22.2650, 72.0071],
          [22.2685, 72.0095]
        ],
        {
          opacity: blueprintOpacity,
          interactive: false,
          zIndex: 10
        }
      ).addTo(map);
      blueprintOverlayRef.current = blueprint;

      // Township Boundary Outline (Gold & Emerald)
      if (TOWNSHIP_BOUNDARY_GPS && TOWNSHIP_BOUNDARY_GPS.length > 0) {
        L.polygon(TOWNSHIP_BOUNDARY_GPS, {
          color: "#fbbf24",
          weight: 3.5,
          dashArray: "6, 4",
          fillColor: "#10b981",
          fillOpacity: 0.14,
          interactive: false
        }).addTo(map);
      }

      // Entrance Pin: "Sangrilla Meadows"
      const entranceIcon = L.divIcon({
        className: "custom-entrance-pin",
        html: `
          <div style="display:flex;align-items:center;gap:7px;background:linear-gradient(135deg, #064e3b 0%, #022c22 100%);color:#fef08a;padding:7px 14px;border-radius:9999px;border:2px solid #fbbf24;box-shadow:0 12px 25px rgba(0,0,0,0.8), 0 0 15px rgba(251,191,36,0.4);font-size:12px;font-weight:900;white-space:nowrap;backdrop-filter:blur(10px);cursor:pointer;user-select:none;">
            <span style="width:9px;height:9px;border-radius:9999px;background:#f59e0b;box-shadow:0 0 8px #f59e0b;"></span>
            <span>🏛️ Sangrilla Meadows Entrance</span>
          </div>
        `,
        iconSize: [210, 34],
        iconAnchor: [105, 17]
      });

      L.marker([22.2651, 72.0076], { icon: entranceIcon })
        .addTo(map)
        .on("click", () => {
          map.setView(projectCenter, 18);
        });

      map.on("zoomend", () => {
        setCurrentZoom(map.getZoom());
      });

      // Ensure Leaflet computes container dimensions after DOM paint
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 250);
    } catch (err) {
      console.error("[MasterPlanMapCanvas] Map initialization error:", err);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Corridors & Distance Circles
  useEffect(() => {
    if (!corridorsLayerGroupRef.current || !mapInstanceRef.current) return;
    corridorsLayerGroupRef.current.clearLayers();

    if (!showCorridors) return;

    // 1. 250m Connecting Link Road from Township to Expressway
    if (LINK_ROAD_CORRIDOR_GPS && LINK_ROAD_CORRIDOR_GPS.length > 0) {
      // Outer asphalt casing
      const linkRoadCasing = L.polyline(LINK_ROAD_CORRIDOR_GPS, {
        color: "#0f172a",
        weight: 9,
        opacity: 0.9,
        interactive: false
      });
      // Inner yellow lane
      const linkRoadInner = L.polyline(LINK_ROAD_CORRIDOR_GPS, {
        color: "#f59e0b",
        weight: 4,
        dashArray: "6, 4",
        opacity: 0.95,
        interactive: false
      });
      corridorsLayerGroupRef.current.addLayer(linkRoadCasing);
      corridorsLayerGroupRef.current.addLayer(linkRoadInner);
    }

    // 2. 10-Lane Ahmedabad–Dholera Expressway Polyline (NH-751)
    if (EXPRESSWAY_CORRIDOR_GPS && EXPRESSWAY_CORRIDOR_GPS.length > 0) {
      // Outer glow casing
      const expyCasing = L.polyline(EXPRESSWAY_CORRIDOR_GPS, {
        color: "#f59e0b",
        weight: 7,
        opacity: 0.85,
        interactive: false
      });
      // Inner dashed median
      const expyInner = L.polyline(EXPRESSWAY_CORRIDOR_GPS, {
        color: "#fef08a",
        weight: 2.5,
        dashArray: "10, 6",
        opacity: 0.95,
        interactive: false
      });
      corridorsLayerGroupRef.current.addLayer(expyCasing);
      corridorsLayerGroupRef.current.addLayer(expyInner);
    }

    // 3. Proposed Dholera Metro Rail Line (Cyan Dashed)
    if (METRO_CORRIDOR_GPS && METRO_CORRIDOR_GPS.length > 0) {
      const metroLine = L.polyline(METRO_CORRIDOR_GPS, {
        color: "#06b6d4",
        weight: 4,
        dashArray: "8, 6",
        opacity: 0.9,
        interactive: false
      });
      corridorsLayerGroupRef.current.addLayer(metroLine);
    }

    // 4. Distance Radius Rings (500m, 2 km, 10 km, 20 km)
    if (showDistanceRings) {
      const rings = [
        { radius: 500, label: "500m Walking Vicinity", color: "#10b981" },
        { radius: 2000, label: "2 km Local Corridor", color: "#f59e0b" },
        { radius: 10000, label: "10 km Smart City Core", color: "#06b6d4" },
        { radius: 20000, label: "20 km Airport & Megaprojects", color: "#a855f7" }
      ];

      rings.forEach((ring) => {
        const circle = L.circle(projectCenter, {
          radius: ring.radius,
          color: ring.color,
          weight: 1.2,
          dashArray: "4, 6",
          fill: false,
          opacity: 0.5,
          interactive: false
        });
        corridorsLayerGroupRef.current?.addLayer(circle);
      });
    }
  }, [showCorridors, showDistanceRings]);

  // Update Base Map Tiles (Uses authentic Google Maps tiles)
  useEffect(() => {
    if (!tileLayerGroupRef.current) return;
    tileLayerGroupRef.current.clearLayers();

    if (tileStyle === "satellite") {
      // Google Maps Hybrid (Satellite Imagery + Street & Place Names)
      const googleHybrid = L.tileLayer(
        "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
        {
          maxZoom: 20,
          attribution: "© Google Maps"
        }
      );
      tileLayerGroupRef.current.addLayer(googleHybrid);
    } else if (tileStyle === "streets") {
      // Google Maps Standard Roadmap / Streets
      const googleStreets = L.tileLayer(
        "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        {
          maxZoom: 20,
          attribution: "© Google Maps"
        }
      );
      tileLayerGroupRef.current.addLayer(googleStreets);
    } else {
      // Dark Mode (CartoDB Dark)
      const cartoDark = L.tileLayer(
        "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        { maxZoom: 20 }
      );
      tileLayerGroupRef.current.addLayer(cartoDark);
    }
  }, [tileStyle]);

  // Update Blueprint Visibility & Opacity
  useEffect(() => {
    if (!blueprintOverlayRef.current) return;
    if (showBlueprint) {
      blueprintOverlayRef.current.setOpacity(blueprintOpacity);
    } else {
      blueprintOverlayRef.current.setOpacity(0);
    }
  }, [showBlueprint, blueprintOpacity]);

  // Render 145 Vector Plots on Map (DATA ONLY ON CLICK, NOT HOVER)
  useEffect(() => {
    if (!plotsLayerGroupRef.current || !mapInstanceRef.current) return;
    plotsLayerGroupRef.current.clearLayers();
    plotPolygonsMapRef.current.clear();

    plots.forEach((plot) => {
      if (!plot.gpsPolygon || plot.gpsPolygon.length < 3) return;

      const isFiltered = filteredPlotIds.has(plot.id);
      const isSelected = selectedPlot?.id === plot.id;
      const isVilla = plot.type === "Luxurious Villa";

      // Status color
      let fillColor = "#10b981"; // available (green)
      let strokeColor = "#34d399";
      if (plot.status === "booked") {
        fillColor = "#ef4444"; // booked (red)
        strokeColor = "#f87171";
      } else if (plot.status === "reserved") {
        fillColor = "#f59e0b"; // reserved (amber)
        strokeColor = "#fbbf24";
      }

      if (isVilla) {
        strokeColor = isSelected ? "#ffffff" : "#fbbf24";
      }

      const polygon = L.polygon(plot.gpsPolygon, {
        color: isSelected ? "#ffffff" : strokeColor,
        weight: isSelected ? 3.5 : 1.5,
        fillColor,
        fillOpacity: isSelected ? 0.85 : isFiltered ? 0.5 : 0.1,
        interactive: isFiltered
      });

      // Tooltip on hover showing plot number, area and status
      polygon.bindTooltip(
        `<div style="padding: 2px 4px; font-family: sans-serif; font-size: 11px; font-weight: 800; color: #ffffff; line-height: 1.3;">
          <div style="color: #fbbf24;">Plot #${plot.plotNumber} (${plot.type})</div>
          <div>${plot.areaSqYards} Sq. Yd. • ${plot.facing} Facing</div>
          <div style="color: ${fillColor}; font-size: 10px; font-weight: 900; text-transform: uppercase;">● ${plot.status}</div>
        </div>`,
        { direction: "top", offset: [0, -5], opacity: 0.95 }
      );

      // CLICK EVENT: Open plot information drawer
      polygon.on("click", (e) => {
        L.DomEvent.stopPropagation(e);
        onSelectPlot(plot);
      });

      // HOVER EVENT: ONLY visual highlight styling
      polygon.on("mouseover", () => {
        polygon.setStyle({
          fillOpacity: 0.8,
          weight: 2.8,
          color: "#fef08a"
        });
      });

      polygon.on("mouseout", () => {
        polygon.setStyle({
          fillOpacity: isSelected ? 0.85 : isFiltered ? 0.5 : 0.1,
          weight: isSelected ? 3.5 : 1.5,
          color: isSelected ? "#ffffff" : strokeColor
        });
      });

      plotsLayerGroupRef.current?.addLayer(polygon);
      plotPolygonsMapRef.current.set(plot.plotNumber, polygon);

      // Render Plot Number Label at plot center
      if (plot.gpsCoordinates && isFiltered) {
        const numIcon = L.divIcon({
          className: "leaflet-plot-number-marker",
          html: `<div style="color: ${isSelected ? '#fef08a' : '#ffffff'}; font-size: 8.5px; font-weight: 900; text-shadow: 0 0 3px #000, 0 1px 2px #000; pointer-events: none; text-align: center; line-height: 1; user-select: none;">${plot.plotNumber}</div>`,
          iconSize: [18, 12],
          iconAnchor: [9, 6]
        });
        const numMarker = L.marker([plot.gpsCoordinates.lat, plot.gpsCoordinates.lng], {
          icon: numIcon,
          interactive: false
        });
        plotsLayerGroupRef.current?.addLayer(numMarker);
      }
    });
  }, [plots, filteredPlotIds, selectedPlot, onSelectPlot]);

  // Zoom / Fly to selected plot when clicked
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedPlot?.gpsCoordinates) return;
    mapInstanceRef.current.flyTo(
      [selectedPlot.gpsCoordinates.lat, selectedPlot.gpsCoordinates.lng],
      19,
      { duration: 1.2 }
    );
  }, [selectedPlot]);

  // Render Route Vector Line when landmark is selected
  useEffect(() => {
    if (!routeLineLayerGroupRef.current || !mapInstanceRef.current) return;
    routeLineLayerGroupRef.current.clearLayers();

    if (!selectedLandmark || selectedLandmark.id === "sangrilla-meadows") return;

    // Glowing direct vector line from Sangrilla Meadows to landmark
    const routeCoords: [number, number][] = [
      projectCenter,
      selectedLandmark.coordinates
    ];

    const outerGlow = L.polyline(routeCoords, {
      color: "#fbbf24",
      weight: 4,
      dashArray: "8, 6",
      opacity: 0.9
    });

    const innerLine = L.polyline(routeCoords, {
      color: "#ffffff",
      weight: 1.5,
      dashArray: "4, 4",
      opacity: 1
    });

    // Distance label at midpoint
    const midLat = (projectCenter[0] + selectedLandmark.coordinates[0]) / 2;
    const midLng = (projectCenter[1] + selectedLandmark.coordinates[1]) / 2;

    const distIcon = L.divIcon({
      className: "route-midpoint-badge",
      html: `
        <div style="background: rgba(15, 23, 42, 0.95); color: #fbbf24; border: 1.5px solid #fbbf24; padding: 2px 8px; border-radius: 9999px; font-size: 10px; font-weight: 800; white-space: nowrap; box-shadow: 0 4px 15px rgba(0,0,0,0.6); backdrop-filter: blur(8px);">
          ⚡ ${selectedLandmark.distance} (${selectedLandmark.driveTime})
        </div>
      `,
      iconSize: [140, 24],
      iconAnchor: [70, 12]
    });

    const distMarker = L.marker([midLat, midLng], { icon: distIcon, interactive: false });

    routeLineLayerGroupRef.current.addLayer(outerGlow);
    routeLineLayerGroupRef.current.addLayer(innerLine);
    routeLineLayerGroupRef.current.addLayer(distMarker);
  }, [selectedLandmark, projectCenter]);

  // Render Surrounding Places / Landmarks (Google Maps Real Map POI Pins)
  useEffect(() => {
    if (!landmarksLayerGroupRef.current || !mapInstanceRef.current) return;
    landmarksLayerGroupRef.current.clearLayers();

    if (!showLandmarks) return;

    const catStyles: Record<string, { bg: string; border: string; glow: string; dot: string; icon: string }> = {
      project: { bg: "linear-gradient(135deg, rgba(6, 78, 59, 0.98) 0%, rgba(2, 44, 34, 0.98) 100%)", border: "#fbbf24", glow: "rgba(251, 191, 36, 0.7)", dot: "#fbbf24", icon: "🏛️" },
      expressway: { bg: "rgba(15, 23, 42, 0.94)", border: "#f59e0b", glow: "rgba(245, 158, 11, 0.5)", dot: "#f59e0b", icon: "🛣️" },
      transport: { bg: "rgba(15, 23, 42, 0.94)", border: "#14b8a6", glow: "rgba(20, 184, 166, 0.5)", dot: "#14b8a6", icon: "🚆" },
      airport: { bg: "rgba(15, 23, 42, 0.94)", border: "#38bdf8", glow: "rgba(56, 189, 248, 0.5)", dot: "#38bdf8", icon: "✈️" },
      industrial: { bg: "rgba(15, 23, 42, 0.94)", border: "#a855f7", glow: "rgba(168, 85, 247, 0.5)", dot: "#a855f7", icon: "🔬" },
      admin: { bg: "rgba(15, 23, 42, 0.94)", border: "#818cf8", glow: "rgba(129, 140, 248, 0.5)", dot: "#818cf8", icon: "🏢" },
      village: { bg: "rgba(15, 23, 42, 0.94)", border: "#fb7185", glow: "rgba(251, 113, 133, 0.5)", dot: "#fb7185", icon: "🏡" },
      temple: { bg: "rgba(15, 23, 42, 0.94)", border: "#fb923c", glow: "rgba(251, 146, 60, 0.5)", dot: "#fb923c", icon: "🛕" },
      civic: { bg: "rgba(15, 23, 42, 0.94)", border: "#60a5fa", glow: "rgba(96, 165, 250, 0.5)", dot: "#60a5fa", icon: "🏫" },
      nature: { bg: "rgba(15, 23, 42, 0.94)", border: "#34d399", glow: "rgba(52, 211, 153, 0.5)", dot: "#34d399", icon: "🌊" },
      infrastructure: { bg: "rgba(15, 23, 42, 0.94)", border: "#facc15", glow: "rgba(250, 204, 21, 0.5)", dot: "#facc15", icon: "⚡" },
      city: { bg: "rgba(15, 23, 42, 0.94)", border: "#cbd5e1", glow: "rgba(203, 213, 225, 0.4)", dot: "#cbd5e1", icon: "🌆" }
    };

    filteredLandmarks.forEach((landmark) => {
      const isSelected = selectedLandmark?.id === landmark.id;
      const isMainProject = landmark.id === "sangrilla-meadows";
      const style = catStyles[landmark.category] || catStyles.city;
      const iconEmoji = landmark.icon || style.icon;

      let html: string;
      let iconSize: [number, number];
      let iconAnchor: [number, number];

      if (isMainProject) {
        html = `
          <div style="
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, rgba(6, 78, 59, 0.98) 0%, rgba(2, 44, 34, 0.98) 100%);
            color: #fef08a;
            padding: 8px 16px;
            border-radius: 9999px;
            border: 2px solid #fbbf24;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.8), 0 0 25px rgba(251, 191, 36, 0.8);
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 12px;
            font-weight: 900;
            white-space: nowrap;
            backdrop-filter: blur(12px);
            cursor: pointer;
            user-select: none;
            transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          ">
            <span style="width: 10px; height: 10px; border-radius: 9999px; background: #fbbf24; box-shadow: 0 0 10px #fbbf24;"></span>
            <span style="color: #ffffff; letter-spacing: -0.01em;">⭐ Sangrilla Meadows</span>
            <span style="
              background: rgba(251, 191, 36, 0.25);
              color: #fef08a;
              border: 1px solid rgba(251, 191, 36, 0.5);
              padding: 2px 7px;
              border-radius: 9999px;
              font-size: 10px;
              font-weight: 800;
            ">Main Project (145 Units)</span>
          </div>
        `;
        iconSize = [280, 36];
        iconAnchor = [140, 18];
      } else {
        const isHighlighted = landmark.highlight || isSelected;
        html = `
          <div style="
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: ${style.bg};
            color: #ffffff;
            padding: ${isHighlighted ? "6px 13px" : "4.5px 10.5px"};
            border-radius: 9999px;
            border: ${isHighlighted ? "2px" : "1.5px"} solid ${style.border};
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.8), 0 0 ${isHighlighted ? "18px" : "8px"} ${style.glow};
            font-family: system-ui, -apple-system, sans-serif;
            font-size: ${isHighlighted ? "11.5px" : "11px"};
            font-weight: 700;
            white-space: nowrap;
            backdrop-filter: blur(10px);
            cursor: pointer;
            user-select: none;
            transform: ${isSelected ? "scale(1.12)" : "scale(1)"};
            transition: transform 0.15s ease, box-shadow 0.15s ease;
          ">
            <span style="font-size: ${isHighlighted ? "13px" : "12px"};">${iconEmoji}</span>
            <span style="color: #ffffff; letter-spacing: -0.01em;">${landmark.name}</span>
            <span style="
              background: rgba(255, 255, 255, 0.12);
              color: #fef08a;
              padding: 2px 6px;
              border-radius: 9999px;
              font-size: 9.5px;
              font-weight: 800;
              letter-spacing: 0.02em;
            ">${landmark.distance}</span>
          </div>
        `;
        iconSize = [220, 32];
        iconAnchor = [110, 16];
      }

      const icon = L.divIcon({
        className: "custom-landmark-pin",
        html,
        iconSize,
        iconAnchor
      });

      const marker = L.marker(landmark.coordinates, { icon });
      marker.on("click", (e) => {
        L.DomEvent.stopPropagation(e);
        handleSelectLandmark(landmark);
      });

      landmarksLayerGroupRef.current?.addLayer(marker);
    });
  }, [filteredLandmarks, showLandmarks, selectedLandmark]);

  // Select Landmark & fly to it
  const handleSelectLandmark = (landmark: SurroundingLandmark) => {
    setSelectedLandmark(landmark);
    if (!mapInstanceRef.current) return;

    if (landmark.id === "sangrilla-meadows") {
      mapInstanceRef.current.flyTo(projectCenter, 18, { duration: 1.2 });
    } else {
      // Fit bounds to show both Sangrilla Meadows and the Landmark
      const bounds = L.latLngBounds([projectCenter, landmark.coordinates]);
      mapInstanceRef.current.fitBounds(bounds, {
        padding: [100, 100],
        maxZoom: 16,
        duration: 1.2
      });
    }
  };

  // Map Controls
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleRecenter = () => {
    setSelectedLandmark(null);
    mapInstanceRef.current?.setView(projectCenter, 18);
  };

  return (
    <div className="relative w-full h-full min-h-[550px] overflow-hidden select-none bg-slate-950 font-sans">
      {/* Leaflet Map Div */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Left Branding & Zoom Indicator */}
      <div className="absolute top-4 left-4 z-[400] flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <div className="bg-slate-950/95 backdrop-blur-md border border-amber-500/40 rounded-2xl px-3.5 py-2 shadow-2xl flex items-center gap-2.5 text-white">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center font-black text-slate-950 text-xs shadow-md">
            SM
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-xs sm:text-sm tracking-tight block">
                Sangrilla Meadows
              </span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.2 rounded-full border border-emerald-500/30">
                Live GIS Map
              </span>
            </div>
            <span className="text-[10px] text-amber-400 font-semibold block">
              Dholera SIR • 145 Units &amp; Surrounding Locations
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl px-3 py-1.5 shadow-lg text-xs text-slate-300">
          <span className="text-[11px] text-slate-400">Zoom: <strong className="text-white">{currentZoom}x</strong></span>
          <span className="text-slate-600">•</span>
          <span className="text-[11px] text-amber-400 font-semibold">{filteredLandmarks.length} Locations Visible</span>
        </div>
      </div>

      {/* Top Center Category Filter & Quick-Explorer Bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] max-w-[95vw] lg:max-w-3xl flex items-center gap-1.5 overflow-x-auto py-1 px-3 bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl text-xs text-white scrollbar-none">
        <span className="text-amber-400 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 pl-1 pr-2 shrink-0">
          <Compass size={13} />
          <span className="hidden md:inline">Locations:</span>
        </span>

        {/* All Locations */}
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
            activeCategory === "all"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
          }`}
        >
          <span>All Places</span>
          <span className="text-[10px] opacity-80">({SURROUNDING_LANDMARKS.length})</span>
        </button>

        {/* Local & Villages */}
        <button
          onClick={() => setActiveCategory("local")}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
            activeCategory === "local"
              ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
              : "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
          }`}
        >
          <span>🏡 Local &amp; Villages</span>
        </button>

        {/* Expressway & Transit */}
        <button
          onClick={() => setActiveCategory("transit")}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
            activeCategory === "transit"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
          }`}
        >
          <span>🛣️ Expressway &amp; Metro</span>
        </button>

        {/* Smart City Hubs */}
        <button
          onClick={() => setActiveCategory("smartcity")}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
            activeCategory === "smartcity"
              ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20"
              : "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
          }`}
        >
          <span>🏢 Smart City Hubs</span>
        </button>

        {/* Industry & Airport */}
        <button
          onClick={() => setActiveCategory("industry")}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
            activeCategory === "industry"
              ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20"
              : "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
          }`}
        >
          <span>✈️ Tata &amp; Airport</span>
        </button>

        {/* Major Cities */}
        <button
          onClick={() => setActiveCategory("cities")}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
            activeCategory === "cities"
              ? "bg-slate-200 text-slate-950 shadow-md font-bold"
              : "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
          }`}
        >
          <span>🌆 Cities</span>
        </button>

        {/* Explorer Drawer Toggle */}
        <button
          onClick={() => setIsExplorerOpen(!isExplorerOpen)}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ml-1 ${
            isExplorerOpen
              ? "bg-emerald-500 text-slate-950 font-black"
              : "bg-emerald-950/80 text-emerald-300 hover:bg-emerald-900 border border-emerald-500/40"
          }`}
        >
          <Search size={12} />
          <span>Explorer</span>
        </button>
      </div>

      {/* Right Controls Group (Map Style, Layers & Zoom) */}
      <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
        {/* Google Map Tile Style Selector */}
        <div className="bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-2xl p-1.5 shadow-2xl flex flex-col gap-1 text-[11px] text-white">
          <button
            onClick={() => setTileStyle("satellite")}
            className={`px-3 py-1.5 rounded-xl font-semibold text-left transition-colors flex items-center justify-between ${
              tileStyle === "satellite"
                ? "bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 border border-amber-500/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>Satellite (Google)</span>
            {tileStyle === "satellite" && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
          </button>
          <button
            onClick={() => setTileStyle("streets")}
            className={`px-3 py-1.5 rounded-xl font-semibold text-left transition-colors flex items-center justify-between ${
              tileStyle === "streets"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>Google Streets</span>
            {tileStyle === "streets" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
          </button>
          <button
            onClick={() => setTileStyle("dark")}
            className={`px-3 py-1.5 rounded-xl font-semibold text-left transition-colors flex items-center justify-between ${
              tileStyle === "dark"
                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>Cyber Dark</span>
            {tileStyle === "dark" && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
          </button>
        </div>

        {/* Layer Toggles (Surroundings, Blueprint, Rings) */}
        <div className="bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-2xl p-2.5 shadow-2xl text-[11px] text-white space-y-2">
          {/* Surrounding Places Toggle */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Compass size={12} className="text-amber-400" />
              <span>Surroundings</span>
            </span>
            <button
              onClick={() => setShowLandmarks(!showLandmarks)}
              className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase transition-colors ${
                showLandmarks ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "bg-slate-800 text-slate-400"
              }`}
            >
              {showLandmarks ? "On" : "Off"}
            </button>
          </div>

          {/* Corridors & Distance Rings */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Radio size={12} className="text-emerald-400" />
              <span>Corridors &amp; Rings</span>
            </span>
            <button
              onClick={() => {
                setShowCorridors(!showCorridors);
                setShowDistanceRings(!showDistanceRings);
              }}
              className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase transition-colors ${
                showCorridors ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "bg-slate-800 text-slate-400"
              }`}
            >
              {showCorridors ? "On" : "Off"}
            </button>
          </div>

          {/* Blueprint Overlay Toggle */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800">
            <span className="font-semibold text-slate-300">Layout Overlay</span>
            <button
              onClick={() => setShowBlueprint(!showBlueprint)}
              className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase transition-colors ${
                showBlueprint ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"
              }`}
            >
              {showBlueprint ? "On" : "Off"}
            </button>
          </div>
          {showBlueprint && (
            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-[10px] text-slate-400">Opacity:</span>
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.05"
                value={blueprintOpacity}
                onChange={(e) => setBlueprintOpacity(parseFloat(e.target.value))}
                className="w-20 accent-amber-400 h-1 bg-slate-800 rounded cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Zoom In, Out, Recenter & Fullscreen Controls */}
        <div className="bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-2xl p-1.5 shadow-2xl flex flex-col gap-1 items-center text-white">
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom Out (Explore surrounding places)"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ZoomOut size={16} />
          </button>
          <div className="w-5 h-[1px] bg-slate-800 my-0.5" />
          <button
            onClick={handleRecenter}
            title="Recenter to Sangrilla Meadows"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-amber-400 hover:text-amber-300 hover:bg-slate-800 transition-colors"
          >
            <Crosshair size={16} />
          </button>
          <button
            onClick={onToggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </div>

      {/* Floating Instructions Bottom Pill */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[400] pointer-events-none hidden md:block">
        <div className="bg-slate-950/95 backdrop-blur-xl border border-amber-500/30 text-amber-200/90 px-4 py-2 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
          <span>Real Google Satellite Map • Click any landmark to view route, distance &amp; travel times</span>
        </div>
      </div>

      {/* Bottom Color Status Legend */}
      <div className="absolute bottom-4 left-4 z-[400] hidden sm:flex items-center gap-3 bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-2xl px-4 py-2.5 shadow-2xl text-xs text-white">
        <span className="text-amber-400 text-[11px] uppercase tracking-wider font-bold">145 Plots:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-300" />
          <span className="text-slate-200">Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-300" />
          <span className="text-slate-200">Reserved</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500 border border-rose-300" />
          <span className="text-slate-200">Sold</span>
        </div>
        <span className="text-slate-700">|</span>
        <button
          onClick={handleRecenter}
          className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
        >
          <Crosshair size={12} />
          <span>Main Project</span>
        </button>
      </div>

      {/* Side Slide-Out / Explorer Drawer for All Surrounding Locations */}
      {isExplorerOpen && (
        <div className="absolute top-16 left-4 bottom-16 z-[450] w-80 sm:w-96 bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-left duration-200">
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                <Compass size={16} className="text-amber-400" />
                <span>Nearby Locations Explorer</span>
              </h3>
              <p className="text-[11px] text-slate-400">All points of interest around Sangrilla Meadows</p>
            </div>
            <button
              onClick={() => setIsExplorerOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X size={16} />
            </button>
          </div>

          {/* Search Box */}
          <div className="p-3 border-b border-slate-800/80">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Airport, Tata Fab, Metro, Village..."
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 outline-none focus:border-amber-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Locations Scroll List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {filteredLandmarks.map((loc) => {
              const isSelected = selectedLandmark?.id === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => handleSelectLandmark(loc)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    isSelected
                      ? "bg-amber-500/20 border-amber-500/60 shadow-md"
                      : "bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base shrink-0">{loc.icon || "📍"}</span>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-white truncate flex items-center gap-1.5">
                        <span>{loc.name}</span>
                        {loc.nameGujarati && (
                          <span className="text-[10px] text-amber-400/80 font-normal hidden sm:inline">
                            ({loc.nameGujarati})
                          </span>
                        )}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate">{loc.description}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="block text-[11px] font-black text-amber-400">{loc.distance}</span>
                    <span className="block text-[9px] text-slate-400">{loc.driveTime}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Recenter */}
          <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">Center: Aakru, Dholera SIR</span>
            <button
              onClick={handleRecenter}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-bold text-xs flex items-center gap-1"
            >
              <Crosshair size={12} />
              <span>Center Site</span>
            </button>
          </div>
        </div>
      )}

      {/* Landmark Information Modal (when a surrounding place is clicked) */}
      {selectedLandmark && (
        <div className="fixed inset-0 z-[500] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-amber-500/50 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl relative animate-in fade-in duration-200">
            <button
              onClick={() => setSelectedLandmark(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {selectedLandmark.category.toUpperCase()} CORRIDOR
              </span>
              {selectedLandmark.highlight && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Priority Landmark
                </span>
              )}
            </div>

            <div className="flex items-start gap-3 mt-1">
              <span className="text-2xl">{selectedLandmark.icon || "📍"}</span>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  {selectedLandmark.name}
                </h3>
                {selectedLandmark.nameGujarati && (
                  <p className="text-xs text-amber-400 font-semibold mt-0.5">
                    {selectedLandmark.nameGujarati}
                  </p>
                )}
              </div>
            </div>

            {/* Distance & Drive Time Cards */}
            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                  Distance From Site
                </span>
                <p className="text-lg font-black text-amber-400 mt-0.5">
                  {selectedLandmark.distance}
                </p>
                <span className="text-[10px] text-slate-400 block mt-0.5">From Township Entrance</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                  Drive / Travel Time
                </span>
                <p className="text-lg font-black text-emerald-400 mt-0.5">
                  {selectedLandmark.driveTime}
                </p>
                <span className="text-[10px] text-slate-400 block mt-0.5">Via 10-Lane Expressway</span>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed mb-5 bg-slate-900/50 border border-slate-800/80 rounded-2xl p-3.5">
              {selectedLandmark.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <button
                onClick={() => {
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.flyTo(selectedLandmark.coordinates, 16, { duration: 1.2 });
                  }
                  setSelectedLandmark(null);
                }}
                className="w-full sm:flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs text-center transition-all shadow-lg flex items-center justify-center gap-1.5"
              >
                <Navigation size={14} />
                <span>Fly Directly to Marker →</span>
              </button>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${selectedLandmark.coordinates[0]},${selectedLandmark.coordinates[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs text-center transition-all flex items-center justify-center gap-1.5"
              >
                <ExternalLink size={13} />
                <span>Google Maps</span>
              </a>

              <button
                onClick={() => {
                  setSelectedLandmark(null);
                  handleRecenter();
                }}
                className="w-full sm:w-auto px-3 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs transition-colors"
              >
                Reset View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterPlanMapCanvas;

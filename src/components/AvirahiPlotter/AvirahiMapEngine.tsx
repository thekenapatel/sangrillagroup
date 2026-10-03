import React, { useEffect, useRef, useState, useCallback } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Link } from "react-router-dom";
import {
  X,
  MapPin,
  FileText,
  Share2,
  Info,
  Layers,
  ArrowLeft,
  Search,
  Check,
  Compass,
  Navigation
} from "lucide-react";
import type {
  AvirahiPlotUnit,
  AmenityZone,
  InfrastructureNode,
  TPSchemeBoundary,
  TownshipRoad
} from "../../data/avirahiCityData";
import {
  AVIRAHI_CITY_META,
  AVIRAHI_AMENITIES,
  AVIRAHI_ROADS,
  DHOLERA_TP_SCHEMES,
  DHOLERA_INFRASTRUCTURE_NODES,
  SURROUNDING_PLACES,
  AVIRAHI_CITY_BOUNDARY_POLYGON,
  DHOLERA_METRO_CITY_POLYGON,
  EXPRESSWAY_HIGHWAY_GPS,
  ZONING_POLYGONS,
  getPlotsGeoJSON,
  getAmenitiesGeoJSON,
  getTPSchemesGeoJSON,
  getRoadsGeoJSON
} from "../../data/avirahiCityData";
import AvirahiInquiryModal from "./AvirahiInquiryModal";
import AvirahiProjectInfoModal from "./AvirahiProjectInfoModal";

export type BaseMapStyle = "satellite" | "streets" | "dark";

interface AvirahiMapEngineProps {
  plots: AvirahiPlotUnit[];
  filteredPlotIds: Set<string>;
  selectedPlot: AvirahiPlotUnit | null;
  onSelectPlot: (plot: AvirahiPlotUnit | null) => void;
  is3DMode?: boolean;
  onToggle3DMode?: () => void;
  showTPSchemes?: boolean;
  onToggleTPSchemes?: () => void;
  showInfrastructure?: boolean;
  onToggleInfrastructure?: () => void;
  showAmenities?: boolean;
  onToggleAmenities?: () => void;
  baseMapStyle?: BaseMapStyle;
  onChangeBaseMapStyle?: (style: BaseMapStyle) => void;
}

export const AvirahiMapEngine: React.FC<AvirahiMapEngineProps> = ({
  plots,
  filteredPlotIds,
  selectedPlot,
  onSelectPlot,
  is3DMode = false,
  showTPSchemes = true,
  showAmenities = true,
  baseMapStyle: initialBaseMapStyle = "satellite",
  onChangeBaseMapStyle
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maplibregl.Map | null>(null);
  const hoveredPlotIdRef = useRef<number | null>(null);

  const [baseMapStyle, setBaseMapStyle] = useState<BaseMapStyle>(initialBaseMapStyle);
  const [currentZoom, setCurrentZoom] = useState<number>(AVIRAHI_CITY_META.initialZoom);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const markersRef = useRef<maplibregl.Marker[]>([]);

  // Base map style configuration using real Google Maps tiles
  const getMapStyleConfig = useCallback((style: BaseMapStyle): maplibregl.StyleSpecification => {
    let rasterTiles: string[];
    let maxZoom = 21;

    if (style === "satellite") {
      // Google Maps Hybrid (Satellite Imagery + Labels)
      rasterTiles = [
        "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
      ];
      maxZoom = 21;
    } else if (style === "dark") {
      // CartoDB Dark Matter
      rasterTiles = [
        "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"
      ];
      maxZoom = 20;
    } else {
      // Google Maps Standard Roads
      rasterTiles = [
        "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
      ];
      maxZoom = 21;
    }

    return {
      version: 8,
      sources: {
        "base-raster-tiles": {
          type: "raster",
          tiles: rasterTiles,
          tileSize: 256,
          maxzoom: maxZoom,
          attribution: "© Google Maps"
        }
      },
      layers: [
        {
          id: "base-raster-layer",
          type: "raster",
          source: "base-raster-tiles",
          minzoom: 0,
          maxzoom: 22
        }
      ]
    };
  }, []);

  // Initialize MapLibre GL Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: getMapStyleConfig(baseMapStyle),
      center: AVIRAHI_CITY_META.center,
      zoom: AVIRAHI_CITY_META.initialZoom,
      minZoom: 10,
      maxZoom: 21,
      pitch: 0,
      bearing: 0,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    map.on("zoom", () => {
      setCurrentZoom(Number(map.getZoom().toFixed(1)));
    });

    map.on("load", () => {
      setIsMapLoaded(true);
      setupAllLayers(map);
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Base Map Switch smoothly
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !isMapLoaded) return;

    map.setStyle(getMapStyleConfig(baseMapStyle));
    map.once("style.load", () => {
      setupAllLayers(map);
    });
  }, [baseMapStyle, getMapStyleConfig]);

  const toggleTileStyle = () => {
    const nextStyle: BaseMapStyle =
      baseMapStyle === "satellite" ? "streets" : baseMapStyle === "streets" ? "dark" : "satellite";
    setBaseMapStyle(nextStyle);
    onChangeBaseMapStyle?.(nextStyle);
  };

  // Setup all GeoJSON layers & vector outlines
  const setupAllLayers = (map: maplibregl.Map) => {
    // 1. Regional Zoning Overlays (Purple Zone & Cyan Zone from Image 2)
    if (!map.getSource("regional-zoning-source")) {
      map.addSource("regional-zoning-source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: { color: "#8b5cf6", opacity: 0.28, name: "Town Planning Zone" },
              geometry: {
                type: "Polygon",
                coordinates: [ZONING_POLYGONS.purple]
              }
            },
            {
              type: "Feature",
              properties: { color: "#06b6d4", opacity: 0.35, name: "Activation Core Zone" },
              geometry: {
                type: "Polygon",
                coordinates: [ZONING_POLYGONS.cyan]
              }
            }
          ]
        }
      });

      map.addLayer({
        id: "regional-zoning-fill",
        type: "fill",
        source: "regional-zoning-source",
        paint: {
          "fill-color": ["get", "color"],
          "fill-opacity": ["get", "opacity"]
        }
      });

      map.addLayer({
        id: "regional-zoning-line",
        type: "line",
        source: "regional-zoning-source",
        paint: {
          "line-color": ["get", "color"],
          "line-width": 1.5,
          "line-opacity": 0.8
        }
      });
    }

    // 2. Neighboring Project Boundaries (Dholera Metro City in red & Avirahi City in green from Image 2)
    if (!map.getSource("project-boundaries-source")) {
      map.addSource("project-boundaries-source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: { color: "#ef4444", fill: "#ef4444", name: "Dholera Metro City" },
              geometry: {
                type: "Polygon",
                coordinates: [DHOLERA_METRO_CITY_POLYGON]
              }
            },
            {
              type: "Feature",
              properties: { color: "#22c55e", fill: "#22c55e", name: "Avirahi City Boundary" },
              geometry: {
                type: "Polygon",
                coordinates: [AVIRAHI_CITY_BOUNDARY_POLYGON]
              }
            }
          ]
        }
      });

      map.addLayer({
        id: "project-boundaries-fill",
        type: "fill",
        source: "project-boundaries-source",
        paint: {
          "fill-color": ["get", "fill"],
          "fill-opacity": 0.12
        }
      });

      map.addLayer({
        id: "project-boundaries-line",
        type: "line",
        source: "project-boundaries-source",
        paint: {
          "line-color": ["get", "color"],
          "line-width": 3.5,
          "line-opacity": 0.95
        }
      });
    }

    // 3. Ahmedabad–Dholera Expressway Corridor (Yellow dual lines from Image 2)
    if (!map.getSource("expressway-highway-source")) {
      map.addSource("expressway-highway-source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: { name: "Ahmedabad - Dholera Expy" },
              geometry: {
                type: "LineString",
                coordinates: EXPRESSWAY_HIGHWAY_GPS
              }
            }
          ]
        }
      });

      // Expressway Outer Yellow Glow Casing
      map.addLayer({
        id: "expressway-casing",
        type: "line",
        source: "expressway-highway-source",
        paint: {
          "line-color": "#f59e0b",
          "line-width": ["interpolate", ["linear"], ["zoom"], 10, 4, 16, 12, 19, 20],
          "line-opacity": 0.95
        }
      });

      // Expressway Inner Dashed Median
      map.addLayer({
        id: "expressway-center-dash",
        type: "line",
        source: "expressway-highway-source",
        paint: {
          "line-color": "#fef08a",
          "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1.5, 16, 3, 19, 4],
          "line-dasharray": [4, 3],
          "line-opacity": 0.9
        }
      });
    }

    // 4. Township Major Roads
    if (!map.getSource("avirahi-roads-source")) {
      map.addSource("avirahi-roads-source", {
        type: "geojson",
        data: getRoadsGeoJSON()
      });

      map.addLayer({
        id: "avirahi-roads-casing",
        type: "line",
        source: "avirahi-roads-source",
        paint: {
          "line-color": "#0f172a",
          "line-width": ["interpolate", ["linear"], ["zoom"], 14, 4, 18, 14],
          "line-opacity": 0.85
        }
      });

      map.addLayer({
        id: "avirahi-roads-line",
        type: "line",
        source: "avirahi-roads-source",
        paint: {
          "line-color": "#e2e8f0",
          "line-width": ["interpolate", ["linear"], ["zoom"], 14, 2, 18, 10],
          "line-opacity": 0.95
        }
      });
    }

    // 5. Township Amenities (Clubhouse, Swimming pool, Cricket, Volley ball, Parks)
    if (!map.getSource("avirahi-amenities-source")) {
      map.addSource("avirahi-amenities-source", {
        type: "geojson",
        data: getAmenitiesGeoJSON()
      });

      map.addLayer({
        id: "avirahi-amenities-fill",
        type: "fill",
        source: "avirahi-amenities-source",
        paint: {
          "fill-color": [
            "match",
            ["get", "category"],
            "clubhouse",
            "#4f46e5",
            "lake",
            "#0284c7",
            "park",
            "#10b981",
            "sports",
            "#f59e0b",
            "commercial",
            "#ec4899",
            "#3b82f6"
          ],
          "fill-opacity": 0.6
        }
      });

      map.addLayer({
        id: "avirahi-amenities-line",
        type: "line",
        source: "avirahi-amenities-source",
        paint: {
          "line-color": "#ffffff",
          "line-width": 2,
          "line-opacity": 0.9
        }
      });
    }

    // 6. 1,250 Plot Polygons (with plot numbers and status)
    if (!map.getSource("avirahi-plots-source")) {
      map.addSource("avirahi-plots-source", {
        type: "geojson",
        data: getPlotsGeoJSON(),
        generateId: true
      });

      // Plot Fill
      map.addLayer({
        id: "avirahi-plots-fill",
        type: "fill",
        source: "avirahi-plots-source",
        paint: {
          "fill-color": [
            "match",
            ["get", "status"],
            "available",
            "#22c55e",
            "sold",
            "#ef4444",
            "reserved",
            "#f59e0b",
            "#22c55e"
          ],
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "selected"], false],
            0.85,
            ["boolean", ["feature-state", "hover"], false],
            0.75,
            ["boolean", ["feature-state", "filteredOut"], false],
            0.08,
            0.45
          ]
        }
      });

      // Plot Stroke Line
      map.addLayer({
        id: "avirahi-plots-line",
        type: "line",
        source: "avirahi-plots-source",
        paint: {
          "line-color": [
            "case",
            ["boolean", ["feature-state", "selected"], false],
            "#ffffff",
            ["boolean", ["feature-state", "hover"], false],
            "#fef08a",
            ["match", ["get", "status"], "available", "#16a34a", "sold", "#dc2626", "reserved", "#d97706", "#16a34a"]
          ],
          "line-width": [
            "case",
            ["boolean", ["feature-state", "selected"], false],
            3.5,
            ["boolean", ["feature-state", "hover"], false],
            2.5,
            1.2
          ],
          "line-opacity": 0.95
        }
      });

      // Plot Number Labels (Visible when zoomed in >= 16.5)
      map.addLayer({
        id: "avirahi-plots-labels",
        type: "symbol",
        source: "avirahi-plots-source",
        minzoom: 16.5,
        layout: {
          "text-field": ["to-string", ["get", "plotNumber"]],
          "text-size": ["interpolate", ["linear"], ["zoom"], 16.5, 9, 18, 12, 20, 15],
          "text-allow-overlap": false,
          "text-ignore-placement": false,
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"]
        },
        paint: {
          "text-color": "#ffffff",
          "text-halo-color": "#000000",
          "text-halo-width": 2
        }
      });

      // Bind Interactive Plot Events
      bindPlotEvents(map);
    }

    // Render Surrounding Places Markers (Image 2)
    renderSurroundingMarkers(map);
  };

  // Bind mouse interaction for plot selection
  const bindPlotEvents = (map: maplibregl.Map) => {
    // Hover: highlight
    map.on("mousemove", "avirahi-plots-fill", (e) => {
      if (!e.features || e.features.length === 0) return;
      map.getCanvas().style.cursor = "pointer";

      const feature = e.features[0];
      const featureId = feature.id as number;

      if (hoveredPlotIdRef.current !== null && hoveredPlotIdRef.current !== featureId) {
        map.setFeatureState(
          { source: "avirahi-plots-source", id: hoveredPlotIdRef.current },
          { hover: false }
        );
      }

      hoveredPlotIdRef.current = featureId;
      map.setFeatureState(
        { source: "avirahi-plots-source", id: featureId },
        { hover: true }
      );
    });

    map.on("mouseleave", "avirahi-plots-fill", () => {
      map.getCanvas().style.cursor = "";
      if (hoveredPlotIdRef.current !== null) {
        map.setFeatureState(
          { source: "avirahi-plots-source", id: hoveredPlotIdRef.current },
          { hover: false }
        );
        hoveredPlotIdRef.current = null;
      }
    });

    // Click: select plot & display Details Card in Top-Right
    map.on("click", "avirahi-plots-fill", (e) => {
      if (!e.features || e.features.length === 0) return;
      const feature = e.features[0];
      const plotProps = feature.properties as any;

      const plotUnit = plots.find((p) => p.plotNumber === plotProps.plotNumber);
      if (plotUnit) {
        onSelectPlot(plotUnit);
        flyToPlot(map, plotUnit);
      }
    });
  };

  // Smoothly zoom & center on selected plot
  const flyToPlot = (map: maplibregl.Map, plot: AvirahiPlotUnit) => {
    const coords = plot.coordinates;
    const bounds = coords.reduce(
      (b, coord) => b.extend(coord),
      new maplibregl.LngLatBounds(coords[0], coords[0])
    );

    map.fitBounds(bounds, {
      padding: { top: 120, bottom: 120, left: 100, right: 380 },
      maxZoom: 19,
      duration: 1200
    });
  };

  // Render all surrounding landmarks & places (visible when zoomed out, Image 2)
  const renderSurroundingMarkers = (map: maplibregl.Map) => {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    SURROUNDING_PLACES.forEach((place) => {
      const el = document.createElement("div");
      el.className = "naavik-place-marker group cursor-pointer select-none";

      const dotColor =
        place.category === "project"
          ? "#22c55e"
          : place.category === "expressway"
          ? "#f59e0b"
          : place.category === "temple"
          ? "#fb923c"
          : place.category === "hotel"
          ? "#38bdf8"
          : "#e2e8f0";

      const isAvirahi = place.id === "place_avirahi_city" || place.id === "place_sangrilla_meadows";

      el.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          gap: 6px;
          background: ${isAvirahi ? "rgba(22, 163, 74, 0.95)" : "rgba(15, 23, 42, 0.88)"};
          border: 1.5px solid ${isAvirahi ? "#86efac" : "rgba(255, 255, 255, 0.25)"};
          padding: ${isAvirahi ? "6px 14px" : "4px 10px"};
          border-radius: 9999px;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(8px);
          transition: transform 0.15s ease, background 0.15s ease;
          user-select: none;
        ">
          <span style="
            width: ${isAvirahi ? "8px" : "6px"};
            height: ${isAvirahi ? "8px" : "6px"};
            border-radius: 9999px;
            background: ${isAvirahi ? "#ffffff" : dotColor};
            box-shadow: 0 0 8px ${dotColor};
          "></span>
          <span style="
            color: #ffffff;
            font-size: ${isAvirahi ? "12px" : "11px"};
            font-weight: ${isAvirahi ? "800" : "700"};
            white-space: nowrap;
            letter-spacing: 0.02em;
          ">${place.tagText}</span>
        </div>
      `;

      el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(1.08)";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "scale(1)";
      });

      el.addEventListener("click", () => {
        map.flyTo({
          center: place.coordinates,
          zoom: 15.5,
          duration: 1000
        });
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(place.coordinates)
        .addTo(map);

      markersRef.current.push(marker);
    });
  };

  // Sync feature states when selectedPlot or filteredPlotIds changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !isMapLoaded || !map.getSource("avirahi-plots-source")) return;

    plots.forEach((plot) => {
      const isSelected = selectedPlot?.id === plot.id;
      const isFilteredOut = !filteredPlotIds.has(plot.id);

      map.setFeatureState(
        { source: "avirahi-plots-source", id: plot.plotNumber },
        { selected: isSelected, filteredOut: isFilteredOut }
      );
    });
  }, [selectedPlot, filteredPlotIds, isMapLoaded, plots]);

  // When plot is selected externally (e.g. search query)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !isMapLoaded || !selectedPlot) return;
    flyToPlot(map, selectedPlot);
  }, [selectedPlot, isMapLoaded]);

  // Handle Quick Search Plot Input
  const handleSearchPlot = (val: string) => {
    setSearchQuery(val);
    const num = parseInt(val.trim(), 10);
    if (!isNaN(num) && num >= 1 && num <= AVIRAHI_CITY_META.totalPlots) {
      const target = plots.find((p) => p.plotNumber === num);
      if (target) {
        onSelectPlot(target);
      }
    }
  };

  // Geolocation / Track Me handler
  const handleTrackMe = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          map.flyTo({
            center: [pos.coords.longitude, pos.coords.latitude],
            zoom: 16,
            duration: 1400
          });
        },
        () => {
          // If permission denied, center on Avirahi City site
          map.flyTo({
            center: AVIRAHI_CITY_META.center,
            zoom: 16.5,
            duration: 1200
          });
        }
      );
    } else {
      map.flyTo({
        center: AVIRAHI_CITY_META.center,
        zoom: 16.5,
        duration: 1200
      });
    }
  };

  // Share handler
  const handleShare = () => {
    const plotQuery = selectedPlot ? `?plot=${selectedPlot.plotNumber}` : "";
    const url = `${window.location.origin}${window.location.pathname}${plotQuery}`;
    navigator.clipboard.writeText(url);
    setShareToast(selectedPlot ? `Direct link to Plot #${selectedPlot.plotNumber} copied!` : "Project link copied to clipboard!");
    setTimeout(() => setShareToast(null), 2500);
  };

  // Map Zoom Controls
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn({ duration: 300 });
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut({ duration: 300 });

  return (
    <div className="relative w-full h-full select-none bg-slate-950 overflow-hidden font-sans">
      {/* MapLibre WebGL Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* 1. TOP-LEFT: Built by Sangrilla + Back Button + Quick Plot Search */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
        <Link
          to="/project/sangrilla-meadows"
          className="bg-slate-900/85 backdrop-blur-xl border border-white/20 hover:bg-slate-800 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-2xl transition-colors"
          title="Back to Project"
        >
          <ArrowLeft size={13} className="text-amber-400" />
          <span className="hidden sm:inline">Back</span>
        </Link>

        <div className="bg-slate-900/85 backdrop-blur-xl border border-white/20 text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-wide">Built by Sangrilla</span>
        </div>

        {/* Quick Search Plot Input */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Go to Plot # (e.g. 826)..."
            value={searchQuery}
            onChange={(e) => handleSearchPlot(e.target.value)}
            className="bg-slate-900/85 backdrop-blur-xl border border-white/20 focus:border-amber-400 text-white placeholder-slate-400 px-3.5 py-1.5 rounded-full text-xs outline-none w-44 transition-all shadow-xl"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchPlot("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 2. TOP-RIGHT: Satellite Layer Toggle Button */}
      <div className={`absolute top-4 z-30 transition-all ${selectedPlot ? "right-4 sm:right-84" : "right-4"}`}>
        <button
          onClick={toggleTileStyle}
          className="bg-slate-900/85 backdrop-blur-xl border border-white/20 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-2xl transition-colors"
          title="Toggle Satellite / Streets / Dark Map"
        >
          <Layers size={14} className="text-emerald-400" />
          <span className="capitalize">{baseMapStyle}</span>
        </button>
      </div>

      {/* 3. TOP-RIGHT DETAILS CARD (Matches Image 1 from Naavik) */}
      {selectedPlot && (
        <div className="absolute top-4 right-4 z-40 w-72 sm:w-80 bg-slate-900/80 backdrop-blur-xl border border-white/20 rounded-2xl p-5 text-white shadow-2xl shadow-black/80 animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-base font-bold text-white tracking-wide">Details</h3>
            <button
              onClick={() => onSelectPlot(null)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Close Details"
            >
              <X size={16} />
            </button>
          </div>

          {/* Key Plot Details Rows */}
          <div className="mt-4 space-y-3.5 text-xs sm:text-sm">
            {/* Availability */}
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium">Availability</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm ${
                  selectedPlot.status === "available"
                    ? "bg-[#22c55e]"
                    : selectedPlot.status === "sold"
                    ? "bg-[#ef4444]"
                    : "bg-[#f59e0b]"
                }`}
              >
                {selectedPlot.status === "available"
                  ? "AVAILABLE"
                  : selectedPlot.status === "sold"
                  ? "SOLD OUT"
                  : "HOLD"}
              </span>
            </div>

            {/* Plot No */}
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium">Plot No</span>
              <span className="text-white font-extrabold text-base">
                {selectedPlot.plotNumber}
              </span>
            </div>

            {/* Area */}
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium">Area</span>
              <span className="text-white font-extrabold">
                {selectedPlot.areaSqYards} SQ. YD.
              </span>
            </div>

            {/* Size (meter) */}
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium">Size (meter)</span>
              <span className="text-white font-semibold">
                {selectedPlot.dimensionsMeter || "12.50 x 23.40 x 12.50 x 23.40"}
              </span>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="mt-5 pt-3 border-t border-white/10 flex gap-2">
            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/40"
            >
              <span>Send Inquiry</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. BOTTOM-CENTER FLOATING PILL BAR (Matches Image 1 and Image 2) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <div className="bg-slate-900/85 backdrop-blur-xl border border-white/20 rounded-full px-3 sm:px-5 py-2 shadow-2xl shadow-black/80 flex items-center gap-1.5 sm:gap-4 text-xs font-semibold text-white">
          <button
            onClick={handleTrackMe}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-full hover:bg-white/10 text-slate-200 hover:text-white transition-colors"
            title="Track Location / Center Map"
          >
            <MapPin size={15} className="text-emerald-400 shrink-0" />
            <span className="whitespace-nowrap">Track Me</span>
          </button>

          <div className="w-[1px] h-4 bg-white/15" />

          <button
            onClick={() => setIsInquiryModalOpen(true)}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-full hover:bg-white/10 text-slate-200 hover:text-white transition-colors"
            title="Send Inquiry"
          >
            <FileText size={15} className="text-amber-400 shrink-0" />
            <span className="whitespace-nowrap">Send Inquiry</span>
          </button>

          <div className="w-[1px] h-4 bg-white/15" />

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-full hover:bg-white/10 text-slate-200 hover:text-white transition-colors"
            title="Share Project"
          >
            <Share2 size={15} className="text-sky-400 shrink-0" />
            <span className="whitespace-nowrap">Share</span>
          </button>

          <div className="w-[1px] h-4 bg-white/15" />

          <button
            onClick={() => setIsProjectInfoOpen(true)}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-full hover:bg-white/10 text-slate-200 hover:text-white transition-colors"
            title="Project Info & Highlights"
          >
            <Info size={15} className="text-indigo-400 shrink-0" />
            <span className="whitespace-nowrap">Project Info</span>
          </button>
        </div>
      </div>

      {/* 5. BOTTOM-RIGHT ZOOM BUTTONS */}
      <div className="absolute bottom-6 right-4 z-30 flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          className="w-9 h-9 rounded-xl bg-slate-900/85 backdrop-blur-xl border border-white/20 hover:bg-slate-800 text-white flex items-center justify-center shadow-2xl transition-colors font-bold text-base"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="w-9 h-9 rounded-xl bg-slate-900/85 backdrop-blur-xl border border-white/20 hover:bg-slate-800 text-white flex items-center justify-center shadow-2xl transition-colors font-bold text-base"
          title="Zoom Out"
        >
          -
        </button>
      </div>

      {/* 6. TOAST NOTIFICATION FOR SHARE */}
      {shareToast && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-600/95 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-2xl backdrop-blur-md flex items-center gap-2 animate-in fade-in duration-150">
          <Check size={14} />
          <span>{shareToast}</span>
        </div>
      )}

      {/* 7. MODALS */}
      <AvirahiInquiryModal
        plot={selectedPlot}
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />

      <AvirahiProjectInfoModal
        isOpen={isProjectInfoOpen}
        onClose={() => setIsProjectInfoOpen(false)}
        onOpenInquiry={() => setIsInquiryModalOpen(true)}
      />
    </div>
  );
};

export default AvirahiMapEngine;

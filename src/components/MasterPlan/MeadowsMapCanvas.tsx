import React, { useCallback, useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Crosshair, Layers, LocateFixed, MapPin, Minus, Plus } from "lucide-react";
import type { Feature, FeatureCollection, Point, Polygon } from "geojson";
import type { PlotUnit } from "../../data/sangrillaMeadowsData";
import {
  COMMON_AMENITY_AREAS,
  SAN_GRILLA_MEADOWS_META,
  SURROUNDING_LANDMARKS,
  TOWNSHIP_BOUNDARY_GPS
} from "../../data/sangrillaMeadowsData";

type BaseMapStyle = "satellite" | "streets";

interface MeadowsMapCanvasProps {
  plots: PlotUnit[];
  filteredPlotIds: Set<string>;
  selectedPlot: PlotUnit | null;
  onSelectPlot: (plot: PlotUnit) => void;
}

const toLngLat = (point: [number, number]): [number, number] => [point[1], point[0]];

const closeRing = (coordinates: [number, number][]) => {
  const ring = coordinates.map(toLngLat);
  if (ring.length > 0) {
    const first = ring[0];
    const last = ring[ring.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) ring.push(first);
  }
  return ring;
};

const makePlotFeatures = (
  plots: PlotUnit[],
  filteredPlotIds: Set<string>,
  selectedPlot: PlotUnit | null
): Feature<Polygon>[] =>
  plots.flatMap((plot) => {
    if (!plot.gpsPolygon || plot.gpsPolygon.length < 3) return [];
    return [{
      type: "Feature",
      id: plot.plotNumber,
      properties: {
        id: plot.id,
        plotNumber: plot.plotNumber,
        status: plot.status,
        selected: selectedPlot?.id === plot.id,
        dimmed: !filteredPlotIds.has(plot.id),
        areaSqYards: plot.areaSqYards
      },
      geometry: { type: "Polygon", coordinates: [closeRing(plot.gpsPolygon)] }
    }];
  });

const makeAmenityFeatures = (): Feature<Polygon>[] =>
  COMMON_AMENITY_AREAS.flatMap((amenity) => {
    if (!amenity.gpsPolygon || amenity.gpsPolygon.length < 3) return [];
    return [{
      type: "Feature",
      properties: { name: amenity.name, code: amenity.code },
      geometry: { type: "Polygon", coordinates: [closeRing(amenity.gpsPolygon)] }
    }];
  });

const makeLandmarkFeatures = (): Feature<Point>[] =>
  SURROUNDING_LANDMARKS.map((landmark) => ({
    type: "Feature",
    properties: {
      id: landmark.id,
      name: landmark.name,
      category: landmark.category,
      distance: landmark.distance,
      highlight: Boolean(landmark.highlight)
    },
    geometry: { type: "Point", coordinates: toLngLat(landmark.coordinates) }
  }));

const makeBoundaryFeature = (): Feature<Polygon> => ({
  type: "Feature",
  properties: { name: SAN_GRILLA_MEADOWS_META.projectName },
  geometry: { type: "Polygon", coordinates: [closeRing(TOWNSHIP_BOUNDARY_GPS)] }
});

const makeRoadStyle = (style: BaseMapStyle): maplibregl.StyleSpecification => ({
  version: 8,
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  sources: {
    "meadows-basemap": style === "satellite"
      ? {
          type: "raster",
          tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
          tileSize: 256,
          attribution: "Tiles © Esri"
        }
      : {
          type: "raster",
          tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
          tileSize: 256,
          attribution: "© OpenStreetMap contributors"
        }
  },
  layers: [{ id: "meadows-basemap-layer", type: "raster", source: "meadows-basemap" }]
});

const MeadowsMapCanvas: React.FC<MeadowsMapCanvasProps> = ({
  plots,
  filteredPlotIds,
  selectedPlot,
  onSelectPlot
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const plotsRef = useRef(plots);
  const filteredPlotIdsRef = useRef(filteredPlotIds);
  const selectedPlotRef = useRef(selectedPlot);
  const onSelectPlotRef = useRef(onSelectPlot);
  const [baseMapStyle, setBaseMapStyle] = useState<BaseMapStyle>("satellite");
  const [showAmenities, setShowAmenities] = useState(true);
  const [showSurroundings, setShowSurroundings] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const previousBaseMapStyleRef = useRef(baseMapStyle);

  plotsRef.current = plots;
  filteredPlotIdsRef.current = filteredPlotIds;
  selectedPlotRef.current = selectedPlot;
  onSelectPlotRef.current = onSelectPlot;

  const handlePlotClick = useCallback((event: maplibregl.MapLayerMouseEvent) => {
    const plotNumber = event.features?.[0]?.properties?.plotNumber;
    const plot = plotsRef.current.find((item) => item.plotNumber === Number(plotNumber));
    if (!plot) return;
    onSelectPlotRef.current(plot);
    const bounds = plot.gpsPolygon?.reduce(
      (result, point) => result.extend(toLngLat(point)),
      new maplibregl.LngLatBounds(toLngLat(plot.gpsPolygon[0]), toLngLat(plot.gpsPolygon[0]))
    );
    if (bounds) mapRef.current?.fitBounds(bounds, { padding: 100, maxZoom: 20, duration: 700 });
  }, []);

  const handlePlotMouseMove = useCallback(() => {
    if (mapRef.current) mapRef.current.getCanvas().style.cursor = "pointer";
  }, []);

  const handlePlotMouseLeave = useCallback(() => {
    if (mapRef.current) mapRef.current.getCanvas().style.cursor = "";
  }, []);

  const refreshPlotData = useCallback((map: maplibregl.Map) => {
    const source = map.getSource("meadows-plots") as maplibregl.GeoJSONSource | undefined;
    if (!source) return;
    source.setData({
      type: "FeatureCollection",
      features: makePlotFeatures(plotsRef.current, filteredPlotIdsRef.current, selectedPlotRef.current)
    });
  }, []);

  const addProjectLayers = useCallback((map: maplibregl.Map) => {
    const plotData: FeatureCollection<Polygon> = {
      type: "FeatureCollection",
      features: makePlotFeatures(plotsRef.current, filteredPlotIdsRef.current, selectedPlotRef.current)
    };
    const amenityData: FeatureCollection<Polygon> = { type: "FeatureCollection", features: makeAmenityFeatures() };
    const landmarkData: FeatureCollection<Point> = { type: "FeatureCollection", features: makeLandmarkFeatures() };
    const boundaryData: FeatureCollection<Polygon> = { type: "FeatureCollection", features: [makeBoundaryFeature()] };

    map.addSource("meadows-plots", { type: "geojson", data: plotData, promoteId: "plotNumber" });
    map.addLayer({
      id: "meadows-plot-fills",
      type: "fill",
      source: "meadows-plots",
      paint: {
        "fill-color": ["match", ["get", "status"], "available", "#16a34a", "booked", "#dc2626", "#d97706"],
        "fill-opacity": ["case", ["get", "selected"], 0.82, ["get", "dimmed"], 0.12, 0.48]
      }
    });
    map.addLayer({
      id: "meadows-plot-outlines",
      type: "line",
      source: "meadows-plots",
      paint: {
        "line-color": ["case", ["get", "selected"], "#ffffff", "#f8fafc"],
        "line-width": ["case", ["get", "selected"], 2.5, 1.1],
        "line-opacity": 0.95
      }
    });
    map.addLayer({
      id: "meadows-plot-labels",
      type: "symbol",
      source: "meadows-plots",
      minzoom: 18,
      layout: {
        "text-field": ["to-string", ["get", "plotNumber"]],
        "text-size": 10,
        "text-allow-overlap": false,
        "text-ignore-placement": false
      },
      paint: { "text-color": "#ffffff", "text-halo-color": "#111827", "text-halo-width": 1.5 }
    });

    map.addSource("meadows-boundary", { type: "geojson", data: boundaryData });
    map.addLayer({
      id: "meadows-boundary-line",
      type: "line",
      source: "meadows-boundary",
      paint: { "line-color": "#facc15", "line-width": 2.5, "line-dasharray": [2, 1.5] }
    });

    map.addSource("meadows-amenities", { type: "geojson", data: amenityData });
    map.addLayer({
      id: "meadows-amenity-fill",
      type: "fill",
      source: "meadows-amenities",
      layout: { visibility: showAmenities ? "visible" : "none" },
      paint: { "fill-color": "#10b981", "fill-opacity": 0.4 }
    });
    map.addLayer({
      id: "meadows-amenity-outline",
      type: "line",
      source: "meadows-amenities",
      layout: { visibility: showAmenities ? "visible" : "none" },
      paint: { "line-color": "#6ee7b7", "line-width": 1.5 }
    });

    map.addSource("meadows-landmarks", { type: "geojson", data: landmarkData });
    map.addLayer({
      id: "meadows-landmark-dots",
      type: "circle",
      source: "meadows-landmarks",
      layout: { visibility: showSurroundings ? "visible" : "none" },
      paint: {
        "circle-radius": ["case", ["get", "highlight"], 7, 5],
        "circle-color": ["match", ["get", "category"], "project", "#22c55e", "expressway", "#f59e0b", "#38bdf8"],
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 1.5
      }
    });
    map.addLayer({
      id: "meadows-landmark-labels",
      type: "symbol",
      source: "meadows-landmarks",
      minzoom: 11,
      layout: {
        visibility: showSurroundings ? "visible" : "none",
        "text-field": ["get", "name"],
        "text-size": 11,
        "text-offset": [0, 1.25],
        "text-anchor": "top",
        "text-max-width": 14,
        "text-allow-overlap": false
      },
      paint: { "text-color": "#ffffff", "text-halo-color": "#0f172a", "text-halo-width": 1.5 }
    });

    map.off("mousemove", "meadows-plot-fills", handlePlotMouseMove);
    map.off("mouseleave", "meadows-plot-fills", handlePlotMouseLeave);
    map.off("click", "meadows-plot-fills", handlePlotClick);
    map.on("mousemove", "meadows-plot-fills", handlePlotMouseMove);
    map.on("mouseleave", "meadows-plot-fills", handlePlotMouseLeave);
    map.on("click", "meadows-plot-fills", handlePlotClick);
  }, [handlePlotClick, handlePlotMouseLeave, handlePlotMouseMove, showAmenities, showSurroundings]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: makeRoadStyle(baseMapStyle),
      center: [SAN_GRILLA_MEADOWS_META.centerCoordinates[1], SAN_GRILLA_MEADOWS_META.centerCoordinates[0]],
      zoom: 16.8,
      minZoom: 9,
      maxZoom: 21,
      maxBounds: [
        [71.2, 21.6],
        [73.2, 23.5]
      ],
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "bottom-right");
    map.on("load", () => {
      map.resize();
      addProjectLayers(map);
      setMapLoaded(true);
    });
    map.on("error", (e) => {
      console.warn("MapLibre map error:", e);
    });

    const handleResize = () => {
      if (mapRef.current) mapRef.current.resize();
    };
    window.addEventListener("resize", handleResize);
    const resizeTimer = setTimeout(handleResize, 200);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;
    if (previousBaseMapStyleRef.current === baseMapStyle) return;
    previousBaseMapStyleRef.current = baseMapStyle;
    map.setStyle(makeRoadStyle(baseMapStyle));
    map.once("style.load", () => {
      map.resize();
      addProjectLayers(map);
    });
  }, [baseMapStyle, addProjectLayers, mapLoaded]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded || !map.isStyleLoaded()) return;
    refreshPlotData(map);
  }, [plots, filteredPlotIds, selectedPlot, mapLoaded, refreshPlotData]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded || !map.isStyleLoaded()) return;
    const visibility = showAmenities ? "visible" : "none";
    if (map.getLayer("meadows-amenity-fill")) map.setLayoutProperty("meadows-amenity-fill", "visibility", visibility);
    if (map.getLayer("meadows-amenity-outline")) map.setLayoutProperty("meadows-amenity-outline", "visibility", visibility);
  }, [showAmenities, mapLoaded]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded || !map.isStyleLoaded()) return;
    const visibility = showSurroundings ? "visible" : "none";
    if (map.getLayer("meadows-landmark-dots")) map.setLayoutProperty("meadows-landmark-dots", "visibility", visibility);
    if (map.getLayer("meadows-landmark-labels")) map.setLayoutProperty("meadows-landmark-labels", "visibility", visibility);
  }, [showSurroundings, mapLoaded]);

  const goToProject = () => {
    mapRef.current?.fitBounds(
      [
        [SAN_GRILLA_MEADOWS_META.siteBounds[0][1], SAN_GRILLA_MEADOWS_META.siteBounds[0][0]],
        [SAN_GRILLA_MEADOWS_META.siteBounds[1][1], SAN_GRILLA_MEADOWS_META.siteBounds[1][0]]
      ],
      { padding: 90, maxZoom: 18.5, duration: 700 }
    );
  };

  const trackLocation = () => {
    if (!navigator.geolocation) {
      goToProject();
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => mapRef.current?.flyTo({ center: [coords.longitude, coords.latitude], zoom: 16, duration: 900 }),
      goToProject,
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div className="relative h-full w-full bg-slate-950 overflow-hidden">
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

      {/* Loading Overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-sm text-white">
          <div className="w-9 h-9 border-2 border-sky-400 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs text-sky-200 font-semibold tracking-wide">Loading Dholera Satellite Surroundings Map...</p>
        </div>
      )}

      {/* Controls Top Left */}
      <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setBaseMapStyle((current) => current === "satellite" ? "streets" : "satellite")}
          className="flex items-center gap-2 rounded-xl border border-white/20 bg-slate-950/90 px-3 py-2 text-xs font-semibold text-white shadow-xl hover:bg-slate-900 transition-colors"
          title="Switch satellite and street map"
        >
          <Layers size={15} /> {baseMapStyle === "satellite" ? "Satellite" : "Streets"}
        </button>
        <button
          type="button"
          onClick={() => setShowSurroundings((visible) => !visible)}
          aria-pressed={showSurroundings}
          className="flex items-center gap-2 rounded-xl border border-white/20 bg-slate-950/90 px-3 py-2 text-xs font-semibold text-white shadow-xl hover:bg-slate-900 transition-colors"
        >
          <MapPin size={15} /> Surroundings {showSurroundings ? "On" : "Off"}
        </button>
        <button
          type="button"
          onClick={() => setShowAmenities((visible) => !visible)}
          aria-pressed={showAmenities}
          className="rounded-xl border border-white/20 bg-slate-950/90 px-3 py-2 text-xs font-semibold text-white shadow-xl hover:bg-slate-900 transition-colors"
        >
          Amenities {showAmenities ? "On" : "Off"}
        </button>
        <a
          href={SAN_GRILLA_MEADOWS_META.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-slate-950/90 px-3 py-2 text-xs font-semibold text-amber-300 hover:text-white hover:bg-slate-900 shadow-xl transition-colors"
          title="Open Project Coordinates in Google Maps"
        >
          <LocateFixed size={14} className="text-amber-400" /> Google Maps Pin ↗
        </a>
      </div>

      {/* Navigation Controls Bottom Left */}
      <div className="absolute bottom-5 left-3 z-10 flex items-center gap-1 rounded-xl border border-white/15 bg-slate-950/90 p-1 shadow-2xl">
        <button type="button" onClick={() => mapRef.current?.zoomIn()} className="rounded-lg p-2 text-white hover:bg-white/10" title="Zoom in"><Plus size={17} /></button>
        <button type="button" onClick={() => mapRef.current?.zoomOut()} className="rounded-lg p-2 text-white hover:bg-white/10" title="Zoom out"><Minus size={17} /></button>
        <button type="button" onClick={goToProject} className="rounded-lg p-2 text-white hover:bg-white/10" title="Center on Sangrilla Meadows"><Crosshair size={17} /></button>
        <button type="button" onClick={trackLocation} className="rounded-lg p-2 text-white hover:bg-white/10" title="Show my location"><LocateFixed size={17} /></button>
      </div>

      {/* Status Legend Bottom Right */}
      <div className="absolute bottom-5 right-14 z-10 flex flex-wrap gap-x-3 gap-y-1 rounded-xl border border-white/15 bg-slate-950/90 px-3 py-2 text-[11px] font-medium text-white shadow-2xl">
        <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-green-600" />Available</span>
        <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-red-600" />Booked</span>
        <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-amber-600" />Reserved</span>
      </div>
    </div>
  );
};

export default MeadowsMapCanvas;
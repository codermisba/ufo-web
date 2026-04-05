import { useState, useEffect } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const MapChart = () => {
    // Generate mock hotspot data
    const hotspots = [
        { name: "Roswell, USA", coordinates: [-104.52, 33.39], intensity: 95 },
        { name: "Rendlesham, UK", coordinates: [1.4, 52.1], intensity: 80 },
        { name: "Varginha, BRA", coordinates: [-45.4, -21.5], intensity: 85 },
        { name: "Phoenix, USA", coordinates: [-112.0, 33.4], intensity: 90 },
        { name: "Ariel School, ZWE", coordinates: [31.5, -17.8], intensity: 75 },
        { name: "Kaikoura, NZL", coordinates: [173.6, -42.4], intensity: 70 },
        { name: "Shag Harbour, CAN", coordinates: [-65.7, 43.5], intensity: 82 },
        { name: "Tehran, IRN", coordinates: [51.4, 35.7], intensity: 88 },
        { name: "Delhi, IND", coordinates: [77.2, 28.6], intensity: 92 },
        { name: "Tunguska, RUS", coordinates: [101.9, 60.9], intensity: 89 }
    ];

    return (
        <div className="w-full h-80 md:h-[500px] border border-white/10 rounded-2xl overflow-hidden glass relative group flex items-center justify-center bg-black/40">
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-10"></div>
            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
                <h3 className="font-bold text-white text-base md:text-xl drop-shadow-md flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse"></span>
                    Global Sightings Heatmap
                </h3>
                <p className="text-[10px] md:text-sm text-gray-400 drop-shadow-md ml-4">Tracking high-frequency zones</p>
            </div>

            <ComposableMap projection="geoMercator" projectionConfig={{ scale: 120 }} className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity">
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#0f172a"
                                stroke="#1e293b"
                                strokeWidth={0.5}
                                style={{
                                    default: { outline: "none" },
                                    hover: { fill: "#334155", outline: "none" },
                                    pressed: { outline: "none" },
                                }}
                            />
                        ))
                    }
                </Geographies>
                {hotspots.map(({ name, coordinates, intensity }, i) => (
                    <Marker key={i} coordinates={coordinates}>
                        <circle r={intensity / 15} fill="var(--color-neon-blue)" opacity={0.5} className="animate-pulse" />
                        <circle r={intensity / 25} fill="#fff" opacity={0.8} />
                        <text
                            textAnchor="middle"
                            y={-10}
                            style={{ fontFamily: "Inter, sans-serif", fill: "#fff", fontSize: "10px", fontWeight: "bold" }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            {name}
                        </text>
                    </Marker>
                ))}
            </ComposableMap>
        </div>
    );
};

export default MapChart;

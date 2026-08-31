import { Map } from "lucide-react";

type FraudHeatmapProps = {
  intensity?: number; // 0 - 100
};

export function FraudHeatmap({ intensity = 60 }: FraudHeatmapProps) {
  // intensity 0-100 -> scale and opacity multipliers
  const scale = 0.6 + (intensity / 100) * 1.2; // 0.6 - 1.8
  const opacityMult = 0.35 + (intensity / 100) * 0.8; // 0.35 - 1.15

  const hotspotStyle = (base = 1) => ({
    transform: `scale(${scale * base})`,
    opacity: Math.min(opacityMult, 1),
  });

  return (
    <div className="lg:col-span-2 glass rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
        <Map className="w-5 h-5 text-purple-300" />
        <span>Fraud Detection Heatmap - Jharkhand</span>
      </h3>
      <div className="relative h-64 rounded-lg overflow-hidden border border-white/5 shadow-lg bg-gradient-to-br from-slate-900/60 via-purple-900/40 to-pink-900/20">
        {/* Base map layer (simplified Jharkhand outline) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 400 300"
        >
          <path
            d="M100,50 L150,30 L200,40 L250,60 L300,100 L280,150 L250,200 L200,220 L150,200 L100,150 L80,100 Z"
            fill="none"
            stroke="#c084fc"
            strokeWidth="1.5"
          />
          {/* Major cities */}
          <circle cx="150" cy="100" r="4" fill="#f0abfc" />
          <circle cx="200" cy="120" r="4" fill="#f0abfc" />
          <circle cx="220" cy="180" r="4" fill="#f0abfc" />
        </svg>

        {/* High risk areas (use inline styles to apply intensity) */}
        <div
          className="absolute top-1/4 left-1/3 w-24 h-24 bg-red-500 rounded-full mix-blend-screen shadow-2xl z-20 ring-4 ring-red-500/10"
          style={hotspotStyle(1.0)}
        >
          <div
            className="absolute inset-3 bg-red-500 rounded-full animate-ping"
            style={{ opacity: 0.9 }}
          ></div>
        </div>
        <div
          className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-orange-500 rounded-full mix-blend-screen shadow-xl z-20 ring-4 ring-orange-500/8"
          style={hotspotStyle(0.95)}
        >
          <div
            className="absolute inset-3 bg-orange-500 rounded-full animate-ping"
            style={{ opacity: 0.85 }}
          ></div>
        </div>
        <div
          className="absolute top-1/2 left-1/2 w-16 h-16 bg-yellow-500 rounded-full mix-blend-screen shadow-md z-20 ring-4 ring-yellow-500/6"
          style={hotspotStyle(0.9)}
        >
          <div
            className="absolute inset-3 bg-yellow-500 rounded-full animate-ping"
            style={{ opacity: 0.8 }}
          ></div>
        </div>

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-black/85 rounded-lg p-2 backdrop-blur-sm border border-white/10">
          <div className="flex space-x-4 text-xs text-white">
            <span className="flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-1 shadow-sm"></span>
              High Risk
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-orange-500 rounded-full mr-1 shadow-sm"></span>
              Medium Risk
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-1 shadow-sm"></span>
              Low Risk
            </span>
          </div>
        </div>

        {/* Info panel */}
        <div className="absolute bottom-4 left-4 bg-black/90 rounded-lg px-3 py-2 border border-white/10 z-30">
          <p className="text-white text-sm font-semibold">
            3 High-Risk Areas Detected
          </p>
          <p className="text-white/80 text-xs">Ranchi, Jamshedpur, Dhanbad</p>
        </div>
      </div>
    </div>
  );
}

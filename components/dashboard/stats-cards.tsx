// Extracted from dashboard/page.tsx
import { FileCheck, AlertTriangle, IndianRupee, Users } from "lucide-react";

interface StatsCardsProps {
  stats: Array<{
    title: string;
    value: string | number;
    change: string;
    trend: "up" | "down";
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }>;
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="glass rounded-xl p-6 card-hover">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div
              className={`flex items-center space-x-1 text-sm ${
                stat.trend === "up" ? "text-green-400" : "text-red-400"
              }`}
            >
              {/* Trend icon logic */}
              <span>{stat.change}</span>
            </div>
          </div>
          <p className="text-white/60 text-sm mb-1">{stat.title}</p>
          <p className="text-3xl font-bold text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

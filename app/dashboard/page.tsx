"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileCheck,
  AlertTriangle,
  Shield,
  Clock,
  IndianRupee,
  Map,
  BarChart3,
  Activity,
} from "lucide-react";
import { FraudHeatmap } from "@/components/dashboard/fraud-heatmap";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";

export default function DashboardPage() {
  const [heatmapIntensity, setHeatmapIntensity] = useState(60);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedStats, setAnimatedStats] = useState({
    verifications: 0,
    fraudsDetected: 0,
    moneySaved: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    // Animate numbers
    const animateValue = (
      start: number,
      end: number,
      duration: number,
      key: string
    ) => {
      const startTime = Date.now();
      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(start + (end - start) * progress);
        setAnimatedStats((prev) => ({ ...prev, [key]: value }));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    animateValue(0, 1247, 2000, "verifications");
    animateValue(0, 23, 2000, "fraudsDetected");
    animateValue(0, 247000, 2000, "moneySaved");
    animateValue(0, 428, 2000, "activeUsers");

    return () => clearInterval(timer);
  }, []);

  // Mock data for charts
  const verificationTrend = [
    { date: "Mon", successful: 145, fraudulent: 3 },
    { date: "Tue", successful: 189, fraudulent: 5 },
    { date: "Wed", successful: 178, fraudulent: 2 },
    { date: "Thu", successful: 203, fraudulent: 4 },
    { date: "Fri", successful: 195, fraudulent: 3 },
    { date: "Sat", successful: 167, fraudulent: 2 },
    { date: "Sun", successful: 170, fraudulent: 4 },
  ];

  const institutionStats = [
    { name: "Ranchi University", value: 412, fill: "#9333ea" },
    { name: "BIT Mesra", value: 298, fill: "#ec4899" },
    { name: "XLRI", value: 187, fill: "#3b82f6" },
    { name: "ISM Dhanbad", value: 156, fill: "#10b981" },
    { name: "Others", value: 194, fill: "#f59e0b" },
  ];

  const timeData = [
    { time: "00:00", verifications: 12 },
    { time: "04:00", verifications: 8 },
    { time: "08:00", verifications: 45 },
    { time: "12:00", verifications: 78 },
    { time: "16:00", verifications: 92 },
    { time: "20:00", verifications: 54 },
    { time: "23:59", verifications: 31 },
  ];

  const fraudTypes = [
    { type: "Seal Forgery", count: 8, percentage: 35 },
    { type: "Grade Tampering", count: 6, percentage: 26 },
    { type: "Date Modification", count: 5, percentage: 22 },
    { type: "Fake Institution", count: 4, percentage: 17 },
  ];

  const stats = [
    {
      title: "Today's Verifications",
      value: animatedStats.verifications,
      change: "+12%",
      trend: "up",
      icon: FileCheck,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Fraud Attempts",
      value: animatedStats.fraudsDetected,
      change: "-8%",
      trend: "down",
      icon: AlertTriangle,
      color: "from-red-500 to-rose-500",
    },
    {
      title: "Money Saved",
      value: `₹${animatedStats.moneySaved.toLocaleString()}`,
      change: "+18%",
      trend: "up",
      icon: IndianRupee,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Active Users",
      value: animatedStats.activeUsers,
      change: "+5%",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-white/60">
              Real-time certificate verification analytics
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-sm">Current Time</p>
            <p className="text-white font-mono text-xl">
              {currentTime.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="glass rounded-xl p-6 card-hover">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={`flex items-center space-x-1 text-sm ${
                    stat.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-white animate-count">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Verification Trend */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <span>Weekly Verification Trend</span>
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={verificationTrend}>
                <defs>
                  <linearGradient
                    id="colorSuccessful"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorFraudulent"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                  labelStyle={{ color: "#fff" }}
                />
                <Area
                  type="monotone"
                  dataKey="successful"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorSuccessful)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="fraudulent"
                  stroke="#ef4444"
                  fillOpacity={1}
                  fill="url(#colorFraudulent)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Institution Distribution */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <span>Top Institutions</span>
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={institutionStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {institutionStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                  labelStyle={{ color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {institutionStats.map((inst, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: inst.fill }}
                  ></div>
                  <span className="text-white/70 text-xs">{inst.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fraud Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Fraud Heatmap with intensity controls */}
          <div className="lg:col-span-2 glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                <Map className="w-5 h-5 text-purple-400" />
                <span>Fraud Detection Heatmap - Jharkhand</span>
              </h3>
              <div className="flex items-center space-x-3">
                <div className="text-xs text-white/70 mr-2">Intensity</div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setHeatmapIntensity(30)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      heatmapIntensity <= 40
                        ? "bg-white/10 text-white"
                        : "bg-white/5 text-white/70"
                    }`}
                  >
                    Low
                  </button>
                  <button
                    onClick={() => setHeatmapIntensity(60)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      heatmapIntensity > 40 && heatmapIntensity < 80
                        ? "bg-white/10 text-white"
                        : "bg-white/5 text-white/70"
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => setHeatmapIntensity(90)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      heatmapIntensity >= 80
                        ? "bg-white/10 text-white"
                        : "bg-white/5 text-white/70"
                    }`}
                  >
                    High
                  </button>
                </div>
                <label className="sr-only" htmlFor="heatmap-intensity">
                  Heatmap intensity
                </label>
                <input
                  id="heatmap-intensity"
                  type="range"
                  min={0}
                  max={100}
                  value={heatmapIntensity}
                  onChange={(e) => setHeatmapIntensity(Number(e.target.value))}
                  className="ml-4 w-48 h-1 bg-white/20 rounded-full accent-purple-500"
                />
                <div className="text-xs text-white/60 w-12 text-right">
                  {heatmapIntensity}%
                </div>
              </div>
            </div>

            {/* Heatmap component */}
            <FraudHeatmap intensity={heatmapIntensity} />
          </div>

          {/* Fraud Types */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-purple-400" />
              <span>Fraud Types</span>
            </h3>
            <div className="space-y-4">
              {fraudTypes.map((fraud, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/80 text-sm">{fraud.type}</span>
                    <span className="text-white/60 text-xs">
                      {fraud.count} cases
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-rose-500 transition-all duration-1000"
                      style={{ width: `${fraud.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <Activity className="w-5 h-5 text-purple-400" />
            <span>Real-time Activity</span>
            <span className="ml-auto px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full animate-pulse">
              LIVE
            </span>
          </h3>
          <div className="space-y-3">
            {[
              {
                time: "2 sec ago",
                action: "Certificate verified",
                institution: "Ranchi University",
                status: "success",
              },
              {
                time: "15 sec ago",
                action: "Fraud detected",
                institution: "Unknown Institution",
                status: "danger",
              },
              {
                time: "42 sec ago",
                action: "Bulk verification completed",
                institution: "BIT Mesra",
                status: "success",
              },
              {
                time: "1 min ago",
                action: "Manual review requested",
                institution: "XLRI",
                status: "warning",
              },
              {
                time: "2 min ago",
                action: "Certificate verified",
                institution: "ISM Dhanbad",
                status: "success",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 glass-dark rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full animate-pulse ${
                      activity.status === "success"
                        ? "bg-green-500"
                        : activity.status === "warning"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <div>
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-white/60 text-xs">
                      {activity.institution}
                    </p>
                  </div>
                </div>
                <span className="text-white/40 text-xs">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

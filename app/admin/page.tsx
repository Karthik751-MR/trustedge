"use client";

import { useState } from "react";
import {
  Shield,
  AlertTriangle,
  Ban,
  Upload,
  Settings,
  Database,
  Bell,
  Search,
  Filter,
  Download,
  RefreshCw,
  UserCheck,
  Building2,
  FileWarning,
  TrendingUp,
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock blacklisted certificates
  const blacklistedCerts = [
    {
      id: "FAKE-2024-001",
      studentName: "John Doe",
      institution: "Fake University",
      detectedDate: "2024-12-08",
      fraudType: "Complete Forgery",
      severity: "critical",
    },
    {
      id: "TAMP-2024-047",
      studentName: "Jane Smith",
      institution: "Ranchi University",
      detectedDate: "2024-12-07",
      fraudType: "Grade Tampering",
      severity: "high",
    },
    {
      id: "SUSP-2024-093",
      studentName: "Robert Johnson",
      institution: "BIT Mesra",
      detectedDate: "2024-12-06",
      fraudType: "Seal Forgery",
      severity: "medium",
    },
  ];

  // Mock institutions
  const institutions = [
    {
      name: "Ranchi University",
      status: "verified",
      certificates: 5420,
      verifications: 1247,
      fraudRate: 0.8,
      lastSync: "2 hours ago",
    },
    {
      name: "BIT Mesra",
      status: "verified",
      certificates: 3890,
      verifications: 892,
      fraudRate: 1.2,
      lastSync: "5 hours ago",
    },
    {
      name: "XLRI Jamshedpur",
      status: "pending",
      certificates: 0,
      verifications: 0,
      fraudRate: 0,
      lastSync: "Not synced",
    },
    {
      name: "ISM Dhanbad",
      status: "verified",
      certificates: 2156,
      verifications: 445,
      fraudRate: 0.5,
      lastSync: "1 day ago",
    },
  ];

  // System metrics
  const systemMetrics = [
    { label: "Blockchain Nodes", value: "8/8 Active", status: "healthy" },
    { label: "AI Model Version", value: "v2.4.1", status: "healthy" },
    { label: "Cache Hit Rate", value: "94.3%", status: "healthy" },
    { label: "API Response Time", value: "2.1s avg", status: "warning" },
    { label: "Storage Used", value: "67.8 GB", status: "healthy" },
    { label: "Pending Syncs", value: "3", status: "warning" },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Government Admin Portal
            </h1>
            <p className="text-white/60">
              State-level certificate verification management
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="p-3 glass rounded-xl hover:bg-white/10 transition-all"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-white" />
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
              <RefreshCw className="w-4 h-4 inline mr-2" />
              Sync All
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 glass rounded-xl p-1">
          {[
            { id: "overview", label: "Overview", icon: Shield },
            { id: "blacklist", label: "Fraud Management", icon: AlertTriangle },
            { id: "institutions", label: "Institutions", icon: Building2 },
            { id: "settings", label: "System Settings", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <FileWarning className="w-8 h-8 text-red-400" />
                  <span className="text-2xl font-bold text-white">₹500 Cr</span>
                </div>
                <p className="text-white/60 text-sm">Annual Fraud Prevention</p>
              </div>
              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <UserCheck className="w-8 h-8 text-green-400" />
                  <span className="text-2xl font-bold text-white">8.5M</span>
                </div>
                <p className="text-white/60 text-sm">Students Protected</p>
              </div>
              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Building2 className="w-8 h-8 text-blue-400" />
                  <span className="text-2xl font-bold text-white">312</span>
                </div>
                <p className="text-white/60 text-sm">Institutions Onboarded</p>
              </div>
              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                  <span className="text-2xl font-bold text-white">99.8%</span>
                </div>
                <p className="text-white/60 text-sm">System Uptime</p>
              </div>
            </div>

            {/* System Health */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                System Health Monitor
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {systemMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 glass-dark rounded-lg"
                  >
                    <div>
                      <p className="text-white/60 text-sm">{metric.label}</p>
                      <p className="text-white font-medium">{metric.value}</p>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        metric.status === "healthy"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      } animate-pulse`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Policy Updates */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Policy Updates
              </h3>
              <div className="space-y-3">
                <div className="p-4 glass-dark rounded-lg border-l-4 border-purple-500">
                  <p className="text-white font-medium">
                    New Verification Protocol v2.0
                  </p>
                  <p className="text-white/60 text-sm mt-1">
                    Enhanced AI models deployed for better fraud detection
                  </p>
                  <p className="text-white/40 text-xs mt-2">2 days ago</p>
                </div>
                <div className="p-4 glass-dark rounded-lg border-l-4 border-blue-500">
                  <p className="text-white font-medium">
                    Offline Mode Expansion
                  </p>
                  <p className="text-white/60 text-sm mt-1">
                    Cache bundles now available for 50 more rural districts
                  </p>
                  <p className="text-white/40 text-xs mt-2">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "blacklist" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search by certificate ID, name, or institution..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 glass rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="px-6 py-3 glass text-white rounded-xl font-medium hover:bg-white/10 transition-all flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all">
                <Ban className="w-5 h-5 inline mr-2" />
                Add to Blacklist
              </button>
            </div>

            {/* Blacklisted Certificates Table */}
            <div className="glass rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-white/80 font-medium">
                      Certificate ID
                    </th>
                    <th className="px-6 py-4 text-left text-white/80 font-medium">
                      Student Name
                    </th>
                    <th className="px-6 py-4 text-left text-white/80 font-medium">
                      Institution
                    </th>
                    <th className="px-6 py-4 text-left text-white/80 font-medium">
                      Fraud Type
                    </th>
                    <th className="px-6 py-4 text-left text-white/80 font-medium">
                      Severity
                    </th>
                    <th className="px-6 py-4 text-left text-white/80 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {blacklistedCerts.map((cert, index) => (
                    <tr
                      key={index}
                      className="border-t border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-white font-mono text-sm">
                        {cert.id}
                      </td>
                      <td className="px-6 py-4 text-white">
                        {cert.studentName}
                      </td>
                      <td className="px-6 py-4 text-white/80">
                        {cert.institution}
                      </td>
                      <td className="px-6 py-4 text-white/80">
                        {cert.fraudType}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            cert.severity === "critical"
                              ? "bg-red-500/20 text-red-400"
                              : cert.severity === "high"
                              ? "bg-orange-500/20 text-orange-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {cert.severity.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-purple-400 hover:text-purple-300 mr-3">
                          View
                        </button>
                        <button className="text-red-400 hover:text-red-300">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Fraud Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass rounded-xl p-6">
                <h4 className="text-white font-medium mb-3">
                  Fraud Detection Rate
                </h4>
                <div className="text-3xl font-bold gradient-text">1.8%</div>
                <p className="text-white/60 text-sm mt-1">
                  23 out of 1,247 today
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <h4 className="text-white font-medium mb-3">
                  Most Common Fraud
                </h4>
                <div className="text-xl font-bold text-white">Seal Forgery</div>
                <p className="text-white/60 text-sm mt-1">
                  35% of all detected frauds
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <h4 className="text-white font-medium mb-3">Response Time</h4>
                <div className="text-3xl font-bold gradient-text">12 min</div>
                <p className="text-white/60 text-sm mt-1">
                  Average fraud alert response
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "institutions" && (
          <div className="space-y-6">
            {/* Institution Management */}
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-semibold text-white">
                Registered Institutions
              </h3>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                <Upload className="w-5 h-5 inline mr-2" />
                Onboard Institution
              </button>
            </div>

            {/* Institutions Grid */}
            <div className="grid gap-4">
              {institutions.map((inst, index) => (
                <div
                  key={index}
                  className="glass rounded-xl p-6 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        inst.status === "verified"
                          ? "bg-green-500/20"
                          : "bg-yellow-500/20"
                      }`}
                    >
                      <Building2
                        className={`w-6 h-6 ${
                          inst.status === "verified"
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">
                        {inst.name}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-white/60 text-sm">
                          Certificates: {inst.certificates.toLocaleString()}
                        </span>
                        <span className="text-white/60 text-sm">
                          Verifications: {inst.verifications.toLocaleString()}
                        </span>
                        <span className="text-white/60 text-sm">
                          Fraud Rate: {inst.fraudRate}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        inst.status === "verified"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {inst.status.toUpperCase()}
                    </span>
                    <button className="px-4 py-2 glass text-white rounded-lg hover:bg-white/10 transition-all">
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            {/* System Configuration */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                System Configuration
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 glass-dark rounded-lg">
                  <div>
                    <p className="text-white font-medium">
                      AI Model Auto-Update
                    </p>
                    <p className="text-white/60 text-sm">
                      Automatically update fraud detection models
                    </p>
                  </div>
                  <button
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-500"
                    aria-label="Toggle AI Model Auto-Update"
                  >
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 glass-dark rounded-lg">
                  <div>
                    <p className="text-white font-medium">
                      Offline Cache Duration
                    </p>
                    <p className="text-white/60 text-sm">
                      How long to store verification data offline
                    </p>
                  </div>
                  <select className="px-4 py-2 glass rounded-lg text-white bg-transparent">
                    <option>7 days</option>
                    <option>14 days</option>
                    <option>30 days</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 glass-dark rounded-lg">
                  <div>
                    <p className="text-white font-medium">
                      Fraud Alert Threshold
                    </p>
                    <p className="text-white/60 text-sm">
                      Minimum confidence for fraud alerts
                    </p>
                  </div>
                  <select className="px-4 py-2 glass rounded-lg text-white bg-transparent">
                    <option>70%</option>
                    <option>80%</option>
                    <option>90%</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Export & Reports */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Reports & Export
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-4 glass-dark rounded-lg text-left hover:bg-white/10 transition-all">
                  <Download className="w-6 h-6 text-purple-400 mb-2" />
                  <p className="text-white font-medium">
                    Download Monthly Report
                  </p>
                  <p className="text-white/60 text-sm">
                    Full analytics for December 2024
                  </p>
                </button>
                <button className="p-4 glass-dark rounded-lg text-left hover:bg-white/10 transition-all">
                  <Database className="w-6 h-6 text-purple-400 mb-2" />
                  <p className="text-white font-medium">
                    Export Verification Data
                  </p>
                  <p className="text-white/60 text-sm">
                    CSV format with all records
                  </p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
  Download,
  Share2,
  ArrowLeft,
  FileText,
  Lock,
  Calendar,
  User,
  Building,
} from "lucide-react";
import Link from "next/link";

// Confetti component for success
const Confetti = () => {
  const [pieces, setPieces] = useState<any[]>([]);

  useEffect(() => {
    const colors = ["#9333ea", "#ec4899", "#10b981", "#3b82f6", "#f59e0b"];
    const newPieces = [];

    for (let i = 0; i < 100; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
      });
    }
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: piece.x,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function VerifyResultPage() {
  const params = useParams();
  const router = useRouter();
  const resultId = params.id as string;
  const [showDetails, setShowDetails] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Mock certificate data
  const certificateData = {
    name: "Priya Sharma",
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    institution: "Ranchi University",
    grade: "8.9/10 CGPA",
    year: "2024",
    certificateId: "RU-BTech-2024-CS-12345",
    issueDate: "May 15, 2024",
    blockchainTx: "0xabc123def456789...",
    verificationId:
      "VER-2024-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
  };

  const getResultConfig = () => {
    switch (resultId) {
      case "verified":
        return {
          status: "VERIFIED",
          icon: CheckCircle,
          color: "green",
          title: "Certificate Verified Successfully",
          subtitle:
            "This certificate is authentic and has been verified across all security layers.",
          confidence: 99.8,
          checks: [
            {
              name: "Blockchain Verification",
              status: "passed",
              detail: "Hash matched on Hyperledger Fabric",
            },
            {
              name: "AI Forensic Analysis",
              status: "passed",
              detail: "No tampering detected",
            },
            {
              name: "Institution Database",
              status: "passed",
              detail: "Record found and validated",
            },
            {
              name: "Security Features",
              status: "passed",
              detail: "All watermarks authentic",
            },
          ],
        };
      case "suspicious":
        return {
          status: "SUSPICIOUS",
          icon: AlertCircle,
          color: "yellow",
          title: "Certificate Requires Manual Review",
          subtitle:
            "Some inconsistencies detected. Please contact the issuing institution for verification.",
          confidence: 73.5,
          checks: [
            {
              name: "Blockchain Verification",
              status: "passed",
              detail: "Hash matched on ledger",
            },
            {
              name: "AI Forensic Analysis",
              status: "warning",
              detail: "Minor anomalies in seal region",
            },
            {
              name: "Institution Database",
              status: "warning",
              detail: "Partial record match",
            },
            {
              name: "Security Features",
              status: "passed",
              detail: "Watermarks verified",
            },
          ],
        };
      case "fake":
        return {
          status: "FRAUDULENT",
          icon: XCircle,
          color: "red",
          title: "Certificate Forgery Detected",
          subtitle:
            "This certificate has been identified as fraudulent. Relevant authorities have been notified.",
          confidence: 12.3,
          checks: [
            {
              name: "Blockchain Verification",
              status: "failed",
              detail: "No matching hash found",
            },
            {
              name: "AI Forensic Analysis",
              status: "failed",
              detail: "Multiple tampering indicators detected",
            },
            {
              name: "Institution Database",
              status: "failed",
              detail: "No record exists",
            },
            {
              name: "Security Features",
              status: "failed",
              detail: "Forged watermarks identified",
            },
          ],
        };
      default:
        return null;
    }
  };

  const config = getResultConfig();

  useEffect(() => {
    if (resultId === "verified") {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [resultId]);

  if (!config) {
    return null;
  }

  const StatusIcon = config.icon;

  return (
    <div className="min-h-screen py-12 px-4">
      {showConfetti && <Confetti />}

      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Verification</span>
        </Link>

        {/* Result Card */}
        <div className="glass rounded-2xl overflow-hidden">
          {/* Status Header */}
          <div
            className={`p-8 bg-gradient-to-r ${
              config.color === "green"
                ? "from-green-500/20 to-emerald-500/20"
                : config.color === "yellow"
                ? "from-yellow-500/20 to-amber-500/20"
                : "from-red-500/20 to-rose-500/20"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-4 rounded-full bg-gradient-to-br ${
                    config.color === "green"
                      ? "from-green-500 to-emerald-500"
                      : config.color === "yellow"
                      ? "from-yellow-500 to-amber-500"
                      : "from-red-500 to-rose-500"
                  }`}
                >
                  <StatusIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {config.title}
                  </h1>
                  <p className="text-white/70 mt-1">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-white">
                  {config.confidence}%
                </div>
                <div className="text-white/60 text-sm">Confidence Score</div>
              </div>
            </div>
          </div>

          {/* Certificate Details */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-white mb-6">
              Certificate Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-white/60 text-sm">Student Name</p>
                    <p className="text-white font-medium">
                      {certificateData.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-white/60 text-sm">Degree</p>
                    <p className="text-white font-medium">
                      {certificateData.degree}
                    </p>
                    <p className="text-white/80 text-sm">
                      {certificateData.field}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-white/60 text-sm">Year of Graduation</p>
                    <p className="text-white font-medium">
                      {certificateData.year}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Building className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-white/60 text-sm">Institution</p>
                    <p className="text-white font-medium">
                      {certificateData.institution}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-white/60 text-sm">Certificate ID</p>
                    <p className="text-white font-medium font-mono text-sm">
                      {certificateData.certificateId}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Lock className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-white/60 text-sm">
                      Blockchain Transaction
                    </p>
                    <p className="text-white font-medium font-mono text-sm truncate">
                      {certificateData.blockchainTx}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Checks */}
            <div className="space-y-3 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                Security Verification Results
              </h3>
              {config.checks.map((check, index) => (
                <div
                  key={index}
                  className="glass-dark rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        check.status === "passed"
                          ? "bg-green-500"
                          : check.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      } animate-pulse-dot`}
                    ></div>
                    <div>
                      <p className="text-white font-medium">{check.name}</p>
                      <p className="text-white/60 text-sm">{check.detail}</p>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      check.status === "passed"
                        ? "bg-green-500/20 text-green-400"
                        : check.status === "warning"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {check.status === "passed"
                      ? "Passed"
                      : check.status === "warning"
                      ? "Warning"
                      : "Failed"}
                  </div>
                </div>
              ))}
            </div>

            {/* Forensic Heatmap for Fake Certificates */}
            {resultId === "fake" && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">
                  AI Forensic Analysis
                </h3>
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src="/api/placeholder/600/400"
                    alt="Certificate"
                    className="w-full opacity-50"
                  />
                  <div
                    className="absolute inset-0 heatmap-overlay"
                    style={
                      { "--x": "65%", "--y": "30%" } as React.CSSProperties
                    }
                  ></div>
                  <div className="absolute bottom-4 left-4 bg-black/80 rounded-lg px-3 py-2">
                    <p className="text-red-400 text-sm font-medium">
                      Tampering detected in seal region
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Report</span>
              </button>
              <button className="px-6 py-3 glass text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-300 flex items-center space-x-2">
                <Share2 className="w-5 h-5" />
                <span>Share Result</span>
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-3 glass text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-300"
              >
                Verify Another Certificate
              </button>
            </div>
          </div>
        </div>

        {/* Verification Footer */}
        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            Verification ID:{" "}
            <span className="font-mono text-purple-400">
              {certificateData.verificationId}
            </span>
          </p>
          <p className="text-white/40 text-xs mt-2">
            Verified on {new Date().toLocaleString()} • Powered by TrustEdge AI
            & Blockchain
          </p>
        </div>
      </div>
    </div>
  );
}

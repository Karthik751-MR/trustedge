"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  Shield,
  Zap,
  Globe,
  ChevronRight,
  Scan,
  FileCheck,
  AlertTriangle,
} from "lucide-react";
import { useDropzone } from "react-dropzone";

export default function HomePage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processingStep, setProcessingStep] = useState("");
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
      processVerification(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  const processVerification = async (file: File) => {
    setIsProcessing(true);
    setProgress(0);

    // Simulate processing steps
    const steps = [
      { text: "Extracting document data...", duration: 800 },
      { text: "Running OCR analysis...", duration: 900 },
      { text: "Analyzing with TrustLens AI...", duration: 1000 },
      { text: "Verifying on Hyperledger Fabric...", duration: 800 },
      { text: "Computing confidence score...", duration: 600 },
    ];

    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(steps[i].text);
      setProgress((i + 1) * 20);
      await new Promise((resolve) => setTimeout(resolve, steps[i].duration));
    }

    // Determine result based on filename (for demo)
    let resultId = "verified";
    if (
      file.name.toLowerCase().includes("tampered") ||
      file.name.toLowerCase().includes("fake")
    ) {
      resultId = "fake";
    } else if (file.name.toLowerCase().includes("suspicious")) {
      resultId = "suspicious";
    }

    // Navigate to result page
    router.push(`/verify/${resultId}`);
  };

  const stats = [
    { value: "3 sec", label: "Verification Time", icon: Zap },
    { value: "99.9%", label: "Accuracy Rate", icon: Shield },
    { value: "₹2", label: "Per Verification", icon: FileCheck },
    { value: "Offline", label: "Mode Available", icon: Globe },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            Verify Academic Certificates
            <span className="block text-4xl mt-4 gradient-text">
              Instantly. Securely. Anywhere.
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
            Stop certificate fraud with AI-powered verification and blockchain
            security. From 30 days to 3 seconds. From ₹2000 to ₹2.
          </p>

          {/* Upload Area */}
          <div className="max-w-2xl mx-auto">
            {!isProcessing ? (
              <div
                {...getRootProps()}
                className={`glass rounded-2xl p-12 border-2 border-dashed transition-all duration-300 cursor-pointer
                  ${
                    isDragActive
                      ? "border-purple-400 bg-purple-500/10 scale-105"
                      : "border-white/30 hover:border-purple-400"
                  }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full">
                    <Upload className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-white mb-2">
                      {isDragActive
                        ? "Drop your certificate here"
                        : "Upload Certificate for Verification"}
                    </p>
                    <p className="text-white/60">
                      Drag & drop or click to browse • PDF, JPG, PNG up to 10MB
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-4">
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                      Choose File
                    </button>
                    <span className="text-white/60">or</span>
                    <button className="px-6 py-3 glass text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-300 flex items-center space-x-2">
                      <Scan className="w-5 h-5" />
                      <span>Scan QR Code</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl p-12">
                <div className="flex flex-col items-center space-y-6">
                  {/* Processing Animation */}
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-2 bg-slate-900 rounded-full flex items-center justify-center">
                      <Shield className="w-12 h-12 text-white animate-pulse" />
                    </div>
                    <div className="absolute inset-0 rounded-full scanning-line"></div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full max-w-md">
                    <div className="flex justify-between text-sm text-white/60 mb-2">
                      <span>{processingStep}</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-white/80 text-lg">
                    Analyzing certificate authenticity with advanced AI...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass rounded-xl p-6 text-center card-hover"
              >
                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-3xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Why TrustEdge Wins
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass rounded-xl p-8 card-hover">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-white/70">
                From 30-day manual process to 3-second AI verification. 10,000x
                faster.
              </p>
            </div>

            <div className="glass rounded-xl p-8 card-hover">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Blockchain Secured
              </h3>
              <p className="text-white/70">
                Immutable verification on Hyperledger Fabric. Zero tampering
                possible.
              </p>
            </div>

            <div className="glass rounded-xl p-8 card-hover">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                AI Forensics
              </h3>
              <p className="text-white/70">
                Advanced CNN models detect even the most sophisticated
                forgeries.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="glass-dark rounded-xl p-6 flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-white/90 font-medium">Demo Mode Active</p>
              <p className="text-white/60 text-sm">
                Try uploading &quot;genuine.jpg&quot; for valid or &quot;tampered.jpg&quot; for
                fraud detection demo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

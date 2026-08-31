// app/login/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Mail,
  Lock,
  LogIn,
  Shield,
  Eye,
  EyeOff,
  Fingerprint,
  Key,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Binary,
  Cpu,
  Globe,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Particle System Component
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      pulse: number;
    }> = [];

    // Create verification-themed particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: ["#00f5ff", "#ff00ff", "#9333ea"][Math.floor(Math.random() * 3)],
        pulse: Math.random() * Math.PI * 2,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "rgba(6, 0, 20, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulse += 0.05;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with pulsing effect
        const pulseSize = particle.size + Math.sin(particle.pulse) * 0.5;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections between nearby particles
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(147, 51, 234, ${
              0.2 * (1 - distance / 100)
            })`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
  );
}

// 3D Card Component with Mouse Tracking
function Card3D({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }}>{children}</div>
    </motion.div>
  );
}

// Animated Background Gradient
function AnimatedGradient() {
  return (
    <div className="fixed inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#060014] via-[#0b0322] to-[#060014]" />

      {/* Animated orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full filter blur-[120px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full filter blur-[150px]"
      />
    </div>
  );
}

// Verification Animation Component
function VerificationAnimation({ isActive }: { isActive: boolean }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute inset-0 pointer-events-none"
        >
          <svg className="w-full h-full">
            <motion.circle
              cx="50%"
              cy="50%"
              r="100"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f5ff" />
                <stop offset="50%" stopColor="#ff00ff" />
                <stop offset="100%" stopColor="#9333ea" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<
    "email" | "biometric" | "wallet"
  >("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsVerifying(true);

    // Simulate verification process
    setTimeout(() => {
      setIsLoading(false);
      setIsVerifying(false);
      console.log("Login:", { email, method: selectedMethod });
    }, 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <AnimatedGradient />
      <ParticleField />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-6xl"
        >
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <Shield className="w-20 h-20 text-cyan-400" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-cyan-400/20 rounded-full filter blur-xl"
                />
              </div>
            </motion.div>

            <h1 className="text-6xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                TrustEdge
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Verify. Authenticate. Trust.
            </p>
          </motion.div>

          {/* Login Methods Selector */}
          <div className="flex justify-center mb-8">
            <motion.div className="flex gap-2 p-1 bg-white/5 backdrop-blur-xl rounded-full">
              {(["email", "biometric", "wallet"] as const).map((method) => (
                <motion.button
                  key={method}
                  onClick={() => setSelectedMethod(method)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    selectedMethod === method
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-2">
                    {method === "email" && <Mail className="w-4 h-4" />}
                    {method === "biometric" && (
                      <Fingerprint className="w-4 h-4" />
                    )}
                    {method === "wallet" && <Key className="w-4 h-4" />}
                    <span className="capitalize">{method}</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Main Login Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Interactive Visual */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="hidden lg:block"
            >
              <Card3D>
                <div className="relative h-[600px] rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl" />

                  {/* Floating Icons */}
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-20 left-10"
                  >
                    <div className="p-4 bg-cyan-500/20 rounded-xl backdrop-blur-xl">
                      <Binary className="w-8 h-8 text-cyan-400" />
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [0, 20, 0],
                      rotate: [0, -5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="absolute top-40 right-10"
                  >
                    <div className="p-4 bg-purple-500/20 rounded-xl backdrop-blur-xl">
                      <Cpu className="w-8 h-8 text-purple-400" />
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                      x: [0, 10, 0],
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2,
                    }}
                    className="absolute bottom-40 left-20"
                  >
                    <div className="p-4 bg-pink-500/20 rounded-xl backdrop-blur-xl">
                      <Globe className="w-8 h-8 text-pink-400" />
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-20 right-20"
                  >
                    <div className="p-4 bg-yellow-500/20 rounded-xl backdrop-blur-xl">
                      <Zap className="w-8 h-8 text-yellow-400" />
                    </div>
                  </motion.div>

                  {/* Center Shield */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative"
                    >
                      <ShieldCheck className="w-32 h-32 text-white/20" />
                      <VerificationAnimation isActive={isVerifying} />
                    </motion.div>
                  </div>

                  {/* Info Text */}
                  <div className="absolute bottom-10 left-10 right-10">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Secure Authentication
                    </h3>
                    <p className="text-gray-400">
                      Multi-layer verification with AI-powered fraud detection
                      and blockchain validation.
                    </p>
                  </div>
                </div>
              </Card3D>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card3D>
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                  <AnimatePresence mode="wait">
                    {selectedMethod === "email" && (
                      <motion.form
                        key="email"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        <div>
                          <h2 className="text-3xl font-bold text-white mb-2">
                            Welcome Back
                          </h2>
                          <p className="text-gray-400">
                            Sign in with your email credentials
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label className="text-gray-300 mb-2 block">
                              Email Address
                            </Label>
                            <div className="relative group">
                              <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border-white/10 text-white h-14 pl-12
                                         focus:border-cyan-400 focus:bg-white/10 transition-all"
                                placeholder="name@organization.edu"
                                required
                              />
                              <Mail
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400
                                            group-focus-within:text-cyan-400 transition-colors"
                              />
                            </div>
                          </div>

                          <div>
                            <Label className="text-gray-300 mb-2 block">
                              Password
                            </Label>
                            <div className="relative group">
                              <Input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border-white/10 text-white h-14 pl-12 pr-12
                                         focus:border-cyan-400 focus:bg-white/10 transition-all"
                                placeholder="••••••••"
                                required
                              />
                              <Lock
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400
                                            group-focus-within:text-cyan-400 transition-colors"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400
                                         hover:text-cyan-400 transition-colors"
                              >
                                {showPassword ? (
                                  <EyeOff className="w-5 h-5" />
                                ) : (
                                  <Eye className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <label className="flex items-center text-gray-300">
                            <input
                              type="checkbox"
                              className="mr-2 rounded border-gray-600 bg-white/5"
                            />
                            <span className="text-sm">Remember me</span>
                          </label>
                          <Link
                            href="/forgot"
                            className="text-sm text-cyan-400 hover:text-cyan-300"
                          >
                            Forgot password?
                          </Link>
                        </div>

                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full h-14 bg-gradient-to-r from-cyan-500 to-purple-500
                                   text-white font-semibold
                                   rounded-xl transition-all"
                        >
                          {isLoading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <Sparkles className="w-5 h-5" />
                            </motion.div>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              Sign In
                              <ChevronRight className="w-5 h-5" />
                            </span>
                          )}
                        </Button>

                        <div className="text-center">
                          <p className="text-gray-400">
                            Don&apos;t have an account?{" "}
                            <Link
                              href="/register"
                              className="text-cyan-400 font-semibold"
                            >
                              Create one
                            </Link>
                          </p>
                        </div>
                      </motion.form>
                    )}

                    {selectedMethod === "biometric" && (
                      <motion.div
                        key="biometric"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="inline-block mb-6"
                        >
                          <div className="relative">
                            <Fingerprint className="w-24 h-24 text-cyan-400" />
                            <motion.div
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute inset-0 bg-cyan-400/20 rounded-full filter blur-xl"
                            />
                          </div>
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                          Biometric Authentication
                        </h3>
                        <p className="text-gray-400 mb-8">
                          Place your finger on the sensor to continue
                        </p>
                        <Button
                          onClick={() => setSelectedMethod("email")}
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          Use Email Instead
                        </Button>
                      </motion.div>
                    )}

                    {selectedMethod === "wallet" && (
                      <motion.div
                        key="wallet"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="inline-block mb-6"
                        >
                          <div className="relative">
                            <Key className="w-24 h-24 text-purple-400" />
                            <motion.div
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute inset-0 bg-purple-400/20 rounded-full filter blur-xl"
                            />
                          </div>
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                          Connect Wallet
                        </h3>
                        <p className="text-gray-400 mb-8">
                          Sign in with your Web3 wallet for decentralized
                          authentication
                        </p>
                        <div className="space-y-3">
                          <Button className="w-full h-12 bg-purple-600 hover:bg-purple-700">
                            Connect MetaMask
                          </Button>
                          <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700">
                            Connect WalletConnect
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card3D>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  User, Mail, Lock, Eye, EyeOff, UserPlus,
  ChevronRight, CheckCircle, AlertCircle, Sparkles,
  Building, GraduationCap, Briefcase, Shield,
  ArrowRight, Loader2, Check, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// DNA Helix Animation Component
function DNAHelix() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <svg className="w-full h-full" viewBox="0 0 400 800">
        <defs>
          <linearGradient id="dna-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5ff">
              <animate attributeName="stop-color" values="#00f5ff;#ff00ff;#00f5ff" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#9333ea">
              <animate attributeName="stop-color" values="#9333ea;#00f5ff;#9333ea" dur="4s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>

        {[...Array(20)].map((_, i) => (
          <g key={i}>
            <motion.circle
              cx={200 + Math.sin(i * 0.5) * 100}
              cy={i * 40}
              r="4"
              fill="url(#dna-gradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
            />
            <motion.circle
              cx={200 - Math.sin(i * 0.5) * 100}
              cy={i * 40}
              r="4"
              fill="url(#dna-gradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: i * 0.1 + 1, repeat: Infinity }}
            />
            <motion.line
              x1={200 + Math.sin(i * 0.5) * 100}
              y1={i * 40}
              x2={200 - Math.sin(i * 0.5) * 100}
              y2={i * 40}
              stroke="url(#dna-gradient)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

// Interactive Step Indicator
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[...Array(totalSteps)].map((_, i) => (
        <motion.div
          key={i}
          className="relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <motion.div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold
                      ${i < currentStep
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                        : i === currentStep
                        ? 'bg-white/20 text-white border-2 border-cyan-400'
                        : 'bg-white/5 text-gray-500 border border-white/10'}`}
            animate={i === currentStep ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {i < currentStep ? <Check className="w-5 h-5" /> : i + 1}
          </motion.div>
          {i < totalSteps - 1 && (
            <div className={`absolute top-1/2 left-12 w-24 h-0.5 -translate-y-1/2
                          ${i < currentStep ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-white/10'}`} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// Password Strength Indicator
function PasswordStrength({ password }: { password: string }) {
  const getStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return Math.min(strength, 5);
  };

  const strength = getStrength();
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const strengthColors = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#10b981'];

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 h-1 rounded-full overflow-hidden bg-white/10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <motion.div
              className="h-full"
              initial={{ width: 0 }}
              animate={{
                width: i < strength ? '100%' : '0%',
                backgroundColor: strengthColors[strength]
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
      {password && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs"
          style={{ color: strengthColors[strength] }}
        >
          {strengthLabels[strength]}
        </motion.p>
      )}
    </div>
  );
}

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [accountType, setAccountType] = useState<'student' | 'institution' | 'employer'>('student');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    role: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      // Account type selection - no validation needed
    } else if (step === 1) {
      if (!formData.fullName || formData.fullName.length < 2) {
        newErrors.fullName = 'Please enter your full name';
      }
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    } else if (step === 2) {
      if (!formData.password || formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 2) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Signup:', { ...formData, accountType });
    }, 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#1a0033] via-[#0a001a] to-black" />

        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239333ea" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '60px 60px',
          }}
        />

        <DNAHelix />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-5xl"
        >
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              <UserPlus className="w-16 h-16 text-cyan-400" />
            </motion.div>
            <h1 className="text-5xl font-bold mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                Join TrustEdge
              </span>
            </h1>
            <p className="text-gray-400">Create your verified digital identity</p>
          </motion.div>

          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} totalSteps={3} />

          {/* Form Card */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
          >
            <AnimatePresence mode="wait">
              {/* Step 0: Account Type Selection */}
              {currentStep === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    Choose Your Account Type
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { type: 'student', icon: GraduationCap, title: 'Student', desc: 'Verify and share your academic credentials' },
                      { type: 'institution', icon: Building, title: 'Institution', desc: 'Issue and manage verified certificates' },
                      { type: 'employer', icon: Briefcase, title: 'Employer', desc: 'Verify candidate credentials instantly' },
                    ].map((option) => (
                      <motion.button
                        key={option.type}
                        onClick={() => setAccountType(option.type as typeof accountType)}
                        className={`p-6 rounded-2xl border-2 transition-all text-left
                                  ${accountType === option.type
                                    ? 'border-cyan-400 bg-cyan-400/10'
                                    : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <option.icon className={`w-12 h-12 mb-4 ${
                          accountType === option.type ? 'text-cyan-400' : 'text-gray-400'
                        }`} />
                        <h3 className="text-xl font-semibold text-white mb-2">{option.title}</h3>
                        <p className="text-gray-400 text-sm">{option.desc}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold text-white mb-6">Personal Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-gray-300 mb-2 block">Full Name</Label>
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={`w-full bg-white/5 border-white/10 text-white h-14 pl-12
                                    focus:border-cyan-400 focus:bg-white/10 transition-all
                                    ${errors.fullName ? 'border-red-500' : ''}`}
                          placeholder="John Doe"
                        />
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      {errors.fullName && (
                        <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-gray-300 mb-2 block">Email Address</Label>
                      <div className="relative">
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full bg-white/5 border-white/10 text-white h-14 pl-12
                                    focus:border-cyan-400 focus:bg-white/10 transition-all
                                    ${errors.email ? 'border-red-500' : ''}`}
                          placeholder="john@example.com"
                        />
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {accountType !== 'student' && (
                      <>
                        <div>
                          <Label className="text-gray-300 mb-2 block">Organization</Label>
                          <Input
                            type="text"
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            className="w-full bg-white/5 border-white/10 text-white h-14
                                     focus:border-cyan-400 focus:bg-white/10 transition-all"
                            placeholder="Your Organization"
                          />
                        </div>

                        <div>
                          <Label className="text-gray-300 mb-2 block">Role</Label>
                          <Input
                            type="text"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full bg-white/5 border-white/10 text-white h-14
                                     focus:border-cyan-400 focus:bg-white/10 transition-all"
                            placeholder="Your Role"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Security Setup */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold text-white mb-6">Secure Your Account</h2>

                  <div className="space-y-6">
                    <div>
                      <Label className="text-gray-300 mb-2 block">Password</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className={`w-full bg-white/5 border-white/10 text-white h-14 pl-12 pr-12
                                    focus:border-cyan-400 focus:bg-white/10 transition-all
                                    ${errors.password ? 'border-red-500' : ''}`}
                          placeholder="Create a strong password"
                        />
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <PasswordStrength password={formData.password} />
                      {errors.password && (
                        <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-gray-300 mb-2 block">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className={`w-full bg-white/5 border-white/10 text-white h-14 pl-12 pr-12
                                    focus:border-cyan-400 focus:bg-white/10 transition-all
                                    ${errors.confirmPassword ? 'border-red-500' : ''}`}
                          placeholder="Confirm your password"
                        />
                        <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                    {/* Security Features */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-6 border border-cyan-400/20"
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">Security Features</h3>
                    <div className="space-y-3">
                      {[
                        { icon: CheckCircle, text: 'End-to-end encryption' },
                        { icon: Shield, text: 'Zero-knowledge architecture' },
                        { icon: AlertCircle, text: 'Multi-factor authentication' },
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <feature.icon className="w-5 h-5 text-cyan-400" />
                          <span className="text-gray-300">{feature.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Back
                </Button>
              )}

              <Button
                type="button"
                onClick={handleNext}
                disabled={isLoading}
                className={`${currentStep === 0 ? 'w-full' : 'ml-auto'} h-14 bg-gradient-to-r from-cyan-500 to-purple-500
                         hover:from-cyan-600 hover:to-purple-600 text-white font-semibold
                         rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]`}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {currentStep === 2 ? 'Create Account' : 'Continue'}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-8"
          >
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                Sign in instead
              </Link>
            </p>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex justify-center items-center gap-8 flex-wrap"
          >
            {['ISO 27001', 'GDPR', 'SOC 2', 'HIPAA'].map((badge, index) => (
              <motion.div
                key={badge}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10"
              >
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-400">{badge} Compliant</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Background Animation Overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            background: [
              'radial-gradient(600px at 0% 0%, rgba(0, 245, 255, 0.1), transparent)',
              'radial-gradient(600px at 100% 100%, rgba(147, 51, 234, 0.1), transparent)',
              'radial-gradient(600px at 0% 100%, rgba(255, 0, 255, 0.1), transparent)',
              'radial-gradient(600px at 100% 0%, rgba(0, 245, 255, 0.1), transparent)',
              'radial-gradient(600px at 0% 0%, rgba(0, 245, 255, 0.1), transparent)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
        />
      </div>
    </div>
  );
}


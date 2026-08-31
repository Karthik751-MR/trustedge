// ─── Certificate ──────────────────────────────────────────────
export interface Certificate {
  id: string;
  name: string;
  degree: string;
  field: string;
  institution: string;
  grade: string;
  year: string;
  issueDate: string;
  blockchainTx: string;
  isValid: boolean;
}

// ─── Verification ─────────────────────────────────────────────
export type VerificationStatus = "VERIFIED" | "SUSPICIOUS" | "FRAUDULENT";

export interface VerificationCheck {
  name: string;
  status: "passed" | "warning" | "failed";
  detail: string;
}

export interface VerificationResult {
  verificationId: string;
  status: VerificationStatus;
  confidenceScore: number;
  certificateData: Partial<Certificate>;
  checks: VerificationCheck[];
  timestamp: string;
  processingTime: string;
  blockchainProof: string;
  recommendations: string[];
}

// ─── Institution ──────────────────────────────────────────────
export interface Institution {
  name: string;
  status: "verified" | "pending" | "suspended";
  certificates: number;
  verifications: number;
  fraudRate: number;
  lastSync: string;
}

// ─── Fraud ────────────────────────────────────────────────────
export interface FraudAlert {
  id: string;
  studentName: string;
  institution: string;
  detectedDate: string;
  fraudType: string;
  severity: "critical" | "high" | "medium" | "low";
}

export interface FraudHotspot {
  city: string;
  lat: number;
  lng: number;
  intensity: number;
}

// ─── Activity Feed ────────────────────────────────────────────
export interface ActivityItem {
  time: string;
  action: string;
  institution: string;
  status: "success" | "warning" | "danger";
}

// ─── Stats ────────────────────────────────────────────────────
export interface DashboardStats {
  todayVerifications: number;
  fraudsDetected: number;
  moneySaved: number;
  activeUsers: number;
  successRate: number;
  avgResponseTime: number;
}

// ─── System Metrics ───────────────────────────────────────────
export interface SystemMetric {
  label: string;
  value: string;
  status: "healthy" | "warning" | "critical";
}

// ─── Contact ──────────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  organization?: string;
}

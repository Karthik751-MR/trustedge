import { NextRequest, NextResponse } from "next/server";

// Mock database of valid certificates
const validCertificates = {
  "RU-BTech-2024-CS-12345": {
    name: "Priya Sharma",
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    institution: "Ranchi University",
    grade: "8.9/10 CGPA",
    year: "2024",
    issueDate: "May 15, 2024",
    blockchainTx: "0xabc123def456789xyz123456789abc123def456789xyz123456789",
    isValid: true,
  },
  "BIT-MTech-2024-AI-67890": {
    name: "Rahul Kumar",
    degree: "Master of Technology",
    field: "Artificial Intelligence",
    institution: "BIT Mesra",
    grade: "9.2/10 CGPA",
    year: "2024",
    issueDate: "June 10, 2024",
    blockchainTx: "0xdef456789xyz123456789abc123def456789xyz123456789abc123",
    isValid: true,
  },
};

// Simulated AI forensic analysis
const analyzeDocument = async (fileData: any) => {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock forensic results
  return {
    ocrConfidence: 0.95,
    tamperDetection: {
      detected: false,
      confidence: 0.98,
      regions: [],
    },
    watermarkVerification: {
      present: true,
      authentic: true,
    },
    sealAnalysis: {
      genuine: true,
      confidence: 0.96,
    },
  };
};

// Simulated blockchain verification
const verifyOnBlockchain = async (certificateHash: string) => {
  // Simulate blockchain query
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    exists: true,
    transactionId: "0x" + Math.random().toString(36).substr(2, 64),
    timestamp: new Date().toISOString(),
    blockNumber: Math.floor(Math.random() * 1000000),
  };
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("certificate") as File;
    const certificateId = formData.get("certificateId") as string;

    if (!file && !certificateId) {
      return NextResponse.json(
        { error: "No certificate file or ID provided" },
        { status: 400 }
      );
    }

    // Start verification process
    const verificationSteps = [];

    // Step 1: OCR & Data Extraction
    verificationSteps.push({
      step: "OCR Processing",
      status: "completed",
      confidence: 0.95,
    });

    // Step 2: AI Forensic Analysis
    const forensicResults = await analyzeDocument(file);
    verificationSteps.push({
      step: "AI Forensic Analysis",
      status: "completed",
      results: forensicResults,
    });

    // Step 3: Blockchain Verification
    const blockchainResult = await verifyOnBlockchain(
      certificateId || "generated-hash-" + Date.now()
    );
    verificationSteps.push({
      step: "Blockchain Verification",
      status: "completed",
      results: blockchainResult,
    });

    // Step 4: Database Cross-Check
    const dbRecord = certificateId
      ? validCertificates[certificateId as keyof typeof validCertificates]
      : null;
    verificationSteps.push({
      step: "Database Validation",
      status: "completed",
      recordFound: !!dbRecord,
    });

    // Calculate final confidence score
    let confidenceScore = 0;
    let verificationStatus = "SUSPICIOUS";

    if (
      dbRecord &&
      forensicResults.tamperDetection.detected === false &&
      blockchainResult.exists
    ) {
      confidenceScore = 99.8;
      verificationStatus = "VERIFIED";
    } else if (
      !forensicResults.tamperDetection.detected &&
      blockchainResult.exists
    ) {
      confidenceScore = 73.5;
      verificationStatus = "SUSPICIOUS";
    } else {
      confidenceScore = 12.3;
      verificationStatus = "FRAUDULENT";
    }

    // Generate verification result
    const result = {
      verificationId:
        "VER-2024-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: verificationStatus,
      confidenceScore,
      certificateData: dbRecord || {
        name: "Unknown",
        degree: "Unknown",
        institution: "Unknown",
        year: "Unknown",
      },
      verificationSteps,
      timestamp: new Date().toISOString(),
      processingTime: "2.3 seconds",
      blockchainProof: blockchainResult.transactionId,
      recommendations:
        verificationStatus === "VERIFIED"
          ? ["Certificate is authentic", "Safe to proceed"]
          : verificationStatus === "SUSPICIOUS"
          ? ["Manual review recommended", "Contact issuing institution"]
          : ["Do not accept this certificate", "Report to authorities"],
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // Return API status
  return NextResponse.json({
    status: "active",
    version: "1.0.0",
    endpoints: {
      verify: "/api/verify",
      stats: "/api/stats",
      institutions: "/api/institutions",
    },
    blockchain: {
      network: "Hyperledger Fabric",
      nodes: 8,
      status: "healthy",
    },
    ai: {
      model: "TrustLens v2.4.1",
      accuracy: 0.958,
      lastUpdated: "2024-12-08",
    },
  });
}

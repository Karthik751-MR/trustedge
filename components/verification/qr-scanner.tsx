"use client";

import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { Scan } from "lucide-react";

export function QRScanner({ onScan }: { onScan: (data: string) => void }) {
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Scan className="w-5 h-5 text-purple-400" />
        <h3 className="text-white font-semibold">Scan QR Code</h3>
      </div>
      <QrReader
        onResult={(result: { text: string } | null) => {
          if (result) {
            onScan(result.text);
          }
        }}
        constraints={{ facingMode }}
        containerStyle={{ width: "100%" }}
      />
      <button
        onClick={() =>
          setFacingMode((prev) =>
            prev === "environment" ? "user" : "environment"
          )
        }
        className="mt-4 px-4 py-2 glass text-white rounded-lg"
      >
        Switch Camera
      </button>
    </div>
  );
}

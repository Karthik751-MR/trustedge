"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "rgba(15, 10, 30, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "#fff",
          backdropFilter: "blur(12px)",
        },
        classNames: {
          success: "!border-green-500/30",
          error: "!border-red-500/30",
          warning: "!border-yellow-500/30",
          info: "!border-purple-500/30",
        },
      }}
      richColors
      closeButton
    />
  );
}

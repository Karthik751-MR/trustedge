"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

interface UploadZoneProps {
  onFileUpload: (file: File) => void;
}

export function UploadZone({ onFileUpload }: UploadZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  return (
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
      </div>
    </div>
  );
}

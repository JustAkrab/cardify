"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/file-upload";

export function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className="w-full max-w-4xl my-12 min-h-96 fc border border-dashed bg-white border-neutral-200 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}

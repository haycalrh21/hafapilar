"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FiFile, FiX, FiCheck } from "react-icons/fi";

const FileUploadCv = ({
  onFileSelect,
}: {
  onFileSelect: (file: File | null, fileUrl: string | null) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      // Reset state
      setError(null);
      setFile(null);
      setUploadStatus("idle");

      if (!acceptedFiles || acceptedFiles.length === 0) {
        alert("FIle not type pdf");
        return;
      }

      const selectedFile = acceptedFiles[0];

      // Validasi tipe file
      if (selectedFile?.type !== "application/pdf") {
        alert("Only PDF files are allowed.");
        return;
      }

      setFile(selectedFile);
      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
        const pinataSecretApiKey =
          process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;

        if (!pinataApiKey || !pinataSecretApiKey) {
          throw new Error("Missing API keys in environment variables");
        }

        const headers = new Headers();
        headers.append("pinata_api_key", pinataApiKey);
        headers.append("pinata_secret_api_key", pinataSecretApiKey);

        const res = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers,
            body: formData,
          }
        );

        if (!res.ok) {
          throw new Error("Pinata upload failed");
        }

        const result = await res.json();
        if (result?.IpfsHash) {
          const fileUrl = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
          setUploadStatus("success");
          onFileSelect(selectedFile, fileUrl);
        } else {
          setUploadStatus("error");
          setError("Failed to upload file.");
        }
      } catch (error) {
        setUploadStatus("error");
        setError("Failed to upload file.");
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [onFileSelect]
  );

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setUploadStatus("idle");
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 10485760,
    multiple: false,
    disabled: isUploading,
  });

  return (
    <div className="w-[95%] mx-auto font-['Poppins']">
      <label className="block text-sm font-medium text-hero mb-2">
        Upload Your CV*
      </label>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? "border-teal-500 bg-teal-50"
              : file
              ? "border-teal-500"
              : "border-gray-300 hover:border-teal-500"
          }`}
      >
        <input {...getInputProps()} />

        {!file ? (
          <div className="flex flex-col items-center gap-3">
            <IoCloudUploadOutline className="w-12 h-12 text-gray-400" />
            <div>
              <p className="text-lg font-medium text-gray-900">
                Select a file or drag and drop here
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Only PDF files are allowed. Max size 10MB.
              </p>
            </div>
            <button
              type="button"
              className="mt-4 px-6 py-2 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50 transition-colors"
            >
              Select File
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-white rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <FiFile className="w-8 h-8 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0 max-w-[200px]">
                <p className="text-sm font-medium text-gray-900 truncate max-w-[75px] md:max-w-[150px]">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {isUploading ? (
                <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
              ) : uploadStatus === "success" ? (
                <FiCheck className="w-6 h-6 text-green-500" />
              ) : uploadStatus === "error" ? (
                <span className="text-red-500 text-sm">Upload failed</span>
              ) : null}

              <button
                onClick={removeFile}
                className="p-1 rounded-full hover:bg-gray-100"
                disabled={isUploading}
              >
                <FiX className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FileUploadCv;

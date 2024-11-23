"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FiFile, FiX, FiCheck } from "react-icons/fi";

const FileUpload = ({
  onFileSelect,
}: {
  onFileSelect: (file: File | null, fileUrl: string | null) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Initialize useDropzone hook
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles),
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setIsUploading(true);
      setUploadStatus("idle");

      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const res = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers: {
              pinata_api_key: "15c46cf6b49779ff3845",
              pinata_secret_api_key:
                "064d9845277628274f871985bb5871461419f3355a5aa7a824d639992153251a",
            },
            body: formData,
          }
        );

        if (!res.ok) {
          throw new Error("Pinata upload failed");
        }

        const result = await res.json();
        const fileUrl = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`; // URL valid

        console.log("Uploaded File URL:", fileUrl); // Debug output
        setUploadStatus("success");
        onFileSelect(selectedFile, fileUrl); // Send file URL to parent component
      } catch (error) {
        setUploadStatus("error");
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [onFileSelect]
  );

  return (
    <div className="w-[95%] mx-auto font-['Poppins']">
      <label className="block text-sm font-medium text-hero mb-2">
        Upload Your Work Experience Certificate*
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
                JPG, PNG or PDF, file size no more than 10MB
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-white rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <FiFile className="w-8 h-8 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
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
            </div>
          </div>
        )}
      </div>

      {file && uploadStatus === "error" && (
        <p className="mt-2 text-sm text-red-500">
          Failed to upload file. Please try again.
        </p>
      )}
    </div>
  );
};

export default FileUpload;

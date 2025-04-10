"use client";

import { useState, ChangeEvent, FormEvent } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [fileUploadError, setFileUploadError] = useState("");
  const [previewError, setPreviewError] = useState(false);

  const handleFile = (file: File) => {
    setFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setFileUploadError("");
    setUploadedFileUrl("");
    setPreviewError(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      setFileUploadError("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://0x0.st", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();

      if (response.ok && text.startsWith("http")) {
        setUploadedFileUrl(text.trim());
        setFileUploadError("");
      } else {
        throw new Error("Upload failed");
      }
    } catch (_) {
      setFileUploadError("Error uploading file.");
      setUploadedFileUrl("");
    }
  };

  const reset = () => {
    setFile(null);
    setPreviewUrl(null);
    setUploadedFileUrl("");
    setFileUploadError("");
    setPreviewError(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-20 space-y-6 max-w-md mx-auto">
      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`${
            isDragging ? "border-4" : "border-2"
          } flex flex-col h-[40vh] w-full border-dashed border-[var(--teritiary-bg)] rounded-md items-center justify-center text-center cursor-pointer`}
        >
          <label
            htmlFor="file"
            className="w-full h-full flex flex-col justify-center text-[var(--teritiary-bg)] items-center"
          >
            Click to upload or drag and drop
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full h-[40vh] max-w-md border-2 border-[var(--teritiary-bg)] border-dashed rounded-md flex items-center justify-center overflow-hidden">
            {previewUrl && !previewError ? (
              <object
                data={previewUrl}
                type={file?.type}
                className="w-full h-full flex flex-col justify-center text-[var(--teritiary-bg)] items-center object-contain"
                onError={() => setPreviewError(true)}
              >
                <p className="w-full h-full flex flex-col justify-center text-[var(--teritiary-bg)] items-center">
                  Cannot preview this file type.
                </p>
              </object>
            ) : (
              <p className="w-full h-full flex flex-col justify-center text-[var(--teritiary-bg)] items-center">
                Cannot preview this file type.
              </p>
            )}
          </div>
          <div className="flex space-x-4">
            <button type="button" onClick={reset} className="btn-out">
              Clear
            </button>
            <button type="submit" className="btn">
              Upload
            </button>
          </div>
        </div>
      )}

      {uploadedFileUrl && (
        <p className="text-[var(--accent-color)] break-all text-center">
          Uploaded:{" "}
          <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer">
            {uploadedFileUrl}
          </a>
        </p>
      )}

      {fileUploadError && (
        <p className="text-[var(--red)] text-center">{fileUploadError}</p>
      )}
    </form>
  );
}

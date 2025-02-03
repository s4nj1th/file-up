import { useState, ChangeEvent, FormEvent } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [fileUploadError, setFileUploadError] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://0x0.st/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadedFileUrl(result.fileUrl);
        setFileUploadError("");
      } else {
        setUploadedFileUrl("");
        setFileUploadError("Error uploading file!");
      }
    } catch (error) {
      setUploadedFileUrl("");
      setFileUploadError("Error uploading file!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="card">
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {uploadedFileUrl && (
        <p>
          File at{" "}
          <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer">
            {uploadedFileUrl}
          </a>
        </p>
      )}

      {fileUploadError && (
        <p className="upload-error">
            {fileUploadError}
        </p>
      )}
    </>
  );
}

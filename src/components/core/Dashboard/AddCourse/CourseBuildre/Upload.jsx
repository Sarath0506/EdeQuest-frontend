import React, { useEffect, useState } from "react";

const Upload = ({ register, name, viewData, editData, errors, video }) => {
  const [preview, setPreview] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    if (viewData) {
      setPreview(viewData);
      setMediaType("video");
    } else if (editData) {
      setPreview(editData);
      setMediaType("video");
    }
  }, [viewData, editData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setFileError("No file selected.");
      return;
    }

    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
    setFileError(""); // Reset file error

    if (file.type.startsWith("image/")) {
      setMediaType("image");
    } else if (file.type.startsWith("video/")) {
      setMediaType("video");
    } else {
      setMediaType("");
      setFileError("Unsupported file type.");
    }
  };

  return (
    <div className="upload-container">
      <h2 className="text-xl font-semibold mb-4">Upload and Preview</h2>

      {viewData ? (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Video Preview:</h3>
          <video src={viewData} controls className="w-full max-w-md" />
        </div>
      ) : (
        <div>
          <label
            htmlFor="file-upload"
            className="block mb-2 font-medium text-gray-700"
          >
            {video ? "Upload a video" : "Upload an image or video"}
          </label>
          <input
            id="file-upload"
            type="file"
            accept={video ? "video/*" : "image/*,video/*"}
            {...register(name)}
            onChange={handleFileChange}
            className="file-input mb-2"
            aria-label="Upload file"
          />

          {errors?.lectureVideo && (
            <span className="text-red-500">Please upload a valid video</span>
          )}

          {fileError && (
            <span className="text-red-500 block mb-2">{fileError}</span>
          )}

          {preview ? (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Preview:</h3>
              {mediaType === "video" ? (
                <video src={preview} controls className="w-full max-w-md" />
              ) : (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-w-md"
                />
              )}
            </div>
          ) : (
            <p className="text-gray-500 mt-4">
              No file selected. Please upload a file to preview.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Upload;

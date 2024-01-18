import { FileWithPreview } from "@interfaces/utils.interface";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type ImageInfo = {
  src: string;
  title?: string;
  alt?: string;
};

type GalleryProps = {
  maxImages: number;
  initialImages?: FileWithPreview[];
  onFileDelete?: (file: FileWithPreview) => void;
};

const Gallery: React.FC<GalleryProps> = ({
  initialImages = [],
  maxImages,
  onFileDelete,
}) => {
  const [objectURLs, setObjectURLs] = useState<FileWithPreview[]>([
    ...initialImages,
  ]);

  useEffect(() => {
    setObjectURLs(initialImages);
  }, [initialImages]);

  const handleRemoveImage = (index: number) => {
    // Revoke object URL
    if (objectURLs[index].previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(objectURLs[index].previewUrl);
    }
    // Remove image from state
    setObjectURLs((prevURLs) => prevURLs.filter((_, i) => i !== index));
    if (onFileDelete) {
      onFileDelete(objectURLs[index]);
    }
  };

  return (
    <div className="gallery-container">
      <div className="header">
        <div className="status-bar">
          <span>
            Added: {objectURLs.length}/{maxImages}
          </span>
          <div
            className="status-bar-progress"
            style={{ width: `${(objectURLs.length / maxImages) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="gallery">
        {/* Render previews of the selected files */}
        {objectURLs.map((src, index) => (
          <div key={`selected-${index}`} className="image-card">
            <a href={src.previewUrl} target="_blank" rel="noopener noreferrer">
              <img src={src.previewUrl} alt={`Image ${index + 1}`} />
            </a>
            <button
              type="button"
              className="delete-button"
              onClick={() => handleRemoveImage(index)}
              aria-label="Delete image"
            >
              <i className="bx bxs-x-circle"></i>
            </button>
            <div className="overlay">
              <span className="image-title">{src.file.name}</span>
              <span className="image-size">
                {(src.file.size / 1048576).toFixed(3)} MB
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

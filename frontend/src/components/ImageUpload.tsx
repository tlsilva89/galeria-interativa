import React, { useState, useRef } from "react";
import {
  HiOutlinePhotograph,
  HiOutlineUpload,
  HiOutlineX,
} from "react-icons/hi";

interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void;
  currentImage?: string;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  currentImage,
  className = "",
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    // Verificar tipo de arquivo
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Tipo de arquivo não permitido. Use: JPG, PNG, GIF ou WebP");
      return;
    }

    // Verificar tamanho (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("Arquivo muito grande. Máximo 10MB.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setPreviewUrl(result.imageUrl);
        onImageSelect(result.imageUrl);
      } else {
        const error = await response.json();
        alert(error.error || "Erro no upload");
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro no upload da imagem");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setPreviewUrl("");
    onImageSelect("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-48 object-cover rounded-xl shadow-medium"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-danger-600 text-white rounded-full hover:bg-danger-700 transition-colors"
            title="Remover imagem"
          >
            <HiOutlineX className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200
            flex flex-col items-center justify-center space-y-4
            ${
              dragActive
                ? "border-primary-500 bg-primary-50"
                : "border-secondary-300 hover:border-primary-400 hover:bg-secondary-50"
            }
            ${uploading ? "pointer-events-none opacity-50" : ""}
          `}
        >
          {uploading ? (
            <>
              <div className="loading-spinner"></div>
              <p className="text-sm text-secondary-600">Fazendo upload...</p>
            </>
          ) : (
            <>
              <HiOutlinePhotograph className="h-12 w-12 text-secondary-400" />
              <div className="text-center">
                <p className="text-sm font-medium text-secondary-700">
                  {dragActive
                    ? "Solte a imagem aqui"
                    : "Clique ou arraste uma imagem"}
                </p>
                <p className="text-xs text-secondary-500 mt-1">
                  JPG, PNG, GIF ou WebP (máx. 10MB)
                </p>
              </div>
              <div className="flex items-center space-x-2 text-primary-600">
                <HiOutlineUpload className="h-4 w-4" />
                <span className="text-sm font-medium">Selecionar arquivo</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

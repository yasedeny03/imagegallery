import React, { useRef, useState } from 'react';
import { Upload, Loader } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (files: FileList) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const validateAndUpload = async (files: FileList) => {
    setIsValidating(true);
    try {
      // Validate file types and sizes
      const validFiles = Array.from(files).filter(file => {
        const isValidType = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type);
        const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
        return isValidType && isValidSize;
      });

      if (validFiles.length !== files.length) {
        alert('Some files were skipped. Only images up to 5MB are allowed.');
      }

      if (validFiles.length > 0) {
        onUpload(files);
      }
    } finally {
      setIsValidating(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      validateAndUpload(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files && validateAndUpload(e.target.files)}
        multiple
        accept="image/*"
        className="hidden"
      />
      {isValidating ? (
        <div className="flex flex-col items-center">
          <Loader className="h-12 w-12 text-blue-500 animate-spin" />
          <p className="mt-2 text-sm text-gray-600">Processing images...</p>
        </div>
      ) : (
        <>
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop images here, or{' '}
            <button
              type="button"
              className="text-blue-600 hover:text-blue-500"
              onClick={() => fileInputRef.current?.click()}
            >
              browse
            </button>
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Supports: JPG, PNG, GIF, WebP (up to 5MB)
          </p>
        </>
      )}
    </div>
  );
};
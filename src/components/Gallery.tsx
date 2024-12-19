import React, { useState } from 'react';
import { Image as ImageType } from '../types';
import { Plus, Loader } from 'lucide-react';
import { Slideshow } from './Slideshow';
import { ImageUpload } from './image/ImageUpload';
import { useImages } from '../hooks/useImages';

interface GalleryProps {
  albumId: string;
  images: ImageType[];
  isAdmin?: boolean;
  onDeleteImage?: (imageId: string) => void;
  onAddImages?: (images: ImageType[]) => void;
}

export const Gallery: React.FC<GalleryProps> = ({
  albumId,
  images,
  isAdmin,
  onDeleteImage,
  onAddImages
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const { uploadMultipleImages, loading, error } = useImages();

  const handleUpload = async (files: FileList) => {
    if (!onAddImages || !albumId) return;
    
    try {
      const newImages = await uploadMultipleImages(files, albumId);
      if (newImages.length > 0) {
        onAddImages(newImages);
        setShowUpload(false);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const getProductCode = (filename: string) => {
    const parts = filename.split('-');
    if (parts.length > 1) {
      return parts.slice(1).join('-').split('.')[0];
    }
    return filename.split('.')[0];
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {isAdmin && onAddImages && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowUpload(!showUpload)}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? (
              <Loader className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Plus className="w-5 h-5 mr-2" />
            )}
            Add Images
          </button>
        </div>
      )}

      {showUpload && (
        <ImageUpload onUpload={handleUpload} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="group relative flex flex-col bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div 
              className="aspect-square cursor-pointer overflow-hidden"
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-3 text-center bg-white">
              <p className="text-sm font-medium text-gray-900">
                {getProductCode(image.title)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedImageIndex !== null && (
        <Slideshow
          images={images}
          startIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </div>
  );
};
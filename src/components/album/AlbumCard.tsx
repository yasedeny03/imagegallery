import React from 'react';
import { Album } from '../../types';
import { Pencil, Trash2 } from 'lucide-react';

interface AlbumCardProps {
  album: Album;
  isAdmin?: boolean;
  onEdit?: (album: Album) => void;
  onDelete?: (albumId: string) => void;
  onClick?: () => void;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({
  album,
  isAdmin,
  onEdit,
  onDelete,
  onClick
}) => {
  const coverImage = album.images[0]?.url || 'https://images.unsplash.com/photo-1526281216101-e55f00f0db7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden group cursor-pointer h-full"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3]">
        <img
          src={coverImage}
          alt={album.name}
          className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
        />
        {isAdmin && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(album);
                }}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                title="Edit album"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(album.id);
                }}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                title="Delete album"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900">{album.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{album.description}</p>
        <p className="text-gray-400 text-sm mt-2">{album.images.length} images</p>
      </div>
    </div>
  );
};
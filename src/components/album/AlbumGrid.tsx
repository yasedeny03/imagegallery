import React from 'react';
import { Album, Image } from '../../types';
import { AlbumCard } from './AlbumCard';

interface AlbumGridProps {
  albums: Album[];
  isAdmin?: boolean;
  onAddImages?: (albumId: string, images: Image[]) => void;
  onEditAlbum?: (album: Album) => void;
  onDeleteAlbum?: (albumId: string) => void;
  onAlbumClick?: (album: Album) => void;
}

export const AlbumGrid: React.FC<AlbumGridProps> = ({
  albums,
  isAdmin,
  onAddImages,
  onEditAlbum,
  onDeleteAlbum,
  onAlbumClick
}) => {
  // Calculate grid classes based on number of albums
  const gridClasses = (() => {
    const baseClasses = "grid gap-6";
    const count = albums.length;
    
    if (count <= 3) {
      return `${baseClasses} grid-cols-1 md:grid-cols-${count}`;
    }
    
    if (count === 4) {
      return `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center`;
    }
    
    return `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`;
  })();

  return (
    <div className={gridClasses}>
      {albums.map((album) => (
        <div key={album.id} className="w-full max-w-sm">
          <AlbumCard
            album={album}
            isAdmin={isAdmin}
            onEdit={onEditAlbum}
            onDelete={onDeleteAlbum}
            onClick={() => onAlbumClick?.(album)}
          />
        </div>
      ))}
    </div>
  );
};
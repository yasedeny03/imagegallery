import React, { useState } from 'react';
import { AlbumGrid } from '../components/album/AlbumGrid';
import { Gallery } from '../components/Gallery';
import { useAlbums } from '../hooks/useAlbums';
import { User, Album } from '../types';

interface GalleryPageProps {
  user: User;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ user }) => {
  const { albums, addImages } = useAlbums();
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  
  const userAlbums = user.isAdmin
    ? albums
    : albums.filter(album => user.allowedAlbums.includes(album.id));

  return (
    <div className="p-6">
      {selectedAlbum ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">{selectedAlbum.name}</h1>
            <button
              onClick={() => setSelectedAlbum(null)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Back to Albums
            </button>
          </div>
          <Gallery images={selectedAlbum.images} />
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6">My Albums</h1>
          <AlbumGrid
            albums={userAlbums}
            onAddImages={addImages}
            onAlbumClick={setSelectedAlbum}
          />
        </>
      )}
    </div>
  );
};
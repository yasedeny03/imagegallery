import React, { useState } from 'react';
import { useAlbums } from '../../hooks/useAlbums';
import { AlbumGrid } from '../../components/album/AlbumGrid';
import { Modal } from '../../components/ui/Modal';
import { Gallery } from '../../components/Gallery';
import { Album } from '../../types';
import { Plus, ChevronLeft } from 'lucide-react';

export const AdminAlbums: React.FC = () => {
  const { albums, addAlbum, editAlbum, deleteAlbum, addImages, deleteImage } = useAlbums();
  const [showNewAlbum, setShowNewAlbum] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [newAlbumData, setNewAlbumData] = useState({ name: '', description: '' });

  const handleCreateAlbum = () => {
    if (newAlbumData.name.trim()) {
      addAlbum(newAlbumData.name, newAlbumData.description);
      setNewAlbumData({ name: '', description: '' });
      setShowNewAlbum(false);
    }
  };

  const handleEditAlbum = () => {
    if (editingAlbum && newAlbumData.name.trim()) {
      editAlbum({
        ...editingAlbum,
        name: newAlbumData.name,
        description: newAlbumData.description
      });
      setEditingAlbum(null);
      setNewAlbumData({ name: '', description: '' });
    }
  };

  if (selectedAlbum) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedAlbum(null)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Albums
          </button>
          <h1 className="text-2xl font-bold">{selectedAlbum.name}</h1>
        </div>
        {selectedAlbum.description && (
          <p className="text-gray-600">{selectedAlbum.description}</p>
        )}
        <Gallery
          images={selectedAlbum.images}
          isAdmin={true}
          onDeleteImage={(imageId) => deleteImage(selectedAlbum.id, imageId)}
          onAddImages={(images) => addImages(selectedAlbum.id, images)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Albums</h1>
        <button
          onClick={() => setShowNewAlbum(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Album
        </button>
      </div>

      <AlbumGrid
        albums={albums}
        isAdmin={true}
        onAddImages={addImages}
        onEditAlbum={(album) => {
          setEditingAlbum(album);
          setNewAlbumData({ name: album.name, description: album.description });
        }}
        onDeleteAlbum={deleteAlbum}
        onAlbumClick={setSelectedAlbum}
      />

      <Modal
        isOpen={showNewAlbum || !!editingAlbum}
        onClose={() => {
          setShowNewAlbum(false);
          setEditingAlbum(null);
          setNewAlbumData({ name: '', description: '' });
        }}
        title={editingAlbum ? 'Edit Album' : 'Create New Album'}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Album Name"
            value={newAlbumData.name}
            onChange={(e) => setNewAlbumData({ ...newAlbumData, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-md"
          />
          <textarea
            placeholder="Album Description"
            value={newAlbumData.description}
            onChange={(e) => setNewAlbumData({ ...newAlbumData, description: e.target.value })}
            className="w-full px-4 py-2 border rounded-md"
            rows={3}
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => {
                setShowNewAlbum(false);
                setEditingAlbum(null);
                setNewAlbumData({ name: '', description: '' });
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={editingAlbum ? handleEditAlbum : handleCreateAlbum}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingAlbum ? 'Save Changes' : 'Create Album'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
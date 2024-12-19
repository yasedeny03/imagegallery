import React, { useState } from 'react';
import { Plus, Users, FolderPlus } from 'lucide-react';
import { Album, User } from '../types';
import { addUser, getUsers } from '../utils/auth';

interface AdminPanelProps {
  albums: Album[];
  onCreateAlbum: (name: string, description: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ albums, onCreateAlbum }) => {
  const [showNewAlbum, setShowNewAlbum] = useState(false);
  const [showNewUser, setShowNewUser] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');
  const [newAlbumDesc, setNewAlbumDesc] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [selectedAlbums, setSelectedAlbums] = useState<string[]>([]);

  const handleCreateAlbum = () => {
    if (newAlbumName.trim()) {
      onCreateAlbum(newAlbumName, newAlbumDesc);
      setNewAlbumName('');
      setNewAlbumDesc('');
      setShowNewAlbum(false);
    }
  };

  const handleCreateUser = () => {
    if (newUserPassword.trim() && selectedAlbums.length > 0) {
      addUser(newUserPassword, selectedAlbums);
      setNewUserPassword('');
      setSelectedAlbums([]);
      setShowNewUser(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        <div className="space-x-4">
          <button
            onClick={() => setShowNewAlbum(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <FolderPlus className="mr-2" size={20} />
            New Album
          </button>
          <button
            onClick={() => setShowNewUser(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Users className="mr-2" size={20} />
            New User
          </button>
        </div>
      </div>

      {showNewAlbum && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Create New Album</h3>
            <input
              type="text"
              placeholder="Album Name"
              value={newAlbumName}
              onChange={(e) => setNewAlbumName(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-md"
            />
            <textarea
              placeholder="Album Description"
              value={newAlbumDesc}
              onChange={(e) => setNewAlbumDesc(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-md"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowNewAlbum(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAlbum}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {showNewUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Create New User</h3>
            <input
              type="password"
              placeholder="User Password"
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-md"
            />
            <div className="mb-4">
              <h4 className="font-medium mb-2">Select Albums:</h4>
              {albums.map((album) => (
                <label key={album.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedAlbums.includes(album.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAlbums([...selectedAlbums, album.id]);
                      } else {
                        setSelectedAlbums(selectedAlbums.filter(id => id !== album.id));
                      }
                    }}
                  />
                  <span>{album.name}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowNewUser(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateUser}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
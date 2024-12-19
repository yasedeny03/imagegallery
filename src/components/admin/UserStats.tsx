import React from 'react';
import { User } from '../../types';
import { Clock, FolderOpen, Image as ImageIcon } from 'lucide-react';
import { useAlbums } from '../../hooks/useAlbums';

interface UserStatsProps {
  user: User;
}

export const UserStats: React.FC<UserStatsProps> = ({ user }) => {
  const { albums } = useAlbums();
  const userAlbums = albums.filter(album => user.allowedAlbums.includes(album.id));
  const totalImages = userAlbums.reduce((sum, album) => sum + album.images.length, 0);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">User Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <FolderOpen className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Accessible Albums</p>
            <p className="text-2xl font-semibold">{userAlbums.length}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <ImageIcon className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Images</p>
            <p className="text-2xl font-semibold">{totalImages}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Modified</p>
            <p className="text-2xl font-semibold">
              {new Date(user.lastModified).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Album Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userAlbums.map(album => (
            <div key={album.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{album.name}</p>
                <p className="text-sm text-gray-500">{album.images.length} images</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
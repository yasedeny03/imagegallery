import React from 'react';
import { Link } from 'react-router-dom';
import { Users, FolderPlus } from 'lucide-react';
import { useAlbums } from '../../hooks/useAlbums';
import { getUsers } from '../../utils/auth';

export const AdminDashboard: React.FC = () => {
  const { albums } = useAlbums();
  const users = getUsers();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/users"
          className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <Users className="w-8 h-8 text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">User Management</h2>
              <p className="text-gray-600">Manage user access and permissions</p>
            </div>
            <span className="text-3xl font-bold text-gray-400">{users.length}</span>
          </div>
        </Link>

        <Link
          to="/admin/albums"
          className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <FolderPlus className="w-8 h-8 text-green-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Album Management</h2>
              <p className="text-gray-600">Create and organize photo albums</p>
            </div>
            <span className="text-3xl font-bold text-gray-400">{albums.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { Plus, Eye, EyeOff, Edit2, Trash2, User } from 'lucide-react';
import { useAlbums } from '../../hooks/useAlbums';
import { getUsers, addUser, updateUser, deleteUser } from '../../utils/auth';
import { User as UserType } from '../../types';
import { Modal } from '../../components/ui/Modal';
import { UserStats } from '../../components/admin/UserStats';

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [showNewUser, setShowNewUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const { albums } = useAlbums();
  
  const [formData, setFormData] = useState({
    customerName: '',
    password: '',
    allowedAlbums: [] as string[]
  });

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const handleCreateUser = () => {
    if (formData.customerName && formData.password) {
      const newUser = addUser(formData.customerName, formData.password, formData.allowedAlbums);
      setUsers([...users, newUser]);
      setFormData({ customerName: '', password: '', allowedAlbums: [] });
      setShowNewUser(false);
    }
  };

  const handleUpdateUser = () => {
    if (editingUser && formData.customerName) {
      const updated = updateUser(editingUser.id, {
        customerName: formData.customerName,
        password: formData.password || editingUser.password,
        allowedAlbums: formData.allowedAlbums
      });
      setUsers(users.map(u => u.id === updated.id ? updated : u));
      setEditingUser(null);
      setFormData({ customerName: '', password: '', allowedAlbums: [] });
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const togglePasswordVisibility = (userId: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  return (
    <div className="space-y-6">
      {selectedUser ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back to Users
              </button>
              <h2 className="text-2xl font-bold">{selectedUser.customerName}</h2>
            </div>
          </div>
          <UserStats user={selectedUser} />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">User Management</h1>
            <button
              onClick={() => setShowNewUser(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New User
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Password
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Albums
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {user.customerName}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-900">
                          {showPasswords[user.id] ? user.password : '•'.repeat(8)}
                        </span>
                        <button
                          onClick={() => togglePasswordVisibility(user.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords[user.id] ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {user.allowedAlbums.length} albums
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View user statistics"
                        >
                          <User className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setFormData({
                              customerName: user.customerName,
                              password: '',
                              allowedAlbums: user.allowedAlbums
                            });
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <Modal
        isOpen={showNewUser || !!editingUser}
        onClose={() => {
          setShowNewUser(false);
          setEditingUser(null);
          setFormData({ customerName: '', password: '', allowedAlbums: [] });
        }}
        title={editingUser ? 'Edit User' : 'Create New User'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Customer Name
            </label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password {editingUser && '(Leave blank to keep current)'}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allowed Albums
            </label>
            <div className="max-h-48 overflow-y-auto border rounded-md p-3 space-y-2">
              {albums.map(album => (
                <label key={album.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.allowedAlbums.includes(album.id)}
                    onChange={(e) => {
                      const newAlbums = e.target.checked
                        ? [...formData.allowedAlbums, album.id]
                        : formData.allowedAlbums.filter(id => id !== album.id);
                      setFormData({ ...formData, allowedAlbums: newAlbums });
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900">{album.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              onClick={() => {
                setShowNewUser(false);
                setEditingUser(null);
                setFormData({ customerName: '', password: '', allowedAlbums: [] });
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={editingUser ? handleUpdateUser : handleCreateUser}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingUser ? 'Save Changes' : 'Create User'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
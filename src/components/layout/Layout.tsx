import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LogOut, LayoutDashboard } from 'lucide-react';
import { User } from '../../types';

interface LayoutProps {
  onLogout: () => void;
  user: User & { isAdmin: boolean };
}

export const Layout: React.FC<LayoutProps> = ({ onLogout, user }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Image Gallery</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user.isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  <LayoutDashboard className="w-5 h-5 mr-2" />
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={onLogout}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};
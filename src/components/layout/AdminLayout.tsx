import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Users, FolderPlus, LayoutDashboard, LogOut } from 'lucide-react';

interface AdminLayoutProps {
  onLogout: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex items-center px-4 font-semibold text-gray-900">
                Admin Panel
              </div>
              
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavLink
                  to="/admin"
                  icon={<LayoutDashboard className="w-5 h-5" />}
                  active={isActive('/admin')}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/admin/users"
                  icon={<Users className="w-5 h-5" />}
                  active={isActive('/admin/users')}
                >
                  Users
                </NavLink>
                <NavLink
                  to="/admin/albums"
                  icon={<FolderPlus className="w-5 h-5" />}
                  active={isActive('/admin/albums')}
                >
                  Albums
                </NavLink>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center px-4 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, active, children }) => (
  <Link
    to={to}
    className={`flex items-center px-1 pt-1 text-sm font-medium ${
      active
        ? 'border-b-2 border-blue-500 text-gray-900'
        : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700'
    }`}
  >
    {icon}
    <span className="ml-2">{children}</span>
  </Link>
);
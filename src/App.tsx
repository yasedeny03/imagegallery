import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AdminLayout } from './components/layout/AdminLayout';
import { GalleryPage } from './pages/GalleryPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminAlbums } from './pages/admin/AdminAlbums';
import { Login } from './components/Login';
import { useAuth } from './hooks/useAuth';

export function App() {
  const { user, login, logout } = useAuth();

  if (!user) {
    return <Login onLogin={login} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {user.isAdmin && (
          <Route path="/admin" element={<AdminLayout onLogout={logout} />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="albums" element={<AdminAlbums />} />
          </Route>
        )}

        <Route path="/" element={<Layout onLogout={logout} user={user} />}>
          <Route index element={<GalleryPage user={user} />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={user.isAdmin ? "/admin" : "/"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
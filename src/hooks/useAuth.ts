import { useState, useEffect } from 'react';
import { User } from '../types';
import { validateUser } from '../utils/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User & { isAdmin: boolean } | null>(() => {
    const stored = localStorage.getItem('current_user');
    if (stored) {
      const parsedUser = JSON.parse(stored);
      return {
        ...parsedUser,
        isAdmin: parsedUser.id === 'admin'
      };
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('current_user');
    }
  }, [user]);

  const login = (password: string) => {
    const validatedUser = validateUser(password);
    if (validatedUser) {
      setUser({
        ...validatedUser,
        isAdmin: validatedUser.id === 'admin'
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
};
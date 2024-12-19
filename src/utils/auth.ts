import { User } from '../types';

const ADMIN_PASSWORD = 'admin123';
const USERS_KEY = 'gallery_users';

export const validateUser = (password: string): User | null => {
  if (password === ADMIN_PASSWORD) {
    return {
      id: 'admin',
      customerName: 'Administrator',
      password: ADMIN_PASSWORD,
      allowedAlbums: ['*'],
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
  }
  
  const users = getUsers();
  return users.find(user => user.password === password) || null;
};

export const getUsers = (): User[] => {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addUser = (customerName: string, password: string, allowedAlbums: string[]): User => {
  const users = getUsers();
  const newUser: User = {
    id: Date.now().toString(),
    customerName,
    password,
    allowedAlbums,
    createdAt: new Date().toISOString(),
    lastModified: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return newUser;
};

export const updateUser = (userId: string, updates: Partial<User>): User => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  
  if (index === -1) throw new Error('User not found');
  
  const updatedUser = {
    ...users[index],
    ...updates,
    lastModified: new Date().toISOString()
  };
  
  users[index] = updatedUser;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return updatedUser;
};

export const deleteUser = (userId: string): void => {
  const users = getUsers();
  const filtered = users.filter(u => u.id !== userId);
  localStorage.setItem(USERS_KEY, JSON.stringify(filtered));
};
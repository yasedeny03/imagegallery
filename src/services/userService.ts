import { User } from '../types';
import { storage } from '../utils/storage';

class UserService {
  async getUsers(): Promise<User[]> {
    return storage.loadUsers();
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const newUser: User = {
      id: Date.now().toString(),
      customerName: userData.customerName || '',
      password: userData.password || '',
      allowedAlbums: userData.allowedAlbums || [],
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    await storage.saveUser(newUser);
    return newUser;
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    const user = await this.getUserById(userId);
    if (!user) throw new Error('User not found');

    const updatedUser = {
      ...user,
      ...updates,
      lastModified: new Date().toISOString()
    };

    await storage.saveUser(updatedUser);
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    await storage.deleteUser(userId);
  }

  private async getUserById(id: string): Promise<User | null> {
    const users = await this.getUsers();
    return users.find(user => user.id === id) || null;
  }
}

export const userService = new UserService();
export interface User {
  id: string;
  password: string;
  customerName: string;
  allowedAlbums: string[];
  createdAt: string;
  lastModified: string;
}

export interface Album {
  id: string;
  name: string;
  description: string;
  images: Image[];
}

export interface Image {
  id: string;
  url: string;
  title: string;
  description?: string;
}
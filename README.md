# Secure Image Upload System

A secure Node.js application for handling image uploads with MongoDB storage.

## Requirements

- Node.js 18+
- MongoDB 6.0+
- Ubuntu 22.04 LTS

## Installation

1. Update system packages:
```bash
sudo apt update && sudo apt upgrade -y
```

2. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

3. Install MongoDB:
```bash
sudo apt install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

4. Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd secure-image-upload
npm install
```

5. Create required directories:
```bash
mkdir uploads
```

6. Set up environment variables:
```bash
cp .env.example .env
```

Edit .env file with your configuration:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/imageupload
JWT_SECRET=your_jwt_secret
ALLOWED_ORIGINS=http://localhost:3000
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Upload Image
```
POST /api/v1/upload
Headers:
  - Authorization: Bearer <token>
  - Content-Type: multipart/form-data
Body:
  - image: <file>
```

### Get Images
```
GET /api/v1/images
Headers:
  - Authorization: Bearer <token>
Query Parameters:
  - type: string (filter by MIME type)
  - from: date (filter by upload date)
  - to: date (filter by upload date)
  - limit: number (default: 20)
  - offset: number (default: 0)
```

### Get Single Image
```
GET /api/v1/images/:id
Headers:
  - Authorization: Bearer <token>
```

## Security Features

- JWT Authentication
- File type validation
- File size limits (5MB)
- Rate limiting (10 requests/minute)
- Secure headers with Helmet
- CORS protection
- Image optimization
- Duplicate detection
- Error logging

## Error Codes

- 400: Invalid request/file
- 401: Unauthorized
- 413: File too large
- 415: Unsupported file type
- 429: Too many requests
- 500: Server error

## Monitoring

Logs are stored in:
- error.log: Error-level logs
- combined.log: All logs

## Performance Optimizations

- Image compression using Sharp
- File deduplication using MD5 hashes
- Efficient MongoDB indexing
- Streaming for large files
// Utility function to get the absolute image URL from the backend
const IMAGE_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const getImageUrl = path => {
  if (!path) return '/placeholder.jpg'; // Fallback for null paths

  const normalizedPath = path.toString().trim().replace(/\\/g, '/');

  // If the path already has a protocol (http/https), return it as is
  if (normalizedPath.startsWith('http://') || normalizedPath.startsWith('https://')) {
    return normalizedPath;
  }

  // Preserve local app assets like /placeholder.jpg
  if (normalizedPath === '/placeholder.jpg') {
    return normalizedPath;
  }

  // Backend static files are served from /uploads on the API host
  if (normalizedPath.startsWith('/uploads/')) {
    return `${IMAGE_BASE_URL}${normalizedPath}`;
  }

  if (normalizedPath.startsWith('uploads/')) {
    return `${IMAGE_BASE_URL}/${normalizedPath}`;
  }

  // Other absolute root paths should stay local
  if (normalizedPath.startsWith('/')) {
    return normalizedPath;
  }

  // Treat bare filenames or relative upload paths as uploads assets
  return `${IMAGE_BASE_URL}/uploads/${normalizedPath}`;
};

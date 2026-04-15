// Utility function to get the absolute image URL from the backend
const IMAGE_BASE_URL = 'http://localhost:3000';

export const getImageUrl = path => {
  if (!path) return '/placeholder.jpg'; // Fallback for null paths

  const normalizedPath = path.toString().replace(/\\/g, '/');

  // If the path already has a protocol (http/https), return it as is
  if (normalizedPath.startsWith('http://') || normalizedPath.startsWith('https://')) {
    return normalizedPath;
  }

  // Preserve local app assets like /placeholder.jpg
  if (normalizedPath.startsWith('/') && !normalizedPath.startsWith('/uploads')) {
    return normalizedPath;
  }

  // If the backend returned a path relative to the uploads folder
  if (normalizedPath.startsWith('uploads/')) {
    return `${IMAGE_BASE_URL}/${normalizedPath}`;
  }

  // If the backend returned an absolute uploads path
  if (normalizedPath.startsWith('/uploads/')) {
    return `${IMAGE_BASE_URL}${normalizedPath}`;
  }

  // Treat bare filenames as uploads assets
  return `${IMAGE_BASE_URL}/uploads/${normalizedPath}`;
};

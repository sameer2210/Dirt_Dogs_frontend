// Utility function to get the absolute image URL from the backend
const IMAGE_BASE_URL = "http://localhost:3000";

export const getImageUrl = (path) => {
  if (!path) return "/placeholder.jpg"; // Fallback for null paths
  
  // If the path already has a protocol (http/https), return it as is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  
  // Normalize Windows-style separators
  const normalizedPath = path.toString().replace(/\\/g, "/");
  
  // Ensure the path starts with a slash
  const urlPath = normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`;
  
  return `${IMAGE_BASE_URL}${urlPath}`;
};

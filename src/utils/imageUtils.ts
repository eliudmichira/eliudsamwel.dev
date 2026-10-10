export interface OptimalImageSources {
  webp: string;
  fallback: string;
}

/**
 * Generates paths for a WebP version and a fallback version of an image.
 * Assumes the WebP version has the same base name but a .webp extension.
 * @param originalSrc The path to the original image (e.g., /images/foo.jpg).
 * @returns An object with webp and fallback image paths.
 */
export const getOptimalImageSources = (originalSrc: string): OptimalImageSources => {
  if (!originalSrc || typeof originalSrc !== 'string') {
    // Return a placeholder or the original if it's invalid, though an error might be better.
    // For now, let's assume a valid string path is always passed.
    return {
      webp: '#', // Indicates an issue or placeholder
      fallback: originalSrc || '#',
    };
  }

  const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');

  return {
    webp: `${webpSrc} 1x`,
    fallback: `${originalSrc} 1x`,
  };
}; 

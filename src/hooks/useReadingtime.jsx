// hooks/useReadingTime.js

const AVERAGE_READING_SPEED = 180;

export const useReadingTime = (content) => {
  if (!content) return "0 min read";

  const words = content?.trim()?.split(/\s+/)?.length;
  const minutes = Math.ceil(words / AVERAGE_READING_SPEED);

  return `${minutes} min read`;
};

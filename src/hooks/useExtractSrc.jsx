export function useExtractSrc(htmlString) {
  if (!htmlString) return null;

  const match = htmlString.match(/src="([^"]+)"/);
  return match ? match[1] : null;
}

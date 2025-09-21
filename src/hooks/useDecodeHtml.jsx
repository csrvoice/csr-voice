export const useDecodeHtml = (encodedText) => {
  if (!encodedText || typeof encodedText !== "string") {
    return encodedText;
  }

  return (
    encodedText
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, "/")
      .replace(/&#x60;/g, "`")
      .replace(/&#x3D;/g, "=")
      .replace(/&nbsp;/g, " ")
      .replace(/&copy;/g, "©")
      .replace(/&reg;/g, "®")
      .replace(/&trade;/g, "™")
      .replace(/&hellip;/g, "…")
      .replace(/&mdash;/g, "—")
      .replace(/&ndash;/g, "–")
      .replace(/&ldquo;/g, "")
      .replace(/&rdquo;/g, "")
      .replace(/&lsquo;/g, "'")
      .replace(/&rsquo;/g, "'")
      // Handle numeric character references
      .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
      .replace(/&#x([a-fA-F0-9]+);/g, (match, hex) =>
        String.fromCharCode(parseInt(hex, 16))
      )
  );
};

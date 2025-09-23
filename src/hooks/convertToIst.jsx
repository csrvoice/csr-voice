export const convertToIST = (utcDateStr) => {
  // Parse the UTC date string into a Date object
  const utcDate = new Date(utcDateStr);

  // Calculate the time in IST by adding 5 hours and 30 minutes
  const istOffsetMinutes = 5 * 60 + 30; // Total offset in minutes
  const istDate = new Date(utcDate.getTime() + istOffsetMinutes * 60 * 1000);

  // Format the date and time components
  const year = istDate.getUTCFullYear();
  const month = String(istDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(istDate.getUTCDate()).padStart(2, "0");
  const hours = String(istDate.getUTCHours()).padStart(2, "0");
  const minutes = String(istDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(istDate.getUTCSeconds()).padStart(2, "0");

  // Construct the final string in ISO 8601 format with the +05:30 offset
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+05:30`;
};

const useDateFormat = (dateString) => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) return "";

    // Format: "15 Aug 2025"
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    return date.toLocaleDateString("en-GB", options);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

export default useDateFormat;

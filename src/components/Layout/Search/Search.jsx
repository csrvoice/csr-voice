import React, { useState } from "react";
import { SearchRounded } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

export const Search = ({ setModalOpen }) => {
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Validation function
  const validateSearch = (text) => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return "Please enter a search term";
    }

    if (trimmedText.length < 2) {
      return "Search term must be at least 2 characters long";
    }

    if (trimmedText.length > 100) {
      return "Search term must be less than 100 characters";
    }

    // Check for only special characters or numbers
    if (!/[a-zA-Z]/.test(trimmedText)) {
      return "Search term must contain at least one letter";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    setLoading(true);

    const validationError = validateSearch(searchText);

    if (validationError) {
      setError(validationError);
      return;
    }

    // Clear any previous errors
    setError("");

    // Navigate to search page with the search term
    router.push(`/search/${searchText}`);
    router.route === "/search/[text]" && setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", px: 1.5, py: 0.5 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <InputBase
            placeholder="Search Posts..."
            className="font-normal"
            fullWidth
            value={searchText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            sx={{
              fontSize: "16px",
              border: error ? "1px solid #f44336" : "1px solid transparent",
              borderRadius: 1,
              px: 1,
              "&:focus-within": {
                border: error ? "1px solid #f44336" : "1px solid #1976d2",
              },
            }}
            inputProps={{
              maxLength: 100,
              "aria-label": "search posts",
              "aria-invalid": !!error,
              "aria-describedby": error ? "search-error" : undefined,
            }}
          />
          <IconButton
            onClick={handleSubmit}
            disabled={!searchText.trim()}
            sx={{
              ml: 0.5,
              "&:disabled": {
                opacity: 0.5,
              },
            }}
            aria-label="search"
          >
            {loading ? (
              <CircularProgress sx={{ color: "#1976d2" }} size={22} />
            ) : (
              <SearchRounded
                sx={{
                  color: !searchText.trim() ? "lightGrey" : "#1976d2",
                }}
              />
            )}
          </IconButton>
        </Box>

        {error && (
          <Typography
            id="search-error"
            variant="caption"
            sx={{
              color: "error.main",
              mt: 0.5,
              fontSize: "0.75rem",
            }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </>
  );
};

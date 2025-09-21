import { Layout } from "@/components/Layout/Layout";
import { ArrowOutwardRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  InputBase,
  Typography,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";

const Advertise = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    designation: "",
    address: "",
    contactNo: "",
    email: "",
    advertisementQuery: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Regex patterns
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactRegex = /^\d{1,10}$/;

  // Validation function
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (!nameRegex.test(value)) {
          error = "Name should only contain alphabets and spaces";
        }
        break;

      case "contactNo":
        if (!value.trim()) {
          error = "Contact number is required";
        } else if (!contactRegex.test(value)) {
          error = "Contact number should be digits only (max 10 digits)";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!emailRegex.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "company":
        if (!value.trim()) {
          error = "Company is required";
        }
        break;

      case "designation":
        if (!value.trim()) {
          error = "Designation is required";
        }
        break;

      case "address":
        if (!value.trim()) {
          error = "Address is required";
        }
        break;

      case "advertisementQuery":
        if (!value.trim()) {
          error = "Advertisement query is required";
        } else if (value.length > 300) {
          error = "Advertisement query should not exceed 300 characters";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For contact number, only allow digits and limit to 10
    if (name === "contactNo") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));

      // Clear error if input becomes valid
      const error = validateField(name, digitsOnly);
      if (!error) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
      return;
    }

    // For name, only allow alphabets and spaces
    if (name === "name") {
      const alphabetsOnly = value.replace(/[^A-Za-z\s]/g, "");
      setFormData((prev) => ({ ...prev, [name]: alphabetsOnly }));

      // Clear error if input becomes valid
      const error = validateField(name, alphabetsOnly);
      if (!error) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
      return;
    }

    // For advertisement query, limit to 300 characters
    if (name === "advertisementQuery" && value.length > 300) {
      return; // Don't update if exceeds limit
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error if input becomes valid
    const error = validateField(name, value);
    if (!error) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage("");

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      try {
        const response = await fetch("/api/advertise-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            company: formData.company,
            designation: formData.designation,
            address: formData.address,
            contactNo: formData.contactNo,
            email: formData.email,
            advertisementQuery: formData.advertisementQuery,
          }),
        });

        const result = await response.json();

        if (result.success) {
          setSubmitMessage(
            "Thank you for your interest in advertising with us! We've received your inquiry and will send you the advertisement tariff details soon."
          );
          // Reset form
          setFormData({
            name: "",
            company: "",
            designation: "",
            address: "",
            contactNo: "",
            email: "",
            advertisementQuery: "",
          });
        } else {
          setSubmitMessage(
            "Sorry, there was an error processing your advertisement inquiry. Please try again or contact us directly at hello@csrvoice.com"
          );
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitMessage(
          "Sorry, there was an error processing your advertisement inquiry. Please try again or contact us directly at hello@csrvoice.com"
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <Layout>
        <Box sx={{ my: { xs: 2, md: 5 } }}>
          <Container maxWidth="xl">
            <Box
              sx={{
                bgcolor: "#FFFFFF",
                p: 2,
                borderRadius: "7px",
                border: "1.5px solid #e8e8e8",
                mx: { xs: -1, md: 0 },
                pt: { xs: 2, md: 10 },
                pb: 10,
              }}
            >
              <Grid container>
                <Grid item size={{ xs: 12, md: 5 }}>
                  <Typography
                    className="font-bold"
                    sx={{ fontSize: { xs: "26px", md: "30px" } }}
                  >
                    Advertise with us
                  </Typography>
                  <Typography
                    className="font-normal"
                    sx={{ fontSize: { xs: "16px", md: "18px" } }}
                  >
                    Please fill the below form to receive advertisement tariff
                  </Typography>
                </Grid>
                <Grid
                  item
                  size={{ xs: 12, md: 7 }}
                  sx={{ mt: { xs: 4, md: 0 } }}
                >
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                      p: { xs: 0, md: 2 },
                    }}
                    elevation={0}
                    variant="outlined"
                  >
                    <CardContent>
                      <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                          <Grid item size={{ xs: 12, md: 6 }}>
                            <Typography
                              className="font-normal"
                              fontSize={"16px"}
                            >
                              Name *
                            </Typography>
                            <InputBase
                              name="name"
                              className="font-normal"
                              value={formData.name}
                              onChange={handleInputChange}
                              disabled={isSubmitting}
                              sx={{
                                fontSize: "16px",
                                border: `1px solid ${
                                  errors.name ? "#f44336" : "#e8e8e8"
                                }`,
                                borderRadius: "4px",
                                p: 1,
                              }}
                              fullWidth
                              placeholder="Enter your name"
                            />
                            {errors.name && (
                              <FormHelperText error>
                                {errors.name}
                              </FormHelperText>
                            )}
                          </Grid>

                          <Grid item size={{ xs: 12, md: 6 }}>
                            <Typography
                              className="font-normal"
                              fontSize={"16px"}
                            >
                              Company *
                            </Typography>
                            <InputBase
                              name="company"
                              className="font-normal"
                              value={formData.company}
                              onChange={handleInputChange}
                              disabled={isSubmitting}
                              sx={{
                                fontSize: "16px",
                                border: `1px solid ${
                                  errors.company ? "#f44336" : "#e8e8e8"
                                }`,
                                borderRadius: "4px",
                                p: 1,
                              }}
                              fullWidth
                              placeholder="Enter company name"
                            />
                            {errors.company && (
                              <FormHelperText error>
                                {errors.company}
                              </FormHelperText>
                            )}
                          </Grid>

                          <Grid item size={{ xs: 12, md: 6 }}>
                            <Typography
                              className="font-normal"
                              fontSize={"16px"}
                            >
                              Designation *
                            </Typography>
                            <InputBase
                              name="designation"
                              className="font-normal"
                              value={formData.designation}
                              onChange={handleInputChange}
                              disabled={isSubmitting}
                              sx={{
                                fontSize: "16px",
                                border: `1px solid ${
                                  errors.designation ? "#f44336" : "#e8e8e8"
                                }`,
                                borderRadius: "4px",
                                p: 1,
                              }}
                              fullWidth
                              placeholder="Enter your designation"
                            />
                            {errors.designation && (
                              <FormHelperText error>
                                {errors.designation}
                              </FormHelperText>
                            )}
                          </Grid>

                          <Grid item size={{ xs: 12, md: 6 }}>
                            <Typography
                              className="font-normal"
                              fontSize={"16px"}
                            >
                              Address *
                            </Typography>
                            <InputBase
                              name="address"
                              className="font-normal"
                              value={formData.address}
                              onChange={handleInputChange}
                              disabled={isSubmitting}
                              sx={{
                                fontSize: "16px",
                                border: `1px solid ${
                                  errors.address ? "#f44336" : "#e8e8e8"
                                }`,
                                borderRadius: "4px",
                                p: 1,
                              }}
                              fullWidth
                              placeholder="Enter your address"
                            />
                            {errors.address && (
                              <FormHelperText error>
                                {errors.address}
                              </FormHelperText>
                            )}
                          </Grid>

                          <Grid item size={{ xs: 12, md: 6 }}>
                            <Typography
                              className="font-normal"
                              fontSize={"16px"}
                            >
                              Contact No. *
                            </Typography>
                            <InputBase
                              name="contactNo"
                              className="font-normal"
                              value={formData.contactNo}
                              onChange={handleInputChange}
                              disabled={isSubmitting}
                              sx={{
                                fontSize: "16px",
                                border: `1px solid ${
                                  errors.contactNo ? "#f44336" : "#e8e8e8"
                                }`,
                                borderRadius: "4px",
                                p: 1,
                              }}
                              fullWidth
                              placeholder="Enter 10-digit contact number"
                              inputProps={{ maxLength: 10 }}
                            />
                            {errors.contactNo && (
                              <FormHelperText error>
                                {errors.contactNo}
                              </FormHelperText>
                            )}
                          </Grid>

                          <Grid item size={{ xs: 12, md: 6 }}>
                            <Typography
                              className="font-normal"
                              fontSize={"16px"}
                            >
                              Email *
                            </Typography>
                            <InputBase
                              name="email"
                              className="font-normal"
                              value={formData.email}
                              onChange={handleInputChange}
                              disabled={isSubmitting}
                              sx={{
                                fontSize: "16px",
                                border: `1px solid ${
                                  errors.email ? "#f44336" : "#e8e8e8"
                                }`,
                                borderRadius: "4px",
                                p: 1,
                              }}
                              fullWidth
                              placeholder="Enter your email"
                            />
                            {errors.email && (
                              <FormHelperText error>
                                {errors.email}
                              </FormHelperText>
                            )}
                          </Grid>

                          <Grid item size={{ xs: 12 }}>
                            <Typography
                              className="font-normal"
                              fontSize={"16px"}
                            >
                              Advertisement Query *
                            </Typography>
                            <InputBase
                              name="advertisementQuery"
                              className="font-normal"
                              value={formData.advertisementQuery}
                              onChange={handleInputChange}
                              disabled={isSubmitting}
                              multiline
                              rows={4}
                              sx={{
                                fontSize: "16px",
                                border: `1px solid ${
                                  errors.advertisementQuery
                                    ? "#f44336"
                                    : "#e8e8e8"
                                }`,
                                borderRadius: "4px",
                                p: 1,
                              }}
                              fullWidth
                              placeholder="Describe your advertisement requirements (max 300 characters)"
                              inputProps={{ maxLength: 300 }}
                            />
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: 1,
                              }}
                            >
                              {errors.advertisementQuery && (
                                <FormHelperText error>
                                  {errors.advertisementQuery}
                                </FormHelperText>
                              )}
                              <Typography
                                variant="caption"
                                className="font-normal"
                                sx={{
                                  color:
                                    formData.advertisementQuery.length > 280
                                      ? "#f44336"
                                      : "#666",
                                  ml: "auto",
                                }}
                              >
                                {formData.advertisementQuery.length}/300
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item size={{ xs: 12 }}>
                            <Button
                              type="submit"
                              className="font-text-bold"
                              fullWidth
                              disabled={isSubmitting}
                              sx={{
                                textTransform: "none",
                                bgcolor: "#1877f2",
                                color: "#FFFFFF",
                                mt: 2,
                                borderRadius: "23px",
                                fontSize: "18px",
                                "&:hover": {
                                  bgcolor: "#166fe5",
                                },
                                "&:disabled": {
                                  bgcolor: "#cccccc",
                                },
                              }}
                              endIcon={
                                isSubmitting ? (
                                  <CircularProgress size={20} color="inherit" />
                                ) : (
                                  <ArrowOutwardRounded />
                                )
                              }
                            >
                              {isSubmitting ? "Sending..." : "Submit"}
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                      {submitMessage && (
                        <Box
                          sx={{
                            my: 3,
                            p: 2,
                            borderRadius: 1,
                            bgcolor:
                              submitMessage.includes("error") ||
                              submitMessage.includes("Sorry")
                                ? "#ffebee"
                                : "#e8f5e8",
                            color:
                              submitMessage.includes("error") ||
                              submitMessage.includes("Sorry")
                                ? "#c62828"
                                : "#2e7d32",
                            border: `1px solid ${
                              submitMessage.includes("error") ||
                              submitMessage.includes("Sorry")
                                ? "#ef5350"
                                : "#4caf50"
                            }`,
                          }}
                        >
                          <Typography className="font-bold">
                            {submitMessage}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </Layout>
    </>
  );
};

export default Advertise;

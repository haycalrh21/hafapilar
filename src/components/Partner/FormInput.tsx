"use client";
import {
  Box,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

// Define the Zod schema for validation
const formSchema = z.object({
  firstName: z.string().min(4, "Minimum 4 character *"),
  lastName: z.string().min(5, "Minimum 5 character *"),
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Business Email is required"),
  whatsapp: z.string().min(4, "Phone Number is required"),
  jobfunction: z.string().min(1, "Job Function is required"),
  country: z.string().min(1, "Country is required"),
  Message: z.string().min(1, "Message is required"),
});

export default function FormInputPartner() {
  const router = useRouter();
  const jobfunctions = [
    "Barista",
    "Bartender",
    "Bookkeeper",
    "Business Development",
    "Cleaner",
    "Cook",
    "Customer Service",
    "Delivery Driver",
    "Desk Clerk",
    "Desk Manager",
    "Dining Room Manager",
    "Entertainment",
    "Event Planner",
    "Food and Beverage",
    "Hairdresser",
    "Housekeeper",
    "Kitchen Assistant",
    "Laundry",
    "Line Cook",
    "Line Manager",
  ];

  const country = ["Afghanistan", "Albania", "Algeria", "Andorra"];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    Message: "",
    jobfunction: "",
    whatsapp: "",
    department: "",
    position: "",
    country: "",
  });
  const [errors, setErrors] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name!]: value });
  };

  // Update handleChange specifically for Select components
  const handleSelectChange = (
    e: SelectChangeEvent<string> // Change type to SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form data using Zod
    try {
      formSchema.parse(formData); // This will throw an error if validation fails
      // Form is valid, do your submit logic here (e.g., send data to the server)
      console.log("Form data submitted:", formData);
      router.push("/partner/finish");
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Map errors to a more user-friendly structure
        const formattedErrors: any = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <div className="mx-auto border-purple-800 border-2 rounded-lg">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
          backgroundColor: "white",
          border: "1px solid",
          borderColor: "blue.300",
          borderRadius: 2,
        }}
      >
        {/* Full Name and Last Name */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          {/* First Name */}
          <Box sx={{ flex: 1 }}>
            <InputLabel htmlFor="firstName">Full Name *</InputLabel>
            <TextField
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              fullWidth
              error={!!errors.firstName}
            />
            {errors.firstName && (
              <FormHelperText error>{errors.firstName}</FormHelperText>
            )}
          </Box>

          {/* Last Name */}
          <Box sx={{ flex: 1 }}>
            <InputLabel htmlFor="lastName">Last Name *</InputLabel>
            <TextField
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              fullWidth
              error={!!errors.lastName}
            />
            {errors.lastName && (
              <FormHelperText error>{errors.lastName}</FormHelperText>
            )}
          </Box>
        </Box>

        {/* Email Address and Whatsapp Number */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          {/* Email Address */}
          <Box sx={{ flex: 1 }}>
            <InputLabel htmlFor="email">Business Email*</InputLabel>
            <TextField
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              type="email"
              fullWidth
              error={!!errors.email}
            />
            {errors.email && (
              <FormHelperText error>{errors.email}</FormHelperText>
            )}
          </Box>

          {/* Whatsapp Number */}
          <Box sx={{ flex: 1 }}>
            <InputLabel htmlFor="whatsapp">Phone Number *</InputLabel>
            <TextField
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              required
              type="tel"
              fullWidth
              error={!!errors.whatsapp}
            />
            {errors.whatsapp && (
              <FormHelperText error>{errors.whatsapp}</FormHelperText>
            )}
          </Box>
        </Box>

        {/* Job Function and Country */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <InputLabel htmlFor="jobfunction">Job Function *</InputLabel>
            <FormControl fullWidth>
              <Select
                id="jobfunction"
                name="jobfunction"
                value={formData.jobfunction}
                onChange={handleSelectChange} // Use handleSelectChange here
                required
                error={!!errors.jobfunction}
              >
                {jobfunctions.map((job, index) => (
                  <MenuItem key={index} value={job}>
                    {job}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.jobfunction && (
              <FormHelperText error>{errors.jobfunction}</FormHelperText>
            )}
          </Box>

          <Box sx={{ flex: 1 }}>
            <InputLabel htmlFor="country">Country *</InputLabel>
            <FormControl fullWidth>
              <Select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleSelectChange} // Use handleSelectChange here
                required
                error={!!errors.country}
              >
                {country.map((countryItem, index) => (
                  <MenuItem key={index} value={countryItem}>
                    {countryItem}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.country && (
              <FormHelperText error>{errors.country}</FormHelperText>
            )}
          </Box>
        </Box>

        {/* Message */}
        <Box sx={{ flex: 1 }}>
          <InputLabel htmlFor="Message">Message*</InputLabel>
          <TextField
            id="Message"
            name="Message"
            value={formData.Message}
            onChange={handleChange}
            required
            fullWidth
            error={!!errors.Message}
          />
          {errors.Message && (
            <FormHelperText error>{errors.Message}</FormHelperText>
          )}
        </Box>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </div>
  );
}

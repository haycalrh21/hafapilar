"use client";
import { Box, TextField, Button, InputLabel } from "@mui/material";
import { useState } from "react";

import { DepartmentsData } from "@/app/services/dummy";

export default function FormInputPartner() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    passportId: "",
    email: "",
    whatsapp: "",
    department: "",
    position: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);

  const [workExperienceFile, setWorkExperienceFile] = useState<File | null>(
    null
  ); // Menambahkan state untuk menyimpan file lainnya

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name!]: value });

    if (name === "department") {
      const selectedDepartment = DepartmentsData.find(
        (dept) => dept.title === value
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) {
      alert("Please agree to the terms and conditions before submitting.");
      return;
    }

    // Menambahkan file ke dalam formData
  };

  return (
    <div className="my-auto">
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
            />
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
            />
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
            />
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
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <InputLabel htmlFor="whatsapp">Job Function *</InputLabel>
            <TextField
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              required
              type="tel"
              fullWidth
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <InputLabel htmlFor="whatsapp">Country *</InputLabel>
            <TextField
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              required
              type="tel"
              fullWidth
            />
          </Box>
        </Box>
        {/* Department and Position */}

        <Box sx={{ flex: 1 }}>
          <InputLabel htmlFor="passportId">Message*</InputLabel>
          <TextField
            id="passportId"
            name="passportId"
            value={formData.passportId}
            onChange={handleChange}
            required
            fullWidth
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </div>
  );
}

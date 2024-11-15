import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Button,
  Checkbox,
  Typography,
  InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import ModalTerms from "./ModalTerms";
import ModalRecruitment from "./ModalRecruitment";
import FileUpload from "./FIleUpload";
import { DepartmentsData } from "@/app/services/dummy";
import FileUploadCv from "./FileUploadCV";
import { SelectChangeEvent } from "@mui/material";
export default function FormInput({ department }: any) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    passportId: "",
    email: "",
    whatsapp: "",
    department: department || "",
    position: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [openRecruitment, setOpenRecruitment] = useState(false);
  const [positions, setPositions] = useState<string[]>([]);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [workExperienceFile, setWorkExperienceFile] = useState<File | null>(
    null
  );

  useEffect(() => {
    console.log(department);
    if (department) {
      const selectedDepartment = DepartmentsData.find(
        (dept) => dept.title === department
      );
      console.log(selectedDepartment);
      if (selectedDepartment) {
        setPositions(selectedDepartment.positions.split(", "));
        setFormData((prevFormData) => ({
          ...prevFormData,
          department: selectedDepartment.title,
        }));
      }
    }
  }, [department]);

  const handleChange = (
    e:
      | SelectChangeEvent<string>
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name!]: value });

    if (name === "department") {
      const selectedDepartment = DepartmentsData.find(
        (dept) => dept.title === value
      );
      if (selectedDepartment) {
        setPositions(selectedDepartment.positions.split(", "));
      }
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) {
      alert("Please agree to the terms and conditions before submitting.");
      return;
    }

    const dataToSubmit = { ...formData, cvFile, workExperienceFile };
    console.log(dataToSubmit);
  };

  const handleFileUploadCv = (file: File | null) => {
    setCvFile(file);
  };

  const handleFileUploadWorkExperience = (file: File | null) => {
    setWorkExperienceFile(file);
  };

  return (
    <div className="mx-auto">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          mx: "auto",
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
          <Box sx={{ flex: 1 }}>
            <InputLabel htmlFor="firstName">Full Name *</InputLabel>
            <TextField
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              fullWidth
              sx={{
                borderRadius: 2, // Border radius
                border: "1px solid", // Border style
                borderColor: "blue.300", // Border color
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <InputLabel htmlFor="lastName">Last Name *</InputLabel>
            <TextField
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              fullWidth
              sx={{
                borderRadius: 2,
                border: "1px solid",
                borderColor: "blue.300",
              }}
            />
          </Box>
        </Box>

        {/* Date of Birth and Gender */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <InputLabel htmlFor="dateOfBirth">Date of Birth *</InputLabel>
            <TextField
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
                borderRadius: 2, // Border radius
                border: "1px solid", // Border style
                borderColor: "blue.300", // Border color
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <FormControl required fullWidth>
              <FormLabel>Gender *</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>

        {/* Passport ID */}
        <Box sx={{ flex: 1 }}>
          <InputLabel htmlFor="passportId">Passport ID *</InputLabel>
          <TextField
            id="passportId"
            name="passportId"
            value={formData.passportId}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              borderRadius: 2, // Border radius
              border: "1px solid", // Border style
              borderColor: "blue.300", // Border color
            }}
          />
        </Box>

        {/* Email Address and Whatsapp Number */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <InputLabel htmlFor="email">Email Address *</InputLabel>
            <TextField
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              type="email"
              fullWidth
              sx={{
                borderRadius: 2, // Border radius
                border: "1px solid", // Border style
                borderColor: "blue.300", // Border color
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <InputLabel htmlFor="whatsapp">Whatsapp Number *</InputLabel>
            <TextField
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              required
              type="tel"
              fullWidth
              sx={{
                borderRadius: 2, // Border radius
                border: "1px solid", // Border style
                borderColor: "blue.300", // Border color
              }}
            />
          </Box>
        </Box>

        {/* Department and Position */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <InputLabel htmlFor="department">Department Applied *</InputLabel>
            <Select
              name="department"
              value={formData.department}
              onChange={handleChange}
              displayEmpty
              fullWidth
              required
              sx={{
                borderRadius: 2, // Border radius
                border: "1px solid", // Border style
                borderColor: "blue.300", // Border color
              }}
            >
              <MenuItem value="" disabled>
                Select Department
              </MenuItem>
              {DepartmentsData.map((dept) => (
                <MenuItem key={dept.title} value={dept.title}>
                  {dept.title}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ flex: 1 }}>
            <InputLabel htmlFor="position">Select Position *</InputLabel>
            <Select
              name="position"
              value={formData.position}
              onChange={handleChange}
              displayEmpty
              fullWidth
              required
              disabled={!formData.department}
              sx={{
                borderRadius: 2, // Border radius
                border: "1px solid", // Border style
                borderColor: "blue.300", // Border color
              }}
            >
              <MenuItem value="" disabled>
                Select Position
              </MenuItem>
              {positions.map((position) => (
                <MenuItem key={position} value={position}>
                  {position}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <FileUploadCv onFileSelect={handleFileUploadCv} />
        <FileUpload onFileSelect={handleFileUploadWorkExperience} />

        {/* Terms and Checkbox */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Checkbox
            checked={isAgreed}
            onChange={handleCheckboxChange}
            color="primary"
          />
          <Typography variant="body2">
            By checking this box, I have read and agree to the{" "}
            <span
              onClick={() => setOpenTerms(true)}
              style={{ cursor: "pointer", color: "#F2AF29" }}
            >
              Terms and Conditions
            </span>{" "}
            and{" "}
            <span
              onClick={() => setOpenRecruitment(true)}
              style={{ cursor: "pointer", color: "#F2AF29" }}
            >
              Recruitment Process
            </span>
          </Typography>
        </Box>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>

      {/* Modal Components */}
      <ModalTerms open={openTerms} onClose={() => setOpenTerms(false)} />
      <ModalRecruitment
        open={openRecruitment}
        onClose={() => setOpenRecruitment(false)}
      />
    </div>
  );
}

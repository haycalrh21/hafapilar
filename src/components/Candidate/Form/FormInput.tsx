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
  FormHelperText,
} from "@mui/material";
import { useState, useEffect } from "react";
import ModalTerms from "./ModalTerms";
import ModalRecruitment from "./ModalRecruitment";
import FileUpload from "./FIleUpload";
import { DepartmentsData } from "@/app/services/dummy";
import FileUploadCv from "./FileUploadCV";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import DatePicker from "@/components/field/DatePicker";
import { z } from "zod";

// Zod schema for form validation
const formSchema = z.object({
  firstName: z
    .string()
    .min(5, "Minimum 5 character *")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .min(5, "Minimum 5 character *")
    .max(50, "Last name is too long"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female"], {
    required_error: "Please select a gender",
  }),
  passportId: z
    .string()
    .min(16, "Minimum 16 character *")
    .regex(
      /^[A-Za-z0-9]+$/,
      "Passport ID must contain only letters and numbers"
    ),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  // whatsapp: z
  // .string()
  // .min(1, "WhatsApp number is required *")
  // .regex(/^\+62[0-9]+$/, "Invalid phone number format. Must start with +62."),
  whatsapp: z
    .string()
    .min(1, "WhatsApp number is required *")
    .regex(/^08[0-9]+$/, "Invalid phone number format. Must start with 08."),

  department: z.string().min(1, "Department is required"),
  position: z.string().min(1, "Position is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function FormInput({ department }: any) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "" as "male" | "female",
    passportId: "",
    email: "",
    whatsapp: "",
    department: department || "",
    position: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [isAgreed, setIsAgreed] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [openRecruitment, setOpenRecruitment] = useState(false);
  const [positions, setPositions] = useState<string[]>([]);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [workExperienceFile, setWorkExperienceFile] = useState<File | null>(
    null
  );

  useEffect(() => {
    if (department) {
      const selectedDepartment = DepartmentsData.find(
        (dept) => dept.title === department
      );
      if (selectedDepartment) {
        setPositions(selectedDepartment.positions.split(", "));
        setFormData((prevFormData) => ({
          ...prevFormData,
          department: selectedDepartment.title,
        }));
      }
    }
  }, [department]);

  const validateField = (name: keyof FormData, value: string) => {
    try {
      formSchema.shape[name].parse(value);
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [name]: error.errors[0].message,
        }));
      }
    }
  };

  const handleChange = (
    e:
      | SelectChangeEvent<string>
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name!]: value }));
    validateField(name as keyof FormData, value as string);

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
      setErrors((prev) => ({
        ...prev,
        terms: "Please agree to the terms and conditions",
      }));
      return;
    }

    try {
      const validatedData = formSchema.parse(formData);
      const dataToSubmit = { ...validatedData, cvFile, workExperienceFile };
      console.log(dataToSubmit);
      router.push("/candidate/finish");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleFileUploadCv = (file: File | null) => {
    setCvFile(file);
  };

  const handleFileUploadWorkExperience = (file: File | null) => {
    setWorkExperienceFile(file);
  };

  return (
    <div className="mx-auto border-2 border-[#0F4C5C] rounded-lg">
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
            pb: 4,
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
                borderRadius: 2,
                border: "1px solid",
                borderColor: errors.firstName ? "error.main" : "blue.300",
                mb: 0.5,
              }}
            />
            {errors.firstName && (
              <Typography color="error" variant="caption" sx={{ pl: 1 }}>
                {errors.firstName}
              </Typography>
            )}
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
                borderColor: errors.lastName ? "error.main" : "blue.300",
                mb: 0.5,
              }}
            />
            {errors.lastName && (
              <Typography color="error" variant="caption" sx={{ pl: 1 }}>
                {errors.lastName}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Date of Birth and Gender */}
        <Box
          sx={{
            display: "flex",
            pb: 4,
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <InputLabel htmlFor="dateOfBirth">Date of Birth *</InputLabel>
            <DatePicker
              dateFormat="dd-MMM-yyyy"
              value={formData.dateOfBirth}
              onDateChange={(_, formattedDate) => {
                setFormData((prev) => ({
                  ...prev,
                  dateOfBirth: formattedDate,
                }));
                validateField("dateOfBirth", formattedDate);
              }}
            />
            {errors.dateOfBirth && (
              <Typography color="error" variant="caption" sx={{ pl: 1 }}>
                {errors.dateOfBirth}
              </Typography>
            )}
          </Box>

          <Box sx={{ flex: 1, justifyContent: "between" }}>
            <FormControl required fullWidth>
              <FormLabel>Gender *</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                sx={{
                  gap: 3, // Default gap untuk mobile
                  "@media (min-width: 600px)": {
                    // Media query untuk layar lebih lebar (laptop dan tablet)
                    gap: 20,
                  },
                }}
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
              {errors.gender && (
                <Typography color="error" variant="caption" sx={{ pl: 1 }}>
                  {errors.gender}
                </Typography>
              )}
            </FormControl>
          </Box>
        </Box>

        {/* Passport ID */}
        <Box sx={{ flex: 1, pb: 4 }}>
          <InputLabel htmlFor="passportId">Passport ID *</InputLabel>
          <TextField
            id="passportId"
            name="passportId"
            value={formData.passportId}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              borderRadius: 2,
              border: "1px solid",
              borderColor: errors.passportId ? "error.main" : "blue.300",
              mb: 0.5,
            }}
          />
          {errors.passportId && (
            <Typography color="error" variant="caption" sx={{ pl: 1 }}>
              {errors.passportId}
            </Typography>
          )}
        </Box>

        {/* Email Address and Whatsapp Number */}
        <Box
          sx={{
            display: "flex",
            pb: 4,
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
                borderRadius: 2,
                border: "1px solid",
                borderColor: errors.email ? "error.main" : "blue.300",
                mb: 0.5,
              }}
            />
            {errors.email && (
              <Typography color="error" variant="caption" sx={{ pl: 1 }}>
                {errors.email}
              </Typography>
            )}
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
                borderRadius: 2,
                border: "1px solid",
                borderColor: errors.whatsapp ? "error.main" : "blue.300",
                mb: 0.5,
              }}
            />
            {errors.whatsapp && (
              <Typography color="error" variant="caption" sx={{ pl: 1 }}>
                {errors.whatsapp}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Department and Position */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            pb: 4,
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
                borderRadius: 2,
                border: "1px solid",
                borderColor: errors.department ? "error.main" : "blue.300",
                mb: 0.5,
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
            {errors.department && (
              <Typography color="error" variant="caption" sx={{ pl: 1 }}>
                {errors.department}
              </Typography>
            )}
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
                borderRadius: 2,
                border: "1px solid",
                borderColor: errors.position ? "error.main" : "blue.300",
                mb: 0.5,
              }}
            >
              <MenuItem value="" disabled>
                Select{" "}
                {formData.department
                  ? `${formData.department} Position`
                  : "Position"}
              </MenuItem>
              {positions.map((position) => (
                <MenuItem key={position} value={position}>
                  {position}
                </MenuItem>
              ))}
            </Select>
            {errors.position && (
              <Typography color="error" variant="caption" sx={{ pl: 1 }}>
                {errors.position}
              </Typography>
            )}
          </Box>
        </Box>

        <FileUploadCv onFileSelect={handleFileUploadCv} />
        <FileUpload onFileSelect={handleFileUploadWorkExperience} />

        {/* Terms and Checkbox */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
          {/* {errors.terms && (
            <Typography color="error" variant="caption" sx={{ pl: 1 }}>
              {errors.terms}
            </Typography>
          )} */}
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

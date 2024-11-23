import { useState, useEffect } from "react";
import ModalTerms from "./ModalTerms";
import ModalRecruitment from "./ModalRecruitment";
import FileUpload from "./FIleUpload";
import { DepartmentsData } from "@/app/services/dummy";
import FileUploadCv from "./FileUploadCV";
import { useRouter } from "next/navigation";
import DatePicker from "@/components/field/DatePicker";
import { set, z } from "zod";
import PhoneNumberInput from "./PhoneInput";

interface ApiResponse {
  message: string;
}

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
    .min(8, "Minimum 8 character *")
    .regex(
      /^[A-Za-z0-9]+$/,
      "Passport ID must contain only letters and numbers"
    ),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  whatsapp: z
    .string()
    .min(1, "WhatsApp number is required *")
    .regex(
      /^\+[0-9]{1,15}$/,
      "Invalid phone number format. Must start with +."
    ),

  department: z.string().min(1, "Department is required"),
  position: z.string().min(1, "Position is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function FormInput({ department }: any) {
  const api_url = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(false);
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
  const [cvFile, setCvFile] = useState<string | null>(null);
  const [workExperienceFile, setWorkExperienceFile] = useState<string | null>(
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
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name!]: value }));
    validateField(name as keyof FormData, value as string);

    if (name === "department") {
      // Cari departemen yang dipilih dari DepartmentsData
      const selectedDepartment = DepartmentsData.find(
        (dept) => dept.title === value
      );

      // Jika departemen ditemukan, set posisi berdasarkan data tersebut
      if (selectedDepartment) {
        setPositions(selectedDepartment.positions.split(", "));
        // Update department yang terpilih
        setFormData((prev) => ({
          ...prev,
          department: selectedDepartment.title,
        }));
      }
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
  };

  const handleFileUploadCv = (file: File | null, fileUrl: string | null) => {
    console.log("File selected:", file);
    console.log("File URL received:", fileUrl);
    setCvFile(fileUrl);
  };

  const handleFileUploadWorkExperience = (
    file: File | null,
    fileUrl: string | null
  ) => {
    console.log("File selected:", file);
    console.log("File URL received:", fileUrl);
    setWorkExperienceFile(fileUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!cvFile || !workExperienceFile) {
      alert("Both CV and Work Experience PDF files are required.");
      return;
    }

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        passportId: formData.passportId,
        email: formData.email,
        phoneNumber: formData.whatsapp,
        department: formData.department,
        position: formData.position,
        cvFile,
        certificateFile: workExperienceFile,
      };

      console.log("Payload to send:", payload);

      const response = await fetch(`${api_url}/candidate`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);

      router.push("/candidate/finish");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handlePhoneChange = (value: string) => {
    if (!value.startsWith("+")) {
      value = `+${value}`;
    }
    setFormData({ ...formData, whatsapp: value });
    validateField("whatsapp", value); // Ensure validation is triggered
  };

  return (
    <div className="max-w-6xl mx-4 mb-4 bg-white font-sans border-2 border-hijau rounded-xl p-6">
      <form onSubmit={handleSubmit}>
        {/* Full Name and Last Name */}
        <div className="flex flex-col sm:flex-row gap-4 font-['Poppins'] mb-12">
          <div className="flex-1">
            <label
              htmlFor="firstName"
              className="block text-sm text-hero font-medium mb-4"
            >
              First Name *
            </label>
            <input
              id="firstName"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={`w-full p-2 border rounded-xl ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <span className="text-red-500 text-xs">{errors.firstName}</span>
            )}
          </div>

          <div className="flex-1">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-hero mb-4"
            >
              Last Name *
            </label>
            <input
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className={`w-full p-2 border rounded-xl ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs">{errors.lastName}</span>
            )}
          </div>
        </div>

        {/* Date of Birth and Gender */}
        <div className="flex flex-col font-['Poppins'] text-hero sm:flex-row gap-4 mb-12">
          <div className="flex-1">
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium mb-4"
            >
              Date of Birth *
            </label>
            <DatePicker
              dateFormat="dd-mm-yyyy"
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
              <span className="text-red-500 text-xs">{errors.dateOfBirth}</span>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-hero text-sm font-medium mb-4">
              Gender *
            </label>
            <div className="flex  gap-20  items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="form-radio text-blue-600"
                />
                <span>Female</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="form-radio text-blue-600"
                />
                <span>Male</span>
              </label>
            </div>
            {errors.gender && (
              <span className="text-red-500 text-xs mt-1">{errors.gender}</span>
            )}
          </div>
        </div>

        {/* Passport ID */}
        <div className="mb-12 font-['Poppins']">
          <label
            htmlFor="passportId"
            className="block text-sm text-hero font-medium mb-4"
          >
            Passport ID *
          </label>
          <input
            id="passportId"
            name="passportId"
            placeholder="Passport ID"
            value={formData.passportId}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded-xl ${
              errors.passportId ? "border-red-500" : ""
            }`}
          />
          {errors.passportId && (
            <span className="text-red-500 text-xs">{errors.passportId}</span>
          )}
        </div>

        {/* Email Address and Whatsapp Number */}
        <div className="flex flex-col text-hero sm:flex-row gap-4 mb-12 font-['Poppins']">
          <div className="flex-1">
            <label htmlFor="email" className="block text-sm font-medium mb-4">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              placeholder="john.doe@example.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full p-2 border rounded-xl ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email}</span>
            )}
          </div>

          <div className="flex-1">
            <label
              htmlFor="whatsapp"
              className="block text-hero text-sm font-medium mb-4"
            >
              WhatsApp Number *
            </label>
            <PhoneNumberInput
              error={errors.whatsapp}
              onChange={handlePhoneChange} // Pastikan kita menerima data dari PhoneNumberInput
            />
            {errors.whatsapp && (
              <span className="text-red-500 text-xs">{errors.whatsapp}</span>
            )}
          </div>
        </div>

        {/* Department and Position */}
        <div className="flex flex-col sm:flex-row gap-4 text-hero mb-12 font-['Poppins']">
          <div className="flex-1">
            <label
              htmlFor="department"
              className="block text-sm font-medium mb-4"
            >
              Department Applied*
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className={`w-full p-2 border rounded-xl ${
                errors.department ? "border-red-500" : ""
              }`}
            >
              {DepartmentsData.map((dept) => (
                <option key={dept.title} value={dept.title}>
                  {dept.title}
                </option>
              ))}
            </select>
            {errors.department && (
              <span className="text-red-500 text-xs">{errors.department}</span>
            )}
          </div>

          <div className="flex-1">
            <label
              htmlFor="position"
              className="block text-sm font-medium mb-4"
            >
              Position *
            </label>
            <select
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className={`w-full p-2 border rounded-xl ${
                errors.position ? "border-red-500" : ""
              } hover:border-[#0F4C5C] focus:border-[#0F4C5C]`}
            >
              <option value="">Select {formData.department} Position</option>
              {positions.map((pos, index) => (
                <option key={index} id={`position-${index}`} value={pos}>
                  {pos}
                </option>
              ))}
            </select>

            {errors.position && (
              <span className="text-red-500 text-xs">{errors.position}</span>
            )}
          </div>
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <FileUploadCv onFileSelect={handleFileUploadCv} />
        </div>

        <div className="mb-6">
          <FileUpload onFileSelect={handleFileUploadWorkExperience} />
        </div>

        {/* Terms and Conditions */}
        <div className="mb-6 flex items-center gap-4">
          <input
            type="checkbox"
            id="terms"
            checked={isAgreed}
            onChange={handleCheckboxChange}
            className="form-checkbox ml-4"
          />
          <label
            htmlFor="terms"
            className="text-sm flex text-hero flex-wrap gap-1"
          >
            By checking this box, I have read and agree to the
            <button
              type="button"
              onClick={() => setOpenTerms(true)}
              className="text-[#F2AF29] underline"
            >
              Terms and Conditions
            </button>
            <span>and</span>
            <button
              type="button"
              onClick={() => setOpenRecruitment(true)}
              className="text-[#F2AF29] underline"
            >
              Recruitment Process
            </button>
          </label>
        </div>

        {/* Submit Button */}
        <div className="w-full mx-auto">
          <button
            type="submit"
            disabled={loading}
            className="w-full font-['Poppins'] text-[16px] bg-hijau text-white py-2 rounded-xl font-semibold mb-4 hover:bg-white border-2 hover:text-hijau"
          >
            {loading ? "Loading..." : "Submit Application"}
          </button>
        </div>
      </form>

      <ModalTerms open={openTerms} onClose={() => setOpenTerms(false)} />
      <ModalRecruitment
        open={openRecruitment}
        onClose={() => setOpenRecruitment(false)}
      />
    </div>
  );
}

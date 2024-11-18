import { useState, useEffect } from "react";
import ModalTerms from "./ModalTerms";
import ModalRecruitment from "./ModalRecruitment";
import FileUpload from "./FIleUpload";
import { DepartmentsData } from "@/app/services/dummy";
import FileUploadCv from "./FileUploadCV";
import { useRouter } from "next/navigation";
import DatePicker from "@/components/field/DatePicker";
import { z } from "zod";
import PhoneNumberInput from "./PhoneInput";

interface ApiResponse {
  message: string;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

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
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi file
    if (!cvFile || !workExperienceFile) {
      alert("Both CV and Work Experience PDF files are required.");
      return;
    }

    if (
      cvFile.type !== "application/pdf" ||
      workExperienceFile.type !== "application/pdf"
    ) {
      alert("Both files must be in PDF format.");
      return;
    }

    try {
      // Validasi form data
      const validatedData = formSchema.parse(formData);

      // Convert files to base64
      const cvBase64 = await fileToBase64(cvFile);
      const certificateBase64 = await fileToBase64(workExperienceFile);

      // Prepare data for API
      const apiData = {
        fullname: validatedData.firstName,
        lastname: validatedData.lastName,
        dateOfBirth: validatedData.dateOfBirth,
        gender: validatedData.gender,
        passportNumber: validatedData.passportId,
        email: validatedData.email,
        phoneNumber: validatedData.whatsapp,
        department: validatedData.department,
        position: validatedData.position,
        cv: cvBase64,
        certificate: certificateBase64,
      };

      // Make API call
      const response = await fetch(`${api_url}/candidate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result: ApiResponse = await response.json();
      console.log("Submission successful:", result);

      // Navigate to success page
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
      } else {
        console.error("Submission error:", error);
        // You might want to show an error message to the user
      }
    }
  };

  const handleFileUploadCv = (file: File | null) => {
    if (file && file.type !== "application/pdf") {
      alert("Please upload a valid PDF file for CV.");
      return;
    }
    setCvFile(file);
  };

  const handlePhoneChange = (value: string) => {
    // Menambahkan tanda + di depan jika belum ada
    if (!value.startsWith("+")) {
      value = `+${value}`;
    }
    setFormData({ ...formData, whatsapp: value });
    validateField("whatsapp", value); // Pastikan validasi dijalankan
  };
  const handleFileUploadWorkExperience = (file: File | null) => {
    if (file && file.type !== "application/pdf") {
      alert("Please upload a valid PDF file for Work Experience.");
      return;
    }
    setWorkExperienceFile(file);
  };

  return (
    <div className="mx-auto bg-white font-sans border-2 border-[#4993a6] rounded-lg p-6">
      <form onSubmit={handleSubmit}>
        {/* Full Name and Last Name */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="flex-1">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-4"
            >
              Full Name *
            </label>
            <input
              id="firstName"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={`w-full p-2 border rounded-md ${
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
              className="block text-sm font-medium mb-4"
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
              className={`w-full p-2 border rounded-md ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs">{errors.lastName}</span>
            )}
          </div>
        </div>

        {/* Date of Birth and Gender */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
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
            <label className="block text-sm font-medium mb-4">Gender *</label>
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
        <div className="mb-12">
          <label
            htmlFor="passportId"
            className="block text-sm font-medium mb-4"
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
            className={`w-full p-2 border rounded-md ${
              errors.passportId ? "border-red-500" : ""
            }`}
          />
          {errors.passportId && (
            <span className="text-red-500 text-xs">{errors.passportId}</span>
          )}
        </div>

        {/* Email Address and Whatsapp Number */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
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
              className={`w-full p-2 border rounded-md ${
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
              className="block text-sm font-medium mb-4"
            >
              Whatsapp Number *
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
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="flex-1">
            <label
              htmlFor="department"
              className="block text-sm font-medium mb-4"
            >
              Department *
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className={`w-full p-2 border rounded-md ${
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
              className={`w-full p-2 border rounded-md ${
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
          <label htmlFor="terms" className="text-sm flex flex-wrap gap-1">
            I agree to the{" "}
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
            className="w-full bg-[#0F4C5C] text-white py-2 rounded-md font-bold mb-4 hover:bg-white border-2 hover:text-[#0F4C5C]"
          >
            Submit
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

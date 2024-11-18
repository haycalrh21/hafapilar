"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import PhoneNumberInput from "../Candidate/Form/PhoneInput";

// Define the Zod schema for validation
const formSchema = z.object({
  firstName: z.string().min(4, "Minimum 4 character *"),
  lastName: z.string().min(5, "Minimum 5 character *"),
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Business Email is required"),
  whatsapp: z.string().min(1, "Phone Number is required").or(z.literal("")),
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, whatsapp: value }); // Kirim data whatsapp dari PhoneNumberInput
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Cek apakah whatsapp kosong
    if (!formData.whatsapp || formData.whatsapp === "") {
      const formattedErrors: any = {
        ...errors,
        whatsapp: "Phone number is required",
      };

      setErrors(formattedErrors);

      // Log error jika whatsapp kosong
      console.log("Phone number is required");
      return; // stop form submission jika whatsapp kosong
    }

    const updatedFormData = {
      ...formData,
    };

    // Log data sebelum validasi
    console.log("Form data before validation:", updatedFormData);

    try {
      // Validasi form data dengan Zod
      formSchema.parse(updatedFormData);
      console.log("Form data is valid:", updatedFormData);

      // Data valid, lanjutkan dengan submit
      console.log("Form data submitted:", updatedFormData);
      router.push("/partner/finish");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: any = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });

        // Log error validasi
        console.log("Validation errors:", formattedErrors);

        setErrors(formattedErrors);
      }
    }
  };

  return (
    <div className="mx-auto border border-[#0F4C5C] rounded-lg font-sans">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4 bg-white border-2 border-blue-300 rounded-lg"
      >
        {/* Full Name and Last Name */}
        <div className="flex flex-col sm:flex-row gap-4 pb-4">
          <div className="flex-1">
            <label htmlFor="firstName" className="font-medium block mb-4">
              Full Name *
            </label>
            <input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="w-full p-2 border rounded"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">{errors.firstName}</span>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="lastName" className="font-medium block mb-4">
              Last Name *
            </label>
            <input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              placeholder="Last Name"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">{errors.lastName}</span>
            )}
          </div>
        </div>

        {/* Email Address and Whatsapp Number */}
        <div className="flex gap-4 pb-4 flex-col sm:flex-row">
          <div className="flex-1">
            <label htmlFor="email" className=" font-medium block mb-4">
              Business Email*
            </label>
            <input
              id="email"
              name="email"
              value={formData.email}
              placeholder="john.doe@example.com"
              onChange={handleChange}
              required
              type="email"
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="whatsapp" className=" font-medium block mb-4">
              Phone Number *
            </label>
            <PhoneNumberInput
              error={errors.whatsapp}
              onChange={handlePhoneChange} // Pastikan kita menerima data dari PhoneNumberInput
            />
          </div>
        </div>

        {/* Job Function and Country */}
        <div className="flex gap-4 pb-4 flex-col sm:flex-row">
          {/* <div className="flex-1">
            <label htmlFor="jobfunction" className="font-medium  block">
              Job Function *
            </label>
            <select
              id="jobfunction"
              name="jobfunction"
              value={formData.jobfunction}
              onChange={handleSelectChange}
              required
              className="w-full p-2 border rounded"
            >
              {jobfunctions.map((job, index) => (
                <option key={index} value={job}>
                  {job}
                </option>
              ))}
            </select>
            {errors.jobfunction && (
              <span className="text-red-500 text-sm">{errors.jobfunction}</span>
            )}
          </div> */}

          <div className="flex-1">
            <label htmlFor="country" className=" font-medium block mb-4">
              Country *
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleSelectChange}
              required
              className="w-full p-2 border rounded"
            >
              {country.map((countryItem, index) => (
                <option key={index} value={countryItem}>
                  {countryItem}
                </option>
              ))}
            </select>
            {errors.country && (
              <span className="text-red-500 text-sm">{errors.country}</span>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="flex-1">
          <label htmlFor="Message" className=" font-medium block mb-4">
            Message*
          </label>
          <textarea
            id="Message"
            name="Message"
            value={formData.Message}
            onChange={handleChange}
            placeholder="Leave a message for us"
            required
            className="w-full p-2 border rounded"
          />
          {errors.Message && (
            <span className="text-red-500 text-sm">{errors.Message}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#0F4C5C] text-white py-2 rounded-md font-medium mb-4 hover:bg-white border-2 hover:text-[#0F4C5C]"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

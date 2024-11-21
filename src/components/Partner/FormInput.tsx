"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import PhoneNumberInput from "../Candidate/Form/PhoneInput";

interface Country {
  name: {
    common: string;
  };
}

const formSchema = z.object({
  firstName: z.string().min(4, "Minimum 4 character *"),
  lastName: z.string().min(5, "Minimum 5 character *"),
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Business Email is required"),
  companyWebite: z.string().min(1, "Website is required"),
  whatsapp: z
    .string()
    .min(1, "WhatsApp number is required *")
    .regex(
      /^\+[0-9]{1,15}$/,
      "Invalid phone number format. Must start with +."
    ),

  country: z.string().min(1, "Country is required"),
  Message: z.string().min(1, "Message is required"),
});

export default function FormInputPartner() {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const data = await fetch("https://restcountries.com/v3.1/all").then((res) =>
      res.json()
    );
    console.log(data);

    // Menyimpan seluruh data negara
    setCountries(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortedCountries = countries.sort((a, b) => {
    if (a.name.common < b.name.common) return -1;
    if (a.name.common > b.name.common) return 1;
    return 0;
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    Message: "",
    CompanyWebsite: "",
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
    // Check if the value starts with "+" and is numeric
    if (value && !value.startsWith("+")) {
      value = `+${value}`;
    }

    setFormData({ ...formData, whatsapp: value });
  };

  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Cek apakah whatsapp kosong
    if (!formData.whatsapp || formData.whatsapp === "") {
      const formattedErrors: any = {
        ...errors,
        whatsapp: "Phone number is required",
      };
      setErrors(formattedErrors);
      setLoading(false);
      return;
    }

    // Check if phone number format is valid
    try {
      formSchema.parse(formData); // Validate form data including phone number
      console.log("Form data is valid:", formData);

      // Submit form data
      const response = await fetch(`${api_url}/partner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: formData.firstName,
          lastname: formData.lastName,
          phoneNumber: formData.whatsapp,
          companyWebsite: formData.CompanyWebsite,
          email: formData.email,
          country: formData.country,
          message: formData.Message,
        }),
      });

      if (response.ok) {
        setLoading(false);
        router.push("/partner/finish");
      } else {
        setLoading(false);
        const errorData = await response.json();
        console.error("Error creating partner:", errorData.error);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: any = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setLoading(false);
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <div className="mx-auto rounded-xl font-['Poppins']">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4 bg-white border-[1px] border-hijau rounded-xl"
      >
        {/* Full Name and Last Name */}
        <div className="flex flex-col sm:flex-row gap-4 pb-4">
          <div className="flex-1">
            <label htmlFor="firstName" className="font-medium block mb-4">
              First Name *
            </label>
            <input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="w-full p-2 border rounded-xl"
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
              className="w-full p-2 border rounded-xl"
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
              className="w-full p-2 border rounded-xl"
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
        <div className="flex flex-col sm:flex-row gap-4 pb-4">
          <div className="flex-1">
            <label htmlFor="companywebsite" className="font-medium block mb-4">
              Company Name *
            </label>
            <input
              id="companywebsite"
              name="companywebsite"
              value={formData.CompanyWebsite}
              onChange={handleChange}
              placeholder="Company Name"
              required
              className="w-full p-2 border rounded-xl"
            />
            {errors.CompanyWebsite && (
              <span className="text-red-500 text-sm">
                {errors.CompanyWebsite}
              </span>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="companywebsite" className="font-medium block mb-4">
              Company Website *
            </label>
            <input
              id="companywebsite"
              name="companywebsite"
              value={formData.CompanyWebsite}
              onChange={handleChange}
              placeholder="www.example.com"
              required
              className="w-full p-2 border rounded-xl"
            />
            {errors.CompanyWebsite && (
              <span className="text-red-500 text-sm">
                {errors.CompanyWebsite}
              </span>
            )}
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
              className="w-full p-2 border rounded-xl"
            >
              {sortedCountries.map((countryItem, index) => (
                <option key={index} value={countryItem.name.common}>
                  {countryItem.name.common}
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
            className="w-full p-2 border rounded-xl"
          />
          {errors.Message && (
            <span className="text-red-500 text-sm">{errors.Message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full font-['Poppins'] text-[16px] bg-hijau text-white py-2 rounded-xl font-semibold mb-4 hover:bg-white border-2 hover:text-hijau"
        >
          {loading ? "Loading..." : "Become a Partner"}
        </button>
      </form>
    </div>
  );
}

"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import PhoneNumberInput from "../Candidate/Form/PhoneInput";

interface Country {
  id: number;
  name: string;
}

const formSchema = z.object({
  firstName: z
    .string()
    .min(4, "Minimum 4 character *")
    .max(20, "First name is too long"),
  lastName: z
    .string()
    .min(5, "Minimum 5 character *")
    .max(20, "Last name is too long"),
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Business Email is required")
    .max(40, "Email is too long"),
  companyName: z
    .string()
    .min(5, "Company Name is required")
    .max(40, "Company Name is too long"),
  companyWebsite: z
    .string()
    .min(5, "Website is required")
    .max(40, "Website is too long"),
  whatsapp: z
    .string()
    .min(1, "WhatsApp number is required *")
    .regex(
      /^\+[0-9]{1,15}$/,
      "Invalid phone number format. Must start with +."
    ),
  country: z.string().min(1, "Country is required"),
  Message: z
    .string()
    .min(5, "Message is required")
    .max(1000, "Message is too long"),
});

type FormData = z.infer<typeof formSchema>;

export default function FormInputPartner() {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    Message: "",
    companyWebsite: "",
    whatsapp: "",
    country: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: keyof FormData, value: string) => {
    try {
      const fieldSchema = formSchema.shape[name];
      fieldSchema.parse(value);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [name]: error.errors[0].message || "",
        }));
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name as keyof FormData, value);
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name as keyof FormData, formData[name as keyof FormData]);
  };

  const handlePhoneChange = (value: string) => {
    if (!value.startsWith("+")) value = `+${value}`;
    setFormData((prev) => ({ ...prev, whatsapp: value }));
    setTouched((prev) => ({ ...prev, whatsapp: true }));
    validateField("whatsapp", value);
  };
  const api_url = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const allFields = Object.keys(formData);
    setTouched(
      allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );

    try {
      const validatedData = formSchema.parse(formData);
      const response = await fetch(`${api_url}/partner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        setLoading(false);
        router.push("/partner/finish");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, err) => {
          if (err.path[0]) {
            acc[err.path[0]] = err.message;
          }
          return acc;
        }, {} as Record<string, string>);
        setErrors(formattedErrors);
      }
      setLoading(false);
    }
  };

  // Fetch and sort countries
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${api_url}/country`).then((res) => res.json());
      // console.log(data);
      setCountries(data);
    };
    fetchData();
  }, []);

  const sortedCountries = countries.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  // console.log(sortedCountries.name?)
  return (
    <div className="mx-auto px-4 mb-4 rounded-xl font-['Poppins']">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4 bg-white border-[1px] border-hijau rounded-xl"
      >
        {/* Full Name and Last Name */}
        <div className="flex flex-col sm:flex-row gap-4 pb-4 text-hero">
          <div className="flex-1">
            <label htmlFor="firstName" className="font-medium block mb-4">
              First Name *
            </label>
            <input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={() => handleBlur("firstName")}
              placeholder="First Name"
              maxLength={20}
              className="w-full p-2 border rounded-xl"
            />
            {touched.firstName && errors.firstName && (
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
              onChange={handleChange}
              onBlur={() => handleBlur("lastName")}
              placeholder="Last Name"
              maxLength={20}
              className="w-full p-2 border rounded-xl"
            />
            {touched.lastName && errors.lastName && (
              <span className="text-red-500 text-sm">{errors.lastName}</span>
            )}
          </div>
        </div>

        {/* Email and Phone */}
        <div className="flex gap-4 pb-4 flex-col sm:flex-row text-hero">
          <div className="flex-1">
            <label htmlFor="email" className="font-medium block mb-4">
              Business Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
              placeholder="john.doe@example.com"
              maxLength={40}
              className="w-full p-2 border rounded-xl"
            />
            {touched.email && errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="whatsapp" className="font-medium block mb-4">
              Phone Number *
            </label>
            <PhoneNumberInput
              error={touched.whatsapp ? errors.whatsapp : ""}
              onChange={handlePhoneChange}
            />
          </div>
        </div>

        {/* Company Details */}
        <div className="flex flex-col sm:flex-row gap-4 pb-4 text-hero">
          <div className="flex-1">
            <label htmlFor="companyName" className="font-medium block mb-4">
              Company Name *
            </label>
            <input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              onBlur={() => handleBlur("companyName")}
              placeholder="Company Name"
              maxLength={40}
              className="w-full p-2 border rounded-xl"
            />
            {touched.companyName && errors.companyName && (
              <span className="text-red-500 text-sm">{errors.companyName}</span>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="companyWebsite" className="font-medium block mb-4">
              Company Website *
            </label>
            <input
              id="companyWebsite"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleChange}
              onBlur={() => handleBlur("companyWebsite")}
              placeholder="www.example.com"
              maxLength={40}
              className="w-full p-2 border rounded-xl"
            />
            {touched.companyWebsite && errors.companyWebsite && (
              <span className="text-red-500 text-sm">
                {errors.companyWebsite}
              </span>
            )}
          </div>
        </div>

        {/* Country */}
        <div className="flex gap-4 pb-4 flex-col sm:flex-row">
          <div className="flex-1 text-hero">
            <label htmlFor="country" className="font-medium block mb-4">
              Country *
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={() => handleBlur("country")}
              className="w-full p-2 border rounded-xl"
            >
              <option value="">Select a country</option>
              {sortedCountries.map((country) => (
                <option key={country.id} value={country.name}>
                  {loading ? "Loading..." : country.name}
                </option>
              ))}
            </select>
            {touched.country && errors.country && (
              <span className="text-red-500 text-sm">{errors.country}</span>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="flex-1 text-hero">
          <label htmlFor="Message" className="font-medium block mb-4">
            Message *
          </label>
          <textarea
            id="Message"
            name="Message"
            value={formData.Message}
            onChange={handleChange}
            onBlur={() => handleBlur("Message")}
            placeholder="Leave a message for us"
            maxLength={1000}
            className="w-full p-2 border rounded-xl"
          />
          {touched.Message && errors.Message && (
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

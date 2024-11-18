import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneNumberInputProps {
  error?: string;
  onChange: (value: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  error,
  onChange,
}) => {
  const [phone, setPhone] = useState("");

  return (
    <div className="relative w-full">
      <PhoneInput
        country={"id"}
        value={phone}
        onChange={(value) => {
          setPhone(value);
          onChange(value);
        }}
        inputProps={{
          name: "whatsapp",
          required: true,
        }}
        enableSearch={true}
        searchClass="w-full"
        containerClass="w-full"
        containerStyle={{ width: "auto" }}
        inputStyle={{
          width: "100%",
          maxWidth: "540px", // Default max width
          height: "40px",
          margin: "0 auto",
        }}
        dropdownStyle={{
          height: "auto",
          maxHeight: "300px",
          overflowY: "auto",
          width: "80vw",
          maxWidth: "540px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          position: "absolute",
          zIndex: 50,
        }}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PhoneNumberInput;

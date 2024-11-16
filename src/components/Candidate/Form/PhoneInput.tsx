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
        inputClass="w-full p-2 border rounded"
        dropdownStyle={{
          height: "auto",
          maxHeight: "300px", // Batasi tinggi dropdown
          overflowY: "auto", // Scroll jika isi dropdown panjang
          width: "80vw", // Gunakan 80% dari lebar viewport
          maxWidth: "500px", // Maksimal lebar 500px
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Shadow dropdown
          position: "absolute",
          zIndex: 50,
        }}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PhoneNumberInput;

import Image from "next/image";
import React from "react";

interface ModalRecruitmentProps {
  open: boolean;
  onClose: () => void;
}

const ModalRecruitment: React.FC<ModalRecruitmentProps> = ({
  open,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div className="fixed p-4 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg">
        <div className="p-4">
          <Image
            src="/assets/recruitment.png"
            alt="recruitment"
            width={800}
            height={300}
            className="w-full h-auto rounded-2xl border-[1px] border-hijau"
          />
        </div>
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="w-full py-2 bg-hijau text-white rounded-[8px] font-['Poppins'] hover:bg-[#093745] transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRecruitment;

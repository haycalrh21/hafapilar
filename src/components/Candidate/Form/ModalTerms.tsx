import React from "react";

interface ModalTermsProps {
  open: boolean;
  onClose: () => void;
}

const ModalTerms: React.FC<ModalTermsProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-left text-3xl font-['Poppins'] font-bold text-hijau mb-4">
          Terms and Conditions
        </h2>
        <p className="text-sm text-gray-700 mb-6 font-['Poppins']">
          By submitting this application, I confirm that I meet the eligibility
          criteria and that the information provided is accurate. I understand
          that false information may lead to disqualification. PT Hafa Pilar
          Indonesia will review my application and forward it to relevant
          partners if eligible. I consent to being contacted for additional
          information or interviews, and I agree to participate in required
          assessments. My personal data will be handled confidentially for
          recruitment purposes. I acknowledge that submitting this application
          does not guarantee employment, and deadlines may change. I have read
          and accept these terms and conditions.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2 bg-hijau text-white rounded-lg font-['Poppins'] hover:bg-[#093745] transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalTerms;

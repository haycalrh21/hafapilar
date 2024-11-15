import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";

interface ModalTermsProps {
  open: boolean;
  onClose: () => void;
}

const ModalTerms: React.FC<ModalTermsProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <DialogContentText
          className="text-left text-3xl mb-8 font-bold"
          style={{ color: "#0F4C5C" }}
        >
          Terms and Conditions
        </DialogContentText>
        <DialogContentText>
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
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          className="w-full text-white text-sm py-2"
          style={{ backgroundColor: "#0F4C5C" }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalTerms;

import Image from "next/image";
import React from "react";
import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";

interface ModalRecruitmentProps {
  open: boolean;
  onClose: () => void;
}

const ModalRecruitment: React.FC<ModalRecruitmentProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Image
          src="/assets/recruitment.png"
          alt="recruitment"
          width={500}
          height={300}
          style={{ width: "100%", height: "auto" }}
        />
      </DialogContent>
      <DialogActions>
        <button
          onClick={onClose}
          className="w-full font-serif text-white py-2 bg-[#0F4C5C] lg:font-light"
          // style={{ backgroundColor: "#0F4C5C", fontStyle: "initial" }}
        >
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalRecruitment;

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

export default ModalRecruitment;

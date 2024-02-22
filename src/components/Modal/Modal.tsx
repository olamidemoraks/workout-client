import { Modal as MuiModal } from "@mui/material";
import React, { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  setClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ open, setClose, children }) => {
  return (
    <MuiModal
      open={open}
      onClose={setClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>{children}</>
    </MuiModal>
  );
};
export default Modal;

import { Box, Modal } from "@mui/material";
import { AlertTriangle, Loader2 } from "lucide-react";
import React from "react";

type DeleteModalProps = {
  open: boolean;
  setClose: () => void;
  handleAction: () => void;
  isLoading: boolean;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  setClose,
  handleAction,
  isLoading,
}) => {
  return (
    <Modal
      open={open}
      onClose={setClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          p: 4,
        }}
        className=" bg-zinc-900 rounded-md w-fit  min-h-[200px] flex items-center justify-center p-4 py-6 gap-3 flex-col"
      >
        <AlertTriangle className=" fill-rose-500/20" color="#f43f5e" />
        <p className=" font-bold">Are you sure?</p>
        <p className=" text-neutral-300 text-center leading-5">
          This action cannot be undone. All values <br /> assiociated with this
          will be lost{" "}
        </p>
        <button
          className=" bg-rose-500 hover:bg-rose-600 w-full p-2 rounded flex items-center justify-center"
          onClick={handleAction}
        >
          {isLoading ? (
            <Loader2 className=" animate-spin" size={20} />
          ) : (
            "Delete"
          )}
        </button>
        <button
          className=" hover:underline underline-offset-2"
          onClick={setClose}
        >
          Cancel
        </button>
      </Box>
    </Modal>
  );
};
export default DeleteModal;

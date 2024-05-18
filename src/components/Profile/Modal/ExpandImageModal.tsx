import Modal from "@/components/Modal/Modal";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

type ExpandImageModalProps = {
  setClose: () => void;
  open: boolean;
  image: string;
};

const ExpandImageModal: React.FC<ExpandImageModalProps> = ({
  image,
  open,
  setClose,
}) => {
  return (
    <Modal open={open} setClose={setClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="bg-zinc-950 border border-zinc-600 rounded-md flex justify-center  md:w-[700px] sm:w-[600px] w-[95%] md:h-[500px] h-[300px] p-4 gap-3 flex-col"
      >
        <div className=" rounded-md flex justify-center items-center  w-full h-full">
          <Image
            src={image}
            alt="profile image"
            height={700}
            width={800}
            className=" w-full h-full object-contain rounded-sm"
          />
        </div>
      </Box>
    </Modal>
  );
};
export default ExpandImageModal;

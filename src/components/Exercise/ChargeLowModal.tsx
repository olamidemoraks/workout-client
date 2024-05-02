import React from "react";
import Modal from "../Modal/Modal";
import Image from "next/image";

type ChargeLowModalProps = {
  open: boolean;
  setClose: () => void;
};

const ChargeLowModal: React.FC<ChargeLowModalProps> = ({ open, setClose }) => {
  return (
    <Modal open={open} setClose={setClose}>
      <div className="h-full w-full flex justify-center items-center">
        <div className="w-[500px] relative ">
          <Image
            src={"/assets/stability-ball.svg"}
            alt="stability-ball"
            fill
            className="h-[400px] w-[500px] object-contain bg-zinc-700"
          />
        </div>
      </div>
    </Modal>
  );
};
export default ChargeLowModal;

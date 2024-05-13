import React, { useState } from "react";
import Modal from "../Modal/Modal";
import { FaMasksTheater, FaX } from "react-icons/fa6";
import { Box, Slider } from "@mui/material";
import StreakApperance from "./StreakApperance";
import { useMutation } from "react-query";
import { updateProfile } from "@/api/user";
import useProfile from "@/hooks/useProfile";

type ChooseStreakApperanceProps = {
  open: boolean;
  setClose: () => void;
};

const ChooseStreakApperance: React.FC<ChooseStreakApperanceProps> = ({
  setClose,
  open,
}) => {
  const [type, setType] = useState(1);
  const [streak, setStreak] = useState(4);

  const { refetch } = useProfile();
  const { mutate, isLoading } = useMutation({
    mutationFn: updateProfile,
    onSettled: () => {
      setClose();
      refetch();
    },
  });
  const handleChange = (event: Event, newValue: number | number[]) => {
    setStreak(newValue as number);
  };
  const handleSaveAndClose = () => {
    mutate({ value: { streakApperanceType: type } });
  };
  return (
    <Modal open={open} setClose={setClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { sm: "fit-content", xs: "100%" },
        }}
      >
        <div className="flex flex-col justify-between bg-zinc-800 border border-zinc-700 rounded-xl w-[97%] sm:w-[500px] min-h-[40vh] p-5">
          <div className="flex justify-between items-center ">
            <div className="flex flex-wrap gap-2 items-center justify-center ">
              <p className=" text-lg text-zinc-300">Streak apperances</p>
              <FaMasksTheater size={20} />{" "}
            </div>
            <FaX size={16} onClick={setClose} className={"cursor-pointer"} />
          </div>

          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-7">
            <div className="space-y-2">
              <p className=" font-semibold text-zinc-200">Type 1</p>
              <div
                onClick={() => setType(1)}
                className={`${
                  type === 1
                    ? "border-4 border-emerald-400"
                    : " border-transparent"
                } border bg-zinc-900 ease-linear duration-100 cursor-pointer rounded-md h-[100px] w-full flex items-center justify-center`}
              >
                <div className=" -translate-x-2">
                  <StreakApperance type={1} streak={streak} />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className=" font-semibold text-zinc-200">Type 2</p>
              <div
                onClick={() => setType(2)}
                className={`${
                  type === 2
                    ? "border-4 border-emerald-400"
                    : " border-transparent"
                } border bg-zinc-900 ease-linear duration-100 cursor-pointer rounded-md h-[100px] w-full flex items-center justify-center`}
              >
                <div className=" -translate-x-2">
                  <StreakApperance type={2} streak={streak} />
                </div>
              </div>
            </div>
          </div>

          <Slider
            max={15}
            size="medium"
            value={streak}
            onChange={handleChange}
            sx={{
              marginTop: "1rem",
            }}
          />
          <button
            onClick={handleSaveAndClose}
            disabled={isLoading}
            className="py-3 mt-7 disabled:opacity-70 w-full font-semibold text-base rounded-md bg-emerald-400 text-black text-center"
          >
            Save & Close
          </button>
        </div>
      </Box>
    </Modal>
  );
};
export default ChooseStreakApperance;

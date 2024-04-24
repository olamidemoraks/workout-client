import React from "react";
import Modal from "../Modal/Modal";
import { Box } from "@mui/material";
import Image from "next/image";
import { focus } from "@/utils/data";
import { BiX } from "react-icons/bi";

type ExerciseInfoProps = {
  open: boolean;
  setClose: () => void;
  exercise: IExercise;
};

const ExerciseInfo: React.FC<ExerciseInfoProps> = ({
  exercise,
  open,
  setClose,
}) => {
  console.log({ exercise });
  return (
    <Modal open={open} setClose={setClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 4,
        }}
        className=" bg-zinc-900 lg:w-[600px] sm:w-[80%] w-[99%] rounded-md   min-h-[200px] flex p-4 py-6 gap-3 flex-col"
      >
        <div className="w-full flex justify-between mb-2">
          <p className="text-xl">Exercise Info</p>
          <BiX
            className=" cursor-pointer text-emerald-500"
            size={27}
            onClick={setClose}
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div className="md:w-fit w-full flex md:justify-start justify-center">
            <Image
              width={200}
              height={300}
              src={exercise?.image.url}
              alt={exercise?.name}
            />
          </div>
          <div className=" flex flex-col gap-2">
            <p className=" text-xl">{exercise?.name}</p>
            <p className=" opacity-75">{exercise?.tips}</p>

            <div className=" flex gap-1 flex-wrap">
              {exercise?.body_part?.split(",")?.map((part, index) => (
                <p
                  className="px-1 bg-zinc-700/60 text-emerald-500 rounded capitalize text-sm "
                  key={index}
                >
                  {part}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3">
          <p className=" text-lg">Focus Point</p>
          <div className="w-full flex mt-2">
            {exercise?.focus?.map((title, index) => (
              <>
                {!!focus.find((value) => value.title === title) ? (
                  <>
                    <Image
                      key={index}
                      width={100}
                      height={200}
                      alt={title}
                      src={`${
                        focus.find((value) => value.title === title)?.imageUrl
                      }`}
                    />
                  </>
                ) : null}
              </>
            ))}
          </div>
        </div>
      </Box>
    </Modal>
  );
};
export default ExerciseInfo;

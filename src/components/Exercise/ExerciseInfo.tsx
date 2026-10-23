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
  const focusImages = (exercise?.focus ?? [])
    .map((title) => focus.find((value) => value.title === title))
    .filter((value): value is (typeof focus)[number] => !!value);

  return (
    <Modal open={open} setClose={setClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: "none",
        }}
        className=" bg-zinc-900 border border-zinc-800 lg:w-[600px] sm:w-[80%] w-[96%] rounded-xl max-h-[87vh] overflow-y-auto flex p-5 py-6 gap-3 flex-col"
      >
        <div className="w-full flex justify-between items-center mb-2">
          <p className="text-xl font-semibold">Exercise Info</p>
          <button
            type="button"
            onClick={setClose}
            aria-label="Close"
            className="rounded-lg p-1 hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <BiX className="text-emerald-500" size={27} />
          </button>
        </div>
        <div className="grid sm:grid-cols-[200px_1fr] grid-cols-1 gap-4">
          {exercise?.image?.url && (
            <div className="md:w-fit w-full flex md:justify-start justify-center">
              <Image
                width={200}
                height={300}
                src={exercise.image.url}
                alt={exercise?.name}
                className="rounded-lg bg-zinc-800"
              />
            </div>
          )}
          <div className=" flex flex-col gap-3">
            <p className=" text-xl font-semibold capitalize">{exercise?.name}</p>
            <div className="flex gap-2 text-sm">
              <span className="rounded-md bg-zinc-800 px-2 py-1 text-zinc-200">
                {exercise?.time_base
                  ? `${exercise?.repetition}s`
                  : `x${exercise?.repetition} reps`}
              </span>
              {exercise?.sets > 1 && (
                <span className="rounded-md bg-zinc-800 px-2 py-1 text-zinc-200">
                  {exercise?.sets} sets
                </span>
              )}
              {exercise?.rest > 0 && (
                <span className="rounded-md bg-zinc-800 px-2 py-1 text-zinc-200">
                  {exercise?.rest}s rest
                </span>
              )}
            </div>
            {exercise?.tips && (
              <p className=" text-zinc-300 leading-relaxed whitespace-pre-line">
                {exercise.tips}
              </p>
            )}

            <div className=" flex gap-1 flex-wrap">
              {exercise?.body_part?.split(",")?.map((part, index) => (
                <p
                  className="px-2 py-0.5 bg-zinc-700/60 text-emerald-500 rounded capitalize text-sm "
                  key={index}
                >
                  {part.trim()}
                </p>
              ))}
            </div>
          </div>
        </div>

        {focusImages.length > 0 && (
          <div className="mt-3">
            <p className=" text-lg font-semibold">Focus Point</p>
            <div className="w-full flex gap-2 mt-2 overflow-x-auto">
              {focusImages.map((item) => (
                <Image
                  key={item.title}
                  width={100}
                  height={200}
                  alt={item.title}
                  title={item.title}
                  src={`${item.imageUrl}`}
                />
              ))}
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
};
export default ExerciseInfo;

import useBatteryCharge from "@/hooks/useBatteryCharge";
import { cn } from "@/libs/utils";
import { difficultyColor, padTo2Digits } from "@/utils/data";
import { AlarmCheck, ArrowLeft, Dot, Play, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ChargeLowModal from "./ChargeLowModal";

type ExercisePreviewProps = {
  workout: IWorkout;
  type?: "default" | "challenge" | "customize";
};

const ExercisePreview: React.FC<ExercisePreviewProps> = ({
  workout,
  type = "default",
}) => {
  const { chargeLeft } = useBatteryCharge();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const goToWorkout = () => {
    if (chargeLeft > 0) {
      router.push(`/exercise/${workout?._id}?type=${type}`);
    } else {
      setOpen(true);
    }
  };
  return (
    <>
      {/* <ChargeLowModal open={open} setClose={() => setOpen(false)} /> */}
      <div className="flex gap-2 flex-col justify-center items-center  w-full mt-4">
        <div className=" flex w-full px-3 justify-between md:flex-row flex-col gap-2">
          <div
            onClick={() => router.back()}
            className="sm:ml-2 ml-3 bg-zinc-900 rounded-lg h-[40px] w-[40px] flex items-center justify-center cursor-pointer hover:bg-emerald-600"
          >
            <ArrowLeft />
          </div>
          <div className=" w-full justify-center items-center flex flex-col">
            <div className="sm:h-[300px] h-[250px] lg:w-[75%] w-full relative rounded-xl flex items-center justify-center">
              <Image
                src={workout?.image?.url}
                alt={workout?.name}
                fill
                className="absolute object-cover rounded-xl"
              />
              {type === "challenge" && (
                <div className="flex md:gap-5 gap-1  flex-col items-center justify-center h-full w-full space-y-2 bg-gradient-to-r  absolute p-6 rounded-xl from-black/60 to-zinc-900/30">
                  <div>
                    <p className="font-bold uppercase md:text-4xl text-3xl text-neutral-100">
                      {workout?.name}
                    </p>
                  </div>
                  <p className=" block text-2xl font-bold uppercase">
                    Day {workout?.day}
                  </p>
                </div>
              )}
              {type === "customize" && (
                <div className="flex md:gap-5 gap-1 md:flex-row flex-col items-center justify-center h-full w-full space-y-2 bg-gradient-to-r  absolute p-6 rounded-xl from-black/60 to-zinc-900/30">
                  <div>
                    <p className="font-bold uppercase md:text-4xl text-3xl text-neutral-100">
                      {workout?.name}
                    </p>
                  </div>
                </div>
              )}
              {type === "default" && (
                <div className="flex md:gap-5 gap-1 md:flex-row flex-col items-center justify-center h-full w-full space-y-2 bg-gradient-to-r  absolute p-6 rounded-xl from-black/60 to-zinc-900/30">
                  <div>
                    <p className="font-bold uppercase md:text-4xl text-3xl text-neutral-100">
                      {workout?.name}
                    </p>
                  </div>
                  <div className="md:h-[70px] md:w-[2px] w-[120px] h-[1px] bg-white/40 backdrop-blur-md rounded-full md:block hidden" />
                  <div className="flex flex-col gap-1 md:items-start items-center">
                    <div className="flex items-center">
                      {Array(3)
                        .fill(0)
                        .map((_, index) => (
                          <Zap
                            key={index}
                            // className={cn(" fill-neutral-600", {
                            //  "": index < workout?.difficult_level,
                            // })}
                            className={`${
                              index < workout?.difficult_level
                                ? "fill-white"
                                : "fill-neutral-600"
                            }`}
                            size={22}
                            color={
                              index < workout?.difficult_level
                                ? "#fff"
                                : "#525252"
                            }
                          />
                        ))}
                    </div>
                    <div className="flex items-center  md:items-start font-semibold mt-1">
                      <div className="flex items-center gap-1 text-neutral-300">
                        <AlarmCheck />
                        {workout?.estimate_time} min
                      </div>
                      <Dot />
                      <p className=" text-base  text-neutral-300">
                        {workout?.exercises?.length} Varient
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:w-[75%] w-full mt-12  mb-12">
              <div className="flex items-center justify-between mb-4">
                <p className=" md:text-2xl text-xl font-semibold">Exercises</p>
                <button
                  onClick={goToWorkout}
                  className="flex items-center gap-1 bg-emerald-600 p-2 px-4 rounded-lg w-fit text-base uppercase"
                >
                  Start <Play className="fill-white" size={17} />
                </button>
              </div>

              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full ">
                {workout?.exercises?.map((exercise, index) => (
                  <div key={exercise?._id} className="flex items-center gap-2">
                    <p className=" italic text-lg font-semibold">
                      #{index + 1}
                    </p>
                    <div className=" w-full flex gap-3 p-2 px-4 rounded-lg h-[80px] bg-gradient-to-r   from-zinc-900/60 to-zinc-900/30">
                      <Image
                        src={exercise?.image?.url}
                        alt={exercise?.name}
                        height={50}
                        width={70}
                        className=" object-cover rounded-md"
                      />
                      <div>
                        <p className=" text-xl ">{exercise?.name}</p>
                        <div className="flex items-center">
                          <p className="">
                            {exercise.time_base
                              ? `${
                                  padTo2Digits(
                                    Math.floor(exercise?.repetition / 60)
                                  ) +
                                  ":" +
                                  padTo2Digits(exercise?.repetition % 60)
                                }`
                              : `x ${exercise?.repetition}`}
                          </p>
                          {exercise?.sets > 1 ? (
                            <>
                              <Dot className=" " color="#737373" />
                              <p className=" text-neutral-300">
                                {" "}
                                {exercise?.sets} sets
                              </p>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ExercisePreview;

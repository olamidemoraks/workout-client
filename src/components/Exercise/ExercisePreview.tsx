import useBatteryCharge from "@/hooks/useBatteryCharge";
import { padTo2Digits } from "@/utils/data";
import { AlarmCheck, ArrowLeft, Dot, Info, Loader2, Play, Zap } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaBolt } from "react-icons/fa";
import ExerciseInfo from "./ExerciseInfo";

type ExercisePreviewProps = {
  workout: IWorkout;
  type?: "default" | "challenge" | "customize";
};

const ExercisePreview: React.FC<ExercisePreviewProps> = ({
  workout,
  type = "default",
}) => {
  const { chargeLeft, isLoading: chargeLoading } = useBatteryCharge();
  const router = useRouter();
  const [infoExercise, setInfoExercise] = useState<IExercise | null>(null);
  const exerciseCount = workout?.exercises?.length ?? 0;
  const canStart = chargeLeft > 0 && exerciseCount > 0;

  const goToWorkout = () => {
    if (canStart) {
      router.push(`/exercise/${workout?._id}?type=${type}`);
    } else {
      return;
    }
  };
  return (
    <>
      {/* <ChargeLowModal open={open} setClose={() => setOpen(false)} /> */}
      {infoExercise && (
        <ExerciseInfo
          exercise={infoExercise}
          open={!!infoExercise}
          setClose={() => setInfoExercise(null)}
        />
      )}
      <div className="flex gap-2 flex-col justify-center items-center  w-full mt-4">
        <div className=" flex w-full px-3 justify-between md:flex-row flex-col gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className=" bg-zinc-900 rounded-lg h-[40px] w-[40px] shrink-0 flex items-center justify-center cursor-pointer hover:bg-emerald-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <ArrowLeft />
          </button>
          <div className=" w-full justify-center items-center flex flex-col">
            <div className="sm:h-[300px] h-[250px] lg:w-[75%] w-full relative rounded-xl flex items-center justify-center overflow-hidden bg-zinc-900">
              <Image
                src={workout?.image?.url}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 75vw, 100vw"
                className="absolute object-cover rounded-xl"
              />
              {type === "challenge" && (
                <div className="flex md:gap-5 gap-1  flex-col items-center justify-center h-full w-full space-y-2 bg-gradient-to-r  absolute p-6 rounded-xl from-black/60 to-zinc-900/30">
                  <p className="font-bold uppercase md:text-4xl text-center text-3xl text-neutral-100">
                    {workout?.name}
                  </p>
                  <p className=" block text-2xl font-bold uppercase text-center">
                    Day {workout?.day}
                  </p>
                  <p className="text-neutral-300 font-semibold">
                    {exerciseCount} {exerciseCount === 1 ? "exercise" : "exercises"}
                  </p>
                </div>
              )}
              {type === "customize" && (
                <div className="flex md:gap-5 gap-1 md:flex-row flex-col items-center justify-center h-full w-full space-y-2 bg-gradient-to-r  absolute p-6 rounded-xl from-black/60 to-zinc-900/30">
                  <div className="text-center">
                    <p className="font-bold uppercase md:text-4xl text-3xl text-neutral-100">
                      {workout?.name}
                    </p>
                    <p className="text-neutral-300 font-semibold mt-1">
                      {exerciseCount} {exerciseCount === 1 ? "exercise" : "exercises"}
                    </p>
                  </div>
                </div>
              )}
              {type === "default" && (
                <div className="flex md:gap-5 gap-1 md:flex-row flex-col items-center justify-center h-full w-full space-y-2 bg-gradient-to-r  absolute p-6 rounded-xl from-black/60 to-zinc-900/30">
                  <div>
                    <p className="font-bold uppercase md:text-4xl text-3xl text-neutral-100 text-center">
                      {workout?.name}
                    </p>
                  </div>
                  <div className="md:h-[70px] md:w-[2px] w-[120px] h-[1px] bg-white/40 backdrop-blur-md rounded-full md:block hidden" />
                  <div className="flex flex-col gap-1 md:items-start items-center">
                    <div
                      className="flex items-center"
                      title={`Difficulty ${workout?.difficult_level} of 3`}
                    >
                      {Array(3)
                        .fill(0)
                        .map((_, index) => (
                          <Zap
                            key={index}
                            aria-hidden
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
                      <span className="sr-only">
                        Difficulty {workout?.difficult_level} of 3
                      </span>
                    </div>
                    <div className="flex items-center  md:items-start font-semibold mt-1">
                      <div className="flex items-center gap-1 text-neutral-300">
                        <AlarmCheck aria-hidden />
                        {workout?.estimate_time} min
                      </div>
                      <Dot aria-hidden />
                      <p className=" text-base  text-neutral-300">
                        {exerciseCount} {exerciseCount === 1 ? "exercise" : "exercises"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:w-[75%] w-full mt-12  mb-12">
              <div className="flex items-center justify-between gap-4 mb-1">
                <p className=" md:text-2xl text-xl font-semibold">Exercises</p>
                <button
                  onClick={goToWorkout}
                  disabled={chargeLoading || !canStart}
                  className="flex disabled:opacity-70 disabled:cursor-not-allowed items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:hover:bg-emerald-600 p-2 px-5 rounded-lg w-fit text-base uppercase font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  {chargeLoading ? (
                    <Loader2 className="animate-spin" size={17} />
                  ) : chargeLeft > 0 ? (
                    <>
                      Start <Play className="fill-white" size={17} />
                    </>
                  ) : (
                    <>
                      Take some rest <FaBolt className="fill-white" size={17} />
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-zinc-400 mb-5">
                {!chargeLoading && chargeLeft <= 0
                  ? "You've used today's workout charges. They refill tomorrow."
                  : "Tap an exercise to see how it's done."}
              </p>

              <ol className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full ">
                {workout?.exercises?.map((exercise, index) => (
                  <li key={exercise?._id ?? index} className="flex items-center gap-2">
                    <p className=" italic text-lg font-semibold w-8 shrink-0 text-zinc-400">
                      #{index + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => setInfoExercise(exercise)}
                      aria-label={`${exercise?.name}: show exercise info`}
                      className="group w-full flex items-center gap-3 p-2 px-3 rounded-lg min-h-[80px] text-left bg-gradient-to-r from-zinc-900/60 to-zinc-900/30 hover:from-zinc-800/70 hover:to-zinc-900/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      <div className="relative h-[56px] w-[72px] shrink-0 overflow-hidden rounded-md bg-zinc-800">
                        <Image
                          src={exercise?.image?.url}
                          alt=""
                          fill
                          sizes="72px"
                          loading="lazy"
                          className=" object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className=" text-lg font-medium leading-tight line-clamp-2">
                          {exercise?.name}
                        </p>
                        <div className="flex items-center mt-1">
                          <p className="text-emerald-400 font-semibold tabular-nums">
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
                              <Dot className=" " color="#737373" aria-hidden />
                              <p className=" text-neutral-300">
                                {exercise?.sets} sets
                              </p>
                            </>
                          ) : null}
                        </div>
                      </div>
                      <Info
                        size={18}
                        aria-hidden
                        className="shrink-0 stroke-zinc-600 group-hover:stroke-zinc-300 transition-colors"
                      />
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ExercisePreview;

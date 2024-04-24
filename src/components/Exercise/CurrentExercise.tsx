"use client";
import { Check, Info, Pause, Play, Plus, RefreshCwIcon } from "lucide-react";
import Image from "next/image";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { cn } from "@/libs/utils";
import moment from "moment";
import ExerciseFinished from "./ExerciseFinished";
import Resting from "./Resting";
import ExerciseInfo from "./ExerciseInfo";

type CurrentExerciseProps = {
  workout: IWorkout;
  workoutType: "default" | "challenge" | "customize";
};

const CurrentExercise: React.FC<CurrentExerciseProps> = ({
  workout,
  workoutType,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isPlayed, setIsPlayed] = useState(true);
  const [restTime, setRestTime] = useState(0);
  const [startTime, setStartTime] = useState(new Date(Date.now()));
  const [endTime, setEndTime] = useState<Date>(new Date(Date.now()));
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [readyCount, setReadyCount] = useState(15);
  const [open, setOpen] = useState(false);
  const [bellAudio] = useState<HTMLAudioElement>(
    new Audio("/audio/mixkit-achievement-bell-600.wav")
  );
  const [whisleAudio] = useState<HTMLAudioElement>(
    new Audio("/audio/mixkit-police-whistle-614.wav")
  );
  const [countDownAudio] = useState<HTMLAudioElement>(
    new Audio("/audio/mixkit-racing-countdown-timer-1051.wav")
  );

  const playBellSound = useCallback(() => {
    bellAudio.volume = 0.6;
    bellAudio.play();
  }, [bellAudio]);
  const playWhisleSound = useCallback(() => {
    whisleAudio.volume = 0.3;
    whisleAudio.play();
  }, [whisleAudio]);
  const playCountDownSound = useCallback(() => {
    countDownAudio.play();
  }, [countDownAudio]);

  const exercises: IExercise[] = workout?.exercises;

  const currentExercise: IExercise | undefined = useMemo(() => {
    return exercises?.find((_, index) => index === currentIndex);
  }, [currentIndex, exercises]);

  const handleNext = useCallback(() => {
    if (currentIndex >= exercises?.length - 1) {
      setEndTime(new Date(Date.now()));
      setWorkoutCompleted(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    playBellSound();
    setIsResting(true);
  }, [currentIndex, exercises?.length, playBellSound]);

  const handlePrevious = () => {
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex((prev) => prev - 1);
    setIsResting(true);
  };

  useEffect(() => {
    setStartTime(new Date(Date.now()));
  }, []);

  useEffect(() => {
    setRestTime(currentExercise?.rest ?? 20);
    if (currentExercise?.time_base) {
      setDuration(currentExercise?.repetition);
    }
  }, [currentExercise]);

  //Rest time counter
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isResting) {
      interval = setInterval(() => {
        if (restTime === 0) {
          playWhisleSound();
        }
        if (restTime < 1) {
          setIsResting(false);
          clearInterval(interval);
        }
        setRestTime((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isResting, playWhisleSound, restTime]);

  // repetition counter
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (currentExercise?.time_base && isPlayed === true) {
      interval = setInterval(() => {
        if (duration === 0) {
          playBellSound();
        }
        if (duration <= 0) {
          handleNext();
          clearInterval(interval);
          return;
        }
        setDuration((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [currentExercise, duration, handleNext, isPlayed, playBellSound]);

  // ready count
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!workoutStarted) {
      interval = setInterval(() => {
        if (readyCount === 2) {
          playCountDownSound();
        }
        if (readyCount <= 0) {
          setWorkoutStarted(true);
          return;
        }
        setReadyCount((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [playCountDownSound, readyCount, workoutStarted]);

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
  }

  if (exercises.length < 1) {
    return <div></div>;
  }
  return (
    <div className="lg:w-[80%]  w-full flex flex-col items-center justify-center gap-10 mb-8">
      {/* {endTime.toTimeString() + " & " + startTime.toTimeString()} */}
      <ExerciseInfo
        exercise={currentExercise!}
        open={open}
        setClose={() => setOpen(false)}
      />
      {!isResting ? (
        <>
          {!workoutCompleted ? (
            <>
              {!workoutStarted ? (
                <>
                  <div className="flex flex-col w-full items-center justify-center gap-7">
                    <div className="relative xl:w-[50%] lg:w-[65%]  h-fit sm:w-full   w-[100vw]">
                      <Image
                        src={currentExercise?.image?.url as string}
                        alt={currentExercise?.name as string}
                        height={200}
                        width={500}
                        className=" object-cover w-full sm:h-full rounded-xl "
                      />
                    </div>
                    <div className=" flex flex-col items-center justify-evenly bg-zinc-900  rounded-xl  p-8 xl:w-[50%] lg:w-[65%] w-full gap-5">
                      <p className=" md:text-2xl sm:text-lg text-base uppercase font-bold flex items-center gap-2">
                        Ready To Go
                      </p>
                      <p className=" md:text-lg text-base uppercase font-semibold flex items-center gap-2">
                        {currentExercise?.name}{" "}
                        <Info color="#656565dd" className=" cursor-pointer" />
                      </p>

                      <div className=" sm:h-[120px] h-[100px] w-[100px] sm:w-[120px] relative flex items-center justify-center ">
                        <div className=" h-full absolute w-full z-10 rounded-full flex items-center justify-center border border-zinc-800 bg-zinc-900">
                          <p className=" md:text-4xl text-3xl  font-bold">
                            {readyCount === 0 ? "Go!" : readyCount}
                          </p>
                        </div>
                        <div
                          className={cn(
                            "sm:h-[75px] sm:w-[75px] h-[70px] w-[70px] bg-gradient-to-r  from-indigo-600 to-blue-600 rounded-full animate-ping",
                            {
                              "from-yellow-600 to-green-600": readyCount < 5,
                            }
                          )}
                        />
                      </div>

                      <button
                        className="px-7 py-2 bg-emerald-600 rounded-md text-base"
                        onClick={() => {
                          playWhisleSound();
                          setWorkoutStarted(true);
                          setReadyCount(0);
                        }}
                      >
                        Start
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col w-[95%] items-center justify-center gap-7">
                    <div className="relative xl:w-[50%] lg:w-[65%] h-fit sm:w-full  w-[100vw] flex items-center justify-center">
                      <Image
                        src={currentExercise?.image?.url as string}
                        alt={currentExercise?.name as string}
                        height={200}
                        width={500}
                        className=" object-cover w-full h-full rounded-xl "
                      />
                      <div className="h-[4px] flex items-center sm:w-full w-[90%] outline outline-zinc-600/70 rounded-full  absolute  -bottom-3 px-1 mt-1">
                        <div
                          style={{
                            width: `${
                              currentIndex * (100 / exercises?.length)
                            }%`,
                          }}
                          className="h-[1px] bg-gradient-to-r  rounded-full relative from-emerald-600 to-emerald-400 "
                        />

                        <div className=" h-full w-full absolute ">
                          <div className=" h-full w-full relative ">
                            <div className="h-full w-[2px] bg-zinc-600/70 absolute left-10" />
                            <div className="h-full w-[2px] bg-zinc-600/70 absolute right-[30%]" />
                            <div className="h-full w-[2px] bg-zinc-600/70 absolute right-10" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" flex flex-col items-center justify-evenly bg-zinc-900  rounded-xl  p-8 xl:w-[50%] lg:w-[65%] w-full gap-5">
                      <p className=" md:text-2xl  text-base uppercase font-bold flex items-center gap-2">
                        {currentExercise?.name}{" "}
                        <Info
                          color="#656565dd"
                          className=" cursor-pointer"
                          onClick={() => setOpen(true)}
                        />
                      </p>
                      <div>
                        {currentExercise?.time_base ? (
                          <div className=" sm:h-[120px] h-[100px] w-[100px] sm:w-[120px] relative flex items-center justify-center ">
                            <div className=" h-full absolute w-full z-10 rounded-full flex items-center justify-center border border-zinc-800 bg-zinc-900">
                              <p className=" md:text-4xl text-3xl  font-bold">
                                {padTo2Digits(Math.floor(duration / 60))}:
                                {padTo2Digits(duration % 60)}
                              </p>
                            </div>
                            <div
                              className={cn(
                                "sm:h-[75px] sm:w-[75px] h-[70px] w-[70px] bg-gradient-to-r  from-indigo-600 to-blue-600 rounded-full",
                                {
                                  "animate-ping": isPlayed,
                                  "from-yellow-600 to-green-600": duration < 5,
                                }
                              )}
                            />
                          </div>
                        ) : (
                          <p className=" md:text-5xl text-3xl  font-bold">
                            x{currentExercise?.repetition}
                          </p>
                        )}
                      </div>

                      {!currentExercise?.time_base ? (
                        <button
                          onClick={handleNext}
                          className="sm:px-10 px-4 py-2 sm:text-lg texl-base bg-emerald-500  rounded-md transition duration-200 flex items-center gap-2"
                        >
                          <Check />
                          Done
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setIsPlayed((prev) => !prev)}
                            className="sm:px-10 px-3 py-2 sm:text-lg texl-base bg-gradient-to-r  from-emerald-700 to-emerald-500  rounded-md transition duration-200 flex items-center gap-2"
                          >
                            {!isPlayed ? (
                              <>
                                <span>Play</span>
                                <Play size={15} />
                              </>
                            ) : (
                              <>
                                Pause
                                <Pause />
                              </>
                            )}
                          </button>
                          {!isPlayed && (
                            <button
                              onClick={() =>
                                setDuration(currentExercise.repetition)
                              }
                              className="px-3 py-2 sm:text-lg texl-base bg-zinc-800 hover:bg-zinc-700  rounded-md transition duration-200 flex items-center gap-2"
                            >
                              <RefreshCwIcon color="#06b07a" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="w-full xl:w-[50%] lg:w-[65%]">
                      <div className="  w-full flex lg:items-start justify-between">
                        <button
                          onClick={handlePrevious}
                          className={cn(
                            " py-2 text-base bg-gradient-to-r  rounded-md  transition duration-200 flex sm:flex-row flex-col items-center gap-2 group",
                            { "scale-0": currentIndex === 0 }
                          )}
                        >
                          <div className="h-[40px] w-[60px] relative ">
                            <Image
                              src={
                                exercises?.[currentIndex - 1]?.image?.url ?? ""
                              }
                              alt="previous"
                              fill
                              className=" object-cover rounded-lg absolute group-hover:opacity-100 opacity-70"
                            />
                          </div>
                          Previous
                        </button>
                        <button
                          onClick={handleNext}
                          className={cn(
                            " py-2 text-base bg-gradient-to-r  rounded-md  transition duration-200 flex sm:flex-row flex-col-reverse items-center gap-2 group"
                            // {
                            //   "scale-0": currentIndex === exercises?.length - 1,
                            // }
                          )}
                        >
                          {currentIndex === exercises?.length - 1
                            ? "End"
                            : "Skip"}
                          <div className="h-[40px] w-[60px] relative">
                            <Image
                              src={
                                exercises?.[currentIndex + 1]?.image?.url ??
                                "/assets/gears.jpg"
                              }
                              alt="previous"
                              fill
                              quality={50}
                              className=" object-cover rounded-lg absolute group-hover:opacity-100 opacity-70"
                            />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <ExerciseFinished
                startTime={startTime}
                endTime={endTime}
                exerciseLength={exercises?.length}
                workoutName={workout?.name}
                workoutId={workout?._id}
                workoutType={workoutType}
              />
            </>
          )}
        </>
      ) : (
        <>
          <Resting
            currentExercise={currentExercise}
            currentIndex={currentIndex}
            exerciseLength={exercises?.length}
            padTo2Digits={padTo2Digits}
            restTime={restTime}
            setIsResting={setIsResting}
            setRestTime={setRestTime}
            playWhisleSound={playWhisleSound}
          />
        </>
      )}
    </div>
  );
};
export default CurrentExercise;

const CircularProgress = ({ value }: { value: number }) => {
  return <CircularProgressbar value={value} maxValue={1} text={`${value}s`} />;
};

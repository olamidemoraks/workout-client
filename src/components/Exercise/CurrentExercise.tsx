"use client";
import {
  Info,
  Pause,
  Play,
  RefreshCwIcon,
  Volume2,
  VolumeX,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { cn } from "@/libs/utils";
import ExerciseFinished from "./ExerciseFinished";
import Resting from "./Resting";
import ExerciseInfo from "./ExerciseInfo";

type CurrentExerciseProps = {
  workout: IWorkout;
  workoutType: "default" | "challenge" | "customize";
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900";

const SOUND_MUTED_KEY = "workoutSoundMuted";

// Browsers reject play() until the user has interacted with the page; a
// missed sound shouldn't surface as an unhandled promise rejection.
const playAudio = (audio: HTMLAudioElement, volume?: number) => {
  if (volume !== undefined) audio.volume = volume;
  audio.currentTime = 0;
  audio.play().catch(() => {});
};

const CurrentExercise: React.FC<CurrentExerciseProps> = ({
  workout,
  workoutType,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
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
  // Lazy initialisers so the Audio objects are created once, not every render.
  const [bellAudio] = useState(
    () => new Audio("/audio/mixkit-achievement-bell-600.wav")
  );
  const [whisleAudio] = useState(
    () => new Audio("/audio/mixkit-police-whistle-614.wav")
  );
  const [countDownAudio] = useState(
    () => new Audio("/audio/mixkit-racing-countdown-timer-1051.wav")
  );
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem(SOUND_MUTED_KEY) === "true";
    } catch {
      return false;
    }
  });

  // Mute the elements themselves rather than skipping play(), so toggling
  // doesn't recreate the play callbacks and restart the running timers.
  useEffect(() => {
    [bellAudio, whisleAudio, countDownAudio].forEach((audio) => {
      audio.muted = isMuted;
    });
    try {
      localStorage.setItem(SOUND_MUTED_KEY, String(isMuted));
    } catch {}
  }, [isMuted, bellAudio, whisleAudio, countDownAudio]);

  const playBellSound = useCallback(() => {
    playAudio(bellAudio, 0.6);
  }, [bellAudio]);
  const playWhisleSound = useCallback(() => {
    playAudio(whisleAudio, 0.3);
  }, [whisleAudio]);
  const playCountDownSound = useCallback(() => {
    playAudio(countDownAudio);
  }, [countDownAudio]);

  const exercises: IExercise[] = workout?.exercises;

  // Progress is saved per workout (and per challenge day) so resuming one
  // workout never drops you into the middle of another.
  const progressKey = `currentExercise:${workoutType}:${workout?._id}:${
    workout?.day ?? ""
  }`;

  const saveCurrentExerciseToLocalStorage = (current: number) => {
    try {
      localStorage.setItem(progressKey, String(current));
    } catch {}
  };

  const clearSavedProgress = useCallback(() => {
    try {
      localStorage.removeItem(progressKey);
    } catch {}
  }, [progressKey]);

  const currentExercise: IExercise | undefined = useMemo(() => {
    return exercises?.find((_, index) => index === currentIndex);
  }, [currentIndex, exercises]);

  const handleNext = useCallback(() => {
    if (currentIndex >= exercises?.length - 1) {
      setEndTime(new Date(Date.now()));
      setWorkoutCompleted(true);
      clearSavedProgress();
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    saveCurrentExerciseToLocalStorage(currentIndex + 1);
    playBellSound();
    setIsResting(true);
  }, [currentIndex, exercises?.length, playBellSound, clearSavedProgress]);

  const handlePrevious = () => {
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex((prev) => prev - 1);
    saveCurrentExerciseToLocalStorage(currentIndex - 1);
    setIsResting(true);
  };

  useEffect(() => {
    if (!exercises?.length) return;
    let saved = 0;
    try {
      saved = Number(localStorage.getItem(progressKey)) || 0;
      // Older versions saved one shared index for every workout.
      localStorage.removeItem("currentExercise");
    } catch {}
    setCurrentIndex(Math.min(Math.max(saved, 0), exercises.length - 1));
  }, [progressKey, exercises?.length]);

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
          return;
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

    if (currentExercise?.time_base && isPlayed === true && workoutStarted && !isResting) {
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
  }, [currentExercise, duration, handleNext, isPlayed, playBellSound, workoutStarted, isResting]);

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

  if (!exercises?.length) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-2 py-20 text-center">
        <p className="text-lg font-semibold">This workout has no exercises</p>
        <p className="text-zinc-400">Go back and pick another workout.</p>
      </div>
    );
  }

  const infoButton = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`How to do ${currentExercise?.name}`}
      title="Exercise info"
      className={cn("rounded-full p-0.5 hover:bg-zinc-800 transition-colors", focusRing)}
    >
      <Info color="#656565dd" />
    </button>
  );

  return (
    <div className="lg:w-[80%]  w-full flex flex-col items-center justify-center gap-10 mb-8">
      {/* {endTime.toTimeString() + " & " + startTime.toTimeString()} */}
      {currentExercise && (
        <ExerciseInfo
          exercise={currentExercise}
          open={open}
          setClose={() => setOpen(false)}
        />
      )}
      {!workoutCompleted && (
        <div
          className={cn(
            "w-full flex justify-end",
            isResting
              ? "md:px-8 px-3 md:-mb-14 -mb-9"
              : "xl:w-[50%] lg:w-[65%] -mb-6"
          )}
        >
          <button
            type="button"
            onClick={() => setIsMuted((prev) => !prev)}
            aria-pressed={isMuted}
            aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
            title={isMuted ? "Unmute sounds" : "Mute sounds"}
            className={cn(
              "bg-zinc-900 rounded-lg h-[40px] w-[40px] flex items-center justify-center hover:bg-zinc-800 transition-colors",
              focusRing
            )}
          >
            {isMuted ? (
              <VolumeX size={20} className="stroke-zinc-400" />
            ) : (
              <Volume2 size={20} className="stroke-emerald-400" />
            )}
          </button>
        </div>
      )}
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
                        priority
                        className=" object-cover w-full sm:h-full rounded-xl bg-zinc-900"
                      />
                    </div>
                    <div className=" flex flex-col items-center justify-evenly bg-zinc-900  rounded-xl  p-8 xl:w-[50%] lg:w-[65%] w-full gap-5">
                      <div className="flex flex-col items-center gap-1">
                        <p className=" md:text-2xl sm:text-lg text-base uppercase font-bold flex items-center gap-2">
                          Ready To Go
                        </p>
                        <p className="text-sm text-zinc-400">
                          Exercise {currentIndex + 1} of {exercises.length}
                        </p>
                      </div>
                      <p className=" md:text-lg text-base uppercase font-semibold flex items-center gap-2 text-center">
                        {currentExercise?.name} {infoButton}
                      </p>

                      <div
                        role="timer"
                        aria-label={`Starting in ${readyCount} seconds`}
                        className=" sm:h-[120px] h-[100px] w-[100px] sm:w-[120px] relative flex items-center justify-center "
                      >
                        <div className=" h-full absolute w-full z-10 rounded-full flex items-center justify-center border border-zinc-800 bg-zinc-900">
                          <p className=" md:text-4xl text-3xl  font-bold tabular-nums">
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
                        className={cn(
                          "px-7 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-md text-base font-semibold transition-colors",
                          focusRing
                        )}
                        onClick={() => {
                          playWhisleSound();
                          setWorkoutStarted(true);
                          setReadyCount(0);
                        }}
                      >
                        Start now
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col w-[95%] items-center justify-center gap-7 ">
                    <div className="relative xl:w-[50%] lg:w-[65%] h-fit sm:w-full  w-[100vw] flex items-center justify-center">
                      <Image
                        src={currentExercise?.image?.url as string}
                        alt={currentExercise?.name as string}
                        height={200}
                        width={500}
                        priority
                        loading="eager"
                        className=" object-cover w-[95%] min-h-[250px] bg-zinc-900 h-full rounded-xl "
                      />
                      <div
                        role="progressbar"
                        aria-label="Workout progress"
                        aria-valuenow={currentIndex}
                        aria-valuemin={0}
                        aria-valuemax={exercises.length}
                        className="h-[4px] flex items-center sm:w-full w-[90%] outline outline-1 outline-zinc-600/70 rounded-full  absolute  -bottom-3 px-1 mt-1"
                      >
                        <div
                          style={{
                            width: `${currentIndex * (100 / exercises?.length)}%`,
                          }}
                          className="h-[1px] bg-gradient-to-r  rounded-full relative from-emerald-600 to-emerald-400 transition-[width] duration-500"
                        />

                        {/* One divider between each exercise */}
                        <div className=" h-full w-full absolute left-0 ">
                          <div className=" h-full w-full relative ">
                            {exercises.length <= 30 &&
                              exercises.slice(1).map((_, index) => (
                                <div
                                  key={index}
                                  className="h-full w-[2px] bg-zinc-600/70 absolute"
                                  style={{
                                    left: `${((index + 1) * 100) / exercises.length}%`,
                                  }}
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" flex flex-col items-center justify-evenly bg-zinc-900  rounded-xl  p-8 xl:w-[50%] lg:w-[65%] w-full sm:gap-5 gap-3">
                      <p className="text-sm text-zinc-400 -mb-2">
                        Exercise {currentIndex + 1} of {exercises.length}
                      </p>
                      <p className=" md:text-2xl  text-base uppercase font-bold flex items-center gap-2 text-center">
                        {currentExercise?.name} {infoButton}
                      </p>
                      <div>
                        {currentExercise?.time_base ? (
                          <div
                            role="timer"
                            aria-label={`${duration} seconds left`}
                            className=" sm:h-[120px] h-[100px] w-[100px] sm:w-[120px] relative flex items-center justify-center "
                          >
                            <div className=" h-full absolute w-full z-10 rounded-full flex items-center justify-center border border-zinc-800 bg-zinc-900">
                              <p className=" md:text-4xl text-3xl  font-bold tabular-nums">
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
                          className={cn(
                            "sm:px-10 px-6 py-2 sm:text-lg text-base font-semibold bg-emerald-500 hover:bg-emerald-400 text-black rounded-md transition duration-200 flex items-center gap-2",
                            focusRing
                          )}
                        >
                          Done
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setIsPlayed((prev) => !prev)}
                            className={cn(
                              "sm:px-10 px-5 py-2 sm:text-lg text-base font-semibold bg-gradient-to-r from-emerald-700 to-emerald-500 hover:to-emerald-400 rounded-md transition duration-200 flex items-center gap-2",
                              focusRing
                            )}
                          >
                            {!isPlayed ? (
                              <>
                                <span>Play</span>
                                <Play size={17} className="fill-white" />
                              </>
                            ) : (
                              <>
                                Pause
                                <Pause size={17} className="fill-white" />
                              </>
                            )}
                          </button>
                          {!isPlayed && (
                            <button
                              onClick={() =>
                                setDuration(currentExercise.repetition)
                              }
                              aria-label="Restart timer"
                              title="Restart timer"
                              className={cn(
                                "px-3 py-2 sm:text-lg text-base bg-zinc-800 hover:bg-zinc-700  rounded-md transition duration-200 flex items-center gap-2",
                                focusRing
                              )}
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
                          disabled={currentIndex === 0}
                          aria-label={`Previous: ${exercises?.[currentIndex - 1]?.name ?? ""}`}
                          className={cn(
                            " py-2 px-2 text-base text-zinc-300 hover:text-white rounded-md transition duration-200 flex sm:flex-row flex-col items-center gap-2 group",
                            focusRing,
                            { invisible: currentIndex === 0 }
                          )}
                        >
                          <div className="h-[40px] w-[60px] relative overflow-hidden rounded-lg bg-zinc-800">
                            {exercises?.[currentIndex - 1]?.image?.url && (
                              <Image
                                src={exercises[currentIndex - 1].image.url}
                                alt=""
                                fill
                                sizes="60px"
                                quality={50}
                                className=" object-cover absolute group-hover:opacity-100 opacity-70 transition-opacity"
                              />
                            )}
                          </div>
                          Previous
                        </button>
                        <button
                          onClick={handleNext}
                          aria-label={
                            currentIndex === exercises?.length - 1
                              ? "End workout"
                              : `Skip to ${exercises?.[currentIndex + 1]?.name ?? "next exercise"}`
                          }
                          className={cn(
                            " py-2 px-2 text-base text-zinc-300 hover:text-white rounded-md transition duration-200 flex sm:flex-row flex-col-reverse items-center gap-2 group",
                            focusRing
                          )}
                        >
                          {currentIndex === exercises?.length - 1
                            ? "End"
                            : "Skip"}
                          <div className="h-[40px] w-[60px] relative overflow-hidden rounded-lg bg-zinc-800">
                            <Image
                              src={
                                exercises?.[currentIndex + 1]?.image?.url ??
                                "/assets/gears.jpg"
                              }
                              alt=""
                              fill
                              sizes="60px"
                              quality={50}
                              className=" object-cover absolute group-hover:opacity-100 opacity-70 transition-opacity"
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
            onShowInfo={() => setOpen(true)}
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

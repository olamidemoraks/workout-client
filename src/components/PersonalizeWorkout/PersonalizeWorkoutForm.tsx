"use client";
import React, { useState } from "react";
import SelectedExerciseList from "./SelectedExerciseList";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Plus,
  PlusCircle,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/libs/utils";
import toast from "react-hot-toast";
import Preview from "./Preview";
import SelectExercise from "./SelectExercise";
import TitleAndImage from "./TitleAndImage";
import { useMutation } from "react-query";
import { createCustomWorkout } from "@/api/custom.workout";

const images = [
  "/assets/Abs3.jpg",
  "/assets/fit.png",
  "/assets/fullfemale.jpg",
  "/assets/male.png",
];
const PersonalizeWorkoutForm = () => {
  const [workouts, setWorkouts] = useState<IExercise[]>([]);
  const [image, setImage] = useState<any>("");
  const [steps, setSteps] = useState(1);
  const [title, setTitle] = useState("");
  const [isLeftSideCollapsed, setIsLeftSideCollapsed] = useState(true);
  const { mutate, isLoading } = useMutation({
    mutationFn: createCustomWorkout,
  });

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        if (fileReader.readyState === 2) {
          setImage(fileReader.result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };
  const handleNext = () => {
    if (steps === 1) {
      if (!title) {
        return toast.error("Workout Title Missing");
      }
      if (!image) {
        return toast.error("Workout Image Missing");
      }
      setSteps(2);
    }
    if (steps === 2) {
      if (workouts.length === 0) {
        return toast.error("Please add exercises to workout");
      }
      if (workouts.some((workout) => workout.repetition <= 0)) {
        const workout = workouts.find((workout) => workout.repetition <= 0);
        return toast.error(
          `Enter ${workout?.name} ${
            workout?.time_base ? "duration" : "repetition"
          }`
        );
      }
      setSteps(3);
    }

    if (steps === 3) {
      submitCustomizedWorkout();
    }
  };
  const handleBack = () => {
    if (steps === 3) {
      setSteps(2);
    }
    if (steps === 2) {
      setSteps(1);
    }
    if (steps === 1) {
      return;
    }
  };

  const removeWorkout = (index: number) => {
    const filterWorkouts = workouts.filter((_, idx) => idx !== index);
    setWorkouts(filterWorkouts);
  };

  const submitCustomizedWorkout = () => {
    const data = {
      image,
      name: title,
      exercises: workouts.map((workout) => ({
        exercise_id: workout.exercise_id,
        repetition: workout.repetition,
        sets: workout.sets,
        time_base: workout.time_base,
        rest: workout.rest,
      })),
    };

    mutate({ data });
  };

  return (
    <form className="w-full flex items-center flex-col min-h-[calc(100vh-200px)] mb-6 ">
      <div className="md:w-[90%] w-full  flex justify-between mb-7">
        <button
          onClick={handleBack}
          type="button"
          className="p-1 px-3 bg-zinc-900 rounded lg:text-lg"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          type="button"
          className="p-1 px-3 bg-emerald-500 rounded lg:text-lg flex items-center gap-2"
        >
          {steps === 3 ? "Save " : "Continue "}{" "}
          {isLoading ? <Loader2 className=" animate-spin" size={15} /> : null}
        </button>
      </div>
      {steps === 1 && (
        <TitleAndImage
          handleSelectImage={handleSelectImage}
          image={image}
          setTitle={setTitle}
          title={title}
        />
      )}
      {steps === 2 && (
        <div className="flex md:grid xl:grid-cols-[1fr,.4fr] lg:grid-cols-[1fr,.5fr] grid-cols-[1fr,.8fr] min-h-[100vh-200px] lg:w-[90%] w-full">
          <div
            className={cn(
              " h-full flex  flex-col gap-3 px-4 relative max-sm:flex-1 w-full items-center",
              {
                "max-md:hidden": isLeftSideCollapsed,
              }
            )}
          >
            <button
              type="button"
              onClick={() => setIsLeftSideCollapsed(true)}
              className=" md:hidden bg-zinc-700/75 cursor-pointer w-fit px-4 py-1 flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 rounded-full backdrop-blur-md"
            >
              Select Exercise <Plus />
            </button>
            <SelectedExerciseList
              setWorkouts={setWorkouts}
              removeWorkout={removeWorkout}
              workouts={workouts}
            />
          </div>
          <div
            className={cn(
              "border-l pl-4 border-zinc-900 h-full relative max-sm:flex-1 w-full flex flex-col ",
              {
                "max-md:hidden": !isLeftSideCollapsed,
              }
            )}
          >
            <div
              onClick={() => setIsLeftSideCollapsed(false)}
              className="md:hidden bg-zinc-700/75 cursor-pointer w-fit px-2 py-1 absolute left-0 rounded-r-full backdrop-blur-md"
            >
              <ChevronRight />

              <div className="relative translate-x-6 -translate-y-8 ">
                <div className="h-5 w-5 rounded-full bg-emerald-500 absolute  flex items-center justify-center">
                  {workouts.length ?? 0}
                </div>
              </div>
            </div>
            <SelectExercise setWorkouts={setWorkouts} />
          </div>
        </div>
      )}

      {steps === 3 && (
        <Preview
          setSteps={() => setSteps(1)}
          image={image}
          title={title}
          removeWorkout={removeWorkout}
          workouts={workouts}
        />
      )}
    </form>
  );
};

export default PersonalizeWorkoutForm;

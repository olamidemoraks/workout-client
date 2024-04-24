"use client";
import React from "react";
import { workoutsPart } from "../Profile/Report/date";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "react-query";
import { getCategory } from "@/api/workout";
import FeatureCategories from "./FeatureCategories";
import { getAllWorkout } from "../../api/workout";
import WorkoutSection from "./WorkoutSection";
import CustomLoader from "../Common/CustomLoader";

const Workouts = () => {
  const { data, isLoading } = useQuery({
    queryFn: getAllWorkout,
    queryKey: "workouts",
    refetchOnReconnect: false,
  });

  const workouts: Array<{ [key: string]: Array<any> }> = data?.workout;

  if (isLoading) {
    return (
      <div className="md:px-10 px-5 mb-10 flex flex-col gap-10">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-x-8 gap-y-8">
          <CustomLoader
            height="h-[200px]"
            weight="max-w-[500px] w-full"
            amount={3}
          />
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-x-8 gap-y-8">
          <CustomLoader
            height="h-[200px]"
            weight="max-w-[500px] w-full"
            amount={3}
          />
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-x-8 gap-y-8">
          <CustomLoader
            height="h-[200px]"
            weight="max-w-[500px] w-full"
            amount={3}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="md:px-10 px-5 mb-10 flex flex-col gap-10">
      <p className=" text-2xl font-semibold uppercase">Workouts</p>
      {workouts?.map((categoryWorkout, idx) => (
        <WorkoutSection
          key={idx}
          header={Object.keys(categoryWorkout)?.[0]}
          workouts={Object.values(categoryWorkout)?.[0]}
        />
      ))}
    </div>
  );
};

export default Workouts;

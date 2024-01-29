"use client";
import React from "react";
import { workoutsPart } from "../Report/date";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "react-query";
import { getCategory } from "@/api/workout";
import FeatureCategories from "./FeatureCategories";

const Workouts = () => {
  const { data, isLoading } = useQuery({
    queryFn: getCategory,
    queryKey: "category",
  });

  const featureCategory = data?.categories?.filter(
    (category: any) => category?.feature === true
  );

  return (
    <div className="px-10 mb-10">
      <p className=" text-2xl font-semibold uppercase mb-5">Workout Category</p>

      <div className="  w-full relative flex overflow-x-scroll pb-4 scrollbar-thumb-transparent scrollbar-thin scrollbar-track-transparent">
        <ul className="flex flex-row  flex-nowrap gap-4 w-full snap-x">
          <FeatureCategories />
        </ul>
      </div>
    </div>
  );
};

export default Workouts;

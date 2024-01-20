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
      <p className=" text-2xl font-semibold uppercase">Workout Category</p>

      <ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8 lg:w-full mt-5">
        <FeatureCategories />
      </ul>
    </div>
  );
};

export default Workouts;

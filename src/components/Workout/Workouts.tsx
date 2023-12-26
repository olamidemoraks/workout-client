"use client";
import React from "react";
import { workoutsPart } from "../Report/date";
import Link from "next/link";
import Image from "next/image";

const Workouts = () => {
  return (
    <div className="px-10 mb-10">
      <p className=" text-2xl font-semibold uppercase">Workout Category</p>

      <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8 lg:w-full mt-5">
        {workoutsPart.map((item) => (
          <li
            key={item.title}
            className="sm:h-[180px] h-[160px]  w-full relative bg-gradient-to-br to-zinc-950 from-zinc-900 rounded-xl cursor-pointer hover:-translate-y-2 ease-linear duration-200"
          >
            <Link href={item.url}>
              <Image
                src={item.imgUrl}
                alt={item.title}
                fill
                className="absolute object-cover rounded-lg"
              />
              <div className="flex items-end h-full w-full bg-zinc-950/70  absolute p-6">
                <div>
                  <p className="font-bold uppercase text-2xl text-neutral-300">
                    {item.title + " "} <br /> Workout
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;

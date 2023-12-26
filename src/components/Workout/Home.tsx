"use client";
import useProfile from "@/hooks/useProfile";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
import HomeChallenge from "../Challenges/HomeChallenge";
import MonthlyCalender from "../Report/MonthlyCalender";
import RecentWorkoutChart from "../Report/RecentWorkoutChart";
import { workoutsPart } from "../Report/date";

const Home = () => {
  return (
    <div className="p-4 px-10 flex flex-col gap-10 w-full overflow-hidden overflow-x-hidden">
      <HomeChallenge />
      <div className="w-full ">
        <div className="flex items-center justify-between w-full">
          <p className=" font-semibold uppercase text-lg mb-5">
            Workout Programs
          </p>
          <Link
            href={"/workouts"}
            className="hover:underline-offset-2 hover:text-emerald-400 hover:underline font-semibold uppercase mb-5 opacity-75"
          >
            See More
          </Link>
        </div>

        <div className="  w-full relative flex overflow-x-scroll pb-4 scrollbar-thumb-transparent scrollbar-thin  scrollbar-track-transparent">
          <ul className="flex flex-row flex-nowrap gap-4 lg:w-full">
            {workoutsPart.map((item) => (
              <li
                key={item.title}
                className="md:h-[180px] sm:h-[160px] h-[130px] lg:w-full md:w-[230px] w-[160px] relative bg-gradient-to-br to-zinc-950 from-zinc-900 rounded-xl cursor-pointer hover:-translate-y-2 ease-linear duration-200"
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
                      <p className="font-bold uppercase md:text-2xl text-xl text-neutral-300">
                        {item.title + " "} <br /> Workout
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className=" w-full flex justify-between">
          <BiCaretLeft className="text-neutral-300 text-lg " />
          <BiCaretRight className="text-neutral-300 text-lg " />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1  w-full lg:gap-5 gap-10 items-center  rounded-md p-3 pb-7">
        <MonthlyCalender isDashboard />
        <RecentWorkoutChart />
      </div>
    </div>
  );
};

export default Home;

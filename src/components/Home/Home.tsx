"use client";
import Link from "next/link";
import React from "react";
import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
import HomeChallenge from "../Challenges/HomeChallenge";
import MonthlyCalender from "../Profile/Report/MonthlyCalender";
import RecentWorkoutChart from "../Profile/Report/RecentWorkoutChart";
import FeatureCategories from "../Workout/FeatureCategories";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import HomeSection from "./HomeSection";
import HomePersonalizeWorkouts from "../PersonalizeWorkout/HomePersonalizeWorkouts";
import DailyAttendance from "./DailyAttendance";
import RecentWorkouts from "../Profile/Report/RecentWorkouts";

const Home = () => {
  return (
    <div className="grid md:grid-cols-[1fr,0.4fr] grid-cols-1">
      <div className="px-4 pb-6 mb-6 border-b border-zinc-800 md:hidden block">
        <DailyAttendance />
      </div>
      <div className=" md:border-r border-zinc-800 flex flex-col gap-10 w-full overflow-hidden overflow-x-hidden">
        <HomeSection
          title="X Days Challenge"
          seeMoreLink="/challenge"
          customStyle="px-4 md:px-10"
        >
          <HomeChallenge />
        </HomeSection>

        <HomeSection
          title="Focus Areas"
          seeMoreLink="/workouts"
          customStyle="pl-4 md:pl-10"
        >
          <div className="  w-full relative flex overflow-x-scroll   scrollbar-thumb-transparent scrollbar-thin scrollbar-track-transparent">
            <ul className="flex flex-row  flex-nowrap gap-4 w-full snap-x">
              <FeatureCategories />
            </ul>
          </div>
        </HomeSection>

        <HomeSection
          title="Personalize Workouts"
          seeMoreLink=""
          customStyle="pl-4 md:pl-10"
        >
          <div className="  w-full relative flex overflow-x-scroll   scrollbar-thumb-transparent scrollbar-thin scrollbar-track-transparent">
            <ul className="flex flex-row  flex-nowrap gap-4 w-full snap-x">
              <HomePersonalizeWorkouts />
            </ul>
          </div>
        </HomeSection>

        <div className="px-4 mb-10 md:hidden ">
          <RecentWorkouts />
        </div>
      </div>

      <div className="md:block hidden">
        <div className="pb-4 md:px-7 border-b border-zinc-800">
          <DailyAttendance />
        </div>
        <div className="py-4 md:px-7">
          <RecentWorkouts />
        </div>
      </div>
    </div>
  );
};

export default Home;

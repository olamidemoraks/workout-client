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

const Home = () => {
  return (
    <div className="p-4 md:px-10 flex flex-col gap-10 w-full overflow-hidden overflow-x-hidden">
      <DailyAttendance />
      <HomeSection title="X Days Challenge" seeMoreLink="/challenge">
        <HomeChallenge />
      </HomeSection>

      <HomeSection title="Focus Areas" seeMoreLink="/workouts">
        <div className="  w-full relative flex overflow-x-scroll pb-4 scrollbar-thumb-transparent scrollbar-thin scrollbar-track-transparent">
          <ul className="flex flex-row  flex-nowrap gap-4 w-full snap-x">
            <FeatureCategories />
          </ul>
        </div>
      </HomeSection>

      <HomeSection title="Personalize Workouts" seeMoreLink="">
        <HomePersonalizeWorkouts />
      </HomeSection>
    </div>
  );
};

export default Home;

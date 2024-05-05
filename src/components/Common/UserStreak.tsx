import { cn } from "@/libs/utils";
import Image from "next/image";
import Battery from "./Battery";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { FaFireFlameCurved } from "react-icons/fa6";
import StreakMenu from "./StreakMenu";
import StreakApperance from "./StreakApperance";
import useProfile from "@/hooks/useProfile";
import CustomLoader from "./CustomLoader";

interface IUserStreak {
  streak: number;
  isLoading?: boolean;
  longestStreak: number;
  totalWorkout: number;
}

const UserStreak = ({
  streak,
  longestStreak,
  isLoading,
  totalWorkout,
}: IUserStreak) => {
  const { profile } = useProfile();
  // const [reset, setReset] = useState(false);
  // const scope = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const timeline = gsap.timeline({
  //     paused: true,
  //     defaults: {
  //       ease: "bounce.in",
  //     },
  //   });
  //   timeline.to(".streak-box", {
  //     opacity: 1,
  //     duration: 1,
  //     stagger: 0.5,
  //     ease: "bounce.out",
  //   });

  //   if (!reset) {
  //     timeline.play();
  //   }
  // }, [reset]);
  return (
    <StreakMenu
      streak={streak}
      longestStreak={longestStreak}
      totalWorkout={totalWorkout}
    >
      {isLoading ? (
        <CustomLoader amount={1} height="h-10" weight="w-[120px]" />
      ) : (
        <StreakApperance
          type={profile?.streakApperanceType ?? 0}
          streak={streak}
        />
      )}
    </StreakMenu>
  );
};

export default UserStreak;

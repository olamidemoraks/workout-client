import useRecentWorkout from "@/hooks/useRecentWorkout";
import { BiSolidZap } from "react-icons/bi";
import gsap from "gsap";
import React, { useMemo, useEffect, useState } from "react";
const Battery = () => {
  const { data, isLoading } = useRecentWorkout();
  const chargeLeft: number = useMemo(() => {
    const todayDate = new Date();
    const charge = 4;
    const allActivityForToday: any[] = data?.activities?.filter(
      (activity: any) => {
        const activityDate = new Date(activity?.createdAt);
        if (
          activityDate.toLocaleDateString() === todayDate.toLocaleDateString()
        ) {
          return activity;
        }
      }
    );
    let remainingCharge = charge - (allActivityForToday?.length ?? 4);

    return remainingCharge;
  }, [data]);

  const chargeColor: { [key: number]: string } = {
    1: "bg-red-700/60",
    2: "bg-orange-700/60",
    3: "bg-blue-700/60",
    4: "bg-blue-700/80",
    0: "",
  };

  const [reset, setReset] = useState(false);

  useEffect(() => {
    const timeline = gsap.timeline({
      paused: true,
      defaults: {
        ease: "bounce.in",
      },
    });
    timeline.to(".cell-box", {
      y: 4,
      opacity: 1,
      duration: 1,
      stagger: 0.5,
      delay: -2,
      ease: "bounce.out",
    });

    if (!reset) {
      timeline.play();
    }
  }, [reset]);

  return (
    <div className="rounded-full w-fit h-fit  bg-zinc-900 items-center  flex flex-row gap-[2px]  p-[3px]">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div
            className={` opacity-0 -translate-y-1 cell-box w-2 rounded-full h-2 ${
              chargeLeft > i ? `${chargeColor[chargeLeft]}` : " bg-transparent"
            } `}
            key={i}
          />
        ))}
      <BiSolidZap className="ml-1" size={15} />
    </div>
  );
};
export default Battery;

import CustomLoader from "@/components/Common/CustomLoader";
import Empty from "@/components/Common/Empty";
import useRecentWorkout from "@/hooks/useRecentWorkout";
import { alphabetsColor } from "@/utils/data";
import Image from "next/image";
import { useMemo } from "react";
import { FaStopwatch } from "react-icons/fa";

const RecentWorkouts = () => {
  const { data, isLoading } = useRecentWorkout();
  const recentWorkoutActivities: any[] = useMemo(() => {
    return data?.activities?.slice(0, 5);
  }, [data]);

  const icons: { [key: string]: string } = {
    abs: "/assets/icons/abs.png",
    arm: "/assets/icons/arm.png",
    back: "/assets/icons/back.webp",
    chest: "/assets/icons/chest.png",
    legs: "/assets/icons/leg.png",
    challenge: "/assets/icons/challenge.webp",
    custom: "/assets/icons/calender.png",
  };

  if (isLoading) {
    return <CustomLoader amount={5} height="h-[60px]" weight="w-full" />;
  }

  return (
    <div className=" flex flex-col gap-4  w-full">
      <p className=" uppercase font-semibold">Recent activity</p>

      {(recentWorkoutActivities?.length === 0 || !data?.activities) && (
        <Empty />
      )}
      {recentWorkoutActivities?.length > 0 && (
        <>
          {recentWorkoutActivities?.map((activity) => (
            <div
              key={activity}
              className={
                "relative flex items-center justify-between w-full bg-zinc-900 p-3 px-4 rounded   "
              }
            >
              <div
                className={`block sm:hidden absolute left-0 h-full w-[6px] ${
                  alphabetsColor[
                    (activity?.workoutType as string)
                      ?.toUpperCase()
                      .substring(0, 1)
                  ]
                }`}
              />
              <div>
                <p className=" font-semibold capitalize flex items-center">
                  {activity?.workoutName}
                </p>
                <div className="flex items-center text-sm text-neutral-400">
                  <p className="text-neutral-400">
                    {new Date(activity?.createdAt).toLocaleString("default", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                </div>
                <p className="text-neutral-400 text-sm gap-1 flex items-center">
                  <FaStopwatch className=" fill-zinc-400" />
                  {(activity?.totalTime / 60).toFixed(0) +
                    ":" +
                    (activity?.totalTime % 60)}{" "}
                  min
                </p>
              </div>
              {/* <div className="lg:block md:hidden sm:block hidden">
                <p
                  className={` capitalize text-neutral-300 px-2 rounded-xl text-sm ${
                    alphabetsColor[
                      (activity?.workoutType as string)
                        ?.toUpperCase()
                        .substring(0, 1)
                    ]
                  }`}
                >
                  {activity?.workoutType}
                </p>
              </div> */}

              <div className="h-[40px] rounded min-w-[40px] bg-white/75 flex items-center justify-center relative">
                <Image
                  src={
                    icons[
                      activity?.workoutType === "default"
                        ? `${(activity?.workoutName as string)
                            .split(" ")?.[0]
                            .toLowerCase()}`
                        : activity?.workoutType === "challenge"
                        ? "challenge"
                        : "custom"
                    ]
                  }
                  alt=""
                  fill
                  className=" absolute w-full h-full"
                />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default RecentWorkouts;

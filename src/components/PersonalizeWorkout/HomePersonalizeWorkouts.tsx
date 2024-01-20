import { getUserCustomWorkouts } from "@/api/custom.workout";
import useProfile from "@/hooks/useProfile";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";

const HomePersonalizeWorkouts = () => {
  const { profile } = useProfile();
  const { data, isLoading } = useQuery({
    queryFn: async () => await getUserCustomWorkouts({ userId: profile?._id }),
    enabled: !!profile?._id,
  });

  const workouts: ICustomWorkout[] = data?.workouts;
  return (
    <div className="flex gap-4 ">
      {/* <Link
        href={"/workouts/create"}
        className="min-w-[250px] group hover:border-4 transition duration-200 h-[160px] relative border hover:border-purple-700 border-zinc-900 rounded-lg flex items-center justify-center"
      >
        <div className=" uppercase leading-7 tracking-wider z-10 p-4 text-center w-fit">
          <p className="font-bold  text-xl">Customize</p>
          <div className="w-full flex">
            <div className="w-[70%] rounded h-[4px] bg-emerald-500/80" />
            <div className="w-[20%] rounded h-[4px] bg-emerald-500/80 ml-[.21rem]" />
            <div className="w-[10%] rounded h-[4px] bg-emerald-500/80 ml-1" />
          </div>
          <p className="font-bold text-xl">Workouts</p>
        </div>
        <Image
          src="/assets/customize.jpg"
          alt="stripe"
          width={2000}
          height={1335}
          className="h-full w-[100%] absolute object-cover rounded-md opacity-70"
        />
        <div className="w-[50%] h-full flex gap-3 -skew-x-12 absolute right-5">
          <div className="z-10 bg-emerald-500/25 backdrop-blur-sm opacity-30 h-full w-[100px]   "></div>
          <div className="z-10 bg-blue-500/25 backdrop-blur-sm opacity-30 h-full w-[100px]  "></div>
          <div className="z-10 bg-purple-500/25 backdrop-blur-sm opacity-30 h-full w-[100px] mr-2"></div>
        </div>
        <ArrowRight className="right-5  bottom-5 absolute group-hover:translate-y-0 translate-y-6 opacity-0 group-hover:opacity-100 transition duration-300 delay-75  " />
      </Link> */}
      <div className="flex overflow-x-auto w-full gap-4 scrollbar-thumb-zinc-900 scrollbar-thin scrollbar-track-transparent pb-4 relative snap-x">
        {workouts?.map((workout) => (
          <Link
            href={`/workout/${workout?._id}`}
            className=" cursor-pointer snap-start min-w-[300px] h-[160px] relative p-3 flex items-center justify-center border hover:border-purple-700 border-zinc-900 rounded-lg hover:border-4 transition duration-200"
            key={workout?._id}
          >
            <Image
              src={`${workout?.image?.url}`}
              alt={workout?.name}
              fill
              className="h-full w-[100%] absolute object-cover rounded-md opacity-70"
            />
            <div className="absolute top-3 right-3 flex gap-2 items-center">
              <small className="font-semibold">Owner</small>
              <div className="relative h-[30px] w-[30px] ">
                <Image
                  src={`${profile?.avatar?.url}`}
                  fill
                  className="h-full w-full absolute  rounded-full ring-2 ring-emerald-400"
                  alt="profile image"
                />
              </div>
            </div>
            <p className="font-bold text-xl absolute uppercase w-[50%] text-center">
              {workout?.name}
            </p>
          </Link>
        ))}

        <Link
          href={"/workouts/create"}
          className="snap-start min-w-[300px] h-[160px] bg-zinc-900/30 hover:bg-zinc-900  rounded-md flex items-center flex-col justify-center"
        >
          <Plus />
          <p>New Workout</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePersonalizeWorkouts;

import { cn } from "@/libs/utils";
import { Zap } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";

interface IUserStreak {
  streak: number;
  isProfile?: boolean;
  initials?: string;
}
const UserStreak = ({ streak, initials, isProfile }: IUserStreak) => {
  return (
    <div className="flex items-end gap-1 flex-row z-10 group cursor-pointer relative ">
      <div className="h-[50px] w-[50px] rounded-full  animate-pulse  p-1 flex items-center justify-center z-20">
        <div
          className={cn(
            " rounded-full h-full w-full  flex items-center justify-center relative"
          )}
        >
          {streak <= 5 ? (
            <Image
              src="/assets/streak3.gif"
              height={150}
              width={150}
              className="w-full h-full object-cover absolute"
              alt="spark1"
            />
          ) : streak < 8 ? (
            <Image
              src="/assets/spark1.gif"
              height={150}
              width={150}
              className="w-full h-full object-cover absolute"
              alt="spark1"
            />
          ) : (
            <Image
              src="/assets/spark2.gif"
              height={150}
              width={150}
              className="w-full h-full object-cover absolute"
              alt="spark1"
            />
          )}
        </div>
      </div>
      <div>
        <div
          className={cn(
            "bg-gradient-to-r transition-colors duration-300 group-hover:from-blue-700 group-hover:to-cyan-700 text-[9px] text-white w-fit p-[2px] px-1 rounded-t-sm -skew-x-12 font-semibold uppercase tracking-wider",
            {
              "group-hover:from-red-700 group-hover:to-amber-700 text-[9px]":
                streak >= 8,
              "group-hover:from-orange-900 group-hover:to-orange-800 text-[12px]":
                streak >= 6 && streak < 8,
            }
          )}
        >
          strik <span className=" font-black text-[13px]">{streak}</span>
        </div>
        <div
          className={cn(
            " relative h-[22px] min-w-[60px] transition-colors duration-300 bg-gradient-to-r group-hover:from-blue-700 group-hover:to-cyan-700 -skew-x-[16deg] mb-1 -ml-2  z-10  pl-1 p-[2px] pr-1 rounded-sm ",
            {
              "group-hover:from-red-700 group-hover:to-amber-700 text-[9px]":
                streak >= 8,
              "group-hover:from-orange-900 group-hover:to-orange-800 text-[9px]":
                streak >= 6 && streak < 8,
            }
          )}
        >
          <div className="h-full w-full flex rounded-sm gap-1 bg-zinc-950 pl-1 p-[4px]">
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <div
                  className={cn("md:w-[6px] w-[3px] h-full bg-zinc-700/25", {
                    "bg-red-600": index < streak && streak >= 8 && index < 6,
                    "bg-red-500": index < streak && streak >= 8 && index >= 6,
                    "bg-orange-800":
                      index < streak && streak >= 6 && streak < 8 && index < 4,
                    "bg-orange-700":
                      index < streak && streak >= 6 && streak < 8 && index >= 4,
                    "bg-blue-700": index < streak && streak <= 5 && index < 3,
                    "bg-blue-500": index < streak && streak <= 5 && index >= 3,
                  })}
                  key={index}
                />
              ))}
          </div>
        </div>
      </div>
      <div
        className={cn("h-[50px] w-[50px] absolute -right-3   opacity-0", {
          " opacity-100": streak >= 10,
        })}
      >
        <Image
          src="/assets/spark1.gif"
          height={150}
          width={150}
          className="w-full h-full object-cover absolute"
          alt="spark1"
        />
      </div>
    </div>
  );
};

export default UserStreak;

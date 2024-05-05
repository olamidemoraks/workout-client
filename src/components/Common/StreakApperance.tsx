import { cn } from "@/libs/utils";
import Image from "next/image";
import React from "react";
import { FaFireFlameCurved } from "react-icons/fa6";

type StreakApperanceProps = {
  type: number;
  streak: number;
};

const StreakApperance: React.FC<StreakApperanceProps> = ({ type, streak }) => {
  switch (type) {
    case 1:
      return (
        <div className="flex items-center gap-1 flex-row z-10 group cursor-pointer relative ">
          <div className="h-[40px] w-[40px] rounded-full  animate-pulse  p-1 flex items-center justify-center z-20">
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
                "transition-colors duration-300 from-blue-700 to-cyan-700 text-[9px] text-white w-fit p-[2px] px-1 rounded-t-sm -skew-x-12 font-semibold uppercase tracking-wider",
                {
                  "from-red-700 to-amber-700 text-[9px]": streak >= 8,
                  "from-orange-900 to-orange-800 text-[12px]":
                    streak >= 6 && streak < 8,
                }
              )}
            >
              strik <span className=" font-black text-[13px]">{streak}</span>
            </div>

            <div
              className={cn(
                " relative h-[22px] min-w-[60px] transition-colors duration-300 bg-gradient-to-r from-blue-700 to-cyan-700 -skew-x-[16deg] -ml-2  z-10  pl-1 p-[2px] pr-1 rounded-sm ",
                {
                  "from-red-700 to-amber-700 text-[9px]": streak >= 8,
                  "from-orange-900 to-orange-800 text-[9px]":
                    streak >= 6 && streak < 8,
                }
              )}
            >
              <div className="h-full w-full flex rounded-sm gap-1 bg-zinc-950 pl-1 p-[4px]">
                {Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      className={cn(
                        "  md:w-[6px] w-[5px] h-full bg-zinc-700/25",
                        {
                          "bg-red-600":
                            index < streak && streak >= 8 && index < 6,
                          "bg-red-500":
                            index < streak && streak >= 8 && index >= 6,
                          "bg-orange-800":
                            index < streak &&
                            streak >= 6 &&
                            streak < 8 &&
                            index < 4,
                          "bg-orange-700":
                            index < streak &&
                            streak >= 6 &&
                            streak < 8 &&
                            index >= 4,
                          "bg-blue-700":
                            index < streak && streak <= 5 && index < 3,
                          "bg-blue-500":
                            index < streak && streak <= 5 && index >= 3,
                        }
                      )}
                      key={index}
                    />
                  ))}
              </div>
            </div>

            <div
              className={cn(
                "h-fit w-[50%] items-center flex gap-1 text-[9px]p-[2px] -ml-2 px-1 rounded-full",
                {
                  "from-red-700 to-amber-700 text-[9px]": streak >= 8,
                  "from-orange-900 to-orange-800 text-[12px]":
                    streak >= 6 && streak < 8,
                }
              )}
            ></div>
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
      break;
    case 2:
      return (
        <div className="flex gap-1 items-start cursor-pointer">
          <div
            className={cn(
              " rounded-full h-[35px] w-[35px]  flex items-center justify-center relative"
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
          <div className="h-10 bg-zinc-800/80 rounded-lg flex items-center justify-center gap-2 px-3">
            <p className="font-semibold text-base">{streak}</p>
            {streak < 1 ? (
              <div className=" border border-dashed border-rose-500 h-6 w-6 rounded-full" />
            ) : (
              <FaFireFlameCurved className=" fill-rose-500" size={20} />
            )}
          </div>
        </div>
      );
      break;

    default:
      return;
      break;
  }
  return <div>Have a good coding</div>;
};
export default StreakApperance;

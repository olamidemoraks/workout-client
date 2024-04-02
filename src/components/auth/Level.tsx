import { cn } from "@/libs/utils";
import { Zap, Flame, Loader2, Diamond } from "lucide-react";
import React, { useState } from "react";

type LevelProps = {
  handleUpdate: (value: any) => void;
  isLoading: boolean;
};

const levels = [
  { name: "Beginner", value: 1 },
  { name: "Intermediate", value: 2 },
  { name: "Advance", value: 3 },
];
const Level: React.FC<LevelProps> = ({ handleUpdate, isLoading }) => {
  const [level, setLevel] = useState<number>();
  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-200px)] w-full">
      <div>
        <h2 className=" text-2xl uppercase text-center font-semibold">
          How hard can you go?
        </h2>
        <p className=" text-center text-neutral-300">
          Choose a difficult level{" "}
        </p>
      </div>
      <div className="grid sm:grid-cols-3 grid-cols-1  gap-x-4 gap-y-6">
        {levels.map(({ name, value }) => (
          <div
            onClick={() => setLevel(value)}
            key={value}
            className={cn(
              " bg-zinc-900 hover:bg-zinc-800 cursor-pointer w-[160px] h-[160px] rounded-xl flex flex-col items-center justify-center gap-4",
              {
                "ring-4 ring-primary  ": value === level && level !== 4,
                "ring-4 ring-indigo-600  ": value === level && level === 4,
              }
            )}
          >
            <p className="text-xl capitalize font-bold">{name}</p>

            <div className="flex gap-1 ">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <>
                    {value !== 4 ? (
                      <div
                        className="relative flex items-center justify-center p-[1px]"
                        key={index}
                      >
                        <div
                          className={cn(
                            "absolute bg-white/10 h-full w-full rounded-full animate-pulse"
                          )}
                        />
                        <Diamond
                          className={cn("p-1 fill-white/10", {
                            "fill-red-600 ": index < value,
                          })}
                          size={30}
                          color={index < value ? "#e75353" : "gray"}
                        />
                      </div>
                    ) : (
                      <>
                        {" "}
                        <div
                          className="relative flex items-center justify-center p-[1px]"
                          key={index}
                        >
                          <div
                            className={cn(
                              "absolute bg-white/10 h-full w-full rounded-full animate-pulse",
                              {
                                hidden: value - 1 < index,
                              }
                            )}
                          />
                          <Zap
                            className={cn("p-1 fill-white/10", {
                              "fill-indigo-600 ": index < value,
                            })}
                            size={30}
                            color={index < value ? "#5853e7" : "gray"}
                          />
                        </div>
                      </>
                    )}
                  </>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className=" text-center space-y-4 w-full flex-col items-center flex">
        <button
          type="button"
          onClick={() => handleUpdate({ level, steps: "weight" })}
          className=" flex items-center justify-center px-8 disabled:bg-neutral-600 disabled:cursor-not-allowed bg-neutral-200 hover:bg-white cursor-pointer text-black  rounded-full py-3 w-[200px] sm:min-w-[350px] text-lg font-medium gap-2 "
        >
          {isLoading ? (
            <span className="text-black">
              Next{" "}
              <Loader2
                className=" animate-spin ml-2 inline-block "
                color="black"
              />
            </span>
          ) : (
            "Next"
          )}
        </button>
      </div>
    </div>
  );
};
export default Level;

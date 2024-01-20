import { cn } from "@/libs/utils";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

type WeightProps = {
  handleUpdate: (value: any) => void;
  isLoading: boolean;
};

const Weight: React.FC<WeightProps> = ({ handleUpdate, isLoading }) => {
  const [isKG, setIsKG] = useState(true);
  const [isCM, setIsCM] = useState(true);
  const [weight, setWeight] = useState<any>();
  const [height, setHeight] = useState<any>();
  return (
    <div className="flex flex-col items-center justify-between  min-h-[calc(100vh-200px)] w-full">
      <div>
        <div>
          <h2 className=" text-2xl uppercase text-center font-semibold">
            Let us know you better
          </h2>
          <p className=" text-center text-neutral-300 mt-3">
            Let us know you better to help boost
            <br /> your workout results
          </p>
        </div>
        {/* 2.205 */}
        <div className="mt-10 flex flex-col gap-5 items-start w-full">
          <div className="w-full">
            <label htmlFor="weight" className=" font-semibold">
              Weight
            </label>
            <div className="flex gap-1">
              <input
                type="text"
                className="pb-2 focus:outline-none border-b border-zinc-400 md:w-[300px]  bg-transparent"
                id="weight"
                placeholder={isKG ? "KG" : "LB"}
                value={weight}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    return;
                  }
                  setWeight(e.target.value);
                }}
              />
              <div className="flex gap-2 border border-blue-700 rounded-lg  items-center">
                <div
                  className={cn(
                    " px-2 transition duration-200 cursor-pointer",
                    {
                      " bg-blue-700 h-full rounded-lg": isKG,
                    }
                  )}
                  onClick={() => {
                    setWeight((prev: any) => {
                      if (!isKG && prev) {
                        return Math.floor(prev / 2.205).toFixed(0);
                      }
                      return prev;
                    });
                    setIsKG(true);
                  }}
                >
                  KG
                </div>

                <div
                  className={cn(
                    " px-2 transition duration-200 cursor-pointer",
                    {
                      " bg-blue-700 h-full rounded-lg": !isKG,
                    }
                  )}
                  onClick={() => {
                    setWeight((prev: any) => {
                      if (isKG && prev) {
                        return (prev * 2.205).toFixed(2);
                      }
                      return prev;
                    });
                    setIsKG(false);
                  }}
                >
                  LB
                </div>
              </div>
            </div>
          </div>
          {/* 0.394 */}
          <div>
            <label htmlFor="height" className=" font-semibold">
              Height
            </label>
            <div className="flex gap-1">
              <input
                type="text"
                className="pb-2 focus:outline-none border-b border-zinc-400 md:w-[300px]  bg-transparent"
                id="height"
                placeholder={isCM ? "CM" : "FT IN"}
                value={height}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    return;
                  }
                  setHeight(e.target.value);
                }}
              />
              <div className="flex gap-2 border border-blue-700 rounded-lg  items-center">
                <div
                  className={cn(
                    " px-2 transition duration-200 cursor-pointer",
                    {
                      " bg-blue-700 h-full rounded-lg": isCM,
                    }
                  )}
                  onClick={() => {
                    setHeight((prev: any) => {
                      if (!isCM && prev) {
                        return (prev * 2.54).toFixed(2);
                      }
                      return prev;
                    });

                    setIsCM(true);
                  }}
                >
                  CM
                </div>

                <div
                  className={cn(
                    " px-2 transition duration-200 cursor-pointer",
                    {
                      " bg-blue-700 h-full rounded-lg": !isCM,
                    }
                  )}
                  onClick={() => {
                    setHeight((prev: any) => {
                      if (isCM && prev) {
                        return (prev / 2.54).toFixed(2);
                      }
                      return prev;
                    });

                    setIsCM(false);
                  }}
                >
                  FT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" text-center space-y-4 w-full flex-col items-center flex">
        <button
          type="button"
          onClick={() =>
            handleUpdate({
              weight: isKG
                ? weight
                : weight
                ? (Number(weight) / 2.205).toFixed(2)
                : 0,
              height: isCM
                ? height
                : height
                ? (Number(height) * 2.54).toFixed(2)
                : 0,
              weightMeasure: isKG ? "kg" : "lb",
              heightMeasure: isCM ? "cm" : "ft",

              steps: "done",
            })
          }
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
export default Weight;

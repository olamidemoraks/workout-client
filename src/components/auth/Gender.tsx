import { cn } from "@/libs/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type GenderProps = {
  handleUpdate: (value: any) => void;
  genderValue?: string | null;
  isLoading: boolean;
};

const Gender: React.FC<GenderProps> = ({
  handleUpdate,
  genderValue,
  isLoading,
}) => {
  const [gender, setGender] = useState(genderValue ?? "male");

  return (
    <div className="flex flex-col items-center">
      <div>
        <h2 className=" text-2xl uppercase text-center font-semibold">
          What&apos;s your gender?
        </h2>
        <p className=" text-center">Let us know you better</p>
      </div>
      <div
        className={cn(
          "flex items-center transition duration-[400ms] md:scale-100 scale-90",
          {
            " translate-x-[17%]": gender === "male",
            " -translate-x-[17%]": gender === "female",
          }
        )}
      >
        <div
          onClick={() => setGender("male")}
          className={cn(
            "cursor-pointer relative  w-[300px] transition duration-[400ms] flex flex-col items-center ",
            {
              "scale-[.65] -translate-y-[5%] translate-x-[100px]":
                gender !== "male",
              "translate-x-[40px] -translate-y-[22px] ": gender === "male",
            }
          )}
        >
          <Image
            src={"/assets/male.png"}
            alt="male"
            height={400}
            width={400}
            className=" object-contain drop-shadow-lg"
          />
          <div className="w-[50%] h-[30px] bg-zinc-900 rounded-[100%] -translate-x-[5%] -translate-y-[45px] -z-10 blur-sm opacity-60" />
          <div
            className={cn(
              " absolute -z-10 h-[160px] w-[50%] animate-pulse  bg-blue-700 top-[22%] rounded-[.6rem] -skew-x-6",
              { "scale-0": gender === "female" }
            )}
          />
        </div>
        <div
          onClick={() => setGender("female")}
          className={cn(
            "cursor-pointer relative  w-[300px] transition duration-[400ms] flex flex-col items-center",
            {
              "scale-[.63] -translate-y-[5%] -translate-x-[100px] ":
                gender !== "female",
              "-translate-x-[40px]": gender === "female",
            }
          )}
        >
          <Image
            src={"/assets/female.png"}
            alt="female"
            height={400}
            width={400}
            className=" object-contain drop-shadow-lg "
          />
          <div className="w-[50%] h-[30px] bg-zinc-900 rounded-[100%] translate-x-[5%] -translate-y-[42px] -z-10 blur-sm opacity-60" />
          <div
            className={cn(
              " absolute -z-10 h-[160px] w-[50%] animate-pulse bg-pink-400 top-[22%] rounded-[.6rem] skew-x-6 ",
              { "scale-0": gender === "male" }
            )}
          />
        </div>
      </div>
      <div className=" text-center space-y-4 w-full flex-col items-center flex">
        <p className=" capitalize font-bold text-xl">{gender}</p>
        <button
          type="button"
          onClick={() => handleUpdate({ gender, steps: "age" })}
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
export default Gender;

import { Loader2 } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import toast from "react-hot-toast";

type AgeProps = {
  handleUpdate: (value: any) => void;
  isLoading: boolean;
};

const Age: React.FC<AgeProps> = ({ handleUpdate, isLoading }) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleNext = () => {
    if (moment().diff(startDate, "year") < 15) {
      toast.error("You are below the required age.");
      return;
    } else {
      handleUpdate({ age: startDate, steps: "goal" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-[calc(100vh-200px)]">
      <h2 className=" text-2xl uppercase text-center font-semibold">
        What is your Date of birth?
      </h2>
      <div>
        <DatePicker
          className=" focus:outline-none p-2 bg-transparent text-white text-center text-2xl py-3 border-b-4  mx-auto border-b-zinc-500 "
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
        <p className=" capitalize font-bold text-xl   flex items-center justify-center mt-2 ">
          {moment().diff(startDate, "year")} years old
        </p>
      </div>

      <div className=" text-center space-y-4 w-full flex-col items-center flex">
        <button
          type="button"
          onClick={handleNext}
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
export default Age;

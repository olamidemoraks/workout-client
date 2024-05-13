import { getDaysOfWeekWithDates } from "@/utils";
import React, { useMemo } from "react";
import { FaCaretDown, FaFireFlameCurved } from "react-icons/fa6";

type StreakDaysProps = {
  activities: string[];
};

const StreakDays: React.FC<StreakDaysProps> = ({ activities }) => {
  const weekDates = useMemo(() => {
    return getDaysOfWeekWithDates();
  }, []);

  const today = new Date();

  return (
    <div className="flex justify-between gap-1">
      {weekDates.map(({ name, date }) => (
        <div key={name} className="flex flex-col gap-2 items-center">
          <div className=" sm:h-[35px] sm:w-[35px] h-[30px] w-[30px]">
            <div
              className={`h-full w-full relative rounded-full border border-neutral-700 flex items-center justify-center ${
                activities?.includes(date)
                  ? " bg-pink-500"
                  : date === today.toLocaleDateString()
                  ? "  bg-zinc-700/80"
                  : "bg-transparent"
              }`}
            >
              {activities?.includes(date) ? (
                <>
                  <FaFireFlameCurved
                    className=" text-sm fill-zinc-800 "
                    size="20"
                  />
                  {/* <FaCaretDown
                    className="absolute -top-4 fill-pink-500 opacity-80"
                    size={16}
                  /> */}
                </>
              ) : null}
            </div>
          </div>
          <p className=" text-xs text-zinc-300">{name.substring(0, 1)}</p>
        </div>
      ))}
    </div>
  );
};
export default StreakDays;

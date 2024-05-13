import React from "react";
import WorkoutCard from "./WorkoutCard";

type WorkoutSectionProps = {
  header: string;
  workouts: IWorkout[];
};

const WorkoutSection: React.FC<WorkoutSectionProps> = ({
  header,
  workouts,
}) => {
  return (
    <div className={`flex flex-col w-full gap-6`}>
      <div className="flex items-center justify-between w-full">
        <p className=" font-semibold uppercase sm:text-xl text-lg text-zinc-300">
          {header}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-x-8 gap-y-8">
        {workouts.map((workout) => (
          <WorkoutCard workout={workout} key={workout?._id} />
        ))}
      </div>
    </div>
  );
};
export default WorkoutSection;

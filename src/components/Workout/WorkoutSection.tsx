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
      <div className="flex items-baseline gap-2 w-full">
        <h2 className=" font-semibold uppercase sm:text-xl text-lg text-zinc-300">
          {header}
        </h2>
        <span className="text-sm text-zinc-500">{workouts?.length}</span>
      </div>

      <div className="grid min-[1600px]:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-x-8 gap-y-8">
        {workouts.map((workout) => (
          <WorkoutCard workout={workout} key={workout?._id} />
        ))}
      </div>
    </div>
  );
};
export default WorkoutSection;

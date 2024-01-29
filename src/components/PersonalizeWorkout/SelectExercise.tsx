import { getExercise } from "@/api/workout";
import { cn } from "@/libs/utils";
import { Expand, Plus } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { memo, useEffect } from "react";
import { useQuery } from "react-query";

const focus = [
  { title: "abs", imageUrl: "/assets/groups/abs.png" },
  { title: "chest", imageUrl: "/assets/groups/chest.png" },
  { title: "back", imageUrl: "/assets/groups/back.webp" },
  { title: "traps", imageUrl: "/assets/groups/traps.png" },
  { title: "shoulders", imageUrl: "/assets/groups/shoulder.webp" },
  { title: "biceps", imageUrl: "/assets/groups/arms.webp" },
  { title: "triceps", imageUrl: "/assets/groups/triceps.webp" },
  { title: "forearms", imageUrl: "/assets/groups/arms.webp" },
  { title: "calves", imageUrl: "/assets/groups/calves.png " },
  { title: "hamstrings", imageUrl: "/assets/groups/hamstrings.webp" },
  { title: "quads", imageUrl: "/assets/groups/quads1.webp" },
  { title: "glutes", imageUrl: "/assets/groups/glutes.webp" },
];
type SelectExerciseProps = {
  setWorkouts: React.Dispatch<React.SetStateAction<any[]>>;
};

const SelectExercise: React.FC<SelectExerciseProps> = ({ setWorkouts }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const muscle_group = searchParams?.get("focus_point");

  const { data, refetch } = useQuery({
    queryFn: async () => {
      return await getExercise({
        params: searchParams,
      });
    },
    queryKey: "Exercises",
  });
  const exercises: IExercise[] = data?.exercises;

  useEffect(() => {
    refetch();
  }, [refetch, searchParams]);
  const handleAddWorkouts = (exercise: IExercise) => {
    const data = {
      ...exercise,
      exercise_id: exercise?._id,
      repetition: 0,
      sets: 1,
      time_base: false,
      rest: 10,
    };

    setWorkouts((prev) => [...prev, data]);
  };

  const handleSelectMuscle = (muscle: string) => {
    const query = new URLSearchParams(searchParams ?? {});
    if (muscle) {
      query.set("focus_point", muscle);
    } else {
      query.delete("focus_point");
    }

    replace(`${pathname}?${query}`);
  };

  return (
    <>
      <p className=" text-lg font-semibold mb-3 text-center ">Muscle group</p>
      <p className=" text-neutral-300 text-center leading-5">
        Filter exercise base on muscle group available to you below
      </p>
      <div className=" overflow-x-auto w-full scrollbar-thumb-zinc-900 scrollbar-thin scrollbar-track-transparent">
        <div className="flex sm:grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-4 max-sm:w-fit max-sm:overflow-x-auto w-full gap-2 p-2  ">
          {focus.map((group, index) => (
            <div
              onClick={() => handleSelectMuscle(group.title)}
              className={cn(
                "h-[4.5rem] w-[4.5rem] relative flex items-center justify-center cursor-pointer rounded",
                {
                  "ring-2 ring-white/70 ": muscle_group === group.title,
                }
              )}
              key={index}
            >
              <Image
                src={`${group.imageUrl}`}
                alt={`${group.title}`}
                fill
                className=" h-full w-full rounded-md absolute brightness-75"
              />
              <p className={cn(" font-semibold capitalize z-10 absolute ")}>
                {group.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className=" text-neutral-300 text-center leading-5">
        Click an exercise to add to your workout routine.
      </p>
      <div className="flex flex-col rounded mt-3 gap-2">
        {exercises?.map((exercise) => (
          <div
            onClick={() => handleAddWorkouts(exercise)}
            key={exercise?._id}
            className={cn(
              "flex w-full justify-between p-2 px-3 items-center transition hover:bg-zinc-900 bg-zinc-900/40 cursor-pointer "
            )}
          >
            <div
              className="flex gap-2 items-center w-full"
              // onClick={() => handleAddWorkouts(exercise)}
            >
              <div className="w-[60px] h-[50px] relative">
                <Image
                  src={exercise?.image?.url}
                  alt={exercise?.name}
                  fill
                  loading="lazy"
                  className=" object-cover rounded-sm absolute"
                />
              </div>
              <div className="flex items-start w-[50%] truncate ">
                <p>{exercise?.name}</p>
              </div>
            </div>
            <div className=" hover:bg-zinc-800 rounded p-2 cursor-pointer transition duration-200">
              <Plus size={17} color="#a1a1aa" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default memo(SelectExercise);

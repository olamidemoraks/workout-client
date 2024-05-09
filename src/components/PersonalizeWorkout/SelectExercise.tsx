import { getExercise } from "@/api/workout";
import { cn } from "@/libs/utils";
import { focus } from "@/utils/data";
import { Plus } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { memo, useEffect } from "react";
import { useQuery } from "react-query";
import Modal from "../Modal/Modal";
import { Box } from "@mui/material";
import { BiX } from "react-icons/bi";

type SelectExerciseProps = {
  setWorkouts: React.Dispatch<React.SetStateAction<any[]>>;
  setClose: () => void;
  open: boolean;
  workouts: IExercise[];
};

const SelectExercise: React.FC<SelectExerciseProps> = ({
  setWorkouts,
  setClose,
  open,
  workouts,
}) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const muscle_group = searchParams?.get("focus_point") ?? "abs";

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
    <Modal open={open} setClose={setClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 4,
        }}
        className=" overflow-hidden bg-zinc-900 lg:w-[700px] sm:w-[80%] w-[99%] rounded-md   min-h-[200px] flex p-4 py-6 gap-3 flex-col"
      >
        <>
          <div className=" absolute top-2 right-3" onClick={setClose}>
            <BiX className=" cursor-pointer fill-emerald-500 " size={30} />
          </div>
          <p className=" text-lg font-semibold mb-3 text-center ">
            Muscle group
          </p>
          <p className=" text-neutral-300 text-center leading-5">
            Filter exercise base on muscle group available to you below
          </p>
          <div className=" overflow-x-auto w-full scrollbar-thin scrollbar-track-zinc-800  scrollbar-thumb-emerald-600/75">
            <div className="flex   w-fit overflow-x-auto gap-2 p-2 ">
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
          <div className="grid md:grid-cols-2 grid-cols-1 overflow-x-hidden scrollbar-thin scrollbar-track-zinc-800  scrollbar-thumb-blue-600/75 overflow-y-auto max-h-[400px] rounded mt-3 gap-2">
            {exercises?.map((exercise) => (
              <div
                onClick={() => handleAddWorkouts(exercise)}
                key={exercise?._id}
                className={cn(
                  "flex w-full justify-between p-2 px-3 items-center transition hover:bg-zinc-900 bg-zinc-900/40 cursor-pointer "
                )}
              >
                <div className="flex gap-2 items-center w-full">
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
                  {workouts.filter(
                    (workout) => workout?.exercise_id === exercise?._id
                  )?.length > 0 ? (
                    <div className=" bg-emerald-600 rounded-full  h-[30px] w-[30px] flex items-center justify-center">
                      {
                        workouts.filter(
                          (workout) => workout?.exercise_id === exercise?._id
                        )?.length
                      }
                    </div>
                  ) : (
                    <Plus size={17} color="#a1a1aa" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      </Box>
    </Modal>
  );
};
export default memo(SelectExercise);

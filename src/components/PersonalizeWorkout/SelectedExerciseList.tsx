import { cn } from "@/libs/utils";
import { Grip, Timer, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  Active,
  closestCenter,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { DropAnimation } from "@dnd-kit/core";
import { memo, useMemo, useState } from "react";

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
};

type SelectedExerciseListProps = {
  setWorkouts: React.Dispatch<React.SetStateAction<any[]>>;
  workouts: IExercise[];
  removeWorkout: (index: number) => void;
};

const SelectedExerciseList: React.FC<SelectedExerciseListProps> = ({
  setWorkouts,
  workouts,
  removeWorkout,
}) => {
  console.log({ workouts });
  const [active, setActive] = useState<Active | null>(null);

  const activeItem: any = useMemo(() => {
    let activeElement = workouts?.find(
      (item, index) =>
        item?.exercise_id === active?.data?.current?.exercise_id &&
        index === Number(active?.id) - 1
    );
    if (activeElement !== undefined)
      return { ...(activeElement ?? {}), index: active?.id };

    return activeElement;
  }, [active, workouts]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (over && active?.id !== over?.id) {
      setWorkouts((prev) => {
        const activeIndex = prev.findIndex(
          (item, index) =>
            item.exercise_id === active?.data?.current?.exercise_id &&
            index === active?.id - 1
        );
        const overIndex = prev.findIndex(
          (item, index) =>
            item.exercise_id === over?.data?.current?.exercise_id &&
            index === over?.id - 1
        );
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
    setActive(null);
  }
  return (
    <div className="mt-4 w-full">
      <div className="flex w-full justify-between">
        <p className="text-lg">Workout {workouts?.length ?? 0}</p>
        <button
          type="button"
          onClick={() => setWorkouts([])}
          className="  rounded-md p-1 px-2 text-emerald-500 hover:text-emerald-400  cursor-pointer"
        >
          Clear all
        </button>
      </div>

      <div className="w-full mt-4">
        {workouts?.length <= 0 ? (
          <div className=" h-[400px] w-full flex  mt-10 justify-center">
            Empty
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={({ active }) => {
              setActive(active);
            }}
            onDragEnd={handleDragEnd}
            onDragCancel={() => {
              setActive(null);
            }}
          >
            <SortableContext
              items={(workouts as any[]) ?? []}
              strategy={rectSortingStrategy}
            >
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-8">
                {workouts?.map((workout, index) => (
                  <SortableItem
                    index={index}
                    workout={workout}
                    handleRemoveExercise={removeWorkout}
                    key={index + 1}
                    setExerciseList={setWorkouts}
                  />
                ))}
              </div>
            </SortableContext>
            <DragOverlay dropAnimation={dropAnimationConfig}>
              {activeItem ? (
                <SortableItem
                  workout={activeItem}
                  handleRemoveExercise={(value: number) => {}}
                  index={activeItem?.index}
                  grabbed={true}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        )}
      </div>
    </div>
  );
};

type ISortableItem = {
  workout?: any;
  handleRemoveExercise: (exercise: number) => void;
  index: number;
  setExerciseList?: React.Dispatch<React.SetStateAction<any[]>>;
  grabbed?: boolean;
};

const SortableItem = ({
  handleRemoveExercise,
  index,
  workout,
  grabbed,
  setExerciseList,
}: ISortableItem) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: index + 1,
    data: {
      exercise_id: workout?.exercise_id,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleTimebaseChange = (value: boolean) => {
    const data = {
      ...workout,
      time_base: value,
    };

    setExerciseList?.((prev) => {
      return prev.map((value: any, valueIndex: any) => {
        if (valueIndex === index) {
          return data;
        }
        return value;
      });
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }
    const exerciseDate = {
      ...workout,
      [e.target.name]: Number(e.target.value),
    };

    setExerciseList?.((prev) => {
      return prev.map((value: any, valueIndex: any) => {
        if (valueIndex === index) {
          return exerciseDate;
        }
        return value;
      });
    });
  };
  return (
    <li
      style={style}
      ref={setNodeRef}
      {...attributes}
      className={cn(
        "w-full flex gap-4 justify-between group p-3 rounded-md   backdrop-blur-sm bg-zinc-900 relative",
        {
          "border-emerald-500/60 border-4": grabbed,
        }
      )}
    >
      <div
        {...listeners}
        ref={setActivatorNodeRef}
        className=" opacity-100  cursor-pointer  transition duration-200 absolute top-1 -left-7  p-1"
      >
        <Grip color="#fff" size={20} />
      </div>
      <div className="flex flex-col gap-2 h-full">
        <div className="w-[100px] h-[100px] relative">
          <Image
            src={`${workout?.image?.url}`}
            alt=""
            fill
            sizes="100px"
            className="absolute h-full w-full object-cover rounded"
          />
        </div>
        <p className=" truncate">{workout?.name}</p>
        <button
          onClick={() => handleRemoveExercise(index)}
          type="button"
          className="hover:bg-red-600 bg-red-800 rounded p-2 ml-1 cursor-pointer justify-center flex w-fit"
        >
          <Trash2 size={17} />
        </button>
      </div>

      <div className="flex flex-col justify-start items-start gap-2 ">
        <div className="flex items-center gap-[4px]">
          <div
            onClick={() => handleTimebaseChange(true)}
            className={cn(
              " bg-zinc-800 hover:bg-zinc-700 px-1 py-[5px] rounded-l-sm  cursor-pointer",
              {
                "bg-emerald-600 hover:bg-emerald-800": workout?.time_base
                  ? true
                  : false,
              }
            )}
          >
            <Timer />
          </div>
          <div
            onClick={() => handleTimebaseChange(false)}
            className={cn(
              "bg-zinc-800 hover:bg-zinc-700 px-2 py-[5px] rounded-r-sm text-center  cursor-pointer",
              {
                "bg-emerald-600 hover:bg-emerald-800": !workout?.time_base
                  ? true
                  : false,
              }
            )}
          >
            x1
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="name" className=" text-sm text-neutral-300">
            {!workout?.time_base ? "Reps:" : "Secs:"}
          </label>
          <input
            type="text"
            name="repetition"
            value={workout?.repetition}
            onChange={handleChange}
            maxLength={3}
            className={
              "bg-transparent text-center focus:outline-none focus:border text-neutral-300 focus:text-white p-1 border-zinc-700 focus:border-zinc-500  w-[50px] rounded  bg-zinc-950"
            }
          />
        </div>
        {/* <div className="flex items-center gap-2">
          <label htmlFor="name" className=" text-sm text-neutral-300">
            Sets:
          </label>
          <input
            type="text"
            name="sets"
            value={workout?.sets}
            onChange={handleChange}
            maxLength={3}
            className={
              "bg-transparent text-center focus:outline-none focus:border text-neutral-300 focus:text-white p-1 border-zinc-700 focus:border-zinc-500  w-[50px] rounded  bg-zinc-950"
            }
          />
        </div> */}
        <div className="flex items-center gap-2">
          <label htmlFor="name" className=" text-sm text-neutral-300">
            Rest: <br /> (secs)
          </label>
          <input
            type="text"
            name="rest"
            value={workout?.rest}
            onChange={handleChange}
            maxLength={3}
            prefix="secs"
            className={
              "bg-transparent text-center focus:outline-none focus:border text-neutral-300 focus:text-white p-1 border-zinc-700 focus:border-zinc-500  w-[50px] rounded  bg-zinc-950"
            }
          />
        </div>
      </div>
    </li>
  );
};
export default memo(SelectedExerciseList);

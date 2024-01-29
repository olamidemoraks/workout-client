import {
  deleteCustomWorkout,
  getUserCustomWorkouts,
} from "@/api/custom.workout";
import useProfile from "@/hooks/useProfile";
import {
  ArrowRight,
  BarChart3,
  BarChartBig,
  Edit,
  Edit2,
  Play,
  Plus,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiDotsVerticalRounded, BiSolidBarChartSquare } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Button from "@mui/material/Button";
import { Menu as MuiMenu } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import { cn } from "@/libs/utils";
import DeleteModal from "../Modal/DeleteModal";

const HomePersonalizeWorkouts = () => {
  const { profile } = useProfile();
  const { data, isLoading } = useQuery({
    queryFn: async () => await getUserCustomWorkouts({ userId: profile?._id }),
    queryKey: "custom-workout",
    enabled: !!profile?._id,
  });

  const workouts: ICustomWorkout[] = data?.workouts;
  return (
    <div className="flex gap-4 ">
      {workouts?.length === 0 && (
        <Link
          href={"/workouts/create"}
          className="min-w-[250px] group hover:border-4 transition duration-200 h-[120px] relative border hover:border-purple-700 border-zinc-900 rounded-lg flex items-center justify-center"
        >
          <div className=" uppercase leading-7 tracking-wider z-10 p-4 text-center w-fit">
            <p className="font-bold  text-xl">Customize</p>
            <div className="w-full flex">
              <div className="w-[70%] rounded h-[4px] bg-zinc-500/80" />
              <div className="w-[20%] rounded h-[4px] bg-zinc-500/80 ml-[.21rem]" />
              <div className="w-[10%] rounded h-[4px] bg-zinc-500/80 ml-1" />
            </div>
            <p className="font-bold text-xl">Workouts</p>
          </div>
          <Image
            src="/assets/customize.jpg"
            alt="stripe"
            width={2000}
            height={1335}
            className="h-full w-[100%] absolute object-cover rounded-md opacity-70"
          />
          <div className="w-[50%] h-full flex gap-3 -skew-x-12 absolute right-5">
            <div className="z-10 bg-emerald-500/25 backdrop-blur-sm opacity-30 h-full w-[100px]   "></div>
            <div className="z-10 bg-blue-500/25 backdrop-blur-sm opacity-30 h-full w-[100px]  "></div>
            <div className="z-10 bg-purple-500/25 backdrop-blur-sm opacity-30 h-full w-[100px] mr-2"></div>
          </div>
          <ArrowRight className="right-5  bottom-5 absolute group-hover:translate-y-0 translate-y-6 opacity-0 group-hover:opacity-100 transition duration-300 delay-75  " />
        </Link>
      )}
      <div className="flex overflow-x-auto w-full gap-4 scrollbar-thumb-zinc-900 scrollbar-thin scrollbar-track-transparent pb-4 relative snap-x">
        {workouts?.map((workout) => (
          <div className="flex flex-col" key={workout?._id}>
            <div className=" cursor-pointer group snap-start min-w-[300px] h-[160px]  relative  p-3 flex flex-col items-center justify-center border  border-zinc-900 rounded-lg  transition duration-200">
              <Image
                src={`${workout?.image?.url}`}
                alt={workout?.name}
                fill
                className=" w-full h-full  object-cover rounded-md opacity-70 -z-[2]"
              />
              {/* <div className="absolute top-3 right-3 flex gap-2 items-center">
              <small className="font-semibold">Owner</small>
            </div> */}
              <Link
                href={`/workout/${workout?._id}`}
                className="flex flex-row items-center justify-center w-full"
              >
                <div className="h-[35px] w-[35px] flex items-center justify-center bg-zinc-700 group-hover:bg-blue-500 rounded-[13px] transition-colors duration-200 ">
                  <Play size={17} fill="#fff" />
                </div>
              </Link>
            </div>
            <div className="h-fit w-full flex justify-between mt-3 px-2">
              <div className="flex gap-3 items-center">
                <div className="relative h-[30px] min-w-[30px] ">
                  <Image
                    src={`${profile?.avatar?.url}`}
                    fill
                    className="h-full w-full  rounded-full ring-2 ring-emerald-400"
                    alt="profile image"
                  />
                </div>
                <p className="font-bold md:text-lg text-base  uppercase  text-center">
                  {workout?.name}
                </p>
              </div>

              <Menu
                id={workout?._id}
                owner={workout.creatorId === profile._id}
              />
            </div>
          </div>
        ))}
      </div>
      {/* <Link
        href={"/workouts/create"}
        className="snap-start min-w-[300px] h-[160px] bg-zinc-900/30 backdrop-blur-sm hover:bg-neutral-900  rounded-md flex items-center flex-col justify-center"
      >
        <Plus />
        <p>New Workout</p>
      </Link> */}
    </div>
  );
};

export default HomePersonalizeWorkouts;

const Menu = ({ id, owner }: { id: string; owner: boolean }) => {
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: deleteCustomWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries("custom-workout");
    },
    onSettled: () => {
      setIsOpen(false);
    },
  });

  const handleDeleteWorkout = async () => {
    await mutateAsync({ id });
  };

  return (
    <div>
      <button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={cn(
          " hover:bg-zinc-900 w-fit text-neutral-200 cursor-pointer rounded-full p-1 transition duration-150",
          {
            " hidden": !owner,
          }
        )}
      >
        <BiDotsVerticalRounded size={22} />
      </button>

      <MuiMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "#18181b",
          },
        }}
      >
        <MenuItem
          sx={{
            "&:hover": {
              bgcolor: "#27272a",
            },
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: 12,
          }}
          onClick={() => {
            handleClose();
            router.push(`/workouts/edit/${id}`);
          }}
        >
          <Edit size={17} /> Edit
        </MenuItem>
        <MenuItem
          sx={{
            "&:hover": {
              bgcolor: "#27272a",
            },
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: 12,
          }}
          onClick={handleClose}
        >
          <BiSolidBarChartSquare /> Analytics
        </MenuItem>
        <MenuItem
          sx={{
            "&:hover": {
              bgcolor: "#27272a",
              color: "rose",
            },
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: 12,
          }}
          onClick={() => {
            handleClose();
            setIsOpen(true);
          }}
        >
          <Trash2 size={17} /> Delete
        </MenuItem>
      </MuiMenu>

      <DeleteModal
        setClose={() => setIsOpen(false)}
        open={isOpen}
        handleAction={handleDeleteWorkout}
        isLoading={isLoading}
      />
    </div>
  );
};

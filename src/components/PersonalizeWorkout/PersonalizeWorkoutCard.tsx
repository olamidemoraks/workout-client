import { Avatar, MenuItem } from "@mui/material";
import { Edit, Play, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  BiDotsVerticalRounded,
  BiShareAlt,
  BiSolidBarChartSquare,
} from "react-icons/bi";
import { Menu as MuiMenu } from "@mui/material";
import DeleteModal from "../Modal/DeleteModal";
import useProfile from "@/hooks/useProfile";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import {
  customWorkoutInviteResponse,
  deleteCustomWorkout,
} from "@/api/custom.workout";
import { cn } from "@/libs/utils";
import AddUserToWorkout from "./AddUserToWorkout";
import { alphabetsColor } from "@/utils/data";
import toast from "react-hot-toast";

type PersonalizeWorkoutCardProps = {
  workout: ICustomWorkout;
  userId?: string | null;
  isProfile?: boolean;
};

const PersonalizeWorkoutCard: React.FC<PersonalizeWorkoutCardProps> = ({
  workout,
  userId,
  isProfile,
}) => {
  return (
    <div
      className={cn("flex flex-col ", {
        "w-full": isProfile,
        "sm:min-w-[300px] min-w-[250px]": !isProfile,
      })}
      key={workout?._id}
    >
      <div
        className={` cursor-pointer group snap-start w-full sm:h-[160px] ${
          isProfile ? "h-[200px]" : "h-[160px]"
        }   relative  p-3 flex flex-col items-center justify-center border  border-zinc-900 rounded-lg  transition duration-200`}
      >
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
          <div className="h-[35px] w-[35px] group-hover:flex items-center justify-center hidden bg-blue-500 rounded-[13px] transition-colors duration-200 ">
            <Play size={17} fill="#fff" />
          </div>
        </Link>
      </div>
      <div className="h-fit w-full flex justify-between md:mt-3 mt-1">
        <div className="flex gap-3 items-start">
          <Link
            href={`/profile?id=${workout?.creatorId}`}
            className="relative h-[30px] min-w-[30px] "
          >
            {workout?.creator?.avatar?.public_id ? (
              <Image
                src={`${workout?.creator?.avatar?.url}`}
                fill
                className="h-full w-full  rounded-full ring-2 ring-emerald-400"
                alt="profile image"
              />
            ) : (
              <div
                className={`${
                  alphabetsColor[
                    workout?.creator?.name
                      ?.split(" ")?.[0]
                      .substring(0, 1)
                      .toUpperCase()
                  ] ?? "bg-zinc-900/60"
                }  h-10 w-10 rounded-full flex items-center justify-center text-xl uppercase font-semibold`}
              >
                {workout?.creator?.name?.substring(0, 1)}
              </div>
            )}
          </Link>
          <div className=" leading-8 max-w-[90%]">
            <p className="font-semibold w-full text-base  capitalize ">
              {workout?.name}
            </p>
            {userId === workout?.creatorId ? (
              <p className=" text-emerald-400 text-sm">owner</p>
            ) : (
              <p className="font-semibold text-neutral-300 text-sm  capitalize ">
                <span className=" text-purple-400 lowercase">creator</span>{" "}
                {workout?.creator?.username}
              </p>
            )}
          </div>
        </div>

        <Menu id={workout?._id} owner={workout?.creator?._id === userId} />
      </div>
    </div>
  );
};
export default PersonalizeWorkoutCard;

export const Menu = ({ id, owner }: { id: string; owner: boolean }) => {
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
  const [isShareOpen, setIsShareOpen] = React.useState(false);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: deleteCustomWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries("custom-workout");
    },
    onSettled: () => {
      setIsOpen(false);
    },
  });

  const { mutate: inviteRespondMutate, isLoading: sendingRespond } =
    useMutation({
      mutationFn: customWorkoutInviteResponse,
      onSuccess: () => {
        queryClient.invalidateQueries("custom-workout");
      },
      onError: (data: any) => {
        toast.error(data?.message);
      },
      onSettled: () => {
        setIsOpen(false);
      },
    });

  const handleDeleteWorkout = async () => {
    await mutateAsync({ id });
  };

  const handlecustomWorkoutInviteResponse = () => {
    const data = {
      status: "reject",
    };

    inviteRespondMutate({ data, id });
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
          " hover:bg-zinc-900 w-fit text-neutral-200 cursor-pointer rounded-full p-1 transition duration-150"
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
        {owner ? (
          <>
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
              onClick={() => {
                handleClose();
                setIsShareOpen(true);
              }}
            >
              <BiShareAlt size={17} /> Invite
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
          </>
        ) : (
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
            <Trash2 size={17} /> Remove
          </MenuItem>
        )}
      </MuiMenu>

      <DeleteModal
        setClose={() => setIsOpen(false)}
        open={isOpen}
        handleAction={
          owner ? handleDeleteWorkout : handlecustomWorkoutInviteResponse
        }
        isLoading={isLoading}
      />
      <AddUserToWorkout
        id={id}
        open={isShareOpen}
        setClose={() => {
          setIsShareOpen(false);
        }}
      />
    </div>
  );
};

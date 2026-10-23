import {
  customWorkoutInviteResponse,
  deleteCustomWorkout,
} from "@/api/custom.workout";
import { cn } from "@/libs/utils";
import { alphabetsColor } from "@/utils/data";
import { MenuItem, Menu as MuiMenu } from "@mui/material";
import { Edit, Play, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { BiDotsVerticalRounded, BiShareAlt } from "react-icons/bi";
import { useMutation, useQueryClient } from "react-query";
import DeleteModal from "../Modal/DeleteModal";
import AddUserToWorkout from "./AddUserToWorkout";

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
        className={` cursor-pointer group snap-start w-full ${
          isProfile ? "h-[200px]" : "h-[160px] sm:h-[160px]"
        } relative overflow-hidden p-3 flex flex-col items-center justify-center border border-zinc-900 hover:border-zinc-700 rounded-lg transition duration-200`}
      >
        <Image
          src={`${workout?.image?.url}`}
          alt=""
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className=" w-full h-full object-cover rounded-md md:brightness-[.8] brightness-90 group-hover:brightness-90 group-hover:scale-105 transition duration-500"
        />
        {/* <div className="absolute top-3 right-3 flex gap-2 items-center">
      <small className="font-semibold">Owner</small>
    </div> */}
        {/* The whole image opens the workout; the play badge shows on hover
            (always on touch screens, which have no hover). */}
        <Link
          href={`/workout/${workout?._id}`}
          aria-label={`Open ${workout?.name}`}
          className="absolute inset-0 z-10 flex flex-row items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <div className="h-[35px] w-[35px] flex items-center justify-center bg-blue-500 rounded-[13px] transition duration-200 md:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:scale-110">
            <Play size={17} fill="#fff" />
          </div>
        </Link>
      </div>
      <div className="h-fit w-full flex justify-between md:mt-3 mt-1">
        <div className="flex gap-3 items-start min-w-0">
          <Link
            href={`/profile?id=${workout?.creatorId}`}
            aria-label={`${workout?.creator?.name ?? "Creator"}'s profile`}
            className="relative h-10 w-10 shrink-0"
          >
            {workout?.creator?.avatar?.public_id ? (
              <Image
                src={`${workout?.creator?.avatar?.url}`}
                fill
                className="h-full w-full  rounded-full border border-emerald-400"
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
          <div className=" leading-6 min-w-0">
            <p className="font-semibold w-full text-base capitalize truncate">
              {workout?.name}
            </p>
            {userId === workout?.creatorId ? (
              <p className=" text-emerald-400 text-sm">
                owner
                <span className="text-zinc-500">
                  {" "}
                  · {workout?.exercises?.length ?? 0} exercises
                </span>
              </p>
            ) : (
              <p className="font-semibold text-neutral-300 text-sm truncate">
                <span className=" text-purple-400 lowercase">creator</span>{" "}
                {workout?.creator?.username}
                <span className="font-normal text-zinc-500">
                  {" "}
                  · {workout?.exercises?.length ?? 0} exercises
                </span>
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
      toast.success("Workout deleted");
    },
    onError: (data: any) => {
      toast.error(data?.message || "action failed");
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
        toast.success("Workout removed");
      },
      onError: (data: any) => {
        toast.error(data?.message || "action failed");
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
        isLoading={isLoading || sendingRespond}
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

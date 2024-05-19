import { updateNotifications } from "@/api/activity";
import { customWorkoutInviteResponse } from "@/api/custom.workout";
import { followUser } from "@/api/user";
import useProfile from "@/hooks/useProfile";
import { Avatar } from "@mui/material";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";

type NotifcationCardProps = {
  notification: INotification;
  refetch: any;
};

const NotifcationCard: React.FC<NotifcationCardProps> = ({
  notification,
  refetch,
}) => {
  const { socket } = useSelector((state: any) => state.socket);
  const { profile, refetch: reloadProfile } = useProfile();
  const [followingId, setFollowingId] = useState("");
  const router = useRouter();

  const { mutate: follow, isLoading: following } = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      reloadProfile();
      handleReadNotification();
      if (followingId) {
        socket.current.emit("send-notification", [followingId]);
      }
    },
    onError: (data: any) => {
      toast.error(data?.message);
    },
  });
  const { mutateAsync: inviteRespondMutate, isLoading: sendingRespond } =
    useMutation({
      mutationFn: customWorkoutInviteResponse,
      onSuccess: () => {
        handleReadNotification();
      },
      onError: (data: any) => {
        toast.error(data?.message);
      },
    });
  const { mutate, isLoading } = useMutation({
    mutationFn: updateNotifications,
    onSuccess: () => {
      refetch();
    },
  });
  const handleReadNotification = () => {
    mutate({ id: notification?._id });
  };
  const handleFollowAndUnfollowAction = (id: string) => {
    setFollowingId(id);
    follow({ id });
  };

  const userFollowed = profile?.following;

  const handlecustomWorkoutInviteResponse = ({
    status,
  }: {
    status: "accept" | "reject";
  }) => {
    const data = {
      status,
    };

    inviteRespondMutate({ data, id: notification?.workoutId! }).then(() => {
      if (status === "accept") {
        router.push(`/workout/${notification?.workoutId!}`);
      }
    });
  };

  return (
    <div className="p-2 rounded hover:bg-zinc-700/50 w-full flex flex-col flex-1 justify-between items-center">
      <div className="flex gap-2 w-full ">
        <div className="md:h-[60px] md:min-w-[60px] h-[50px] min-w-[50px] relative cursor-pointer">
          {notification?.from?.avatar?.url ? (
            <Image
              src={notification?.from?.avatar?.url}
              alt={notification?.from?.name}
              fill
              className="absolute rounded-full object-cover"
            />
          ) : (
            <Avatar sx={{ height: "100%", width: "100%" }} />
          )}
        </div>

        <div className="w-full flex-grow mt-2">
          <p className="text-sm font-medium">{notification?.from?.name}</p>
          <p className="text-sm text-zinc-300 ">{notification?.content}</p>
        </div>
      </div>
      <div className=" flex justify-end w-full mt-2">
        {notification.type === "follow-request" && (
          <button
            type="button"
            onClick={() => {
              handleFollowAndUnfollowAction(notification?.from?._id);
            }}
            className={`flex items-center gap-1 disabled:opacity-50 px-2 p-1 ${
              userFollowed?.includes(notification?.from?._id)
                ? "  bg-rose-600/25 border border-red-900 rounded"
                : "bg-blue-600/25 border border-blue-900 rounded"
            } rounded`}
          >
            {userFollowed?.includes(notification?.from?._id) ? (
              <>clear</>
            ) : (
              <>
                follow
                {following && "ing..."}
              </>
            )}
          </button>
        )}
        {notification.type === "invite-request" && (
          <div className="flex gap-3">
            <button
              onClick={() =>
                handlecustomWorkoutInviteResponse({ status: "accept" })
              }
              className="flex items-center gap-1 disabled:opacity-50 px-2 p-2 bg-blue-600/25 border border-blue-900 rounded"
              disabled={sendingRespond == true ? true : false}
            >
              Accept
            </button>
            <button
              onClick={() =>
                handlecustomWorkoutInviteResponse({ status: "reject" })
              }
              className="flex items-center gap-1 disabled:opacity-50 px-2 p-2 bg-rose-600/25 border border-red-900 rounded"
              disabled={sendingRespond == true ? true : false}
            >
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default NotifcationCard;

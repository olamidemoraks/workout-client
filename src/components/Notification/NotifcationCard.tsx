import { updateNotifications } from "@/api/activity";
import { customWorkoutInviteResponse } from "@/api/custom.workout";
import { followUser } from "@/api/user";
import useProfile from "@/hooks/useProfile";
import { Avatar } from "@mui/material";
import { Check, X } from "lucide-react";
import Image from "next/image";
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
  const { mutate: inviteRespondMutate, isLoading: sendingRespond } =
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

    inviteRespondMutate({ data, id: notification?.workoutId! });
  };

  return (
    <div className="p-2 rounded hover:bg-zinc-700/50 w-full flex justify-between items-center">
      <div className="flex gap-2 ">
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
      <div>
        {notification.type === "follow-request" && (
          <button
            type="button"
            onClick={() => {
              handleFollowAndUnfollowAction(notification?.from?._id);
            }}
            className={`flex items-center gap-1 disabled:opacity-50 px-2 p-1 ${
              userFollowed?.includes(notification?.from?._id)
                ? " hover:bg-gray-600 text-rose-600"
                : "bg-blue-500 "
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
          <div className="flex gap-1">
            <button
              onClick={() =>
                handlecustomWorkoutInviteResponse({ status: "accept" })
              }
              className="flex items-center gap-1 disabled:opacity-50 px-2 p-1 bg-blue-600 rounded"
              disabled={sendingRespond == true ? true : false}
            >
              <Check size={20} />
            </button>
            <button
              onClick={() =>
                handlecustomWorkoutInviteResponse({ status: "reject" })
              }
              className="flex items-center gap-1 disabled:opacity-50 px-2 p-1 bg-rose-600 rounded"
              disabled={sendingRespond == true ? true : false}
            >
              <X size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default NotifcationCard;

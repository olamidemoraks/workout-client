import {
  followUser,
  getFollower,
  getFollowing,
  unfollowUser,
} from "@/api/user";
import Modal from "@/components/Modal/Modal";
import useProfile from "@/hooks/useProfile";
import { Avatar, Box } from "@mui/material";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useMutation, useQuery } from "react-query";

type FollowerProps = {
  open: boolean;
  setClose: () => void;
};
const Follower: React.FC<FollowerProps> = ({ open, setClose }) => {
  const { profile, refetch: refetchProfile } = useProfile();
  const { isLoading, data } = useQuery({
    queryFn: getFollower,
    queryKey: "follower",
    enabled: open,
  });

  const { mutate: follow, isLoading: following } = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      refetchProfile();
    },
  });

  const { mutate: unfollow, isLoading: unfollowing } = useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      refetchProfile();
    },
  });

  const handleFollowAndUnfollowAction = (id: string, following: boolean) => {
    if (following) {
      unfollow({ id });
    } else {
      follow({ id });
    }
  };

  const users = data?.followers as IUser[];
  const followingUsers = profile?.following as string[];
  return (
    <Modal open={open} setClose={setClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          p: 4,
        }}
        className=" bg-zinc-900 rounded-md sm:w-[500px] w-[95%] max-h-[80vh] min-h-[600px] p-4 py-6 gap-3 flex-col"
      >
        <div className="flex justify-between items-center static top-0 w-full">
          <p className=" text-2xl text-zinc-400">Followers</p>
          <X
            size={22}
            className=" text-zinc-400 hover:text-white cursor-pointer"
            onClick={setClose}
          />
        </div>

        {isLoading && (
          <div className="flex w-full justify-center mt-5">
            <Loader2 className=" animate-spin" size={22} />
          </div>
        )}
        <div className="flex flex-col gap-3 mt-6 h-[500px]  overflow-auto scrollbar scrollbar-none ">
          {users?.map((user) => (
            <div
              key={user?._id}
              className="w-full flex justify-between items-center"
            >
              <div className="flex gap-2 items-center">
                <div className="md:h-[60px] md:w-[60px] h-[50px] w-[50px] relative cursor-pointer">
                  {user?.avatar?.url ? (
                    <Image
                      src={user?.avatar?.url}
                      alt={user.name}
                      fill
                      className="absolute rounded-full object-cover"
                    />
                  ) : (
                    <Avatar sx={{ height: "100%", width: "100%" }} />
                  )}
                </div>

                <div className="flex flex-col">
                  <p>{user?.name}</p>
                  <p className=" opacity-75">{user?.username}</p>
                </div>
              </div>

              <button
                onClick={() =>
                  handleFollowAndUnfollowAction(
                    user?._id,
                    followingUsers?.includes(user?._id)
                  )
                }
                disabled={following || unfollowing ? true : false}
                className=" disabled:opacity-50 px-2 p-1 bg-blue-600 rounded"
              >
                {followingUsers?.includes(user?._id) ? (
                  <>unfollow</>
                ) : (
                  <>follow</>
                )}
                {(following || unfollowing) && "ing..."}
              </button>
            </div>
          ))}
        </div>
      </Box>
    </Modal>
  );
};

export default Follower;

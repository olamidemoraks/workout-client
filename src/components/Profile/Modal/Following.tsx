import { getFollowing, unfollowUser } from "@/api/user";
import Modal from "@/components/Modal/Modal";
import useProfile from "@/hooks/useProfile";
import { Avatar, Box } from "@mui/material";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

type FollowingProps = {
  open: boolean;
  setClose: () => void;
};

const Following: React.FC<FollowingProps> = ({ open, setClose }) => {
  const { refetch: refetchProfile } = useProfile();
  const { isLoading, data, refetch } = useQuery({
    queryFn: getFollowing,
    queryKey: "following",
    enabled: open,
  });

  const { mutate: unfollow, isLoading: unfollowing } = useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      refetch();
      refetchProfile();
    },
  });

  const handleFollowAndUnfollowAction = (id: string) => {
    unfollow({ id });
  };

  const users = data?.followings as IUser[];
  console.log({ users });
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
          <p className=" text-2xl text-zinc-400">Following</p>
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
        <div className="flex flex-col gap-3 mt-6 h-[500px]  overflow-auto px-1 scrollbar scrollbar-none ">
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
                onClick={() => handleFollowAndUnfollowAction(user?._id)}
                disabled={unfollowing ? true : false}
                className=" disabled:opacity-50 px-2 p-1 bg-blue-600 rounded"
              >
                unfollow
                {unfollowing && "ing..."}
              </button>
            </div>
          ))}
        </div>
      </Box>
    </Modal>
  );
};
export default Following;

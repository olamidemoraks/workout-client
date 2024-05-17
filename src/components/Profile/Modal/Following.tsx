import { followUser, getFollowing, unfollowUser } from "@/api/user";
import Modal from "@/components/Modal/Modal";
import useProfile from "@/hooks/useProfile";
import { Avatar, Box } from "@mui/material";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import FollowActionButton from "./FollowActionButton";

type FollowingProps = {
  open: boolean;
  setClose: () => void;
};

const Following: React.FC<FollowingProps> = ({ open, setClose }) => {
  const [userId, setUserId] = useState("");
  const { refetch: refetchProfile, profile } = useProfile();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  const { isLoading, data, refetch } = useQuery({
    queryFn: async () => await getFollowing({ params: searchParams }),
    queryKey: "following",
    enabled: open,
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  const { mutate: follow, isLoading: following } = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      refetchProfile();
    },
  });

  const { mutate: unfollow, isLoading: unfollowing } = useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      refetch();
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

  const users = data?.followings as IUser[];
  const followingUsers = profile?.following as string[];

  return (
    <Modal open={open} setClose={setClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className=" bg-zinc-900 rounded-md sm:w-[600px] w-[95%] max-h-[80vh] min-h-[600px] sm:p-4 p-2 py-6 gap-3 flex-col"
      >
        <div className="flex justify-between items-center static top-0 w-full">
          <p className=" text-2xl text-zinc-400 mb-2">Following</p>
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
        <div className="flex flex-col gap-6 mt-6 sm:h-[70vh] h-[80vh]  overflow-auto px-1 scrollbar scrollbar-none ">
          {Array(20)
            .fill(0)
            .map((_, idx) => (
              <>
                {users?.map((user) => (
                  <div
                    key={user?._id}
                    className="w-full flex justify-between items-center"
                  >
                    <Link
                      href={`/profile?id=${user?._id}`}
                      onClick={setClose}
                      className="flex gap-2 group items-center"
                    >
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
                        <p className=" group-hover:underline underline-offset-2">
                          {user?.name}
                        </p>
                        <p className=" opacity-75">{user?.username}</p>
                      </div>
                    </Link>

                    <div onClick={() => setUserId(user?._id)}>
                      <FollowActionButton
                        id={id}
                        following={following}
                        handleFollowAndUnfollowAction={
                          handleFollowAndUnfollowAction
                        }
                        followingUsers={followingUsers}
                        profile={profile}
                        unfollowing={unfollowing && userId === user?._id}
                        user={user}
                      />
                    </div>
                  </div>
                ))}
              </>
            ))}
        </div>
      </Box>
    </Modal>
  );
};
export default Following;

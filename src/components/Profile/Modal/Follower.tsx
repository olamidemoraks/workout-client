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
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import FollowActionButton from "./FollowActionButton";

type FollowerProps = {
  open: boolean;
  setClose: () => void;
};
const Follower: React.FC<FollowerProps> = ({ open, setClose }) => {
  const [userId, setUserId] = useState("");
  const { profile, refetch: refetchProfile } = useProfile();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  const { isLoading, data, refetch } = useQuery({
    queryFn: async () => await getFollower({ params: searchParams }),
    queryKey: ["follower", id ?? "me"],
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
        }}
        className=" bg-zinc-900 border border-zinc-800 rounded-xl sm:w-[600px] w-[95%] max-h-[70vh] md:max-h-[80vh] min-h-[300px] sm:p-5 p-3 py-6 gap-3 flex flex-col outline-none"
      >
        <div className="flex justify-between items-center w-full">
          <p className=" text-2xl text-zinc-300 font-semibold">
            Followers{" "}
            {users && (
              <span className="text-base font-normal text-zinc-500">
                {users.length}
              </span>
            )}
          </p>
          <button
            type="button"
            onClick={setClose}
            aria-label="Close"
            className="rounded-lg p-1.5 hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <X size={22} className="stroke-zinc-400" />
          </button>
        </div>

        {isLoading && (
          <div className="flex w-full justify-center mt-5">
            <Loader2 className=" animate-spin" size={22} />
          </div>
        )}
        {!isLoading && users?.length === 0 && (
          <p className="text-center text-zinc-400 py-16">No followers yet.</p>
        )}
        <div className="flex flex-col gap-1 mt-2 flex-1 min-h-0 overflow-auto px-1 scrollbar scrollbar-none ">
          {users?.map((user) => (
            <div
              key={user?._id}
              className="w-full flex justify-between items-center gap-3 rounded-lg p-2 hover:bg-zinc-800/60 transition-colors"
            >
              <Link
                href={`/profile?id=${user?._id}`}
                onClick={setClose}
                className="flex gap-3 group items-center min-w-0"
              >
                <div className="md:h-[60px] md:w-[60px] h-[50px] w-[50px] relative cursor-pointer shrink-0">
                  {user?.avatar?.url ? (
                    <Image
                      src={user?.avatar?.url}
                      alt=""
                      fill
                      className="absolute rounded-full object-cover"
                    />
                  ) : (
                    <Avatar sx={{ height: "100%", width: "100%" }} />
                  )}
                </div>

                <div className="flex flex-col min-w-0">
                  <p className=" group-hover:underline underline-offset-2 truncate capitalize">
                    {user?.name}
                  </p>
                  <p className=" text-zinc-400 truncate">@{user?.username}</p>
                </div>
              </Link>

              <div onClick={() => setUserId(user?._id)}>
                <FollowActionButton
                  id={id}
                  following={following && userId === user?._id}
                  handleFollowAndUnfollowAction={handleFollowAndUnfollowAction}
                  followingUsers={followingUsers}
                  profile={profile}
                  unfollowing={unfollowing && userId === user?._id}
                  user={user}
                />
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Modal>
  );
};

export default Follower;

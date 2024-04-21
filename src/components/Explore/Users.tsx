"use client";
import { findUser, followUser, unfollowUser } from "@/api/user";
import useProfile from "@/hooks/useProfile";
import { Avatar } from "@mui/material";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiSearch, BiUserPlus } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";

type UsersProps = {};

const Users: React.FC<UsersProps> = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [name, setName] = useState("");
  const { socket } = useSelector((state: any) => state.socket);
  const [followingId, setFollowingId] = useState("");

  console.log({ socket });
  const queryClient = useQueryClient();
  const {
    profile,
    isLoading: gettingProfile,
    refetch: reloadProfile,
  } = useProfile();

  const userFollowed = profile?.following;
  let search = params?.get("search");

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryFn: () => findUser({ params }),
    queryKey: "Users",
    enabled: !!search,
    refetchOnWindowFocus: false,
  });

  const { mutate: follow, isLoading: following } = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      reloadProfile();
      if (followingId) {
        socket.current.emit("send-notification", [followingId]);
      }
    },
    onError: (data: any) => {
      toast.error(data?.message);
    },
  });
  const { mutate: unfollow, isLoading: unfollowing } = useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      reloadProfile();
    },
  });

  const users: IUser[] = data?.users;

  const searchForUser = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name) {
      const searchParams = new URLSearchParams(params ?? {});
      searchParams?.set("search", name);
      router.replace(`${pathname}?${searchParams}`);
    }
  };

  useEffect(() => {
    if (search) refetch();
  }, [search]);

  const handleFollowAndUnfollowAction = (id: string, following: boolean) => {
    setFollowingId(id);
    if (following) {
      unfollow({ id });
    } else {
      follow({ id });
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={searchForUser}
        className=" flex items-center  bg-zinc-800 rounded-md w-full p-2 gap-3 "
      >
        <BiSearch className="opacity-80" size={21} />
        <input
          placeholder="Search"
          type="text"
          defaultValue={search ?? ""}
          onChange={(e) => setName(e.target.value)}
          className=" bg-transparent outline-none flex-1 w-full p-1"
        />
        <BiUserPlus size={25} className="opacity-80" />
      </form>
      {isLoading && isFetching ? (
        <div className="flex w-full justify-center mt-4">
          <Loader2 className=" animate-spin" size={22} />
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-5">
          {users?.map((user) => (
            <div
              key={user?._id}
              className="w-full flex justify-between items-center"
            >
              <div className="flex gap-2 items-center">
                <div className="md:h-[60px] md:w-[60px] h-[50px] w-[50px] relative cursor-pointer">
                  {user?.avatar ? (
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
                    userFollowed?.includes(user?._id)
                  )
                }
                disabled={
                  following || unfollowing || user?._id === profile?._id
                    ? true
                    : false
                }
                className=" disabled:opacity-50 px-2 p-1 bg-blue-600 rounded"
              >
                {userFollowed?.includes(user?._id) ? "unfollow" : "follow"}
                {(following || unfollowing || gettingProfile) && "ing..."}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Users;

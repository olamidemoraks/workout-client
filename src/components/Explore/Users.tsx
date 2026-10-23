"use client";
import { findUser, followUser, unfollowUser } from "@/api/user";
import useProfile from "@/hooks/useProfile";
import { Avatar } from "@mui/material";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

  const { data, refetch, isFetching } = useQuery({
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

  const isBusy = following || unfollowing || gettingProfile;

  return (
    <div className="w-full ">
      <h1 className=" text-2xl font-semibold uppercase mb-4">Search</h1>
      <form
        onSubmit={searchForUser}
        role="search"
        className=" flex items-center bg-zinc-800 rounded-md w-full p-2 gap-3 border border-transparent focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/15 transition"
      >
        <button
          type="submit"
          aria-label="Search"
          className="rounded p-1 hover:bg-zinc-700 transition"
        >
          <BiSearch className="opacity-80" size={21} />
        </button>
        <label htmlFor="user-search" className="sr-only">
          Search people by name or username
        </label>
        <input
          id="user-search"
          placeholder="Search people by name or username"
          type="search"
          defaultValue={search ?? ""}
          onChange={(e) => setName(e.target.value)}
          className=" bg-transparent outline-none flex-1 w-full p-1 placeholder:text-zinc-500"
        />
        <BiUserPlus size={25} className="opacity-80" aria-hidden />
      </form>
      {isFetching ? (
        <div className="flex w-full justify-center mt-6">
          <Loader2 className=" animate-spin" size={22} />
        </div>
      ) : !search ? (
        <p className="mt-10 text-center text-zinc-400">
          Find friends to follow and invite to your workouts.
        </p>
      ) : users?.length === 0 ? (
        <p className="mt-10 text-center text-zinc-400">
          No one matches &ldquo;{search}&rdquo;. Try a different name or
          username.
        </p>
      ) : (
        <div className="flex flex-col gap-1 mt-5">
          {users?.map((user) => {
            const isFollowing = !!userFollowed?.includes(user?._id);
            const isSelf = user?._id === profile?._id;
            const isPending = isBusy && followingId === user?._id;

            return (
              <div
                key={user?._id}
                className="w-full flex justify-between items-center gap-3 rounded-lg p-2 -mx-2 hover:bg-zinc-900/70 transition-colors"
              >
                <Link
                  href={`/profile?id=${user?._id}`}
                  className="flex group gap-3 items-center min-w-0"
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

                {isSelf ? (
                  <span className="text-sm text-zinc-500 px-2">You</span>
                ) : (
                  <button
                    onClick={() =>
                      handleFollowAndUnfollowAction(user?._id, isFollowing)
                    }
                    disabled={isBusy}
                    className={`shrink-0 disabled:opacity-50 px-3 py-1.5 text-sm font-semibold rounded transition-colors ${
                      isFollowing
                        ? "bg-zinc-800 hover:bg-zinc-700"
                        : "bg-blue-600 hover:bg-blue-500"
                    }`}
                  >
                    {isPending
                      ? isFollowing
                        ? "Unfollowing..."
                        : "Following..."
                      : isFollowing
                      ? "Unfollow"
                      : "Follow"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Users;

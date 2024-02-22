"use client";
import { cn } from "@/libs/utils";
import {
  Edit2,
  HeartPulse,
  LineChart,
  Loader2,
  Smile,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Reports from "./Report/Reports";
import Workouts from "./Workouts/Index";
import useProfile from "@/hooks/useProfile";
import { alphabetsColor } from "@/utils/data";
import { useMutation, useQueryClient } from "react-query";
import { updateProfileImage } from "@/api/user";
import toast from "react-hot-toast";
import Link from "next/link";
import Achievements from "./Achievements/Achievements";

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  const queryClient = useQueryClient();
  const { profile } = useProfile();
  const { mutate, isLoading } = useMutation({
    mutationFn: updateProfileImage,
    onError: () => {
      toast.error("Couldn't update profile image");
    },
    onSuccess: () => {
      queryClient.refetchQueries("profile");
      toast.success("Profile image has been changed");
    },
  });
  const { replace } = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams?.get("tab");
  const handleNavigation = (path: string) => {
    const params = new URLSearchParams(searchParams ?? {});
    if (path) {
      params.set("tab", path);
    } else {
      params.delete("tab");
    }
    // const query = `?tab=${path}`;
    replace(`${pathName}?${params}`);
  };

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        if (fileReader.readyState === 2) {
          const data = {
            image: fileReader.result,
          };
          mutate({ value: data });
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-auto flex flex-col w-full items-center  ">
      <div className="flex items-center justify-center w-full flex-col">
        <div className=" h-[180px] w-[180px] rounded-full relative bg-zinc-900/60 flex items-center justify-center m-5 ">
          {profile?.avatar?.url ? (
            <Image
              src={profile?.avatar.url}
              alt="avatar"
              width={600}
              height={600}
              className="w-[92%] h-[92%] rounded-full absolute object-cover"
            />
          ) : (
            <div
              className={`${
                alphabetsColor[
                  profile?.name.split(" ")?.[0].substring(0, 1).toUpperCase()
                ] ?? "bg-zinc-900/60"
              } h-full w-full rounded-full flex items-center justify-center text-4xl uppercase font-semibold`}
            >
              {profile?.name.split(" ")?.[0].substring(0, 1) +
                profile?.name.split(" ")?.[1].substring(0, 1) ?? ""}
            </div>
          )}
          <label
            htmlFor="avatar"
            className="absolute -bottom-1 right-3 bg-zinc-900/60 hover:bg-zinc-900 h-9 w-9 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition duration-200"
          >
            {isLoading ? (
              <Loader2 className=" animate-spin" size={17} />
            ) : (
              <Smile size={17} />
            )}
            <input
              id="avatar"
              type="file"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={handleSelectImage}
            />
          </label>
        </div>
        <hr />
        <div className="text-center leading-6 flex items-start gap-3">
          <div className="  flex flex-col items-center gap-1">
            <p className=" text-xl  font-semibold ">{profile?.name ?? "-"}</p>
            <p className="text-lg  font-semibold">
              @{profile?.username ?? "-"}
            </p>
          </div>

          <Link
            href={`/profile/${profile?._id}`}
            className="p-2 rounded-lg bg-zinc-900/40 hover:bg-zinc-900 cursor-pointer"
          >
            <Edit2 size={18} />
          </Link>
        </div>
        <div>
          <div className="flex   flex-row items-center justify-evenly px-5 md:gap-5 gap-2  mt-3">
            <div className="flex flex-col text-center ">
              <p className=" text-2xl font-semibold text-emerald-400">
                {profile?.streak ?? 0}
              </p>
              <p className=" text-neutral-300 ">Day Streaks</p>
            </div>
            <div className="h-6 w-[1px] bg-zinc-800" />
            <div className="flex flex-col text-center">
              <p className=" text-2xl font-semibold text-emerald-400">
                {profile?.followers ?? 0}
              </p>
              <p className=" text-neutral-300">Followers</p>
            </div>
            <div className="h-6 w-[1px] bg-zinc-800" />
            <div className="flex flex-col text-center">
              <p className=" text-2xl font-semibold text-emerald-400">
                {profile?.following ?? 0}
              </p>
              <p className=" text-neutral-300">Following</p>
            </div>
          </div>
        </div>
        <div className="w-full border-b border-zinc-900 flex items-center justify-center gap-2 mt-7">
          <div
            className={cn(
              " p-3 font-semibold tracking-wide  cursor-pointer flex gap-2 w-full sm:w-fit items-center justify-center",
              {
                "border-b-[4px] border-b-emerald-500":
                  search === "report" || search === null,
              }
            )}
            onClick={() => handleNavigation("report")}
          >
            <span className="sm:block hidden">My Stats</span>{" "}
            <LineChart size={15} />
          </div>
          <div
            className={cn(
              " p-3 font-semibold tracking-wide  cursor-pointer flex gap-2 w-full sm:w-fit items-center justify-center",
              {
                "border-b-[4px] border-b-emerald-500":
                  search === "achievements",
              }
            )}
            onClick={() => handleNavigation("achievements")}
          >
            <span className="sm:block hidden">Achievements</span>{" "}
            <Trophy size={15} />
          </div>
          <div
            className={cn(
              " p-3 font-semibold tracking-wide   cursor-pointer flex gap-2 w-full sm:w-fit items-center justify-center",
              {
                "border-b-[4px] border-b-emerald-500": search === "workouts",
              }
            )}
            onClick={() => handleNavigation("workouts")}
          >
            <span className="sm:block hidden">Workouts</span>{" "}
            <HeartPulse size={15} />
          </div>
        </div>
      </div>

      <div className="w-full bg-zinc-900/30 backdrop-blur-md lg:p-10 md:p-3 p-1 py-4 flex flex-col gap-5 min-h-[240px]">
        {(search === "report" || search === null) && <Reports />}
        {search === "achievements" && <Achievements />}
        {search === "workouts" && <Workouts />}
      </div>
    </div>
  );
};
export default Profile;

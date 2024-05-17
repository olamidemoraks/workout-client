"use client";
import { getProfile } from "@/api/user";
import useProfile from "@/hooks/useProfile";
import { cn } from "@/libs/utils";
import { HeartPulse, LineChart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import ProfileDetail from "./ProfileDetail";
import Reports from "./Report/Reports";
import Workouts from "./Workouts/Index";

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  const { replace } = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { profile } = useProfile();

  const id = searchParams?.get("id");
  console.log({ id });
  const {
    data,
    isLoading: profileLoading,
    refetch,
  } = useQuery({
    queryFn: async () => await getProfile(id!),
    queryKey: "user-profile",
    enabled: id == null ? false : true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  const otherProfile = data?.user as IUser;

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

  return (
    <>
      <div className="mx-auto flex flex-col w-full items-center relative ">
        <div className="flex items-center justify-center w-full flex-col">
          <ProfileDetail
            profile={id ? otherProfile : profile}
            personalPage={id ? false : true}
          />
          <div className="w-full border-b border-zinc-900 flex items-center justify-center gap-2 mt-7">
            <div
              className={cn(
                " p-3 text-zinc-400 font-semibold tracking-wide  cursor-pointer flex gap-2 w-full sm:w-fit items-center justify-center",
                {
                  "border-b-[4px] border-b-emerald-500 text-white":
                    search === "report" || search === null,
                }
              )}
              onClick={() => handleNavigation("report")}
            >
              <span
                className={`sm:block hidden ${
                  search === "report" ? "text-white" : "text-zinc-300"
                }`}
              >
                Stats
              </span>{" "}
              <LineChart size={20} />
            </div>

            {/* achievement */}
            {/* <div
              className={cn(
                " p-3 font-semibold text-zinc-400 tracking-wide  cursor-pointer flex gap-2 w-full sm:w-fit items-center justify-center",
                {
                  "border-b-[4px] border-b-emerald-500 text-white":
                    search === "achievements",
                }
              )}
              onClick={() => handleNavigation("achievements")}
            >
              <span className="sm:block hidden">Achievements</span>{" "}
              <Trophy size={15} />
            </div> */}
            <div
              className={cn(
                " p-3 font-semibold tracking-wide text-zinc-400 cursor-pointer flex gap-2 w-full sm:w-fit items-center justify-center",
                {
                  "border-b-[4px] border-b-emerald-500 text-white ":
                    search === "workouts",
                }
              )}
              onClick={() => handleNavigation("workouts")}
            >
              <span
                className={`sm:block hidden ${
                  search === "workouts" ? "text-white" : "text-zinc-300"
                }`}
              >
                Workouts
              </span>{" "}
              <HeartPulse size={20} />
            </div>
          </div>
        </div>

        <div className="w-full bg-zinc-900/30 backdrop-blur-md lg:p-10 md:p-3 p-1 py-4 flex flex-col gap-5 min-h-[240px]">
          {(search === "report" || search === null) && <Reports />}
          {/* {search === "achievements" && <Achievements />} */}
          {search === "workouts" && <Workouts />}
        </div>
      </div>
    </>
  );
};
export default Profile;

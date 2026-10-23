"use client";
import { getProfile } from "@/api/user";
import useProfile from "@/hooks/useProfile";
import { cn } from "@/libs/utils";
import { HeartPulse, LineChart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
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
  // Viewing your own id is the same as viewing your own profile.
  const viewingOther = !!id && id !== profile?._id;
  const { data, isLoading: profileLoading } = useQuery({
    queryFn: async () => await getProfile(id!),
    queryKey: ["user-profile", id],
    enabled: viewingOther,
    refetchOnWindowFocus: false,
  });

  const otherProfile = data?.user as IUser;

  const search = searchParams?.get("tab");
  const isReportTab = search === "report" || search === null;
  const isWorkoutsTab = search === "workouts";
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
          {viewingOther && profileLoading ? (
            <div className="flex flex-col items-center gap-3 m-5">
              <div className="md:h-[220px] md:w-[220px] h-[180px] w-[180px] rounded-full bg-zinc-900 animate-pulse" />
              <div className="h-6 w-40 rounded bg-zinc-900 animate-pulse" />
              <div className="h-5 w-28 rounded bg-zinc-900 animate-pulse" />
            </div>
          ) : viewingOther && !otherProfile ? (
            <div className="py-16 text-center">
              <p className="text-lg font-semibold">User not found</p>
              <p className="text-zinc-400 mt-1">
                This profile may have been removed.
              </p>
            </div>
          ) : (
            <ProfileDetail
              profile={viewingOther ? otherProfile : profile}
              personalPage={!viewingOther}
            />
          )}
          <div
            role="tablist"
            aria-label="Profile sections"
            className="w-full border-b border-zinc-900 flex items-center justify-center gap-2 mt-7"
          >
            <button
              type="button"
              role="tab"
              aria-selected={isReportTab}
              aria-label="Stats"
              className={cn(
                "group p-3 text-zinc-400 font-semibold tracking-wide cursor-pointer flex gap-2 w-full sm:w-fit items-center justify-center border-b-[4px] border-b-transparent hover:bg-zinc-900/50 transition-colors",
                {
                  "border-b-emerald-500 text-white": isReportTab,
                }
              )}
              onClick={() => handleNavigation("report")}
            >
              <span
                className={`sm:block hidden transition-colors ${
                  isReportTab ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                }`}
              >
                Stats
              </span>{" "}
              <LineChart
                size={20}
                className={isReportTab ? "stroke-emerald-400" : "stroke-zinc-400"}
              />
            </button>

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
            <button
              type="button"
              role="tab"
              aria-selected={isWorkoutsTab}
              aria-label="Workouts"
              className={cn(
                "group p-3 font-semibold tracking-wide text-zinc-400 cursor-pointer flex gap-2 w-full sm:w-fit items-center justify-center border-b-[4px] border-b-transparent hover:bg-zinc-900/50 transition-colors",
                {
                  "border-b-emerald-500 text-white": isWorkoutsTab,
                }
              )}
              onClick={() => handleNavigation("workouts")}
            >
              <span
                className={`sm:block hidden transition-colors ${
                  isWorkoutsTab ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                }`}
              >
                Workouts
              </span>{" "}
              <HeartPulse
                size={20}
                className={isWorkoutsTab ? "stroke-emerald-400" : "stroke-zinc-400"}
              />
            </button>
          </div>
        </div>

        <div className="w-full bg-zinc-900/30 backdrop-blur-md lg:p-10 md:p-3 p-1 py-4 flex flex-col items-center gap-5 min-h-[240px] h-full">
        <div className="flex justify-center w-full max-w-[2000px] flex-col gap-10 ">
          {isReportTab && <Reports />}
          {/* {search === "achievements" && <Achievements />} */}
          {isWorkoutsTab && <Workouts />}
        </div>
        </div>
      </div>
    </>
  );
};
export default Profile;

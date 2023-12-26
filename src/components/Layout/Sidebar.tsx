import { cn } from "@/libs/utils";
import {
  ActivityIcon,
  BarChart2,
  Dumbbell,
  LayoutDashboard,
  Star,
  User2,
} from "lucide-react";
import { BiCaretLeft, BiCaretRight, BiDumbbell, BiHome } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useParams, usePathname } from "next/navigation";

const navData = [
  {
    title: "Home",
    Icon: <LayoutDashboard size={23} />,
    navLink: "/",
  },
  {
    title: "Workout",
    Icon: <BiDumbbell size={23} />,
    navLink: "workouts",
  },
  {
    title: "Challenges",
    Icon: <Star size={22} />,
    navLink: "challenge",
  },
  {
    title: "Report",
    Icon: <BarChart2 size={23} />,
    navLink: "report",
  },
  {
    title: "My Profile",
    Icon: <User2 size={22} />,
    navLink: "profile",
  },
];

type SideBarProps = {
  setSideDrawer: (value: boolean) => void;
  sideDrawer: boolean;
};
const Sidebar = ({ setSideDrawer, sideDrawer }: SideBarProps) => {
  const pathName = usePathname()?.split("/")[1];

  return (
    <div
      className={cn(
        " min-h-screen border-r border-zinc-900 hidden sm:flex flex-col justify-between min-w-[200px] relative transition duration-200",
        {
          "min-w-[55px] transition duration-200": sideDrawer,
        }
      )}
    >
      <div
        onClick={() => setSideDrawer(true)}
        className={cn(
          "absolute top-3 right-0 bg-zinc-900 p-3 rounded-l-full hover:bg-zinc-800 cursor-pointer",
          {
            hidden: sideDrawer,
          }
        )}
      >
        <BiCaretLeft />
      </div>
      <div
        onClick={() => setSideDrawer(false)}
        className={cn(
          "absolute top-3 left-0 bg-zinc-900 p-3 rounded-r-full hover:bg-zinc-800 cursor-pointer",
          {
            hidden: !sideDrawer,
          }
        )}
      >
        <BiCaretRight />
      </div>
      <div className="w-full">
        <div className=" w-full items-center flex justify-center h-[100px] gap-1">
          {/* <div className="h-1 w-1 bg-primary rounded-full" />
          <div className="h-2 w-2 bg-indigo-500 rounded-full" /> */}
          {/* <div className=" bg-gradient-to-r from-indigo-500 to-sky-500 rotate-[30deg] rounded-full h-7 w-7 flex items-center justify-center">
            <ActivityIcon color="#000" />
          </div> */}
          {/* <div className="h-2 w-2 bg-cyan-500  rounded-full" />
          <div className="h-1 w-1 bg-primary rounded-full" /> */}
        </div>
        <div className=" flex flex-col gap-2 mt-10">
          {navData.map(({ Icon, navLink, title }) => (
            <Link
              href={`/${navLink}`}
              key={title}
              className={cn(
                "flex items-center px-5  gap-3   hover:bg-zinc-900  py-3",
                {
                  "bg-zinc-900 border-l-4 border-emerald-500  ":
                    navLink === pathName,
                }
              )}
            >
              <div className="relative">
                <div className="z-10 relative">{Icon}</div>
                <div
                  className={cn(
                    "h-full bg-gradient-to-r  from-emerald-500 w-full absolute top-0 z-0 blur-sm opacity-0 rounded-md ",
                    {
                      "opacity-50": navLink === pathName,
                    }
                  )}
                />
              </div>
              <p
                className={cn("text-neutral-400", {
                  " hidden": sideDrawer,
                  "text-white": navLink === pathName,
                })}
              >
                {title}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div className=" w-full flex justify-center relative">
        <div
          className={cn(
            "w-[90%] border h-[150px] border-zinc-900 rounded-t-2xl flex items-end justify-center pb-5",
            { "h-[100px]": sideDrawer }
          )}
        >
          <div className=" -z-10 h-full w-full absolute left-0 -bottom-6">
            <Image
              src={"/assets/ccchaos.svg"}
              alt="chaos"
              fill
              className=" motion-safe:animate-spin opacity-40 "
            />
          </div>
          <Link
            href={""}
            className="flex items-center justify-center gap-1 bg-gradient-to-r from-indigo-600 to-blue-600 p-2 rounded-lg z-10 absolute"
          >
            <p
              className={cn("", {
                hidden: sideDrawer,
              })}
            >
              Upgrade Pro
            </p>{" "}
            <Star className=" rotate-45 mb-1 fill-zinc-950" size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

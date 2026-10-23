import { cn } from "@/libs/utils";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiDumbbell } from "react-icons/bi";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { GiBodyBalance } from "react-icons/gi";
import { IoGrid } from "react-icons/io5";
import { focusRing } from "../auth/FormControls";

const iconClassName =
  "opacity-70 group-hover:opacity-100 group-hover:text-emerald-400 transition";

const navData = [
  {
    title: "Home",
    Icon: <IoGrid size={21} className={iconClassName} />,
    navLink: "",
  },
  {
    title: "Workouts",
    Icon: <BiDumbbell size={24} className={iconClassName} />,
    navLink: "workouts",
    // Workout and exercise detail pages belong to this section too.
    alsoActiveOn: ["workout", "exercise"],
  },
  {
    title: "Challenges",
    Icon: <GiBodyBalance size={23} className={iconClassName} />,
    navLink: "challenge",
  },
  // {
  //   title: "Explore",
  //   Icon: (
  //     <FaCompass
  //       size={21}
  //       className=" opacity-70 group-hover:opacity-100 group-hover:text-emerald-400"
  //     />
  //   ),
  //   navLink: "explore",
  // },
  {
    title: "Search",
    Icon: <FaSearch size={19} className={iconClassName} />,
    navLink: "search",
  },
  {
    title: "Profile",
    Icon: <FaUser size={19} className={iconClassName} />,
    navLink: "profile",
  },
];

type SideBarProps = {
  setSideDrawer: (value: boolean) => void;
  sideDrawer?: boolean;
  // Only set when rendered as the mobile drawer from the navbar.
  openMenu?: boolean;
};
const Sidebar = ({ setSideDrawer, sideDrawer, openMenu }: SideBarProps) => {
  const pathName = usePathname()?.split("/")[1] ?? "";
  const isMobileDrawer = openMenu !== undefined;
  const closeMobileDrawer = () => {
    if (isMobileDrawer) setSideDrawer(false);
  };

  return (
    <div
      className={cn(
        "  z-[100] sm:min-h-screen h-screen overflow-hidden border-r border-zinc-800 md:translate-x-0 -translate-x-[100%] flex flex-col justify-between  min-w-[200px] absolute top-0 left-0 md:relative transition duration-200 bg-zinc-950 ",
        {
          "min-w-[55px] transition duration-200": sideDrawer,
          "translate-x-0": openMenu,
        }
      )}
    >
      <div className="w-full ">
        <Link
          href={"/"}
          onClick={closeMobileDrawer}
          className={cn(
            " flex flex-col items-center justify-center py-3 group rounded-lg",
            focusRing
          )}
        >
          <Image
            src={"/assets/logo3.svg"}
            alt="MaxUp home"
            height={100}
            width={100}
          />
          {!sideDrawer && (
            <p className=" text-lg font-bold group-hover:tracking-[.25rem] transition-all ease-in-out duration-200 tracking-[.2rem] -mt-2">
              Ma<span className=" text-[28px]">x</span>up
            </p>
          )}
        </Link>

        {isMobileDrawer ? (
          <button
            type="button"
            onClick={() => setSideDrawer(false)}
            aria-label="Close menu"
            className={cn(
              "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-lg bg-zinc-900 hover:bg-zinc-800 transition",
              focusRing
            )}
          >
            <X size={18} className="stroke-zinc-300" />
          </button>
        ) : (
          <div
            className={cn("w-full sm:flex items-center transition-all hidden", {
              " justify-end": !sideDrawer,
              " justify-start": sideDrawer,
            })}
          >
            <button
              type="button"
              onClick={() => setSideDrawer(!sideDrawer)}
              aria-label={sideDrawer ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!sideDrawer}
              title={sideDrawer ? "Expand sidebar" : "Collapse sidebar"}
              className={cn(
                " bg-zinc-900 hover:bg-zinc-800 p-2 w-[70px] cursor-pointer justify-center flex items-center transition-all",
                focusRing,
                {
                  "rounded-l-full": !sideDrawer,
                  " rounded-r-full": sideDrawer,
                }
              )}
            >
              {sideDrawer ? (
                <FaAngleDoubleRight className=" fill-zinc-300" size={20} />
              ) : (
                <FaAngleDoubleLeft className=" fill-zinc-300" size={20} />
              )}
            </button>
          </div>
        )}

        <nav aria-label="Main" className=" flex flex-col gap-2 mt-5">
          {navData.map(({ Icon, navLink, title, alsoActiveOn }) => {
            const isActive =
              navLink === pathName || !!alsoActiveOn?.includes(pathName);

            return (
              <Link
                href={`/${navLink}`}
                key={title}
                onClick={closeMobileDrawer}
                aria-current={isActive ? "page" : undefined}
                aria-label={sideDrawer ? title : undefined}
                title={sideDrawer ? title : undefined}
                className={cn(
                  "flex items-center px-5 gap-3 group hover:bg-zinc-900 py-3 border-l-4 border-transparent transition-colors",
                  focusRing,
                  {
                    " justify-center": sideDrawer,
                    "bg-zinc-900 border-emerald-500": isActive,
                  }
                )}
              >
                <div className="relative group h-6 w-6 flex items-center justify-center shrink-0">
                  <div className="z-10 relative">{Icon}</div>
                  <div
                    className={cn(
                      "h-full bg-gradient-to-r  from-emerald-500 w-full absolute top-0 z-0 blur-sm opacity-0 rounded-md transition-opacity",
                      {
                        "opacity-50": isActive,
                      }
                    )}
                  />
                </div>
                <p
                  className={cn(
                    "text-neutral-400 group-hover:text-neutral-200 transition-colors",
                    {
                      " hidden": sideDrawer,
                      "text-white group-hover:text-white": isActive,
                    }
                  )}
                >
                  {title}
                </p>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className=" w-full flex justify-center relative">
        <div
          className={cn(
            "w-[90%] h-[70px] rounded-t-2xl flex items-center justify-center",
            { "h-[100px]": sideDrawer }
          )}
        >
          <Link
            href="/logout"
            aria-label={sideDrawer ? "Log out" : undefined}
            title={sideDrawer ? "Log out" : undefined}
            className={cn(
              "flex group gap-2 items-center justify-center h-[70%] cursor-pointer w-[100%] p-2 z-10 rounded-xl hover:bg-zinc-900 transition-colors",
              focusRing
            )}
          >
            <FaSignOutAlt
              className=" fill-zinc-300 group-hover:fill-red-400 transition-colors"
              size={22}
            />
            <p
              className={cn(
                " uppercase text-zinc-300 group-hover:text-red-400 transition-colors",
                {
                  hidden: sideDrawer,
                }
              )}
            >
              Log out
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

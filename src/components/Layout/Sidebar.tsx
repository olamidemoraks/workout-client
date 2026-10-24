import useProfile from "@/hooks/useProfile";
import { cn } from "@/libs/utils";
import { alphabetsColor } from "@/utils/data";
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
import { FaListCheck, FaUser } from "react-icons/fa6";
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
  {
    title: "Programs",
    Icon: <FaListCheck size={20} className={iconClassName} />,
    navLink: "programs",
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

// Shared by the width and fold animations so everything moves together.
const ease = "duration-300 ease-in-out";

type SideBarProps = {
  setSideDrawer: (value: boolean) => void;
  sideDrawer?: boolean;
  // Only set when rendered as the mobile drawer from the navbar.
  openMenu?: boolean;
};
const Sidebar = ({ setSideDrawer, sideDrawer, openMenu }: SideBarProps) => {
  const pathName = usePathname()?.split("/")[1] ?? "";
  const { profile } = useProfile();
  const isMobileDrawer = openMenu !== undefined;
  // The mobile drawer always shows labels; only the desktop rail collapses.
  const collapsed = !isMobileDrawer && !!sideDrawer;
  const closeMobileDrawer = () => {
    if (isMobileDrawer) setSideDrawer(false);
  };

  // Labels stay in the DOM and fade, so collapsing doesn't make icons jump.
  const labelClassName = cn("whitespace-nowrap transition-opacity", ease, {
    "opacity-0": collapsed,
  });

  return (
    <div
      className={cn(
        "z-[100] h-screen overflow-hidden border-r border-zinc-800 flex flex-col justify-between shrink-0 absolute top-0 left-0 md:relative bg-zinc-950 transition-[width,transform]",
        ease,
        isMobileDrawer
          ? cn("w-[260px] max-w-[85vw]", openMenu ? "translate-x-0" : "-translate-x-full")
          : cn(
              // Below md the navbar's drawer takes over, so hide this copy
              // from keyboard and screen readers too.
              "-translate-x-full md:translate-x-0 max-md:invisible",
              collapsed ? "w-[64px]" : "w-[200px]"
            )
      )}
    >
      <div className="w-full ">
        <Link
          href={"/"}
          onClick={closeMobileDrawer}
          aria-label="MaxUp home"
          className={cn(
            " flex flex-col items-center justify-center py-3 group rounded-lg",
            focusRing
          )}
        >
          <div
            className={cn(
              "relative transition-[width,height]",
              ease,
              collapsed ? "h-[52px] w-[52px]" : "h-[100px] w-[100px]"
            )}
          >
            <Image
              src={"/assets/logo3.svg"}
              alt=""
              fill
              sizes="100px"
              priority
              className="object-contain"
            />
          </div>
          {/* Folds to zero height when collapsed (0fr row) instead of popping. */}
          <div
            className={cn(
              "grid transition-[grid-template-rows,opacity]",
              ease,
              collapsed ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
            )}
          >
            <p className=" overflow-hidden whitespace-nowrap text-lg font-bold group-hover:tracking-[.25rem] transition-all ease-in-out duration-200 tracking-[.2rem] -mt-2">
              Ma<span className=" text-[28px]">x</span>up
            </p>
          </div>
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
            className={cn("w-full md:flex items-center hidden", {
              " justify-end": !collapsed,
              " justify-start": collapsed,
            })}
          >
            <button
              type="button"
              onClick={() => setSideDrawer(!sideDrawer)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!collapsed}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={cn(
                " bg-zinc-900 hover:bg-zinc-800 p-2 cursor-pointer justify-center flex items-center transition-colors",
                focusRing,
                collapsed ? "w-[52px] rounded-r-full" : "w-[70px] rounded-l-full"
              )}
            >
              {collapsed ? (
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
                aria-label={collapsed ? title : undefined}
                title={collapsed ? title : undefined}
                className={cn(
                  // pl-4 + the 4px border centres the 24px icon in the 64px
                  // rail, so icons stay put while the width animates.
                  "flex items-center pl-4 pr-4 gap-3 group hover:bg-zinc-900 py-3 border-l-4 border-transparent transition-colors",
                  focusRing,
                  {
                    "bg-zinc-900 border-emerald-500": isActive,
                    "py-3.5": isMobileDrawer,
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
                    "text-neutral-400 group-hover:text-neutral-200",
                    labelClassName,
                    "transition-[color,opacity]",
                    {
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

      <div className="w-full flex flex-col gap-1 p-2 border-t border-zinc-800">
        {profile && (
          <Link
            href="/profile"
            onClick={closeMobileDrawer}
            aria-label={collapsed ? `Your profile, ${profile.name}` : undefined}
            title={collapsed ? profile.name : undefined}
            className={cn(
              "flex items-center gap-3 px-1.5 py-1.5 rounded-xl hover:bg-zinc-900 transition-colors",
              focusRing
            )}
          >
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-zinc-800">
              {profile.avatar?.url ? (
                <Image
                  src={profile.avatar.url}
                  alt=""
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              ) : (
                <div
                  className={`${
                    alphabetsColor[
                      profile.name?.split(" ")?.[0]?.substring(0, 1).toUpperCase()
                    ] ?? "bg-zinc-800"
                  } h-full w-full flex items-center justify-center text-sm font-semibold uppercase`}
                >
                  {profile.name?.substring(0, 1)}
                </div>
              )}
            </div>
            <div className={cn("min-w-0", labelClassName)}>
              <p className="truncate text-sm font-semibold capitalize">
                {profile.name}
              </p>
              <p className="truncate text-xs text-zinc-400">
                @{profile.username}
              </p>
            </div>
          </Link>
        )}
        <Link
          href="/logout"
          aria-label={collapsed ? "Log out" : undefined}
          title={collapsed ? "Log out" : undefined}
          className={cn(
            "flex group gap-3 items-center px-1.5 py-1.5 cursor-pointer rounded-xl hover:bg-zinc-900 transition-colors",
            focusRing
          )}
        >
          <div className="h-9 w-9 shrink-0 flex items-center justify-center">
            <FaSignOutAlt
              className=" fill-zinc-300 group-hover:fill-red-400 transition-colors"
              size={22}
            />
          </div>
          <p
            className={cn(
              " uppercase text-sm text-zinc-300 group-hover:text-red-400",
              labelClassName,
              "transition-[color,opacity]"
            )}
          >
            Log out
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

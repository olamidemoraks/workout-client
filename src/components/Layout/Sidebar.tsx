import useProfile from "@/hooks/useProfile";
import useStreak from "@/hooks/useStreak";
import { cn } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiCaretLeft, BiCaretRight, BiDumbbell } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { GiBodyBalance } from "react-icons/gi";
import { IoGrid } from "react-icons/io5";

const navData = [
  {
    title: "Home",
    Icon: (
      <IoGrid
        size={21}
        className=" opacity-70 group-hover:opacity-100 group-hover:text-emerald-400"
      />
    ),
    navLink: "",
  },
  {
    title: "Workouts",
    Icon: (
      <BiDumbbell
        size={25}
        className=" opacity-70 group-hover:opacity-100 group-hover:text-emerald-400"
      />
    ),
    navLink: "workouts",
  },
  {
    title: "Challenges",
    Icon: (
      <GiBodyBalance
        size={24}
        className=" opacity-70 group-hover:opacity-100 group-hover:text-emerald-400"
      />
    ),
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
    Icon: (
      <FaSearch
        size={21}
        className=" opacity-70 group-hover:opacity-100 group-hover:text-emerald-400"
      />
    ),
    navLink: "search",
  },
  {
    title: "Profile",
    Icon: (
      <FaUser
        size={20}
        className=" opacity-70 group-hover:opacity-100 group-hover:text-emerald-400"
      />
    ),
    navLink: "profile",
  },
];

type SideBarProps = {
  setSideDrawer: (value: boolean) => void;
  sideDrawer?: boolean;
  openMenu?: boolean;
};
const Sidebar = ({ setSideDrawer, sideDrawer, openMenu }: SideBarProps) => {
  const { profile } = useProfile();
  const pathName = usePathname()?.split("/")[1];
  return (
    <div
      className={cn(
        " sm:min-h-screen h-screen overflow-hidden border-r border-zinc-800 md:translate-x-0 -translate-x-[100%] flex flex-col justify-between  min-w-[200px] absolute top-0 left-0 md:relative transition duration-200 bg-zinc-950 ",
        {
          "min-w-[55px] transition duration-200": sideDrawer,
          "translate-x-0": openMenu,
        }
      )}
    >
      <div
        className={`block md:hidden ${
          openMenu ? "opacity-100" : "opacity-0"
        } mt-3 absolute top-7`}
      ></div>
      <div
        onClick={() => setSideDrawer(openMenu ? false : true)}
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
            <>
              <Link
                href={`/${navLink}`}
                key={title}
                className={cn(
                  "flex items-center px-5  gap-3  group hover:bg-zinc-900  py-3",
                  {
                    "bg-zinc-900 border-l-4 border-emerald-500  ":
                      navLink === pathName,
                  }
                )}
              >
                <div className="relative group">
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
            </>
          ))}
        </div>
      </div>
      <div className=" w-full flex justify-center relative">
        <div
          className={cn(
            "w-[90%] h-[70px] rounded-t-2xl flex items-center justify-center",
            { "h-[100px]": sideDrawer }
          )}
        >
          <div className="pointer-events-none absolute -bottom-5  transform-gpu  -z-20 h-[80%] w-[80%] ">
            <div
              style={{
                clipPath:
                  "polygon(7.1% 44.1%, 100% 10.6%, 97.5% 26.9%, 85.5% 0.1%, 7.1% 44.1%, 100% 10.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 12.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="h-[80%] w-[80%] bg-gradient-to-tr from-purple-500 to-green-600 opacity-100 animate-pulse"
            />
          </div>

          <Link
            href={""}
            className="flex group items-center justify-center backdrop-blur-md h-[100%]   w-[100%] p-2  z-10 border-t border-zinc-800"
          >
            <p
              className={cn(" font-semibold uppercase  ", {
                hidden: sideDrawer,
              })}
            >
              Go Pro
            </p>{" "}
            {/* <GiCutDiamond className="text-2xl  fill-purple-400 transition-colors duration-700 group-hover:fill-emerald-400" /> */}
            <Image
              src={"/assets/premium.gif"}
              alt="purple diamond"
              height={150}
              width={150}
              className="h-[50px] w-[50px] object-cover  mb-7"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

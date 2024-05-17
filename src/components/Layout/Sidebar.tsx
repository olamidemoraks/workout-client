import { logout } from "@/api/user";
import { cn } from "@/libs/utils";
import {
  deleteTokenFromLocalStorage,
  getTokenFromLocalStorage,
} from "@/utils/localstorage";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const pathName = usePathname()?.split("/")[1];
  const router = useRouter();
  const [isLogout, setIsLogout] = useState(false);
  function logoutGen() {
    signOut();
    deleteTokenFromLocalStorage();
  }

  // function logout() {
  //   signOut();
  //   deleteTokenFromLocalStorage();
  // }

  useEffect(() => {
    let token: any;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("userTK");
    }
    if (!token && isLogout) {
      router.push("/login");
    }
  }, [isLogout]);
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
      {/* <div
        onClick={() => setSideDrawer(openMenu ? false : true)}
        className={cn(
          "fixed sm:top-[5.2rem] top-[2rem]  right-[2rem] p-3 z-[100] cursor-pointer",
          {
            hidden: sideDrawer,
          }
        )}
      >
     
      </div> */}

      <div className="w-full ">
        <Link
          href={"/"}
          className=" flex flex-col items-center justify-center py-3 group"
        >
          <Image
            src={"/assets/logo3.svg"}
            alt="logo"
            height={100}
            width={100}
          />
          {!sideDrawer && (
            <p className=" text-lg font-bold group-hover:tracking-[.25rem] transition-all ease-in-out duration-200 tracking-[.2rem] -mt-2">
              Ma<span className=" text-[28px]">x</span>up
            </p>
          )}
        </Link>

        <div
          className={cn("w-full sm:flex items-center transition-all hidden", {
            " justify-end": !sideDrawer,
            " justify-start": sideDrawer,
          })}
        >
          <div
            onClick={() => setSideDrawer(!sideDrawer)}
            className={cn(
              " bg-zinc-900  p-2 w-[70px] cursor-pointer justify-center flex items-center transition-all",
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
          </div>
        </div>

        <div className=" flex flex-col gap-2 mt-5">
          {navData.map(({ Icon, navLink, title }) => (
            <>
              <Link
                href={`/${navLink}`}
                key={title}
                className={cn(
                  "flex items-center px-5 gap-3 group hover:bg-zinc-900  py-3",
                  {
                    " justify-center": sideDrawer,
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
          {/* <div className="pointer-events-none absolute -bottom-5  transform-gpu  -z-20 h-[80%] w-[80%] ">
            <div
              style={{
                clipPath:
                  "polygon(7.1% 44.1%, 100% 10.6%, 97.5% 26.9%, 85.5% 0.1%, 7.1% 44.1%, 100% 10.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 12.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="h-[80%] w-[80%] bg-gradient-to-tr from-purple-500 to-green-600 opacity-100 animate-pulse"
            />
          </div> */}

          <div
            onClick={() => {
              logoutGen();
            }}
            className="flex group gap-2 items-center justify-center backdrop-blur-md h-[100%] cursor-pointer   w-[100%] p-2  z-10 "
          >
            {/* <GiCutDiamond className="text-2xl  fill-purple-400 transition-colors duration-700 group-hover:fill-emerald-400" /> */}
            {/* <Image
              src={"/assets/premium.gif"}
              alt="purple diamond"
              height={150}
              width={150}
              className="h-[50px] w-[50px] object-cover  mb-7"
            /> */}
            <FaSignOutAlt className=" fill-zinc-300" size={22} />
            <p
              className={cn(" uppercase  ", {
                hidden: sideDrawer,
              })}
            >
              LogOut
            </p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

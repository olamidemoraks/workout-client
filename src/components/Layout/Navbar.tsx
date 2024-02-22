import useProfile from "@/hooks/useProfile";
import { Bell, Menu } from "lucide-react";
import { FaCaretDown } from "react-icons/fa6";
import React, { useEffect, useRef, useState } from "react";
import UserStreak from "../Profile/Report/UserStreak";
import { useQuery } from "react-query";
import { BiMenu } from "react-icons/bi";
import Sidebar from "./Sidebar";
import { cn } from "@/libs/utils";
import Image from "next/image";
import NavbarMenu from "./NavbarMenu";

const Navbar = () => {
  const { profile, isLoading } = useProfile();

  const [openSidebar, setOpenSidebar] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        // Clicked outside the element, do something
        setOpenSidebar(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-md:fixed top-0  w-full md:px-10  px-3 py-5 flex justify-between items-center bg-zinc-950/70 backdrop-blur-sm gap-5 z-20 border-b border-b-zinc-900">
      <div className="flex gap-2 items-center  relative  max-[280px]:w-full max-sm:justify-evenly">
        <BiMenu
          onClick={() => setOpenSidebar((prev) => !prev)}
          className=" fill-zinc-200 -mb-4 hover:p-1 hover:bg-zinc-900 rounded-full transition duration-300 cursor-pointer block md:hidden"
          size={30}
        />

        <div
          ref={sidebarRef}
          className={cn(
            "fixed top-0 left-0 z-50  transition duration-200 delay-100 md:hidden flex bg-black w-full",
            {
              "translate-x-0": openSidebar,
            }
          )}
        >
          <Sidebar setSideDrawer={setOpenSidebar} openMenu={openSidebar} />
        </div>

        <div className="md:block hidden">
          <UserStreak streak={profile?.streak ?? 0} />
        </div>
      </div>
      <div className="flex justify-between items-center gap-5">
        <div className="relative hidden sm:block">
          <Bell className="" />
          <div className="h-2 w-2 bg-emerald-600 ring-4 ring-emerald-600/20 absolute rounded-full top-0 right-0" />
        </div>
        <NavbarMenu profile={profile} />
      </div>
    </div>
  );
};

export default Navbar;

import useProfile from "@/hooks/useProfile";
import { Bell } from "lucide-react";
import { FaCaretDown } from "react-icons/fa6";
import React from "react";

const Navbar = () => {
  const { profile, isLoading } = useProfile();
  return (
    <div className=" w-full px-10 py-7 flex justify-between items-center backdrop-blur-sm gap-5 z-20">
      <div className="">
        {/* <p className=" text-2xl capitalize">Hello {profile?.username}</p>
        <p className=" text-3xl font-bold">Let&apos;s Workout 🔥</p> */}
      </div>
      <div className="flex justify-between items-center gap-5">
        <div className="relative">
          <Bell className="" />
          <div className="h-2 w-2 bg-emerald-600 ring-4 ring-emerald-600/20 absolute rounded-full top-0 right-0" />
        </div>
        <div className="flex items-center gap-2">
          {profile?.avatar?.url ? (
            "image"
          ) : (
            <div className=" bg-zinc-800 h-10 w-10 flex items-center justify-center rounded-full font-semibold uppercase text-lg">
              {profile?.username?.substring(0, 1)}
            </div>
          )}
          <FaCaretDown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

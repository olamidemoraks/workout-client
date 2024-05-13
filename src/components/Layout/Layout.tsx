"use client";
import React, { PropsWithChildren, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Protected from "@/hooks/protected";
import Image from "next/image";

const Layout = ({ children }: PropsWithChildren) => {
  const [sideDrawer, setSideDrawer] = useState(true);
  return (
    <Protected>
      <div className="flex w-full h-screen overflow-hidden ">
        <Sidebar setSideDrawer={setSideDrawer} sideDrawer={sideDrawer} />
        <div className="w-full h-full relative overflow-y-auto overflow-x-hidden scrollbar scrollbar-none scroll-smooth ">
          <div className="sm:relative fixed top-0 w-full z-[30]">
            <Navbar />
          </div>
          <div className="w-full h-full absolute ">
            {/* <div className="absolute -top-10 z-[-2] min-h-[89vh] h-full w-full bg-[#000000] bg-[radial-gradient(#ffffff1f_1px,#09090b_1px)] bg-[size:20px_20px]"></div> */}
            {/* <Image
              src={"/assets/nnnoise.svg"}
              fill
              alt="bg-noise"
              className="absolute object-cover -top-10 z-[-2] h-[100vh] w-full "
            /> */}

            <div className=" scrollbar-thin scrollbar-track-zinc-800  scrollbar-thumb-zinc-400 scroll-smooth overflow-y-auto min-h-[100vh] w-full sm:py-[1rem] py-[6rem] bg-[#000000] bg-[radial-gradient(#ffffff1f_1px,#09090b_1px)] bg-[size:20px_20px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Protected>
  );
};

export default Layout;

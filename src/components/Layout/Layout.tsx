"use client";
import React, { PropsWithChildren, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Protected from "@/hooks/protected";

const Layout = ({ children }: PropsWithChildren) => {
  const [sideDrawer, setSideDrawer] = useState(true);
  return (
    <div className="flex w-full h-screen overflow-hidden ">
      <Sidebar setSideDrawer={setSideDrawer} sideDrawer={sideDrawer} />
      <div className="w-full h-full relative overflow-y-auto overflow-x-hidden scrollbar scrollbar-none scroll-smooth ">
        <Navbar />
        <Protected>
          <div className="w-full h-full absolute md:mt-[2rem]  mt-[5rem]">
            <div className="absolute -top-10 z-[-2] min-h-[89vh] h-full w-full bg-[#000000] bg-[radial-gradient(#ffffff1f_1px,#09090b_1px)] bg-[size:20px_20px]"></div>
            <br className=" sm:hidden block" />
            <br className=" sm:hidden block" />
            {children}
          </div>
        </Protected>
      </div>
    </div>
  );
};

export default Layout;

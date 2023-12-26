"use client";
import React, { PropsWithChildren, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Protected from "@/hooks/protected";

const Layout = ({ children }: PropsWithChildren) => {
  const [sideDrawer, setSideDrawer] = useState(false);
  return (
    <div className="flex w-full min-h-screen h-full overflow-y-hidden">
      <Sidebar setSideDrawer={setSideDrawer} sideDrawer={sideDrawer} />
      <div className="w-full relative overflow-y-auto scroll-smooth scrollbar-thin scrollbar-track-inherit scrollbar-thumb-zinc-800">
        <Navbar />
        {/* <Protected> */}
        <div className="w-full absolute">{children}</div>
        {/* </Protected> */}
      </div>
    </div>
  );
};

export default Layout;

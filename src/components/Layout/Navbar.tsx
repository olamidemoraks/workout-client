import useProfile from "@/hooks/useProfile";
import { cn } from "@/libs/utils";
import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BiMenu, BiSolidBell } from "react-icons/bi";
import Battery from "../Common/Battery";
import UserStreak from "../Common/UserStreak";
import NavbarMenu from "./NavbarMenu";
import Sidebar from "./Sidebar";
import Notification from "../Notification/Index";
import useNotification from "@/hooks/useNotification";
import { useDispatch } from "react-redux";
import { readNotification } from "@/redux/feature/socketSlice";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { profile } = useProfile();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openNotificationbar, setOpenNotificationbar] = useState(false);
  const { newNotification } = useNotification({ open: openNotificationbar });
  const dispatch = useDispatch();

  const sidebarRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasMenuOpen = useRef(false);
  // The drawer is portalled to <body>: this nav's backdrop-blur makes it the
  // containing block for fixed children, which would clip a full-screen
  // backdrop to the navbar's height.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Esc closes the menu.
  useEffect(() => {
    if (!openSidebar) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenSidebar(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openSidebar]);

  // Move focus into the drawer when it opens and back to the menu button
  // when it closes.
  useEffect(() => {
    if (openSidebar) {
      sidebarRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    } else if (wasMenuOpen.current) {
      menuButtonRef.current?.focus();
    }
    wasMenuOpen.current = openSidebar;
  }, [openSidebar]);

  const handleNoficationBar = () => {
    setOpenNotificationbar(true);
    dispatch(readNotification({}));
  };
  return (
    <nav className="w-full flex bg-zinc-950/70 backdrop-blur-sm border-b-zinc-800 border-b">
      <div className="relative  w-full md:px-5  px-3 py-2 flex justify-between items-center  gap-5 z-20  ">
        <div className="flex  items-center">
          <Link
            href={"/"}
            className="sm:hidden flex items-center justify-center relative sm:h-[70px] h-[60px]   sm:w-[80px] w-[70px]  flex-col "
          >
            <Image
              src={"/assets/logo3.svg"}
              alt="logo"
              height={100}
              width={100}
              className="max-sm:absolute w-full h-full"
            />
          </Link>
          <div className="md:block hidden">
            <UserStreak />
          </div>
        </div>

        <div className="flex justify-between items-center gap-2">
          <div
            onClick={handleNoficationBar}
            className="relative bg-zinc-800/75 rounded-lg flex items-center justify-center h-10 w-10  cursor-pointer"
          >
            <BiSolidBell
              size={21}
              className=" fill-neutral-400 hover:fill-neutral-200"
            />
            {newNotification && (
              <div className="h-2 w-2 bg-emerald-600 ring-4 ring-emerald-600/20 absolute rounded-full top-2 right-2" />
            )}
          </div>
          <div className="flex items-start gap-2  transition-all px-3 py-2 rounded-lg">
            <NavbarMenu profile={profile} />
          </div>

          <div className="flex gap-2 items-center  relative  max-[280px]:w-full">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpenSidebar((prev) => !prev)}
              aria-label="Open menu"
              aria-expanded={openSidebar}
              aria-controls="mobile-menu"
              className="md:hidden block rounded-full hover:bg-zinc-900 transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <BiMenu className=" fill-zinc-200" size={30} />
            </button>

            {mounted &&
              createPortal(
                <div className="md:hidden">
                  <div
                    aria-hidden
                    onClick={() => setOpenSidebar(false)}
                    className={cn(
                      "fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm transition-opacity duration-300",
                      openSidebar ? "opacity-100" : "pointer-events-none opacity-0"
                    )}
                  />
                  <div
                    ref={sidebarRef}
                    id="mobile-menu"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Menu"
                    className={cn(
                      "fixed top-0 left-0 z-[100] transition-[visibility] duration-300",
                      // Hidden drawer links shouldn't be reachable with Tab.
                      { invisible: !openSidebar }
                    )}
                  >
                    <Sidebar
                      setSideDrawer={setOpenSidebar}
                      openMenu={openSidebar}
                    />
                  </div>
                </div>,
                document.body
              )}
          </div>
          <Notification
            open={openNotificationbar}
            setClose={() => setOpenNotificationbar(false)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

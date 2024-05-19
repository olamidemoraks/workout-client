import useNotification from "@/hooks/useNotification";
import { ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotifcationCard from "./NotifcationCard";
import useProfile from "@/hooks/useProfile";
import { receiveNotification } from "@/redux/feature/socketSlice";
import CustomLoader from "../Common/CustomLoader";

type IndexProps = {
  open: boolean;
  setClose: () => void;
};

const Notification: React.FC<IndexProps> = ({ open, setClose }) => {
  const { data, isLoading, refetch } = useNotification({ open });
  const { profile } = useProfile();
  const dispatch = useDispatch();
  const { socket } = useSelector((state: any) => state.socket);
  const [audio] = useState<HTMLAudioElement>(
    new Audio("/audio/notification-sound.mp3")
  );
  const notifications = data?.notifications as INotification[];

  const notificationBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        notificationBar.current &&
        !notificationBar.current.contains(event.target)
      ) {
        // Clicked outside the element, do something
        setClose();
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const playerNotificationSound = useCallback(() => {
    audio.play();
  }, [audio]);

  console.log({ socket });
  useEffect(() => {
    if (profile) {
      if (socket && socket.current !== null) {
        socket.current.on(
          "receive-notification",
          (data: { success: boolean }) => {
            if (data.success) {
              playerNotificationSound();
              dispatch(receiveNotification({}));
              refetch();
            }
          }
        );
      }
    }
  }, [socket, profile, playerNotificationSound, dispatch, refetch]);

  return (
    <div
      ref={notificationBar}
      className={` z-[100] transition-all delay-75 duration-200 ${
        open ? "translate-x-0" : "translate-x-[110%]"
      } rounded border border-zinc-800 bg-zinc-900 sm:w-[400px] w-screen h-[calc(100vh-100px)] absolute sm:right-2 right-0 sm:top-[5.8rem] top-[5rem]`}
    >
      <div className=" border-b border-zinc-800 px-2 py-3 flex justify-between items-center">
        <p className=" text-lg font-semibold text-zinc-300">
          Notification {notifications?.length}
        </p>
        <button
          type="button"
          onClick={setClose}
          className="h-10 w-10 transition-all group  hover:bg-zinc-700/50 rounded-full flex justify-center items-center"
        >
          <ChevronRight size={24} className=" text-zinc-300" />
        </button>
      </div>

      {isLoading && <CustomLoader weight="w-full" height="60px" amount={5} />}
      <div className=" px-2 mt-4 flex flex-col-reverse gap-3">
        {notifications?.map((notification, idx) => (
          <div
            key={notification?._id}
            className={`border-b ${
              notifications?.length - 1 === idx
                ? "border-zinc-700/50"
                : "border-transparent"
            }`}
          >
            <NotifcationCard notification={notification} refetch={refetch} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Notification;

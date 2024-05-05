"use client";
import { redirect } from "next/navigation";
import { PropsWithChildren, useEffect, useRef } from "react";
import useProfile from "./useProfile";
import { Loader2 } from "lucide-react";
import { useMutation } from "react-query";
import { checkUser, socialAuthentication } from "@/api/user";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";
import { useDispatch } from "react-redux";
import { getSocket } from "@/redux/feature/socketSlice";
import OnboardingScreen from "@/components/Common/OnboardingScreen";

const Protected = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch();
  const { isLoading, profile } = useProfile();
  const { data } = useSession();
  const { mutate: socialAuth, isLoading: authLoading } = useMutation({
    mutationFn: socialAuthentication,
  });
  const { mutate: checkUserExist, isLoading: checkingForUser } = useMutation({
    mutationFn: checkUser,
    onSuccess: (response) => {
      if (data) {
        if (response.success) {
          socialAuth({
            name: data!.user!.name as string,
            username: (data!.user!.name as string).split(" ")?.[0],
            email: data!.user!.email as string,
          });
        } else if (!response.success) {
          redirect("/login");
        }
      }
    },
  });

  useEffect(() => {
    if (!profile) {
      if (data?.user) {
        checkUserExist({ value: { email: data?.user?.email } });
      }
    }
  }, [checkUserExist, data, profile]);

  const socket = useRef<Socket | null>(null);
  // add socket to global state

  useEffect(() => {
    if (profile) {
      if (!socket.current) {
        socket.current = io(`${process.env.NEXT_PUBLIC_SOCKET_URI}`);
        socket.current.emit("add-user", profile?._id);
      }
      dispatch(getSocket({ socket }));
    }
  }, [profile, dispatch]);
  return (
    <>
      {isLoading || checkingForUser || authLoading ? (
        <OnboardingScreen isLoading={isLoading} />
      ) : (
        <>{profile ? children : redirect("/login")}</>
      )}
    </>
  );
};

export default Protected;

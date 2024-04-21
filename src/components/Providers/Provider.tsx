"use client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

const Provider = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </SessionProvider>
  );
};

export default Provider;

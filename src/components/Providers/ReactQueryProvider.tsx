"use client";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";

type ReactQueryProviderProps = {
  children: ReactNode;
};

const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({
  children,
}) => {
  const client = new QueryClient();
  return (
    <SessionProvider>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};
export default ReactQueryProvider;

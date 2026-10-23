"use client";
import React, { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";

type ReactQueryProviderProps = {
  children: ReactNode;
};

const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({
  children,
}) => {
  // Created once; a new client on every render would drop the whole cache.
  const [client] = useState(() => new QueryClient());
  return (
    <SessionProvider>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};
export default ReactQueryProvider;

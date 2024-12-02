"use client";
import { queryClient } from "@/utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

import React from "react";
import { UserProvider } from "./context/userContext";

export default function Authprovider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>{children}</UserProvider>
    </QueryClientProvider>
  );
}

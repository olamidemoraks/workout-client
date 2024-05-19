import { getNotifications } from "@/api/activity";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

const useNotification = ({ open }: { open: boolean }) => {
  const { isLoading, data, refetch, isFetching } = useQuery({
    queryFn: getNotifications,
    queryKey: "notification",
    enabled: open,
  });
  const { newNotification } = useSelector((state: any) => state.socket);
  return {
    isLoading: isLoading || isFetching,
    data,
    refetch,
    newNotification,
  };
};

export default useNotification;

import { getTokenFromLocalStorage } from "@/utils/localstorage";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URI;

const token = getTokenFromLocalStorage();
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

export const createActivity = async ({ data }: { data: any }) => {
  try {
    const response = await axios.post(
      `${baseUrl}/create-activity`,
      { ...data },
      { withCredentials: true, headers }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const activityReport = async ({ params }: { params: any }) => {
  const query = new URLSearchParams(params ?? {});

  try {
    const response = await axios.get(`${baseUrl}/activity-report?${query}`, {
      withCredentials: true,
      headers,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};
export const recentRctivity = async ({ params }: { params: any }) => {
  const query = new URLSearchParams(params ?? {});
  try {
    const response = await axios.get(`${baseUrl}/recent-activity?${query}`, {
      withCredentials: true,
      headers,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};
export const allActivities = async ({ params }: { params: any }) => {
  const query = new URLSearchParams(params ?? {});
  try {
    const response = await axios.get(`${baseUrl}/all-activity?${query}`, {
      withCredentials: true,
      headers,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};
export const getNotifications = async () => {
  try {
    const response = await axios.get(`${baseUrl}/notification`, {
      withCredentials: true,
      headers,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};
export const updateNotifications = async ({ id }: { id: string }) => {
  try {
    const response = await axios.put(
      `${baseUrl}/notification/${id}`,
      {},
      {
        withCredentials: true,
        headers,
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

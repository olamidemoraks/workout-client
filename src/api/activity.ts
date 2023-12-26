import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URI;

const headers = {
  "Content-Type": "application/json",
};

export const createActivity = async ({
  workoutId,
  totalTime,
}: {
  workoutId: string;
  totalTime: number;
}) => {
  try {
    const response = await axios.post(
      `${baseUrl}/create-activity`,
      { workoutId, totalTime },
      { withCredentials: true, headers }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const activityReport = async () => {
  try {
    const response = await axios.get(`${baseUrl}/activity-report`, {
      withCredentials: true,
      headers,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};
export const recentRctivity = async () => {
  try {
    const response = await axios.get(`${baseUrl}/recent-activity`, {
      withCredentials: true,
      headers,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

import { getTokenFromLocalStorage } from "@/utils/localstorage";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URI;

const token = getTokenFromLocalStorage();
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

export const frontalChallenges = async () => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.get(`${baseUrl}/frontal-challenges`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};
export const currentChallenges = async () => {
  try {
    const response = await axios.get(`${baseUrl}/current-challenges`, {
      withCredentials: true,
      headers,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const getChallengeInfo = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/get-challenge-info/${id}`, {
      withCredentials: true,
      headers,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};
export const startChallenge = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/start-challenges/${id}`, {
      withCredentials: true,
      headers,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};
export const pinChallenge = async ({ id }: { id: string }) => {
  try {
    const response = await axios.put(
      `${baseUrl}/pin-challenge`,
      { id },
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

export const completedChallenge = async ({
  challengeId,
  workoutName,
  totalTime,
  weight,
}: {
  challengeId: string;
  workoutName: string;
  totalTime: number;
  weight: number;
}) => {
  try {
    const response = await axios.post(
      `${baseUrl}/completed-challenge`,
      { challengeId, workoutName, totalTime, weight },
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

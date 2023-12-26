import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URI;

const headers = {
  "Content-Type": "application/json",
};

export const freemiumWorkout = async (name: string) => {
  try {
    const response = await axios.get(`${baseUrl}/freemium-workout/${name}`, {
      headers,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const getWorkout = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/get-workout/${id}`, {
      withCredentials: true,
      headers,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

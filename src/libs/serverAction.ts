"use server";

import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URI;

export const getUserCredentials = async ({ token }: { token: string }) => {
  try {
    const response = await axios.get(`${baseUrl}/user-info`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
  }
};

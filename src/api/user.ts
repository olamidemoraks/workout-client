import { getTokenFromLocalStorage } from "@/utils/localstorage";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URI;

const token = getTokenFromLocalStorage();
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

export const loginUser = async ({
  value,
}: {
  value: { password: string; email: string };
}) => {
  try {
    const response = await axios.post(
      `${baseUrl}/login-user`,
      { ...value },
      { headers }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const signupUser = async ({
  value,
}: {
  value: { name: string; email: string; username: string; password: string };
}) => {
  try {
    const response = await axios.post(
      `${baseUrl}/register-user`,
      { ...value },
      { headers }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const logout = async (): Promise<void> => {
  try {
    const response = await axios.post(
      `${baseUrl}/logout`,
      {},
      {
        withCredentials: true,
        headers,
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};
export const verifyCode = async ({
  activation_code,
  activation_token,
}: {
  activation_code: string;
  activation_token: string;
}) => {
  try {
    const response = await axios.post(
      `${baseUrl}/activate-user`,
      { activation_code, activation_token },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const checkUser = async ({ value }: { value: any }) => {
  try {
    const response = await axios.post(`${baseUrl}/check-user`, value, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const updateProfile = async ({ value }: { value: any }) => {
  try {
    const response = await axios.put(
      `${baseUrl}/update-profile`,
      { ...value },
      { withCredentials: true, headers }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};
export const updateProfileImage = async ({ value }: { value: any }) => {
  try {
    const response = await axios.put(`${baseUrl}/update-profile-image`, value, {
      withCredentials: true,
      headers,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const userProfile = async () => {
  try {
    const response = await axios.get(`${baseUrl}/user-info`, {
      withCredentials: true,
      headers,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};
export const getProfile = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/profile-info/${id}`, {
      withCredentials: true,
      headers,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};
export const getStreak = async ({ id }: { id: string }) => {
  try {
    const response = await axios.get(`${baseUrl}/get-streak/${id}`, {
      withCredentials: true,
      headers,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const findUser = async ({ params }: { params: any }) => {
  try {
    const query = new URLSearchParams(params ?? {});
    const response = await axios.get(`${baseUrl}/find-user?${query}`, {
      withCredentials: true,
      headers,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const socialAuthentication = async ({
  name,
  username,
  email,
}: {
  name: string;
  username: string;
  email: string;
}) => {
  try {
    const response = await axios.post(
      `${baseUrl}/social-auth`,
      { name, username, email },
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

export const followUser = async ({ id }: { id: string }) => {
  try {
    const response = await axios.put(
      `${baseUrl}/follow-user`,
      { id },
      { withCredentials: true, headers }
    );
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};
export const unfollowUser = async ({ id }: { id: string }) => {
  try {
    const response = await axios.put(
      `${baseUrl}/unfollow-user`,
      { id },
      { withCredentials: true, headers }
    );
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};
export const getFollowing = async ({ params }: { params?: any }) => {
  const query = new URLSearchParams(params ?? {});
  try {
    const response = await axios.get(`${baseUrl}/get-following?${query}`, {
      withCredentials: true,
      headers,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};
export const getFollower = async ({ params }: { params: any }) => {
  const query = new URLSearchParams(params ?? {});

  try {
    const response = await axios.get(`${baseUrl}/get-follower?${query}`, {
      withCredentials: true,
      headers,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

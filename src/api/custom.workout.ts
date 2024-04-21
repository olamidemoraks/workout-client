import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URI;

const headers = {
  "Content-Type": "application/json",
};

export const createCustomWorkout = async ({ data }: { data: any }) => {
  try {
    const response = await axios.post(
      `${baseUrl}/create-custom-workouts`,
      data,
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
export const getInvitedUserFromCustomWorkout = async ({
  id,
}: {
  id: string;
}) => {
  try {
    const response = await axios.get(`${baseUrl}/get-invited-users/${id}`, {
      withCredentials: true,
      headers,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const customWorkoutInvite = async ({
  data,
  id,
}: {
  data: any;
  id: string;
}) => {
  try {
    const response = await axios.put(
      `${baseUrl}/custom-workout-invite/${id}`,
      data,
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
export const customWorkoutInviteResponse = async ({
  data,
  id,
}: {
  data: any;
  id: string;
}) => {
  try {
    console.log({ id });
    const response = await axios.put(
      `${baseUrl}/custom-workout-invite-response/${id}`,
      data,
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
export const editCustomWorkout = async ({
  data,
  id,
}: {
  data: any;
  id: string;
}) => {
  try {
    const response = await axios.put(
      `${baseUrl}/update-custom-workout/${id}`,
      data,
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
export const deleteCustomWorkout = async ({ id }: { id: string }) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/delete-custom-workout/${id}`,

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
export const getUserCustomWorkouts = async ({ userId }: { userId: string }) => {
  try {
    const response = await axios.get(
      `${baseUrl}/get-all-user-workouts/${userId}`,
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
export const getCustomWorkout = async ({ id }: { id: string }) => {
  try {
    const response = await axios.get(`${baseUrl}/get-custom-workout/${id}`, {
      withCredentials: true,
      headers,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

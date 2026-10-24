import { getTokenFromLocalStorage } from "@/utils/localstorage";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URI;

// Read the token on every request; a copy taken when the module loads goes
// stale after logging in without a page reload.
const authConfig = () => ({
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
    "Content-Type": "application/json",
  },
});

export type ProgramInput = {
  name: string;
  exercises: { _id?: string; name: string; sets: number; reps: string }[];
};

// `date` is the user's local day (YYYY-MM-DD); ticks reset when it changes.

export const getPrograms = async ({ date }: { date: string }) => {
  try {
    const response = await axios.get(`${baseUrl}/get-programs`, {
      ...authConfig(),
      params: { date },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const getProgram = async ({ id, date }: { id: string; date: string }) => {
  try {
    const response = await axios.get(`${baseUrl}/get-program/${id}`, {
      ...authConfig(),
      params: { date },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const createProgram = async ({
  value,
  date,
}: {
  value: ProgramInput;
  date: string;
}) => {
  try {
    const response = await axios.post(
      `${baseUrl}/create-program`,
      { ...value, date },
      authConfig()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const updateProgram = async ({
  id,
  value,
  date,
}: {
  id: string;
  value: ProgramInput;
  date: string;
}) => {
  try {
    const response = await axios.put(
      `${baseUrl}/update-program/${id}`,
      { ...value, date },
      authConfig()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const deleteProgram = async ({ id }: { id: string }) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/delete-program/${id}`,
      authConfig()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

// Mark one set (setIndex) or, without setIndex, every set of an exercise.
export const updateSetProgress = async ({
  id,
  exerciseId,
  setIndex,
  done,
  date,
}: {
  id: string;
  exerciseId: string;
  setIndex?: number;
  done: boolean;
  date: string;
}) => {
  try {
    const response = await axios.put(
      `${baseUrl}/program-set-progress/${id}`,
      { exerciseId, setIndex, done, date },
      authConfig()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const resetProgramProgress = async ({
  id,
  date,
}: {
  id: string;
  date: string;
}) => {
  try {
    const response = await axios.put(
      `${baseUrl}/reset-program/${id}`,
      { date },
      authConfig()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

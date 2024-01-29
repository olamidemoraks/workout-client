"use client";
import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { cn } from "@/libs/utils";
import DatePicker from "react-datepicker";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import moment from "moment";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { updateProfile } from "@/api/user";
import useProfile from "@/hooks/useProfile";
import { Check, ChevronLeft, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";

type EditProfileProps = {
  id: string;
};

const EditProfile: React.FC<EditProfileProps> = ({ id }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isLoading: updating } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.refetchQueries("profile");
    },
  });

  const { isLoading, profile } = useProfile();

  const [isKG, setIsKG] = useState(true);
  const [isCM, setIsCM] = useState(true);
  const [weight, setWeight] = useState<any>();
  const [height, setHeight] = useState<any>();
  const [startDate, setStartDate] = useState(new Date());
  const [gender, setGender] = useState("male");
  const validator = yup.object().shape({
    name: yup.string().required("Please fill your name"),
    username: yup.string().required("Please fill your username"),
  });

  type signupTypeReference = yup.InferType<typeof validator>;

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupTypeReference>({
    defaultValues: {
      name: "",
      username: "",
    },
    resolver: yupResolver(validator),
  });

  useEffect(() => {
    if (profile) {
      setWeight(profile?.weight);
      setHeight(profile?.height);
      setStartDate(new Date(profile?.age));
      setGender(profile?.gender);
      setValue("name", profile?.name);
      setValue("username", profile?.username);
    }
  }, [profile, setValue]);

  const handleSignup = (values: signupTypeReference) => {
    const data = {
      ...values,
      weightMeasure: isKG ? "kg" : "lb",
      heightMeasure: isCM ? "cm" : "ft",
      age: startDate,
    };

    mutate({ value: data });
  };
  return (
    <div className="flex justify-center md:px-10 px-3 ">
      <div className="xl:w-[60%] md:w-[80%] w-full">
        <button
          type="button"
          onClick={() => router.back()}
          className=" hover:bg-emerald-500 flex items-center gap-2 rounded-md  p-2 mb-2 bg-zinc-900"
        >
          <ChevronLeft size={23} />
        </button>
        <div className="flex items-center justify-between">
          <p className=" text-lg font-bold">Edit Profile</p>
          <button
            type="submit"
            className=" hover:bg-emerald-500 flex items-center gap-2 rounded-md  p-3 border border-neutral-600"
          >
            {updating ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Check size={23} />
            )}
          </button>
        </div>
        <form
          onSubmit={handleSubmit(handleSignup)}
          className="flex flex-col gap-4 mt-3 w-full"
          autoFocus
        >
          <>
            <label htmlFor="name" className=" ">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              className={cn(
                "bg-transparent w-full focus:outline-none border-[1px] p-3 border-zinc-400  focus:border-white rounded-lg h-[50px]",
                {
                  "border-red-500 focus:border-red-500": errors.name,
                }
              )}
            />
            {errors.name && (
              <p className=" text-red-500 -mt-2">{errors.name.message}</p>
            )}
          </>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="username" className=" ">
              Username
            </label>
            <input
              {...register("username", { required: true })}
              className={cn(
                "bg-transparent w-full focus:outline-none border-[1px] p-3 border-zinc-400  focus:border-white rounded-lg h-[50px]",
                {
                  "border-red-500 focus:border-red-500": errors.username,
                }
              )}
            />
            {errors.name && (
              <p className=" text-red-500 -mt-2">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="gender" className=" ">
              Gender
            </label>
            <select
              className={cn(
                "bg-transparent w-full focus:outline-none border-[1px] p-3 border-zinc-400  focus:border-white rounded-lg h-[50px]"
              )}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" className="bg-black hover:bg-emerald-600">
                Select Gender
              </option>
              <option value="male" className="bg-black  hover:bg-emerald-600">
                Male
              </option>
              <option
                value="female"
                className="bg-black  hover:bg-emerald-600 "
              >
                Female
              </option>
            </select>
            {/* {errors.name && (
                <p className=" text-red-500 -mt-2">{errors.name.message}</p>
              )} */}
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="  ">Date of birth</h2>
            <div className="flex gap-3">
              <DatePicker
                className=" bg-transparent w-full focus:outline-none border-[1px] p-3 border-zinc-400  focus:border-white rounded-lg h-[50px]   "
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
              />
              <p className=" capitalize font-bold  flex items-center justify-center mt-2 ">
                {moment().diff(startDate, "year")} years
              </p>
            </div>
          </div>

          <div className=" flex flex-col gap-5 items-start w-full">
            <div className="w-full">
              <label htmlFor="weight" className=" font-semibold">
                Weight
              </label>
              <div className="flex gap-1 w-full">
                <input
                  type="text"
                  className="pb-2 focus:outline-none border-b border-zinc-400 w-full  bg-transparent"
                  id="weight"
                  placeholder={isKG ? "KG" : "LB"}
                  value={weight}
                  onChange={(e) => {
                    if (isNaN(Number(e.target.value))) {
                      return;
                    }
                    setWeight(e.target.value);
                  }}
                />
                <div className="flex gap-2 border border-blue-700 rounded-lg  items-center">
                  <div
                    className={cn(
                      " px-2 transition duration-200 cursor-pointer",
                      {
                        " bg-blue-700 h-full rounded-lg": isKG,
                      }
                    )}
                    onClick={() => {
                      setWeight((prev: any) => {
                        if (!isKG && prev) {
                          return Math.floor(prev / 2.205).toFixed(0);
                        }
                        return prev;
                      });
                      setIsKG(true);
                    }}
                  >
                    KG
                  </div>

                  <div
                    className={cn(
                      " px-2 transition duration-200 cursor-pointer",
                      {
                        " bg-blue-700 h-full rounded-lg": !isKG,
                      }
                    )}
                    onClick={() => {
                      setWeight((prev: any) => {
                        if (isKG && prev) {
                          return (prev * 2.205).toFixed(2);
                        }
                        return prev;
                      });
                      setIsKG(false);
                    }}
                  >
                    LB
                  </div>
                </div>
              </div>
            </div>
            {/* 0.394 */}
            <div className="w-full">
              <label htmlFor="height" className=" font-semibold">
                Height
              </label>
              <div className="flex gap-1 w-full">
                <input
                  type="text"
                  className="pb-2 focus:outline-none border-b border-zinc-400 w-full  bg-transparent"
                  id="height"
                  placeholder={isCM ? "CM" : "FT IN"}
                  value={height}
                  onChange={(e) => {
                    if (isNaN(Number(e.target.value))) {
                      return;
                    }
                    setHeight(e.target.value);
                  }}
                />
                <div className="flex gap-2 border border-blue-700 rounded-lg  items-center">
                  <div
                    className={cn(
                      " px-2 transition duration-200 cursor-pointer",
                      {
                        " bg-blue-700 h-full rounded-lg": isCM,
                      }
                    )}
                    onClick={() => {
                      setHeight((prev: any) => {
                        if (!isCM && prev) {
                          return (prev * 2.54).toFixed(2);
                        }
                        return prev;
                      });

                      setIsCM(true);
                    }}
                  >
                    CM
                  </div>

                  <div
                    className={cn(
                      " px-2 transition duration-200 cursor-pointer",
                      {
                        " bg-blue-700 h-full rounded-lg": !isCM,
                      }
                    )}
                    onClick={() => {
                      setHeight((prev: any) => {
                        if (isCM && prev) {
                          return (prev / 2.54).toFixed(2);
                        }
                        return prev;
                      });

                      setIsCM(false);
                    }}
                  >
                    FT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditProfile;

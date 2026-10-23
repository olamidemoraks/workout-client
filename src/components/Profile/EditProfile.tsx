"use client";
import React, { useEffect, useState } from "react";
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
import { Check, ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cmToFeetInches, feetInchesToCm } from "../auth/Weight";

type EditProfileProps = {
  id: string;
};

const inputClassName =
  "bg-transparent w-full focus:outline-none border-[1px] p-3 border-zinc-400 focus:border-white rounded-lg h-[50px]";
const underlineInputClassName =
  "pb-2 focus:outline-none border-b border-zinc-400 focus:border-emerald-500 transition-colors w-full bg-transparent";
const unitButtonClassName =
  "px-2 transition duration-200 cursor-pointer h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400";

const isNumeric = (value: string) => !isNaN(Number(value));

const EditProfile: React.FC<EditProfileProps> = ({ id }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isLoading: updating } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.refetchQueries("profile");
      toast.success("Profile updated");
      router.push("/profile");
    },
    onError: (data: any) => {
      toast.error(`${data?.message || "Something went wrong"}`);
    },
  });

  const { isLoading, profile } = useProfile();

  // Weight is stored in kg and height in cm (same as onboarding);
  // weightMeasure / heightMeasure only choose how they're shown.
  const [isKG, setIsKG] = useState(true);
  const [isCM, setIsCM] = useState(true);
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [feet, setFeet] = useState<string>("");
  const [inches, setInches] = useState<string>("");
  // Converting kg -> lb -> kg for display can shift the stored value slightly,
  // so weight and height are only sent when the user actually edits them.
  const [weightEdited, setWeightEdited] = useState(false);
  const [heightEdited, setHeightEdited] = useState(false);
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
      const showInLb = profile?.weightMeasure === "lb";
      const showInFt = profile?.heightMeasure === "ft";
      const storedWeight = Number(profile?.weight);
      const storedHeight = Number(profile?.height);

      setIsKG(!showInLb);
      setIsCM(!showInFt);
      if (storedWeight > 0) {
        setWeight(
          showInLb ? (storedWeight * 2.205).toFixed(1) : String(profile.weight)
        );
      }
      if (storedHeight > 0) {
        if (showInFt) {
          const converted = cmToFeetInches(storedHeight);
          setFeet(String(converted.feet));
          setInches(String(converted.inches));
        } else {
          setHeight(String(profile.height));
        }
      }
      if (profile?.age) setStartDate(new Date(profile.age));
      setGender(profile?.gender ?? "");
      setValue("name", profile?.name);
      setValue("username", profile?.username);
    }
  }, [profile, setValue]);

  const changeWeightUnit = (toKG: boolean) => {
    if (toKG === isKG) return;
    setWeight((prev) => {
      if (!prev) return prev;
      return toKG
        ? (Number(prev) / 2.205).toFixed(1)
        : (Number(prev) * 2.205).toFixed(1);
    });
    setIsKG(toKG);
  };

  const changeHeightUnit = (toCM: boolean) => {
    if (toCM === isCM) return;
    if (toCM && (feet || inches)) {
      setHeight(
        Math.round(feetInchesToCm(Number(feet), Number(inches))).toString()
      );
    } else if (!toCM && height) {
      const converted = cmToFeetInches(Number(height));
      setFeet(String(converted.feet));
      setInches(String(converted.inches));
    }
    setIsCM(toCM);
  };

  const handleSignup = (values: signupTypeReference) => {
    const weightInKg = isKG ? Number(weight) : Number(weight) / 2.205;
    const heightInCm = isCM
      ? Number(height)
      : feetInchesToCm(Number(feet), Number(inches));

    const data = {
      ...values,
      // The server only accepts "male" or "female".
      ...(gender && { gender }),
      weightMeasure: isKG ? "kg" : "lb",
      heightMeasure: isCM ? "cm" : "ft",
      age: startDate,
      // Skip untouched or cleared fields so stored values stay as they are.
      ...(weightEdited &&
        weightInKg > 0 && {
          weight: isKG ? weight : weightInKg.toFixed(2),
        }),
      ...(heightEdited &&
        heightInCm > 0 && {
          height: isCM ? height : heightInCm.toFixed(2),
        }),
    };

    mutate({ value: data });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex justify-center md:px-10 px-3 ">
      <div className="xl:w-[60%] md:w-[80%] w-full mb-16">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className=" hover:bg-emerald-500 flex items-center gap-2 rounded-md  p-2 mb-2 bg-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <ChevronLeft size={23} />
        </button>
        <form
          onSubmit={handleSubmit(handleSignup)}
          className="flex flex-col gap-4 mt-3 w-full"
          noValidate
        >
          <div className="flex items-center justify-between">
            <h1 className=" text-lg font-bold">Edit Profile</h1>
            <button
              type="submit"
              disabled={updating}
              aria-label="Save profile"
              title="Save profile"
              className=" bg-blue-500 hover:bg-blue-400 disabled:opacity-60 flex items-center gap-2 rounded-md p-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              {updating ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Check size={23} />
              )}
            </button>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="name" className=" ">
              Name
            </label>
            <input
              id="name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              {...register("name", { required: true })}
              className={cn(inputClassName, {
                "border-red-500 focus:border-red-500": errors.name,
              })}
            />
            {errors.name && (
              <p className=" text-red-500 -mt-2">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="username" className=" ">
              Username
            </label>
            <input
              id="username"
              autoComplete="username"
              aria-invalid={!!errors.username}
              {...register("username", { required: true })}
              className={cn(inputClassName, {
                "border-red-500 focus:border-red-500": errors.username,
              })}
            />
            {errors.username && (
              <p className=" text-red-500 -mt-2">{errors.username.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="gender" className=" ">
              Gender
            </label>
            <select
              id="gender"
              className={inputClassName}
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
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="dob">Date of birth</label>
            <div className="flex gap-3">
              <DatePicker
                id="dob"
                className={cn(inputClassName, "w-full")}
                selected={startDate}
                onChange={(date: Date) => date && setStartDate(date)}
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="MMM d, yyyy"
              />
              <p className=" capitalize font-bold  flex items-center justify-center whitespace-nowrap">
                {moment().diff(startDate, "year")} years
              </p>
            </div>
          </div>

          <div className=" flex flex-col gap-5 items-start w-full mt-2">
            <div className="w-full">
              <label htmlFor="weight" className=" font-semibold">
                Weight
              </label>
              <div className="flex gap-1 w-full mt-2">
                <input
                  type="text"
                  inputMode="decimal"
                  className={underlineInputClassName}
                  id="weight"
                  placeholder={isKG ? "KG" : "LB"}
                  value={weight}
                  onChange={(e) => {
                    if (!isNumeric(e.target.value)) return;
                    setWeight(e.target.value);
                    setWeightEdited(true);
                  }}
                />
                <div
                  role="group"
                  aria-label="Weight unit"
                  className="flex gap-2 border border-blue-700 rounded-lg items-center"
                >
                  <button
                    type="button"
                    aria-pressed={isKG}
                    className={cn(unitButtonClassName, { "bg-blue-700": isKG })}
                    onClick={() => changeWeightUnit(true)}
                  >
                    KG
                  </button>
                  <button
                    type="button"
                    aria-pressed={!isKG}
                    className={cn(unitButtonClassName, { "bg-blue-700": !isKG })}
                    onClick={() => changeWeightUnit(false)}
                  >
                    LB
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor={isCM ? "height" : "height-feet"}
                className=" font-semibold"
              >
                Height
              </label>
              <div className="flex gap-1 w-full mt-2">
                {isCM ? (
                  <input
                    type="text"
                    inputMode="decimal"
                    className={underlineInputClassName}
                    id="height"
                    placeholder="CM"
                    value={height}
                    onChange={(e) => {
                      if (!isNumeric(e.target.value)) return;
                      setHeight(e.target.value);
                      setHeightEdited(true);
                    }}
                  />
                ) : (
                  <div className="flex gap-3 w-full">
                    <div className="flex items-end gap-1 w-full">
                      <input
                        type="text"
                        inputMode="numeric"
                        className={underlineInputClassName}
                        id="height-feet"
                        aria-label="Feet"
                        placeholder="0"
                        value={feet}
                        onChange={(e) => {
                          if (!isNumeric(e.target.value)) return;
                          setFeet(e.target.value);
                          setHeightEdited(true);
                        }}
                      />
                      <span className="pb-2 text-sm text-zinc-400">ft</span>
                    </div>
                    <div className="flex items-end gap-1 w-full">
                      <input
                        type="text"
                        inputMode="numeric"
                        className={underlineInputClassName}
                        id="height-inches"
                        aria-label="Inches"
                        placeholder="0"
                        value={inches}
                        onChange={(e) => {
                          if (!isNumeric(e.target.value)) return;
                          setInches(e.target.value);
                          setHeightEdited(true);
                        }}
                      />
                      <span className="pb-2 text-sm text-zinc-400">in</span>
                    </div>
                  </div>
                )}
                <div
                  role="group"
                  aria-label="Height unit"
                  className="flex gap-2 border border-blue-700 rounded-lg items-center"
                >
                  <button
                    type="button"
                    aria-pressed={isCM}
                    className={cn(unitButtonClassName, { "bg-blue-700": isCM })}
                    onClick={() => changeHeightUnit(true)}
                  >
                    CM
                  </button>
                  <button
                    type="button"
                    aria-pressed={!isCM}
                    className={cn(unitButtonClassName, { "bg-blue-700": !isCM })}
                    onClick={() => changeHeightUnit(false)}
                  >
                    FT
                  </button>
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

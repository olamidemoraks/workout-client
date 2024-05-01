import React, { ReactNode } from "react";
import { BiSolidZap } from "react-icons/bi";
import { IconType } from "react-icons/lib";

type ProfileUnitProps = {
  children?: ReactNode;
  unit: number;
  text: string;
};

const ProfileUnit: React.FC<ProfileUnitProps> = ({ children, text, unit }) => {
  return (
    <div className="flex flex-col text-center items-center ">
      <div className="flex gap-1 items-center">
        <p className=" text-emerald-500 text-2xl font-semibold">{unit ?? 0}</p>
        {children}
      </div>
      <p className=" text-neutral-300 ">{text}</p>
    </div>
  );
};
export default ProfileUnit;

import Image from "next/image";
import React from "react";

type EmptyProps = {
  image?: string;
  title?: string;
};

const Empty: React.FC<EmptyProps> = ({ image, title }) => {
  return (
    <div className="w-full flex items-center flex-col gap-2">
      <Image
        src={image ? image : "/assets/groups/abs.png"}
        width={100}
        height={100}
        alt="anatomy"
        className=" opacity-70"
      />
      <p>{title ? title : "No records"}</p>
    </div>
  );
};
export default Empty;

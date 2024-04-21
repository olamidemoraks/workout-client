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
        src={image ? image : "/assets/empty.png"}
        width={250}
        height={250}
        alt="empty"
      />
      <p className=" text-2xl text-zinc-200">{title ? title : "No records"}</p>
    </div>
  );
};
export default Empty;

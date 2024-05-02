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
        width={230}
        height={230}
        alt="empty"
      />
      <p className=" text-2xl w-[70%] text-zinc-200 text-center">
        {title ? title : "Nothing here"}
      </p>
    </div>
  );
};
export default Empty;

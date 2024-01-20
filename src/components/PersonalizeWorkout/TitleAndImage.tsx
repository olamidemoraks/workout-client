/* eslint-disable @next/next/no-img-element */
import { PlusCircle, UploadCloud } from "lucide-react";
import React from "react";

type TitleAndImageProps = {
  title: string;
  setTitle: (title: string) => void;
  image: string;
  handleSelectImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TitleAndImage: React.FC<TitleAndImageProps> = ({
  setTitle,
  title,
  handleSelectImage,
  image,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Workout Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent focus:outline-none  p-1   focus:border-white text-2xl text-center font-semibold"
        />
      </div>
      <label
        htmlFor="image"
        className=" md:h-[350px] group h-[300px]  md:w-[400px] w-full  rounded-xl items-center flex-col flex gap-3 justify-center border-dashed border-4 border-zinc-600 hover:border-emerald-500 cursor-pointer"
      >
        {image ? (
          <img
            src={image}
            alt="cover image"
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <UploadCloud
              size={32}
              className=" opacity-60 group-hover:opacity-100"
              color="#fff"
            />
            <p className=" text-neutral-400 group-hover:text-white">
              {" "}
              Upload Image{" "}
            </p>
          </>
        )}
        <input id="image" hidden type="file" onChange={handleSelectImage} />
      </label>
    </div>
  );
};
export default TitleAndImage;

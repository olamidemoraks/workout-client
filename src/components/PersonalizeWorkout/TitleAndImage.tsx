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
      <div className="flex flex-col md:w-[400px] w-full">
        <input
          type="text"
          placeholder="Workout Title"
          value={title}
          onChange={(e) => {
            if (e.target.value.length < 26) {
              setTitle(e.target.value);
            }
          }}
          className="bg-transparent focus:outline-none w-full  pb-2  p-1 border-b border-zinc-600 text-2xl font-semibold"
        />
        <p className="text-right mt-1">
          <span className=" font-semibold">{title.length}</span>/25
        </p>
      </div>
      <label
        htmlFor="image"
        className={` ${
          image ? "md:h-[400px] h-[350px]" : "h-[140px]"
        } group md:w-[400px] w-full  rounded-xl items-center flex-col flex gap-3 justify-center border-4 border-zinc-600 hover:border-emerald-500 cursor-pointer`}
      >
        {image ? (
          <img
            src={image}
            alt="cover image"
            className="h-full w-full object-cover rounded-xl"
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
              Upload Thumbnail{" "}
            </p>
          </>
        )}
        <input
          id="image"
          hidden
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleSelectImage}
        />
      </label>
    </div>
  );
};
export default TitleAndImage;

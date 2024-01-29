import { getCategory } from "@/api/workout";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";

const colors = [
  "bg-[#B19470]/70",
  "bg-[#76453B]/70",
  "bg-[#88AB8E]/70	",
  "bg-[#DC84F3]/70	",
  "bg-[#F7B787]/70	",
  "bg-[#DC8686]/70	",
  "bg-[#B4BDFF]/70",
  "bg-[#CE5A67]/70	",
  "bg-[#FF6969]/70",
  "bg-[#B19470]/70",
  "bg-[#76453B]/70",
  "bg-[#88AB8E]/70	",
  "bg-[#DC84F3]/70	",
  "bg-[#F7B787]/70	",
  "bg-[#DC8686]/70	",
  "bg-[#B4BDFF]/70",
  "bg-[#CE5A67]/70	",
  "bg-[#FF6969]/70",
  "bg-[#B19470]/70",
  "bg-[#76453B]/70",
  "bg-[#88AB8E]/70	",
  "bg-[#DC84F3]/70	",
  "bg-[#F7B787]/70	",
  "bg-[#DC8686]/70	",
  "bg-[#B4BDFF]/70",
  "bg-[#CE5A67]/70	",
  "bg-[#FF6969]/70",
];
const FeatureCategories = () => {
  const { data, isLoading } = useQuery({
    queryFn: getCategory,
    queryKey: "category",
  });

  const featureCategory = data?.categories?.filter(
    (category: any) => category?.feature === true
  );

  return (
    <>
      {featureCategory?.map((item: any, index: number) => (
        <li
          key={item?._id}
          className=" border border-zinc-900 snap-start min-w-[300px]  h-[170px] relative bg-gradient-to-br to-zinc-950 from-zinc-900 rounded-lg cursor-pointer ease-linear duration-200"
        >
          <Link href={`/workouts/${item?._id}`}>
            <Image
              src={item?.image.url}
              alt={item.title}
              fill
              className="absolute object-cover rounded-lg"
            />
            <div className="flex items-end h-full w-full bg-zinc-950/50  absolute pb-5">
              <div className="flex gap-5 items-center">
                <div className={`h-6 w-[5px] ${colors[index]} `} />
                <p className="font-bold capitalize  sm:text-2xl  text-3xl  ">
                  {item?.title?.split("_").join(" ") + " "} <br />
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </>
  );
};

export default FeatureCategories;

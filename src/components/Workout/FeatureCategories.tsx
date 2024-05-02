import { getCategory } from "@/api/workout";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";
import CustomLoader from "../Common/CustomLoader";

const colors = [
  "bg-[#B4BDFF]/70",
  "bg-[#FF6969]/70",
  "bg-[#DC84F3]/70	",
  "bg-[#CE5A67]/70	",
  "bg-[#88AB8E]/70	",
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
  "bg-[#F7B787]/70	",
  "bg-[#DC8686]/70	",
  "bg-[#B19470]/70",
  "bg-[#76453B]/70",
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

  if (isLoading) {
    return (
      <CustomLoader
        amount={4}
        height="h-[170px]"
        weight="sm:min-w-[300px] min-w-[200px]"
      />
    );
  }

  return (
    <>
      {featureCategory?.map((item: any, index: number) => (
        <li
          key={item?._id}
          className=" border group border-zinc-800 snap-start sm:min-w-[300px] min-w-[250px]  h-[170px] relative  rounded-lg cursor-pointer ease-linear duration-200"
        >
          <Link href={`/workouts/${item?._id}`}>
            <Image
              src={item?.image.url}
              alt={item.title}
              fill
              className="absolute object-cover rounded-lg  md:brightness-[.6] brightness-90 group-hover:brightness-90 transition-all "
            />
            <div className="flex items-end h-full w-full absolute pb-5">
              <div className="flex gap-5 items-center">
                <div className={`h-6 w-[5px] ${colors[index]} `} />
                <p className="font-bold capitalize  sm:text-3xl  text-2xl  ">
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

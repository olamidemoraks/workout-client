import { getCategory } from "@/api/workout";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";
import CustomLoader from "../Common/CustomLoader";
import { focusRing } from "../auth/FormControls";
import { cn } from "@/libs/utils";

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
          className="group relative h-[170px] min-w-[240px] snap-start sm:min-w-[280px]"
        >
          <Link
            href={`/workouts/${item?._id}`}
            className={cn(
              "relative isolate flex h-full w-full items-end overflow-hidden rounded-2xl border border-zinc-800 p-5 transition hover:border-zinc-700",
              focusRing
            )}
          >
            <Image
              src={item?.image.url}
              alt=""
              fill
              sizes="280px"
              className="-z-20 object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent" />
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className={`h-6 w-1 rounded-full ${colors[index % colors.length]}`}
              />
              <p className="text-2xl font-bold capitalize">
                {item?.title?.split("_").join(" ")}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </>
  );
};

export default FeatureCategories;

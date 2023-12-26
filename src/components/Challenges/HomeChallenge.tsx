import { frontalChallenges } from "@/api/challenge";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import ChallengeCard from "./ChallengeCard";

type HomeChallengeProps = {};

const HomeChallenge: React.FC<HomeChallengeProps> = () => {
  const { data, isLoading } = useQuery({
    queryFn: frontalChallenges,
    queryKey: "Home-challenge",
  });

  const challenges: Challenge[] = data?.challenges?.slice(0, 2);

  return (
    <div>
      <div className="flex justify-between w-full">
        <p className=" font-semibold uppercase text-lg mb-5">
          X Days Challenge
        </p>
        <Link
          href={"/challenge"}
          className="hover:underline-offset-2 hover:text-emerald-400 hover:underline font-semibold uppercase mb-5 opacity-75"
        >
          See More
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-10">
        {challenges?.map((challenge) => (
          <ChallengeCard challenge={challenge} key={challenge?._id} />
        ))}
      </div>
    </div>
  );
};
export default HomeChallenge;

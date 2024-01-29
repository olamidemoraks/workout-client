"use client";
import { currentChallenges, frontalChallenges } from "@/api/challenge";
import React from "react";
import { useQuery } from "react-query";
import ChallengeCard from "./ChallengeCard";

const Challenges = () => {
  const { data, isLoading } = useQuery({
    queryFn: currentChallenges,
    queryKey: "recent-challenge",
  });

  const { data: allData, isLoading: allLoading } = useQuery({
    queryFn: frontalChallenges,
    queryKey: "Home-challenge",
  });

  const recentChallenges: Challenge[] = data?.challenges;
  const allChallenges: Challenge[] = allData?.challenges?.filter(
    (challenge: Challenge) => challenge.progress === null
  );

  return (
    <div className="px-10 mb-8">
      <p className=" text-2xl font-semibold uppercase">Challenges</p>
      <div className="mt-4 flex flex-col gap-3">
        <p className=" font-semibold text-neutral-300">Jump back in</p>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
          {recentChallenges?.map((challenge) => (
            <ChallengeCard challenge={challenge} key={challenge?._id} />
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 ">
        <p className=" font-semibold text-neutral-300">Others</p>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
          {allChallenges?.map((challenge) => (
            <ChallengeCard challenge={challenge} key={challenge?._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Challenges;

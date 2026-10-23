"use client";
import { allChallenges, currentChallenges } from "@/api/challenge";
import React, { useMemo } from "react";
import { useQuery } from "react-query";
import ChallengeCard from "./ChallengeCard";
import CustomLoader from "../Common/CustomLoader";

const Challenges = () => {
  // "frontal-challenges" only returns pinned challenges once any are pinned,
  // so list every challenge and merge in the user's progress separately.
  const { data: allData, isLoading: allLoading } = useQuery({
    queryFn: allChallenges,
    queryKey: "all-challenges",
  });
  const { data: currentData, isLoading: currentLoading } = useQuery({
    queryFn: currentChallenges,
    queryKey: "current-challenges",
  });

  const { recentChallenges, otherChallenges } = useMemo(() => {
    const progressById = new Map<string, Challenge>(
      (currentData?.challenges ?? [])
        .filter((challenge: Challenge) => challenge?._id)
        .map((challenge: Challenge) => [challenge._id, challenge])
    );
    const challenges: Challenge[] = (allData?.challenges ?? []).map(
      (challenge: Challenge) => ({
        ...challenge,
        progress: progressById.get(challenge._id)?.progress ?? null,
        isCompleted: progressById.get(challenge._id)?.isCompleted ?? false,
      })
    );

    return {
      recentChallenges: challenges.filter((challenge) => challenge.progress !== null),
      otherChallenges: challenges.filter((challenge) => challenge.progress === null),
    };
  }, [allData, currentData]);

  if (allLoading || currentLoading) {
    return (
      <div className="md:px-10 px-4 mb-8">
        <p className=" text-2xl font-semibold uppercase">Challenges</p>
        <div className="mt-4 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-10 gap-6">
          <CustomLoader amount={6} height="h-[200px] sm:h-[250px]" weight="w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="md:px-10 px-4 mb-8">
      <p className=" text-2xl font-semibold uppercase">Challenges</p>
      {recentChallenges.length > 0 && (
        <div className="mt-4 flex flex-col gap-3">
          <p className=" font-semibold text-neutral-300">Jump back in</p>
          <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-10 gap-6">
            {recentChallenges.map((challenge) => (
              <ChallengeCard challenge={challenge} showPin key={challenge?._id} />
            ))}
          </div>
        </div>
      )}

      {otherChallenges.length > 0 && (
        <div className="mt-10 flex flex-col gap-3 ">
          <p className=" font-semibold text-neutral-300">
            {recentChallenges.length > 0 ? "Others" : "All challenges"}
          </p>
          <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-10 gap-6">
            {otherChallenges.map((challenge) => (
              <ChallengeCard challenge={challenge} showPin key={challenge?._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenges;

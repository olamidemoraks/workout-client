import { frontalChallenges } from "@/api/challenge";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import ChallengeCard from "./ChallengeCard";
import CustomLoader from "../Common/CustomLoader";

type HomeChallengeProps = {};

const HomeChallenge: React.FC<HomeChallengeProps> = () => {
  const { data, isLoading } = useQuery({
    queryFn: frontalChallenges,
    queryKey: "Home-challenge",
  });

  const challenges: Challenge[] = data?.challenges?.slice(0, 2);

  if (isLoading) {
    return (
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
        <CustomLoader
          amount={2}
          height="h-[200px] sm:h-[250px]"
          weight="w-full"
        />
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
      {challenges?.map((challenge) => (
        <ChallengeCard challenge={challenge} key={challenge?._id} />
      ))}
    </div>
  );
};
export default HomeChallenge;

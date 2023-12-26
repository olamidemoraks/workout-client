import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCrown } from "react-icons/fa6";
import { GiLaurelCrown } from "react-icons/gi";

type ChallengeCardProps = {
  challenge: Challenge;
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  return (
    <Link
      href={`/challenge/${challenge?._id}`}
      key={challenge?._id}
      className="sm:h-[250px] h-[200px] w-full relative bg-gradient-to-br to-zinc-950 from-zinc-900 rounded-xl cursor-pointer group"
    >
      <Image
        src={challenge?.image?.url}
        alt={challenge?.title}
        height={700}
        width={550}
        className="absolute object-cover rounded-lg h-full w-full "
      />
      <div className="flex flex-col justify-between h-full w-full bg-gradient-to-br from-zinc-950/60 to-zinc-950/20 absolute p-6">
        <div>
          <p className="font-bold uppercase text-3xl ">{challenge?.title}</p>
          <p className=" font-semibold uppercase text-lg ">
            {challenge?.days} Day Challenge
          </p>
        </div>

        {challenge?.progress !== null ? (
          <div>
            <div className="flex justify-between w-full">
              <p className=" text-zinc-400">
                <span className="  text-emerald-400 ">
                  {challenge?.progress}
                </span>
                /{challenge?.days}
              </p>
            </div>
            <div className="w-full h-1 bg-slate-50/20 rounded backdrop-blur-sm mt-1 relative">
              <div className="absolute w-full">
                <div
                  className=" h-1 bg-emerald-400 ring-4 ring-emerald-600/10 rounded relative"
                  style={{
                    width: `${challenge?.progress * (100 / challenge?.days)}%`,
                  }}
                >
                  <GiLaurelCrown className=" absolute -top-2 -right-4 text-xl" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-between items-end">
            <Link
              href={`/challenge/${challenge?._id}`}
              className="py-2 px-3 flex items-center gap-2 bg-white group-hover:bg-emerald-600 group-hover:text-white rounded-full w-fit text-black text-xs font-bold uppercase"
            >
              Start Workout
              {challenge?.premium ? (
                <FaCrown className="text-xl  fill-amber-400" />
              ) : null}
            </Link>
          </div>
        )}
      </div>
    </Link>
  );
};
export default ChallengeCard;

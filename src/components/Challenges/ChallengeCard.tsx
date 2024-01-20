import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCrown } from "react-icons/fa6";
import { GiLaurelCrown } from "react-icons/gi";

type ChallengeCardProps = {
  challenge: Challenge;
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  const percentageCompleted = (challenge?.progress / challenge?.days) * 100; // calculate the percentage complete
  const strokeDashOffset = 158 + (240 * (100 - percentageCompleted)) / 100;
  return (
    <div className="sm:h-[250px] h-[200px] w-full relative bg-gradient-to-br to-zinc-950 from-zinc-900 rounded-xl">
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
            {/* <div className="flex justify-end ">
              <p className=" text-zinc-400 ">
                <span className="  text-emerald-400 ">
                  {challenge?.progress}
                </span>
                /{challenge?.days}
              </p>
            </div>

            <div className="w-full h-[4px] bg-slate-50/20 rounded backdrop-blur-sm mt-1 relative">
              <div className="absolute w-full">
                <div
                  className=" h-[4px] bg-emerald-400 ring-4 ring-emerald-600/10 rounded relative"
                  style={{
                    width: `${challenge?.progress * (100 / challenge?.days)}%`,
                  }}
                >
                  <GiLaurelCrown className=" absolute -top-2 -right-4 text-xl" />
                </div>
              </div>
            </div> */}

            <div className="mt-4 flex justify-between items-center w-full">
              <Link
                href={`/challenge/${challenge?._id}`}
                className="  py-1 px-1 pl-3 flex items-center gap-2 backdrop-blur-md bg-white/20 hover:bg-emerald-400/40 text-white rounded-full w-fit  text-sm font-bold"
              >
                <p className="items-center flex gap-1">Continue the workout</p>
                <div className="p-2 rounded-full bg-white">
                  <ArrowRight color="#000" size={16} />
                </div>
              </Link>

              <div className="  relative w-[60px] h-[60px] top-0  rounded-md p-1 z-[3]">
                {/* <Image
                  src={"./wave.svg"}
                  alt="wave"
                  fill
                  className=" absolute rounded-md w-[60px] h-[30px] object-cover z-[-1]"
                /> */}
                <svg className="w-full h-full z-10" viewBox="0 0 100 100">
                  <circle
                    className="text-white/30 backdrop-blur-sm stroke-current"
                    stroke-width="9"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>

                  <circle
                    className="text-emerald-300  progress-ring__circle stroke-current"
                    stroke-width="9"
                    stroke-linecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    stroke-dashoffset={`calc(${strokeDashOffset})`}
                    fill="transparent"
                  ></circle>

                  <text
                    x="50"
                    y="50"
                    fill="#ffffff"
                    font-family="Verdana"
                    font-size="25"
                    fontWeight="700"
                    text-anchor="middle"
                    alignment-baseline="middle"
                  >
                    {(challenge?.progress * (100 / challenge?.days))?.toFixed(
                      0
                    )}
                    %
                  </text>
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-between items-end">
            <Link
              href={`/challenge/${challenge?._id}`}
              className=" py-1 px-1 pl-3 flex items-center gap-5 backdrop-blur-md bg-white/20 hover:bg-emerald-400/40 text-white rounded-full w-fit  text-sm font-bold"
            >
              <div className="items-center flex gap-1">
                Start workout
                {challenge?.premium ? (
                  <FaCrown className="text-xl  fill-amber-400" />
                ) : null}
              </div>
              <div className="p-2 rounded-full bg-white">
                <ArrowRight color="#000" size={16} />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default ChallengeCard;

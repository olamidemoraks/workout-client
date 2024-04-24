import { pinChallenge } from "@/api/challenge";
import useProfile from "@/hooks/useProfile";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { BiSolidPin } from "react-icons/bi";
import { FaCrown } from "react-icons/fa6";
import { useMutation } from "react-query";

type ChallengeCardProps = {
  challenge: Challenge;
  showPin?: boolean;
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  showPin,
}) => {
  const percentageCompleted =
    ((challenge?.progress + (challenge?.isCompleted ? 0 : -1)) /
      challenge?.days) *
    100; // calculate the percentage complete
  const strokeDashOffset = 158 + (240 * (100 - percentageCompleted)) / 100;

  const { profile, refetch } = useProfile();
  const { mutate, isLoading } = useMutation({
    mutationFn: pinChallenge,
    onSuccess: (data: { challenges: Array<any> }) => {
      refetch();
      if (data.challenges?.includes(challenge?._id)) {
        toast.success("Challenge pinned to home");
      } else {
        toast.success("Challenge unpinned from home");
      }
    },
  });

  const handlePinningChallenge = (id: string) => {
    mutate({ id });
  };

  return (
    <div className="group border border-zinc-800 sm:h-[250px] h-[200px] w-full relative bg-gradient-to-br to-zinc-950 from-zinc-900 rounded-xl">
      <Image
        src={challenge?.image?.url}
        alt={challenge?.title}
        height={700}
        width={550}
        className=" absolute object-cover rounded-xl h-full w-full brightness-75 transition-all  "
      />

      {showPin && (
        <div
          onClick={() => handlePinningChallenge(challenge?._id)}
          className="absolute top-2 right-2 cursor-pointer rounded-full backdrop-blur-md hover:bg-neutral-500/40 p-2 group flex items-center justify-center z-20 "
        >
          {isLoading ? (
            <Loader2 className=" animate-spin" size={23} />
          ) : (
            <BiSolidPin
              className={` rotate-[54deg] ${
                profile?.challengePin?.includes(challenge?._id)
                  ? "fill-red-500"
                  : ""
              }  group-hover:scale-105 `}
              size={23}
            />
          )}
        </div>
      )}

      <div className="flex flex-col justify-between h-full w-full  absolute md:p-6 p-2">
        <div>
          <p className="font-bold uppercase md:text-3xl text-2xl ">
            {challenge?.title}
          </p>
          <p className=" font-semibold uppercase md:text-lg text-base ">
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
              {challenge.progress === challenge.days &&
              challenge.isCompleted ? (
                <Link
                  href={`/challenge/${challenge?._id}`}
                  className="  py-1 px-1 pl-3 flex items-center gap-2 backdrop-blur-md bg-neutral-600/30 hover:bg-neutral-500/40 text-white rounded-full w-fit  text-sm font-bold"
                >
                  <p className="items-center hidden sm:block gap-1">
                    Completed
                  </p>
                  <p className="items-center sm:hidden block gap-1">Continue</p>
                  <div className="p-2 rounded-full bg-emerald-500">
                    <Check color="#fff" size={18} />
                  </div>
                </Link>
              ) : (
                <Link
                  href={`/challenge/${challenge?._id}`}
                  className="  py-1 px-1 pl-3 flex items-center gap-2 backdrop-blur-md bg-neutral-600/30 hover:bg-neutral-500/40 text-white rounded-full w-fit  text-sm font-bold"
                >
                  <p className="items-center hidden sm:block gap-1">
                    Continue workout
                  </p>
                  <p className="items-center sm:hidden block gap-1">Continue</p>
                  <div className="p-2 rounded-full bg-white">
                    <ArrowRight color="#000" size={16} />
                  </div>
                </Link>
              )}

              <div className="  relative md:w-[60px] md:h-[60px] w-[50px] h-[50px] top-0  rounded-md p-1 z-[3]">
                {/* <Image
                  src={"./wave.svg"}
                  alt="wave"
                  fill
                  className=" absolute rounded-md w-[60px] h-[30px] object-cover z-[-1]"
                /> */}

                <svg className="w-full h-full z-10" viewBox="0 0 100 100">
                  <circle
                    className="text-white/20 backdrop-blur-sm stroke-current"
                    stroke-width="9"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>

                  <circle
                    className="text-indigo-500  progress-ring__circle stroke-current"
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
                    fontWeight="500"
                    text-anchor="middle"
                    alignment-baseline="middle"
                  >
                    {(
                      (challenge?.progress +
                        (challenge?.isCompleted ? 0 : -1)) *
                      (100 / challenge?.days)
                    )?.toFixed(0)}
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
              className=" py-1 px-1 pl-3 flex items-center gap-5 backdrop-blur-md bg-neutral-600/30 hover:bg-neutral-500/40 text-white rounded-full w-fit  text-sm font-bold"
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

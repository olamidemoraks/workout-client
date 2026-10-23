import { pinChallenge } from "@/api/challenge";
import useProfile from "@/hooks/useProfile";
import { cn } from "@/libs/utils";
import { getChallengeProgress } from "@/utils";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { BiSolidPin } from "react-icons/bi";
import { FaCrown } from "react-icons/fa6";
import { useMutation, useQueryClient } from "react-query";

type ChallengeCardProps = {
  challenge: Challenge;
  showPin?: boolean;
};

// Circumference of the progress ring (r = 40).
const RING_LENGTH = 2 * Math.PI * 40;

const pillClassName =
  "py-1 px-1 pl-3 flex items-center gap-2 backdrop-blur-md bg-neutral-600/30 hover:bg-neutral-500/40 text-white rounded-full w-fit text-sm font-bold transition";

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  showPin,
}) => {
  const { started, currentDay, percent, isFinished, isDoneToday } =
    getChallengeProgress(challenge);

  const queryClient = useQueryClient();
  const { profile, refetch } = useProfile();
  const isPinned = !!profile?.challengePin?.includes(challenge?._id);
  const { mutate, isLoading } = useMutation({
    mutationFn: pinChallenge,
    onSuccess: (data: { challenges: Array<any> }) => {
      refetch();
      // The home page lists pinned challenges, so refresh it too.
      queryClient.invalidateQueries("Home-challenge");
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
    <div className="group border border-zinc-800 hover:border-zinc-700 sm:h-[250px] h-[200px] w-full relative overflow-hidden bg-gradient-to-br to-zinc-950 from-zinc-900 rounded-xl transition">
      <Image
        src={challenge?.image?.url}
        alt={challenge?.title}
        height={700}
        width={550}
        className="absolute object-cover rounded-xl h-full w-full md:brightness-[.8] brightness-90 transition duration-500 group-hover:scale-105"
      />
      {/* Keeps the title and buttons readable on bright images */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-zinc-950/40" />

      {showPin && (
        <button
          type="button"
          onClick={() => handlePinningChallenge(challenge?._id)}
          disabled={isLoading}
          aria-pressed={isPinned}
          aria-label={isPinned ? "Unpin from home" : "Pin to home"}
          title={isPinned ? "Unpin from home" : "Pin to home"}
          className="absolute top-2 right-2 cursor-pointer rounded-full backdrop-blur-md hover:bg-neutral-500/40 p-2 flex items-center justify-center z-20 transition hover:scale-105"
        >
          {isLoading ? (
            <Loader2 className=" animate-spin" size={23} />
          ) : (
            <BiSolidPin
              className={`rotate-[54deg] ${isPinned ? "fill-red-500" : ""}`}
              size={23}
            />
          )}
        </button>
      )}

      <div className="flex flex-col justify-between h-full w-full absolute md:p-6 p-4">
        <div className={cn({ "pr-10": showPin })}>
          <p className="font-bold uppercase md:text-3xl text-2xl drop-shadow-md">
            {challenge?.title}
          </p>
          <p className=" font-semibold uppercase md:text-lg text-base drop-shadow-md">
            {challenge?.days} Day Challenge
          </p>
          {started && !isFinished && (
            <p className="mt-1 text-sm font-medium text-zinc-200 drop-shadow-md">
              Day {currentDay} of {challenge?.days}
            </p>
          )}
        </div>

        {started ? (
          <div>
            <div className="mt-4 flex justify-between items-center w-full">
              {isFinished || isDoneToday ? (
                <Link
                  href={`/challenge/${challenge?._id}`}
                  className={pillClassName}
                >
                  <p className="items-center block gap-1">
                    {isFinished ? "Completed" : "Done today"}
                  </p>
                  <div className="p-2 rounded-full bg-emerald-500">
                    <Check color="#fff" size={18} />
                  </div>
                </Link>
              ) : (
                <Link
                  href={`/challenge/${challenge?._id}`}
                  className={pillClassName}
                >
                  <p className="items-center hidden sm:block gap-1">
                    Continue workout
                  </p>
                  <p className="items-center sm:hidden block gap-1">Continue</p>
                  <div className="p-2 rounded-full bg-white transition group-hover:translate-x-0.5">
                    <ArrowRight color="#000" size={16} />
                  </div>
                </Link>
              )}

              <div
                role="progressbar"
                aria-label={`${challenge?.title} progress`}
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
                className="relative md:w-[60px] md:h-[60px] w-[50px] h-[50px] rounded-full p-1 z-[3] backdrop-blur-sm"
              >
                <svg className="w-full h-full z-10" viewBox="0 0 100 100">
                  <circle
                    className="text-white/20 stroke-current"
                    strokeWidth="9"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>

                  <circle
                    className={cn(
                      "progress-ring__circle stroke-current",
                      isFinished ? "text-emerald-500" : "text-indigo-500"
                    )}
                    strokeWidth="9"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    style={{
                      strokeDasharray: RING_LENGTH,
                      strokeDashoffset: RING_LENGTH * (1 - percent / 100),
                    }}
                    fill="transparent"
                  ></circle>

                  <text
                    x="50"
                    y="50"
                    fill="#ffffff"
                    fontFamily="Verdana"
                    fontSize="25"
                    fontWeight="500"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {percent}%
                  </text>
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-between items-end">
            <Link
              href={`/challenge/${challenge?._id}`}
              className={cn(pillClassName, "gap-5")}
            >
              <div className="items-center flex gap-1">
                Start workout
                {challenge?.premium ? (
                  <FaCrown className="text-xl  fill-amber-400" />
                ) : null}
              </div>
              <div className="p-2 rounded-full bg-white transition group-hover:translate-x-0.5">
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

import { Loader2 } from "lucide-react";
import React from "react";

type FollowActionButtonProps = {
  id: string | undefined | null;
  profile: IUser;
  handleFollowAndUnfollowAction: (id: string, following: boolean) => void;
  user: IUser;
  followingUsers: string[];
  following: boolean;
  unfollowing: boolean;
};

const FollowActionButton: React.FC<FollowActionButtonProps> = ({
  following,
  unfollowing,
  followingUsers,
  user,
  handleFollowAndUnfollowAction,
  profile,
}) => {
  if (profile?._id === user?._id) {
    return <span className="text-sm text-zinc-500 px-2">You</span>;
  }

  const isFollowing = !!followingUsers?.includes(user?._id);
  const isPending = following || unfollowing;

  return (
    <button
      type="button"
      onClick={() => handleFollowAndUnfollowAction(user?._id, isFollowing)}
      disabled={isPending}
      className={`shrink-0 min-w-[92px] flex items-center justify-center disabled:opacity-60 px-3 py-1.5 text-sm font-semibold rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
        isFollowing ? "bg-zinc-800 hover:bg-zinc-700" : "bg-blue-600 hover:bg-blue-500"
      }`}
    >
      {isPending ? (
        <Loader2 className="animate-spin" size={16} />
      ) : isFollowing ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </button>
  );
};
export default FollowActionButton;

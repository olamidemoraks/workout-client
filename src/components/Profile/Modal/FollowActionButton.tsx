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
  id,
  profile,
}) => {
  return (
    <>
      {profile?._id === user?._id ? null : id && id != profile._id ? (
        <button
          onClick={() =>
            handleFollowAndUnfollowAction(
              user?._id,
              followingUsers?.includes(user?._id)
            )
          }
          disabled={
            following || unfollowing || followingUsers?.includes(user?._id)
              ? true
              : false
          }
          className={` disabled:opacity-50 px-2  p-1 ${
            followingUsers?.includes(user?._id)
              ? "bg-transparent"
              : "bg-blue-500"
          } rounded`}
        >
          {followingUsers?.includes(user?._id) ? <>following</> : <>follow</>}
          {(following || unfollowing) && "ing..."}
        </button>
      ) : (
        <button
          onClick={() =>
            handleFollowAndUnfollowAction(
              user?._id,
              followingUsers?.includes(user?._id)
            )
          }
          disabled={following || unfollowing ? true : false}
          className={` disabled:opacity-50 px-2 p-1 bg-blue-600 rounded`}
        >
          {followingUsers?.includes(user?._id) ? <>unfollow</> : <>follow</>}
          {(following || unfollowing) && "ing..."}
        </button>
      )}
    </>
  );
};
export default FollowActionButton;

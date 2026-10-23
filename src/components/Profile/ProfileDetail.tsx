import React, { useState } from "react";
import Following from "./Modal/Following";
import Follower from "./Modal/Follower";
import Image from "next/image";
import { Edit2, Loader2, Smile } from "lucide-react";
import ProfileUnit from "./ProfileUnit";
import Link from "next/link";
import { useMutation, useQueryClient } from "react-query";
import { updateProfileImage } from "@/api/user";
import toast from "react-hot-toast";
import { alphabetsColor } from "@/utils/data";
import { FaExpand } from "react-icons/fa";
import ExpandImageModal from "./Modal/ExpandImageModal";

type ProfileDetailProps = {
  profile: IUser;
  personalPage: boolean;
};

const ProfileDetail: React.FC<ProfileDetailProps> = ({
  profile,
  personalPage,
}) => {
  const [expand, setExpand] = useState(false);
  const [openFollowing, setOpenFollowing] = useState<boolean>(false);
  const [openFollowers, setOpenFollowers] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: updateProfileImage,
    onError: () => {
      toast.error("Couldn't update profile image");
    },
    onSuccess: () => {
      queryClient.refetchQueries("profile");
      toast.success("Profile image has been changed");
    },
  });

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        if (fileReader.readyState === 2) {
          const data = {
            image: fileReader.result,
          };
          mutate({ value: data });
        }
      };
      fileReader.readAsDataURL(file);
    }
  };
  return (
    <>
      {profile?.avatar?.url && (
        <ExpandImageModal
          open={expand}
          setClose={() => setExpand(false)}
          image={profile.avatar.url}
        />
      )}
      <Following
        open={openFollowing}
        setClose={() => setOpenFollowing(false)}
      />
      <Follower open={openFollowers} setClose={() => setOpenFollowers(false)} />

      <div className=" md:h-[220px] md:w-[220px] h-[180px] w-[180px] rounded-full relative bg-zinc-900/60 flex items-center justify-center m-5 ">
        {profile?.avatar?.url ? (
          <Image
            src={profile?.avatar.url}
            alt="avatar"
            width={600}
            height={600}
            className="w-[92%] h-[92%] rounded-full absolute object-cover"
          />
        ) : (
          <div
            className={`${
              alphabetsColor[
                profile?.name.split(" ")?.[0].substring(0, 1).toUpperCase()
              ] ?? "bg-zinc-900/60"
            } h-full w-full rounded-full flex items-center justify-center text-4xl uppercase font-semibold`}
          >
            {profile?.username?.substring(0, 1)}
          </div>
        )}
        {personalPage && (
          <label
            htmlFor="avatar"
            title="Change photo"
            className="absolute -bottom-1 right-3 bg-zinc-900/60 hover:bg-zinc-900 h-9 w-9 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition duration-200 focus-within:ring-2 focus-within:ring-emerald-400"
          >
            <span className="sr-only">Change profile photo</span>
            {isLoading ? (
              <Loader2 className=" animate-spin" size={20} />
            ) : (
              <Smile size={20} />
            )}
            <input
              id="avatar"
              type="file"
              accept=".png, .jpg, .jpeg"
              className="sr-only"
              onChange={handleSelectImage}
            />
          </label>
        )}

        {profile?.avatar?.url && (
          <button
            type="button"
            onClick={() => setExpand(true)}
            aria-label="View full photo"
            title="View full photo"
            className="group absolute -bottom-1 left-3  bg-zinc-900/60 hover:bg-zinc-900 h-9 w-9 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <FaExpand className="group-hover:fill-orange-400 transition-colors" />
          </button>
        )}
      </div>

      <hr />
      <div className="text-center leading-6 flex items-start gap-3">
        <div className="  flex flex-col items-center gap-1">
          <p className=" text-xl  font-semibold capitalize">
            {profile?.name ?? "-"}
          </p>
          <p className="text-lg  font-semibold">@{profile?.username ?? "-"}</p>
        </div>

        {personalPage && (
          <Link
            href={`/profile/${profile?._id}`}
            aria-label="Edit profile"
            title="Edit profile"
            className="absolute right-6 top-5 p-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <Edit2 size={18} />
          </Link>
        )}
      </div>
      <div className="flex   flex-row items-center justify-evenly px-5 md:gap-5 gap-4  mt-3">
        <button
          type="button"
          onClick={() => setOpenFollowers(true)}
          className=" cursor-pointer rounded-lg px-3 py-1 hover:bg-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <ProfileUnit text="Followers" unit={profile?.followers?.length} />
        </button>
        <div className="h-6 w-[1px] bg-zinc-800" />
        <button
          type="button"
          onClick={() => setOpenFollowing(true)}
          className=" cursor-pointer rounded-lg px-3 py-1 hover:bg-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <ProfileUnit text="Following" unit={profile?.following?.length} />
        </button>
      </div>
    </>
  );
};
export default ProfileDetail;

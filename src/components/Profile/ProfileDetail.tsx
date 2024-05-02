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

type ProfileDetailProps = {
  profile: IUser;
  personalPage: boolean;
};

const ProfileDetail: React.FC<ProfileDetailProps> = ({
  profile,
  personalPage,
}) => {
  console.log({ profile });
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
            className="absolute -bottom-1 right-3 bg-zinc-900/60 hover:bg-zinc-900 h-9 w-9 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition duration-200"
          >
            {isLoading ? (
              <Loader2 className=" animate-spin" size={17} />
            ) : (
              <Smile size={17} />
            )}
            <input
              id="avatar"
              type="file"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={handleSelectImage}
            />
          </label>
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
            className="absolute right-6 top-5 p-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 cursor-pointer"
          >
            <Edit2 size={18} />
          </Link>
        )}
      </div>
      <div className="flex   flex-row items-center justify-evenly px-5 md:gap-5 gap-4  mt-3">
        <div onClick={() => setOpenFollowers(true)} className=" cursor-pointer">
          <ProfileUnit text="Followers" unit={profile?.followers?.length} />
        </div>
        <div className="h-6 w-[1px] bg-zinc-800" />
        <div onClick={() => setOpenFollowing(true)} className=" cursor-pointer">
          <ProfileUnit text="Following" unit={profile?.following?.length} />
        </div>
      </div>
    </>
  );
};
export default ProfileDetail;

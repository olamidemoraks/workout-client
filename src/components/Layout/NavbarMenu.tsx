import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { BiNotepad, BiSolidZap } from "react-icons/bi";
import Tooltip from "@mui/material/Tooltip";
import useBatteryCharge from "@/hooks/useBatteryCharge";
import useStreak from "@/hooks/useStreak";
import { alphabetsColor } from "@/utils/data";
import { deleteTokenFromLocalStorage } from "@/utils/localstorage";
import { signOut } from "next-auth/react";
import UserStreak from "../Common/UserStreak";
import { FaUser } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";

const chargeColor: { [key: number]: string } = {
  1: "fill-red-500",
  2: "fill-orange-500",
  3: "fill-yellow-600",
  4: "fill-yellow-500",
  0: "",
};
export default function NavbarMenu({ profile }: { profile: IUser }) {
  const router = useRouter();
  const { chargeLeft } = useBatteryCharge();
  const { streak, longestStreak, totalWorkout, isLoading } = useStreak({
    userId: profile?._id,
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        id="profile-button"
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className=" cursor-pointer flex items-center bg-zinc-800 rounded-l-lg rounded-r-xl h-10"
      >
        <Tooltip
          title="Energy level"
          arrow
          placement="left"
          className="sm:flex hidden"
        >
          <div className="flex gap-1 items-center  pl-4 pr-3 h-full ">
            <BiSolidZap className={`${chargeColor[chargeLeft]}`} size={19} />
            <p className="font-semibold text-base">{chargeLeft}</p>
          </div>
        </Tooltip>
        {profile?.avatar ? (
          <div className="h-10 w-10 relative">
            <Image
              src={profile?.avatar.url}
              alt="avatar"
              fill
              className=" rounded-xl absolute object-cover"
            />
          </div>
        ) : (
          // <div className=" bg-zinc-800   md:h-10 md:w-10 h-8 w-8 flex items-center justify-center rounded-full font-semibold uppercase text-lg">
          //   {profile?.username?.substring(0, 1)}
          // </div>
          <div
            className={`${
              alphabetsColor[
                profile?.name.split(" ")?.[0].substring(0, 1).toUpperCase()
              ] ?? "bg-zinc-900/60"
            }  h-10 w-10 rounded-xl flex items-center justify-center text-xl uppercase font-semibold`}
          >
            {profile?.name?.substring(0, 1)}
          </div>
        )}
      </div>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "profile-button",
        }}
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "#1b1b1d",
            minWidth: "250px",
            maxWidth: "350px",
            border: "1px solid #363640",
          },
        }}
      >
        <MenuItem
          sx={{
            margin: "3px",
            borderRadius: "4px",
            py: "6px",
          }}
          onClick={() => {}}
        >
          <div>
            <div className="flex gap-2 ">
              <div>
                {profile?.avatar ? (
                  <div className="h-12 w-12 relative">
                    <Image
                      src={profile?.avatar.url}
                      alt="avatar"
                      fill
                      className=" rounded-xl absolute object-cover"
                    />
                  </div>
                ) : (
                  // <div className=" bg-zinc-800   md:h-10 md:w-10 h-8 w-8 flex items-center justify-center rounded-full font-semibold uppercase text-lg">
                  //   {profile?.username?.substring(0, 1)}
                  // </div>
                  <div
                    className={`${
                      alphabetsColor[
                        profile?.name
                          .split(" ")?.[0]
                          .substring(0, 1)
                          .toUpperCase()
                      ] ?? "bg-zinc-900/60"
                    }  h-12 w-12 rounded-xl flex items-center justify-center text-xl uppercase font-semibold`}
                  >
                    {profile?.name?.substring(0, 1)}
                  </div>
                )}
              </div>
              <div>
                <p className=" text-sm font-semibold">{profile?.email}</p>
                <p className="text-sm text-zinc-200 lowercase">
                  @{profile?.username}
                </p>
              </div>
            </div>
            <div className="md:hidden bg-zinc-950 p-2 rounded-md  mt-4 flex items-center justify-between">
              <UserStreak
                streak={streak ?? 0}
                isLoading={isLoading}
                longestStreak={longestStreak}
                totalWorkout={totalWorkout}
              />
              <div className="flex gap-1 items-center  pl-4 pr-3 h-full ">
                <BiSolidZap
                  className={`${chargeColor[chargeLeft]}`}
                  size={19}
                />
                <p className="font-semibold text-base">{chargeLeft}</p>
              </div>
            </div>
          </div>
        </MenuItem>
        <div className=" w-full h-[1px] bg-zinc-800 border-t border-[#363640]" />
        <MenuItem
          sx={{
            "&:hover": {
              bgcolor: "#27272a",
            },
            margin: "3px",
            borderRadius: "4px",
            py: "8px",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "6px",
          }}
          onClick={() => {
            handleClose();
            router.push("/profile");
          }}
        >
          Profile <FaUser />
        </MenuItem>
        <MenuItem
          sx={{
            "&:hover": {
              bgcolor: "#27272a",
            },
            margin: "3px",
            borderRadius: "4px",
            py: "8px",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "6px",
          }}
          onClick={() => {
            handleClose();
            router.push("/workouts/create");
          }}
        >
          Create Plan
          <BiNotepad size={23} />
        </MenuItem>
        <MenuItem
          sx={{
            "&:hover": {
              bgcolor: "#27272a",
            },
            margin: "3px",
            borderRadius: "4px",
            py: "8px",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "6px",
          }}
          onClick={() => {
            handleClose();
            signOut();
            deleteTokenFromLocalStorage();
            router.push("/login");
          }}
        >
          Log out
          <FaSignOutAlt size={21} />
        </MenuItem>
      </Menu>
    </div>
  );
}

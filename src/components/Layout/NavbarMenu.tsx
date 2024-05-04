import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { FaCaretDown } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";
import { useMutation } from "react-query";
import { logout } from "@/api/user";
import { signOut } from "next-auth/react";
import { alphabetsColor } from "@/utils/data";
import { deleteTokenFromLocalStorage } from "@/utils/localstorage";

export default function NavbarMenu({ profile }: { profile: IUser }) {
  const router = useRouter();

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
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className=" cursor-pointer"
      >
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
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "#18181b",
            width: "250px",
          },
        }}
      >
        <MenuItem
          sx={{
            margin: "5px",
            borderRadius: "4px",
            py: "6px",
          }}
          onClick={() => {
           
          }}
        >
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
                profile?.name.split(" ")?.[0].substring(0, 1).toUpperCase()
              ] ?? "bg-zinc-900/60"
            }  h-12 w-12 rounded-xl flex items-center justify-center text-xl uppercase font-semibold`}
          >
            {profile?.name?.substring(0, 1)}
          </div>
        )}
              </div>
           <div >
           <p className=" text-lg font-semibold">{profile?.name}</p>
            <p className="text-xs text-zinc-200">@{profile?.username}</p>
           </div>
          </div>
        </MenuItem>
        <div className=" w-full h-[1px] bg-zinc-800"/>
        <MenuItem
          sx={{
            "&:hover": {
              bgcolor: "#27272a",
            },
            margin: "5px",
            borderRadius: "4px",
            py: "10px",
            fontSize: "16px",
          }}
          onClick={() => {
            handleClose();
            router.push("/profile");
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          sx={{
            "&:hover": {
              bgcolor: "#27272a",
            },
            margin: "5px",
            borderRadius: "4px",
            py: "10px",
            fontSize: "16px",
          }}
          onClick={() => {
            handleClose();
            router.push("/workouts/create");
          }}
        >
          Create Plan
        </MenuItem>
        <MenuItem
          sx={{
            "&:hover": {
              bgcolor: "#27272a",
            },
            margin: "5px",
            borderRadius: "4px",
            py: "10px",
            fontSize: "16px",
          }}
          onClick={() => {
            handleClose();
            signOut();
            deleteTokenFromLocalStorage();
            router.push("/login");
          }}
        >
          Log out
        </MenuItem>
      </Menu>
    </div>
  );
}

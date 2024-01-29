import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { FaCaretDown } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function NavbarMenu({ profile }: { profile: IUser }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <div className="flex items-center gap-1">
          {profile?.avatar ? (
            <div className="md:h-10 md:w-10 h-8 w-8 relative">
              <Image
                src={profile?.avatar.url}
                alt="avatar"
                fill
                className=" rounded-full absolute object-cover"
              />
            </div>
          ) : (
            <div className=" bg-zinc-800   md:h-10 md:w-10 h-8 w-8 flex items-center justify-center rounded-full font-semibold uppercase text-lg">
              {profile?.username?.substring(0, 1)}
            </div>
          )}
          <FaCaretDown />
        </div>
      </Button>
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
          },
        }}
      >
        <MenuItem
          sx={{
            "&:hover": {
              bgcolor: "#27272a",
            },
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
          }}
          onClick={() => {
            handleClose();
            router.push("/workouts/create");
          }}
        >
          Create Workouts
        </MenuItem>
        <MenuItem
          sx={{
            "&:hover": {
              bgcolor: "#27272a",
            },
          }}
          onClick={handleClose}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

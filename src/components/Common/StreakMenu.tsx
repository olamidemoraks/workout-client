import { Menu } from "@mui/material";
import React, { ReactNode, useState } from "react";
import DailyAttendance from "../Home/DailyAttendance";
import { FaMasksTheater } from "react-icons/fa6";
import ChooseStreakApperance from "./ChooseStreakApperance";

type StreakMenuProps = {
  children: ReactNode;
  streak: number;
  longestStreak: number;
  totalWorkout: number;
};

const StreakMenu: React.FC<StreakMenuProps> = ({
  children,
  streak,
  longestStreak,
  totalWorkout,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openApperance, setOpenApperance] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        id="streak-button"
        aria-controls={open ? "streak-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {children}
      </div>
      <ChooseStreakApperance
        open={openApperance}
        setClose={() => setOpenApperance(false)}
      />
      <Menu
        id="streak-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "streak-button",
        }}
        sx={{
          "& .MuiPaper-root": {
            border: "1px solid #222225",
            bgcolor: "#1d1d21",
            minWidth: "250px",
            maxWidth: "350px",
            borderRadius: "8px",
          },
        }}
      >
        <div className="p-3 flex flex-col">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className=" font-bold text-base">{streak}</p>
              <p className="text-sm text-zinc-400">Current Streak</p>
            </div>
            <div>
              <p className=" font-bold text-base">{longestStreak}</p>
              <p className="text-sm text-zinc-400">Longest Streak 🏆</p>
            </div>
          </div>
          <div className="mb-5">
            <DailyAttendance external />
          </div>

          <div className=" text-center mb-5">
            <p className="text-sm text-zinc-300 font-semibold ">
              Total workout days {totalWorkout}
            </p>
          </div>

          <div>
            <div className="h-[1px] w-full bg-zinc-700" />

            <button
              onClick={() => {
                handleClose();
                setOpenApperance(true);
              }}
              className="flex w-full gap-2 items-center justify-center mt-4 cursor-pointer hover:bg-zinc-600/75 p-2 rounded-md"
            >
              <p className=" text-sm text-zinc-300">Choose streak apperance</p>
              <FaMasksTheater />{" "}
            </button>
          </div>
        </div>
      </Menu>
    </div>
  );
};
export default StreakMenu;

import { Menu } from "@mui/material";
import { Palette } from "lucide-react";
import React, { ReactNode, useState } from "react";
import DailyAttendance from "../Home/DailyAttendance";
import { focusRing } from "../auth/FormControls";
import { cn } from "@/libs/utils";
import ChooseStreakApperance from "./ChooseStreakApperance";

type StreakMenuProps = {
  children: ReactNode;
};

const StreakMenu: React.FC<StreakMenuProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openApperance, setOpenApperance] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button
        type="button"
        id="streak-button"
        aria-label="Show streak details"
        aria-controls={open ? "streak-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={cn("rounded-xl", focusRing)}
      >
        {children}
      </button>
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
          sx: { py: 0 },
        }}
        sx={{
          "& .MuiPaper-root": {
            mt: 1,
            border: "1px solid #27272a",
            bgcolor: "#111113",
            width: "340px",
            maxWidth: "calc(100vw - 32px)",
            borderRadius: "16px",
          },
        }}
      >
        <DailyAttendance embedded>
          <button
            type="button"
            onClick={() => {
              handleClose();
              setOpenApperance(true);
            }}
            className={cn(
              "group relative mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 py-2.5 text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-white",
              focusRing
            )}
          >
            <Palette size={16} aria-hidden className="stroke-zinc-400 group-hover:stroke-white" />
            Change streak style
          </button>
        </DailyAttendance>
      </Menu>
    </div>
  );
};
export default StreakMenu;

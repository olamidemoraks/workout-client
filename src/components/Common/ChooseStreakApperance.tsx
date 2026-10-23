import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { Box, Slider } from "@mui/material";
import { Check, X } from "lucide-react";
import StreakApperance from "./StreakApperance";
import { useMutation } from "react-query";
import { updateProfile } from "@/api/user";
import useProfile from "@/hooks/useProfile";
import { cn } from "@/libs/utils";
import { PrimaryButton, focusRing } from "../auth/FormControls";

type ChooseStreakApperanceProps = {
  open: boolean;
  setClose: () => void;
};

const styles = [
  { type: 1, name: "Animated", description: "Flame and energy bar" },
  { type: 2, name: "Minimal", description: "Flame and day count" },
];

const ChooseStreakApperance: React.FC<ChooseStreakApperanceProps> = ({
  setClose,
  open,
}) => {
  const { profile, refetch } = useProfile();
  const [type, setType] = useState(profile?.streakApperanceType || 2);
  const [streak, setStreak] = useState(4);

  useEffect(() => {
    if (open) setType(profile?.streakApperanceType || 2);
  }, [open, profile?.streakApperanceType]);

  const { mutate, isLoading } = useMutation({
    mutationFn: updateProfile,
    onSettled: () => {
      setClose();
      refetch();
    },
  });
  const handleChange = (event: Event, newValue: number | number[]) => {
    setStreak(newValue as number);
  };
  const handleSaveAndClose = () => {
    mutate({ value: { streakApperanceType: type } });
  };
  return (
    <Modal open={open} setClose={setClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { sm: "fit-content", xs: "100%" },
          outline: "none",
        }}
      >
        <div className="mx-auto flex w-[calc(100%-32px)] flex-col rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:w-[480px]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Streak style</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Pick how your streak looks in the top bar.
              </p>
            </div>
            <button
              type="button"
              onClick={setClose}
              aria-label="Close"
              className={cn(
                "group grid h-9 w-9 place-items-center rounded-lg transition hover:bg-zinc-800",
                focusRing
              )}
            >
              <X size={18} className="stroke-zinc-400 group-hover:stroke-white" />
            </button>
          </div>

          <div role="radiogroup" aria-label="Streak style" className="mt-6 grid gap-3 sm:grid-cols-2">
            {styles.map((style) => {
              const selected = type === style.type;
              return (
                <button
                  key={style.type}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setType(style.type)}
                  className={cn(
                    "relative flex flex-col items-start gap-4 rounded-xl border bg-zinc-900/60 p-4 text-left transition hover:border-zinc-700",
                    selected
                      ? "border-emerald-500 ring-4 ring-emerald-500/15"
                      : "border-zinc-800",
                    focusRing
                  )}
                >
                  {selected && (
                    <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-emerald-500">
                      <Check size={12} strokeWidth={3} className="stroke-zinc-950" />
                    </span>
                  )}
                  <div className="flex h-14 w-full items-center justify-center">
                    <StreakApperance type={style.type} streak={streak} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{style.name}</p>
                    <p className="text-xs text-zinc-500">{style.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <label id="streak-preview-label" className="text-zinc-400">
                Preview streak
              </label>
              <span className="font-semibold tabular-nums">{streak} days</span>
            </div>
            <Slider
              aria-labelledby="streak-preview-label"
              min={0}
              max={15}
              value={streak}
              onChange={handleChange}
              sx={{
                color: "#10b981",
                "& .MuiSlider-rail": { bgcolor: "#3f3f46" },
              }}
            />
          </div>

          <PrimaryButton
            onClick={handleSaveAndClose}
            isLoading={isLoading}
            loadingText="Saving..."
            className="mt-4"
          >
            Save style
          </PrimaryButton>
        </div>
      </Box>
    </Modal>
  );
};
export default ChooseStreakApperance;

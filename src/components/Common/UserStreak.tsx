import useProfile from "@/hooks/useProfile";
import useStreakSummary from "@/hooks/useStreakSummary";
import CustomLoader from "./CustomLoader";
import StreakApperance from "./StreakApperance";
import StreakMenu from "./StreakMenu";

const UserStreak = () => {
  const { profile } = useProfile();
  const { streak, status, isLoading } = useStreakSummary();

  return (
    <StreakMenu>
      {isLoading ? (
        <CustomLoader amount={1} height="h-10" weight="w-[88px]" />
      ) : (
        <StreakApperance
          type={profile?.streakApperanceType ?? 0}
          streak={streak}
          active={status === "done"}
        />
      )}
    </StreakMenu>
  );
};

export default UserStreak;

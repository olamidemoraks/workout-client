// Local calendar day, e.g. "2026-10-23". Activities are grouped by the
// viewer's local date so a late-night workout counts for the day it happened.
export function toDayKey(date: Date | string): string {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

export type WeekDay = {
  key: string;
  label: string;
  date: Date;
  isToday: boolean;
  isFuture: boolean;
};

// Monday to Sunday of the week containing `today`.
export function getCurrentWeek(today = new Date()): WeekDay[] {
  const monday = new Date(today);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  const todayKey = toDayKey(today);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const key = toDayKey(date);
    return {
      key,
      label: date.toLocaleDateString("en-US", { weekday: "narrow" }),
      date,
      isToday: key === todayKey,
      isFuture: key > todayKey,
    };
  });
}

export type StreakStatus = "done" | "pending" | "lost";

// The server counts the streak up to the latest workout, so it stays high
// after a missed day. The latest workout tells us whether it is still alive.
export function getStreakStatus(lastActivity?: Date | string): StreakStatus {
  if (!lastActivity) return "lost";
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const lastKey = toDayKey(lastActivity);
  if (lastKey === toDayKey(today)) return "done";
  if (lastKey === toDayKey(yesterday)) return "pending";
  return "lost";
}

// `progress` is the current day (1-based) and `isCompleted` says whether that
// day's workout is done. Both come from the user's ChallengeProgress record.
export function getChallengeProgress({
  progress,
  days,
  isCompleted,
}: Pick<Challenge, "progress" | "days" | "isCompleted">) {
  const started = progress !== null && progress !== undefined;
  const currentDay = started ? progress : 1;
  const daysDone = started ? Math.max(0, currentDay - (isCompleted ? 0 : 1)) : 0;

  return {
    started,
    currentDay,
    daysDone,
    daysLeft: Math.max(0, days - daysDone),
    percent: days > 0 ? Math.round((daysDone / days) * 100) : 0,
    isFinished: started && isCompleted && currentDay >= days,
    isDoneToday: started && isCompleted && currentDay < days,
  };
}

// Today's progress on a gym program, counted in sets.
export function getProgramProgress(program?: IProgram) {
  const exercises = program?.exercises ?? [];
  const totalSets = exercises.reduce((total, exercise) => total + exercise.sets, 0);
  const doneSets = exercises.reduce(
    (total, exercise) => total + (exercise.completedSets?.length ?? 0),
    0
  );
  const exercisesDone = exercises.filter(
    (exercise) => (exercise.completedSets?.length ?? 0) >= exercise.sets
  ).length;

  return {
    totalSets,
    doneSets,
    exercisesDone,
    percent: totalSets ? Math.round((doneSets / totalSets) * 100) : 0,
    isComplete: totalSets > 0 && doneSets >= totalSets,
  };
}

// "10" -> "10 reps", "8-12" -> "8-12 reps"; anything else ("30s", "AMRAP")
// is shown as written.
export function formatReps(reps: string): string {
  const value = reps.trim();
  return /^\d+(\s*[-–]\s*\d+)?$/.test(value) ? `${value} reps` : value;
}

export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor((totalSeconds ?? 0) / 60);
  if (minutes >= 60) {
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  }
  return `${minutes} min`;
}

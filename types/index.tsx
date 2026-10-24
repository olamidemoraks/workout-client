interface IUser {
  _id: string;
  name: string;
  email: string;
  username: string;
  steps: string;
  avatar?: {
    public_id: string;
    url: string;
  };
  gender: string;
  height: string;
  weight: string;
  age: Date;
  goals?: string;
  level?: number;
  weightMeasure: "kg" | "lb";
  heightMeasure: "cm" | "ft";
  followers: [string];
  following: [string];
  challengePin: Array<string>;
  streakApperanceType: number;
}

interface IWorkout {
  _id: string;
  difficult_level: number;
  estimate_time: string;
  exercises: [IExercise];
  location: string;
  name: string;
  premium: false;
  image: {
    public_id: string;
    url: string;
  };
  day?: number;
}

interface ICustomWorkout {
  _id: string;
  creatorId: string;
  creator: {
    _id: string;
    username: string;
    name: string;
    avatar: { public_id: string; url: string };
  };
  exercises: [IExercise];
  location: string;
  name: string;
  image: {
    public_id: string;
    url: string;
  };
}

interface IExercise {
  _id: string;
  exercise_id: string;
  name: string;
  image: {
    public_id: string;
    url: string;
  };
  female_image: {
    public_id: string;
    url: string;
  };
  tips: string;
  body_part: string;
  equipment: string;
  location: string;
  focus: string[];
  time_base: boolean;
  repetition: number;
  rest: number;
  sets: number;
}

interface Challenge {
  _id: string;
  title: string;
  days: number;
  premium: boolean;
  image: {
    public_id: string;
    url: string;
  };
  location: string;
  challenges: [];
  progress: number;
  isCompleted: boolean;
}

interface INotification {
  _id: string;
  userId: string;
  from: IUser;
  type: string;
  content: string;
  status: "read" | "unread";
  workoutId?: string;
}

interface IProgramExercise {
  _id: string;
  name: string;
  sets: number;
  // Free text: "10", "8-12", "30s".
  reps: string;
  // 0-based set indexes ticked today.
  completedSets: number[];
}

// A user's own gym program (e.g. "Push day"), ticked off set by set.
interface IProgram {
  _id: string;
  userId: string;
  name: string;
  exercises: IProgramExercise[];
  // Local day (YYYY-MM-DD) the ticks belong to.
  progressDate: string;
  createdAt: string;
  updatedAt: string;
}

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
  streak: number;
  weightMeasure: "kg" | "lb";
  heightMeasure: "cm" | "ft";
  followers: [string];
  following: [string];
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

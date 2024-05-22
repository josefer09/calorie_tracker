import { useMemo } from "react";
import type { Activity } from "../types";
import CaloriesDisplay from "./CaloriesDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  // Contadores
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesBurnded = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesTotal = useMemo(
    () => caloriesConsumed - caloriesBurnded,
    [activities]
  );
  return (
    <>
      <h2 className=" text-center font-bold text-4xl text-white">
        Calorie Summary
      </h2>
      <div className=" flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CaloriesDisplay calories={caloriesConsumed} text={"Consumed"} />
        <CaloriesDisplay calories={caloriesBurnded} text={"Burned"} />
        <CaloriesDisplay calories={caloriesTotal} text={"Difference"} />

      </div>
    </>
  );
}

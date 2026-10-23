import { ResponsiveRadar } from "@nivo/radar";
import { useMemo } from "react";
import { cn } from "@/libs/utils";
import Empty from "@/components/Common/Empty";
import useGetAllActivities from "@/hooks/useGetAllActivities";
const RecentWorkoutChart = () => {
  const { data, isLoading } = useGetAllActivities();

  const focusPoint = useMemo(() => {
    const points = ["abs", "legs", "arm", "back", "chest"];

    const serverFocusPoint = data?.activities
      ?.filter((activity: any) =>
        points.includes(
          (activity.workoutName.split(" ")?.[0] as string).toLowerCase()
        )
      )
      ?.reduce((accumalator: any[], currentValue: any) => {
        const label = (
          currentValue.workoutName.split(" ")?.[0] as string
        ).toLowerCase();
        const sameLabel = accumalator.find(
          (activities) => activities?.id === label
        );
        if (sameLabel) {
          sameLabel.value += 1;
        } else {
          accumalator.push({
            id: label,
            label: label === "back" ? "Back & Shoulder" : label,
            value: 1,
          });
        }

        return accumalator;
      }, []);

    // console.log({ serverFocusPoint });

    const mainFocusPoint = [...(serverFocusPoint ?? [])];
    points.map((item: any) => {
      if (!!(serverFocusPoint as Array<any>)?.find((p: any) => p.id === item)) {
        return;
      } else {
        mainFocusPoint?.push({
          id: item,
          label: item === "back" ? "Back & Shoulder" : item,
          value: 0,
        });
      }
      // if (!point?.includes(item?.id)) {
      //   mainFocusPoint?.push({
      //     id: item,
      //     label: item,
      //     value: 0,
      //   });
      // }
    });
    return mainFocusPoint;
  }, [data]);

  // Only standard muscle-group workouts (abs, legs, ...) count here, so
  // someone who has only done challenges would see a flat, empty radar.
  const hasFocusData = focusPoint.some((point: any) => point.value > 0);

  if (isLoading) {
    return (
      <div className="h-[400px] w-full p-4">
        <div className="h-full w-full rounded-lg bg-zinc-900 animate-pulse" />
      </div>
    );
  }

  return (
    <div className=" h-full w-full mt-[16px] flex flex-col justify-center items-center">
      <div className={cn("w-[100%] h-[400px]")}>
        {data?.activities?.length === 0 ? (
          <Empty />
        ) : !hasFocusData ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-6">
            <p className="font-medium">No muscle-group workouts yet</p>
            <p className="text-sm text-zinc-400 mt-1">
              Abs, arm, back, chest and legs workouts show up here.
            </p>
          </div>
        ) : (
          <ResponsiveRadar
            data={focusPoint}
            keys={["value"]}
            indexBy="label"
            valueFormat=">.0f"
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            borderColor={{ from: "color" }}
            gridShape="linear"
            gridLabelOffset={11}
            gridLevels={4}
            dotSize={9}
            dotColor={{ theme: "background" }}
            dotBorderWidth={2}
            ariaLabel=""
            colors={{ scheme: "set2" }}
            fillOpacity={0.35}
            blendMode="normal"
            motionConfig="wobbly"
            theme={{
              axis: {
                ticks: {
                  text: {
                    fill: "#fff",
                    fontSize: 14,
                    textTransform: "capitalize",
                  },
                },
              },
              grid: {
                line: {
                  stroke: "#3f3f46",
                },
              },
              tooltip: {
                container: {
                  background: "#1e1e20",
                  textEmphasisColor: "#000",
                  textTransform: "capitalize",
                },
              },
            }}
            // legends={[
            //   {
            //     anchor: "top-left",
            //     direction: "column",
            //     translateX: -50,
            //     translateY: -40,
            //     itemWidth: 80,
            //     itemHeight: 20,
            //     itemTextColor: "#b3b3b3",
            //     symbolSize: 12,
            //     symbolShape: "circle",
            //     effects: [
            //       {
            //         on: "hover",
            //         style: {
            //           itemTextColor: "#ffffff",
            //         },
            //       },
            //     ],
            //   },
            // ]}
          />
        )}
      </div>
    </div>
  );
};

export default RecentWorkoutChart;

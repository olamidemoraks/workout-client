import { ResponsiveRadar } from "@nivo/radar";
import { useMemo } from "react";
import { cn } from "@/libs/utils";
import Empty from "@/components/Common/Empty";
import useGetAllActivities from "@/hooks/useGetAllActivities";
const RecentWorkoutChart = () => {
  const { data, isLoading } = useGetAllActivities();

  const focusPoint = useMemo(() => {
    const points = ["abs", "legs", "arms", "back", "chest", "cardio"];

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
          (activities) => activities?.label === label
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

  console.log({ focusPoint });
  return (
    <div
      className={cn(
        "w-[100%] h-[400px] flex flex-col justify-center items-center lg:col-span-1"
      )}
    >
      {data?.activities?.length === 0 ? (
        <Empty />
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
          blendMode="multiply"
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
                stroke: "#cacacacf",
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
  );
};

export default RecentWorkoutChart;

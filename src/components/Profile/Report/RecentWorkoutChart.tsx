import { ResponsivePie } from "@nivo/pie";
import { ResponsiveRadar } from "@nivo/radar";
import { useMemo } from "react";
import useRecentWorkout from "@/hooks/useRecentWorkout";
import { cn } from "@/libs/utils";
import Empty from "@/components/Common/Empty";
const RecentWorkoutChart = () => {
  const { data, isLoading } = useRecentWorkout();

  // const recentActivities = useMemo(() => {
  //   return data?.activities
  //     ?.filter((activity: any) => activity?.workoutType === "default")
  //     ?.reduce((accumalator: any[], currentValue: any) => {
  //       const label = (currentValue.workoutName as string).toLowerCase();
  //       const sameLabel = accumalator.find(
  //         (activities) => activities.label === label
  //       );
  //       if (sameLabel) {
  //         sameLabel.value += currentValue?.totalTime;
  //       } else {
  //         accumalator.push({
  //           id: label,
  //           label: label,
  //           value: currentValue?.totalTime,
  //         });
  //       }
  //       return accumalator;
  //     }, [])
  //     .map((item: any) => ({
  //       ...item,
  //       value: (item.value / 60).toFixed(1),
  //     }));
  // }, [data]);

  const focusPoint = useMemo(() => {
    const points = ["abs", "legs", "arms", "back", "chest", "cardio"];

    console.log({ activity: data?.activities });

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
            label: label,
            value: 1,
          });
        }

        return accumalator;
      }, []);

    const mainFocusPoint = [...(serverFocusPoint ?? [])];
    points.map((item: any) => {
      serverFocusPoint?.map(
        (point: { id: string; label: string; value: number }) => {
          if (point.id !== item) {
            mainFocusPoint?.push({
              id: item,
              label: item === "back" ? "Back & Shoulder" : item,
              value: 0.5,
            });
          }
        }
      );
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
        "w-[100%] md:h-[400px] sm:h-[250px] flex flex-col justify-center items-center lg:col-span-1"
      )}
    >
      {focusPoint?.length === 0 && <Empty />}
      {/* <ResponsivePie
        data={recentActivities ?? []}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.4}
        padAngle={0.7}
        cornerRadius={3}
        sortByValue={true}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        colors={{ scheme: "greens" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={6}
        arcLinkLabelsTextColor="#e3e3e3"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 3]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgb(255, 255, 255)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.985)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        theme={{
          text: {
            fill: "#b4b4b4",
            fontSize: 14,
          },

          tooltip: {
            container: {
              background: "#0b0b13",
              textEmphasisColor: "#000",
              textTransform: "capitalize",
            },
          },
        }}
       
      /> */}
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
        enableDots={false}
        dotSize={10}
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
    </div>
  );
};

export default RecentWorkoutChart;

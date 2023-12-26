import { ResponsivePie } from "@nivo/pie";
import { useMemo } from "react";
import useRecentWorkout from "@/hooks/useRecentWorkout";
const RecentWorkoutChart = () => {
  const { data, isLoading } = useRecentWorkout();

  const recentActivities = useMemo(() => {
    return data?.activities
      ?.reduce((accumalator: any[], currentValue: any) => {
        const label = (currentValue.workoutName as string).toLowerCase();
        const sameLabel = accumalator.find(
          (activities) => activities.label === label
        );
        if (sameLabel) {
          sameLabel.value += currentValue?.totalTime;
        } else {
          accumalator.push({
            id: label,
            label: label,
            value: currentValue?.totalTime,
          });
        }
        return accumalator;
      }, [])
      .map((item: any) => ({
        ...item,
        value: (item.value / 60).toFixed(1),
      }));
  }, [data]);

  return (
    <div className="w-[100%] h-[250px] flex flex-col justify-center items-center lg:col-span-1">
      <ResponsivePie
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
        // fill={[
        //   {
        //     match: {
        //       id: "ruby",
        //     },
        //     id: "dots",
        //   },
        //   {
        //     match: {
        //       id: "c",
        //     },
        //     id: "dots",
        //   },
        //   {
        //     match: {
        //       id: "go",
        //     },
        //     id: "dots",
        //   },
        //   {
        //     match: {
        //       id: "python",
        //     },
        //     id: "dots",
        //   },
        //   {
        //     match: {
        //       id: "scala",
        //     },
        //     id: "lines",
        //   },
        //   {
        //     match: {
        //       id: "lisp",
        //     },
        //     id: "lines",
        //   },
        //   {
        //     match: {
        //       id: "elixir",
        //     },
        //     id: "lines",
        //   },
        //   {
        //     match: {
        //       id: "javascript",
        //     },
        //     id: "lines",
        //   },
        // ]}
        // legends={[
        //   {
        //     anchor: "bottom",
        //     direction: "row",
        //     justify: false,
        //     translateX: 0,
        //     translateY: 56,
        //     itemsSpacing: 0,
        //     itemWidth: 100,
        //     itemHeight: 18,
        //     itemTextColor: "#999",
        //     itemDirection: "left-to-right",
        //     itemOpacity: 1,
        //     symbolSize: 18,
        //     symbolShape: "circle",
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemTextColor: "#fff",
        //         },
        //       },
        //     ],
        //   },
        // ]}
      />
      <p className=" text-green-400 -mt-7 font-semibold">Workout Per/Min</p>
    </div>
  );
};

export default RecentWorkoutChart;

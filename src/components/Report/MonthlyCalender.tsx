import { ResponsiveTimeRange } from "@nivo/calendar";
import { useQuery } from "react-query";
import { activityReport } from "@/api/activity";
import { useEffect, useMemo, useState } from "react";

type IMonthlyCalender = {
  isDashboard?: boolean;
};

const MonthlyCalender = ({ isDashboard = false }: IMonthlyCalender) => {
  const { data, isLoading } = useQuery({
    queryFn: activityReport,
    queryKey: "activity-reports",
  });

  const [screenWidth, setScreenWidth] = useState<number>(1040);

  const reports = useMemo(() => {
    return data?.activityReport?.map((report: any) => ({
      value: (report?.totalTime / 60).toFixed(0),
      day: report?.createdAt.split("T")?.[0],
    }));
  }, [data]);

  useEffect(() => {
    function handleResize() {
      if (typeof window !== "undefined") {
        setScreenWidth(window.innerWidth);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentDate = new Date();
  currentDate.getMonth();

  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() +
      (screenWidth <= 420
        ? 10
        : screenWidth <= 738
        ? 8
        : screenWidth <= 900
        ? 6
        : screenWidth <= 1200
        ? 3
        : 1) -
      currentDate.getMonth(),
    currentDate.getDate()
  ).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  ).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <div className=" w-[100%] lg:col-span-2 h-[200px] text-white ">
      <ResponsiveTimeRange
        data={reports ?? []}
        from={endDate}
        to={startDate}
        emptyColor="#1e1e206b"
        firstWeekday="monday"
        colors={["#063d3ede", "#195b4c", "#2f9454", "#4ADE80"]}
        margin={{ top: 40, right: 40, bottom: 10, left: 0 }}
        daySpacing={1}
        dayBorderWidth={1}
        dayBorderColor="#09090B"
        dayRadius={3}
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
        square={isDashboard ? true : false}
        isInteractive={isDashboard ? false : true}
        theme={{
          text: {
            fill: "#b4b4b4",
            fontSize: 14,
          },

          tooltip: {
            container: {
              background: "#0b0b13",
              textEmphasisColor: "#000",
            },
          },
        }}
      />
      {/* #0d2a1fc9", "#063e24de", "#195B2B", "#227234" */}
      <div className="flex items-center gap-1 justify-between w-full md:pr-12 pl-4 pb-4">
        <p>History</p>
        <div className="flex items-center gap-1 ">
          <p className=" text-sm pr-1">Less</p>
          <div className="h-3 w-3 rounded-sm bg-[#1e1e206b]" />
          <div className="h-3 w-3 rounded-sm bg-[#063d3ede]" />
          <div className="h-3 w-3 rounded-sm bg-[#195b4c]" />
          <div className="h-3 w-3 rounded-sm bg-[#2f9454]" />
          <div className="h-3 w-3 rounded-sm bg-[#4ADE80]" />
          <p className=" text-sm pl-1">More</p>
        </div>
      </div>
    </div>
  );
};

export default MonthlyCalender;

import { ResponsiveTimeRange } from "@nivo/calendar";
import { useQuery } from "react-query";
import { activityReport } from "@/api/activity";
import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

type IMonthlyCalender = {
  isDashboard?: boolean;
};

const MonthlyCalender = ({ isDashboard = false }: IMonthlyCalender) => {
  const searchParams = useSearchParams();
  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => await activityReport({ params: searchParams }),
    queryKey: "activity-reports",
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  const [screenWidth, setScreenWidth] = useState<any>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
  });

  const reports: { value: number; day: any }[] = useMemo(() => {
    return data?.activityReport?.map((report: any) => ({
      value: (report?.count).toFixed(0),
      day: report?.createdAt.split("T")?.[0],
    }));
  }, [data]);

  console.log({ reports });

  function handleResize() {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const endDate = useMemo(() => {
    const date = new Date();

    return new Date(
      date.getFullYear(),
      date.getMonth() -
        (screenWidth <= 420
          ? 2
          : screenWidth <= 738
          ? 5
          : screenWidth <= 900
          ? 6
          : screenWidth <= 1000
          ? 7
          : screenWidth <= 1200
          ? 8
          : 10),
      date.getDate()
    ).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }, [screenWidth]);

  const currentDate = new Date();

  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  ).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  console.log({
    endDate,
    startDate,
    month: currentDate.getMonth(),
    currentDate,
  });

  if (isLoading) {
    return (
      <div>
        <Loader2 className=" animate-spin" size={18} />
      </div>
    );
  }

  return (
    <div className=" w-[100%] lg:col-span-2 h-[180px] text-white mx-auto">
      <ResponsiveTimeRange
        data={reports ?? []}
        from={endDate}
        to={startDate}
        emptyColor="#1e1e206b"
        firstWeekday="monday"
        colors={["#0e4723", "#1d6b3a", "#2f9454", "#4ADE80"]}
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
        isInteractive={isDashboard ? false : true}
        theme={{
          text: {
            fill: "#b4b4b4",
            fontSize: 14,
          },

          tooltip: {
            container: {
              background: "#1e1e20",
              textEmphasisColor: "#000",
            },
          },
        }}
      />
      {/* #0d2a1fc9", "#063e24de", "#195B2B", "#227234" */}
      <div className="flex items-center gap-1 justify-between w-full md:pr-12 pl-4 pb-4">
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

import { cn } from "@/lib/utils";
import AreaChart from "./AreaChart";

const MetricsBox = ({ index, activeIndex, metric }) => {
  const isActive = index === activeIndex;

  return (
    <div
      data-index={index}
      className={cn(
        "metric-box bg-white rounded-xl p-3 cursor-pointer transition-all duration-500",
        isActive && "col-span-2 row-span-2 col-start-1 row-start-1"
      )}
    >
      {!isActive ? (
        <>
          <div className="flex w-full justify-between text-sm font-semibold">
            <div
              className="overflow-hidden whitespace-nowrap text-ellipsis"
              style={{ maxWidth: "calc(100% - 2rem)" }}
            >
              <span>{metric.label}</span>
            </div>
            {metric.icon}
          </div>
          <div className="text-center py-10 text-5xl font-bold text-secondary">
            {metric.value}
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center h-full gap-5">
          <div className="flex justify-between font-medium items-center">
            <span className="flex items-center">
              {metric.label} {metric.icon}
            </span>
            <span className="text-xl font-bold text-secondary">
              {metric.value}
            </span>
          </div>
          <AreaChart metric={metric.label} />
        </div>
      )}
    </div>
  );
};

export default MetricsBox;

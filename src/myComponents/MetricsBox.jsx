import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Sun } from "lucide-react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale);

const timeFrames = ["daily", "weekly", "monthly"];
const data = {
  labels: ["Jon", "Feb", "Mar", "Apr", "May", "June"],
  datasets: [
    {
      label: "Total Views",
      data: [43, 10, 20, 30, 50, 45],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    x: {
      type: 'category', // Use the imported CategoryScale here
      // Other x-axis options (optional)
    },
  },
};

const MetricsBox = ({ index, activeIndex, metric }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("daily");
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
          <div className="flex w-full justify-between font-semibold ">
            <span>{metric.label}</span>
            {metric.icon}
          </div>
          <div className="text-center py-10 text-5xl font-bold text-secondary">
            {metric.value}
          </div>
        </>
      ) : (
        <div>
          <div className="flex justify-between font-medium items-center">
            <span className="flex items-center">
              {metric.label} {metric.icon}
            </span>
            <span className="text-xl font-bold text-secondary">
              {metric.value}
            </span>

            <Select
              value={selectedTimeFrame}
              onValueChange={(value) => setSelectedTimeFrame(value)}
            >
              <SelectTrigger className="bg-transparent text-black capitalize font-semibold flex-1 max-w-[30%]">
                <SelectValue className="text-black border-2 border-black" />
              </SelectTrigger>
              <SelectContent>
                {timeFrames.map((timeFrame) => (
                  <SelectItem
                    className="capitalize"
                    key={timeFrame}
                    value={timeFrame}
                  >
                    {timeFrame}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Bar data={data} options={options} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricsBox;

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardLayout from "@/layout/DashboardLayout";
import { AppContext } from "@/lib/AppContext";
import Carousel from "@/myComponents/Carousel";
import MetricsBox from "@/myComponents/MetricsBox";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Thermometer, Droplet, Wind, BarChart, Eye, Sun } from "lucide-react";

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(null);
  const { current } = useContext(AppContext);

  useEffect(() => {
    if (containerRef.current) setHeight(containerRef.current.offsetHeight);
  }, [containerRef, current]);

  useEffect(() => {
    console.log(current);
  }, [current]);

  const handleClick = (e) => {
    const index = e.target.closest(".metric-box")?.dataset.index;
    setActiveIndex(index ? Number(index) : -1);
  };

  const metrics = current
    ? [
        {
          label: "Temperature (°C)",
          value: current.current.temp_c,
          icon: <Thermometer />,
        },
        {
          label: "Feels Like (°C)",
          value: current.current.feelslike_c,
          icon: <Sun />,
        },
        {
          label: "Humidity (%)",
          value: current.current.humidity,
          icon: <Droplet />,
        },
        {
          label: "Wind Speed (kph)",
          value: current.current.wind_kph,
          icon: <Wind />,
        },
        {
          label: "Pressure (mb)",
          value: current.current.pressure_mb,
          icon: <BarChart />,
        },
        {
          label: "Visibility (km)",
          value: current.current.vis_km,
          icon: <Eye />,
        },
      ]
    : [];

  return (
    <DashboardLayout>
      {current ? (
        <>
          <div className="md:w-4/5 md:mx-auto md:flex items-center justify-between mt-5">
            <span className="flex flex-col md:flex-row gap-1 md:gap-4 font-semibold">
              <span>
                Region :{" "}
                {current.location.region ||
                  current.location.country ||
                  current.location.country ||
                  "N/A"}
              </span>
              <span>Latitude : {current.location.lat}</span>
              <span>Longitude : {current.location.lon}</span>
              <span>LocalTime : {current.location.localtime} </span>
            </span>
            <Button
              onClick={() => setActiveIndex(-1)}
              disabled={activeIndex == -1}
              className="bg-red-400 hover:bg-red-300 disabled:bg-hover-red-300 hidden md:block"
            >
              Collapse
            </Button>
          </div>
          <div
            ref={containerRef}
            className="md:w-4/5 mx-auto flex-col-reverse md:flex-row flex gap-5 mt-5"
          >
            <div
              className="grid md:grid-cols-3 md:grid-rows-2 gap-3 flex-[.6] "
              onClick={handleClick}
            >
              {metrics.map((metric, idx) => (
                <MetricsBox
                  index={idx}
                  activeIndex={activeIndex}
                  key={"metric" + idx}
                  metric={metric}
                />
              ))}
            </div>
            {height && <Carousel height={height} current={current.current} />}
          </div>
        </>
      ) : (
        <>
          <Skeleton className="w-4/5 mx-auto h-8" />
          <Skeleton className="w-4/5 mx-auto h-32 mt-10" />
          <Skeleton className="w-4/5 mx-auto h-32 mt-10" />
        </>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;

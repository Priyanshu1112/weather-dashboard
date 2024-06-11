import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardLayout from "@/layout/DashboardLayout";
import { AppContext } from "@/lib/AppContext";
import Carousel from "@/myComponents/Carousel";
import MetricsBox from "@/myComponents/MetricsBox";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Thermometer,
  Droplet,
  Wind,
  BarChart,
  Eye,
  Sun,
  Database,
  Umbrella,
} from "lucide-react";

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(null);
  const { last, history, future } = useContext(AppContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    // console.log(last, data);

    setData(last == "history" ? history : future);
  }, [last, history, future]);

  useEffect(() => {
    if (containerRef.current) setHeight(containerRef.current.offsetHeight);
  }, [containerRef, last, data]);

  const handleClick = (e) => {
    const index = e.target.closest(".metric-box")?.dataset.index;
    setActiveIndex(index ? Number(index) : -1);
  };

  const getCurrentMetrics = (data) => {
    if (!data.current) {
      return [];
    }

    return [
      {
        label: "Temperature (°C)",
        value: data.current.temp_c,
        icon: <Thermometer />,
      },
      {
        label: "Feels Like (°C)",
        value: data.current.feelslike_c,
        icon: <Sun />,
      },
      {
        label: "Humidity (%)",
        value: data.current.humidity,
        icon: <Droplet />,
      },
      {
        label: "Wind Speed (kph)",
        value: data.current.wind_kph,
        icon: <Wind />,
      },
      {
        label: "Pressure (mb)",
        value: data.current.pressure_mb,
        icon: <BarChart />,
      },
      {
        label: "Visibility (km)",
        value: data.current.vis_km,
        icon: <Eye />,
      },
    ];
  };

  const getHistoryMetrics = (data) => {
    if (
      !data.forecast ||
      !data.forecast.forecastday ||
      data.forecast.forecastday.length === 0
    ) {
      return [];
    }

    const lastForecast =
      data.forecast.forecastday[data.forecast.forecastday.length - 1].day;

    if (!lastForecast) {
      return [];
    }

    return [
      {
        label: "Avg Temperature (°C)",
        value: lastForecast.avgtemp_c,
        icon: <Thermometer />,
      },
      {
        label: "Precipitate (in)",
        value: lastForecast.totalprecip_in,
        icon: <Umbrella />,
      },
      {
        label: "Avg Humidity (%)",
        value: lastForecast.avghumidity,
        icon: <Droplet />,
      },
      {
        label: "Max Wind Speed (kph)",
        value: lastForecast.maxwind_kph,
        icon: <Wind />,
      },
      {
        label: "UV",
        value: lastForecast.uv,
        icon: <BarChart />,
      },
      {
        label: "Avg Visibility (km)",
        value: lastForecast.avgvis_km,
        icon: <Eye />,
      },
    ];
  };

  const metrics = data
    ? last === "future" && future
      ? getCurrentMetrics(data)
      : history
      ? getHistoryMetrics(data)
      : []
    : [];

  return (
    <DashboardLayout>
      {last && data ? (
        <>
          <div className="md:w-4/5 md:mx-auto md:flex items-center justify-between mt-5">
            <span className="flex flex-col md:flex-row gap-1 md:gap-4 font-semibold">
              <span>
                Region :{" "}
                {data.location.region ||
                  data.location.country ||
                  data.location.country ||
                  "N/A"}
              </span>
              <span>Latitude : {data.location.lat}</span>
              <span>Longitude : {data.location.lon}</span>
              <span>LocalTime : {data.location.localtime} </span>
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
            className="w-full md:w-4/5 mx-auto flex-col-reverse md:flex-row flex gap-5 mt-5"
          >
            <div
              className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-3 md:flex-[.6] "
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
            {height && <Carousel height={height} />}
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

import { AppContext } from "@/lib/AppContext";
import { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";

const hourHistory = {
  humidity: "humidity",
  temperature: "temp_c",
  precipitate: "precip_in",
  wind: "wind_kph",
  uv: "uv",
  visibility: "vis_km",
};

export default function AreaChart({ metric }) {
  const [categoriesX, setCategoriesX] = useState(null);
  const [seriesData, setSeriesData] = useState(null);
  const [metricToFind, setMetricToFind] = useState(null);
  const {
    last,
    history,
    future,
    selectedTimeFrame: timeFrame,
  } = useContext(AppContext);

  const getCurrentMetric = () => {
    const metricMap = {
      Temperature: "temp_c",
      Precipitate: "precip_in",
      Humidity: "humidity",
      Wind: "wind_kph",
      UV: "uv",
      Visibility: "vis_km",
    };
    const key = Object.keys(metricMap).find((key) => metric.includes(key));
    setMetricToFind(key);
    return metricMap[key];
  };

  const getCurrentMetricDay = () => {
    const metricMap = {
      Temperature: "avgtemp_c",
      Precipitate: "totalprecip_in",
      Humidity: "avghumidity",
      Wind: "maxwind_kph",
      UV: "uv",
      Visibility: "avgvis_km",
    };
    const key = Object.keys(metricMap).find((key) => metric.includes(key));
    setMetricToFind(key);
    return metricMap[key];
  };

  useEffect(() => {
    if (last === "history" && history) {
      if (timeFrame === "hourly") {
        const metricToFind = getCurrentMetric();
        const lastDayHourly = history.forecast.forecastday[history.forecast.forecastday.length - 1].hour.slice(-6);
        const categories = lastDayHourly.map((hour) =>
          new Date(hour.time).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        );

        setSeriesData(lastDayHourly.map((data) => data[metricToFind]));
        setCategoriesX(categories);
      } else if (timeFrame === "daily") {
        const metricToFind = getCurrentMetricDay();
        const categories = history.forecast.forecastday.map((day) => day.date);
        const seriesData = history.forecast.forecastday.map((data) => data.day[metricToFind]);

        setCategoriesX(categories);
        setSeriesData(seriesData);
      }
      else{
        
      }
    }
  }, [last, history, timeFrame]);

  const options = {
    chart: {
      height: 280,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        gradientToColors: ["#ff5b5b"],
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    colors: ["#ff5b5b"],
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: categoriesX,
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
    },
    subtitle: {
      text: timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1),
      align: "right",
      style: {
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
  };

  const series = [
    {
      name: metricToFind,
      data: seriesData,
    },
  ];

  return (
    <div className="App">
      <Chart options={options} series={series} type="area" />
    </div>
  );
}

import { AppContext } from "@/lib/AppContext";
import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";

const BarChart = ({ index }) => {
  const [categoriesX, setCategoriesX] = useState(null);
  const [seriesData, setSeriesData] = useState(null);
  const {
    last,
    history,
    future,
    selectedTimeFrame: timeFrame,
  } = useContext(AppContext);

  useEffect(() => {
    if (last == "history" && history) {
      const lastData =
        history.forecast.forecastday[history.forecast.forecastday.length - 1]
          .hour[
          history.forecast.forecastday[history.forecast.forecastday.length - 1]
            .hour.length - 1
        ];

      if (index == 0) {
        setSeriesData([
          lastData.dewpoint_c,
          lastData.feelslike_c,
          lastData.gust_kph,
          lastData.heatindex_c,
          lastData.pressure_in,
        ]);
      } else {
        setSeriesData([
          lastData.dewpoint_f,
          lastData.feelslike_f,
          lastData.gust_mph,
          lastData.heatindex_f,
          lastData.pressure_mb,
        ]);
      }
    }
  }, [last, history]);

  var options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        gradientToColors: ["#B38BFF"],
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: ["DewPoint", "FeelsLike", "Gust", "Heat Index", "Pressure"],
    },
    subtitle: {
      text: index == 0 ? "Preferred Units" : "Other Units",
      align: "right",
      style: {
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    colors: ["#FDC7C3"],
  };

  const series = [
    {
      data: seriesData,
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="bar" />
    </div>
  );
};

export default BarChart;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeatherHistogram = ({ weatherData }) => {
  const data = {
    labels: ['Temperature', 'Feels Like', 'Humidity', 'Wind Speed', 'Pressure'],
    datasets: [
      {
        label: 'Current Weather Metrics',
        data: [
            weatherData.temp_c,
            weatherData.feelslike_c,
            weatherData.humidity,
            weatherData.windchill_c,
            weatherData.pressure_mb,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // This makes the chart horizontal
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Current Weather Metrics',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default WeatherHistogram;

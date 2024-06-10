import weatherApi from "@/lib/WeatherApi";

export const fetchWeather = async ({ queryKey }) => {
  const [_key, { timeFrame, country, date }] = queryKey;
  console.log("called====", { timeFrame, country, date });
  const { from, to } = date;
  const { data } = await weatherApi.get("/current.json", {
    params: {
      q: country,
      dt: from.toISOString().split("T")[0],
      end_dt: to.toISOString().split("T")[0],
    },
  });

  return data;
};

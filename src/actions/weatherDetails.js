import weatherApi from "@/lib/WeatherApi";

export const fetchCurrent = async (country) => {
  try {
    const promise = weatherApi
      .get("/current.json", {
        params: {
          q: country,
        },
      })
      .catch((err) => {
        return err;
      });

    return promise;
  } catch (error) {
    console.log(error);
  }
};

export const fetchHistory = async (country, date) => {
  try {
    const dt =
      date.from.getFullYear() +
      "-" +
      date.from.getMonth() +
      "-" +
      date.from.getDate();
    const end_dt =
      date.to.getFullYear() +
      "-" +
      date.to.getMonth() +
      "-" +
      date.to.getDate();

    const promise = weatherApi
      .get("/history.json", {
        params: {
          q: country,
          dt,
          end_dt,
        },
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    // console.log(await promise);
    return promise;
  } catch (error) {
    console.log(error);
  }
};

export const fetchForecast = async (country, date) => {
  try {
    const dt =
      date.from.getFullYear() +
      "-" +
      date.from.getMonth() +
      "-" +
      date.from.getDate();
    const end_dt =
      date.to.getFullYear() +
      "-" +
      date.to.getMonth() +
      "-" +
      date.to.getDate();

    const promise = weatherApi
      .get("/forecast.json", {
        params: {
          q: country,
          dt,
          end_dt,
        },
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    // console.log(await promise);
    return promise;
  } catch (error) {
    console.log(error);
  }
};

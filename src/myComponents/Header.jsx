import React, { useContext, useState, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "./DateRangePicker";
import { useQuery } from "react-query";
import { AppContext } from "@/lib/AppContext";
import { toast } from "sonner";
import { fetchForecast, fetchHistory } from "@/actions/weatherDetails";

const timeFrames = ["hourly", "daily"];

const Header = () => {
  const debounceRef = useRef(null);
  const [country, setCountry] = useState("India");
  const [date, setDate] = useState({
    from: new Date(),
    to: new Date(),
  });

  const {
    last,
    selectedTimeFrame,
    setSelectedTimeFrame,
    setHistory,
    setFuture,
    setLast,
  } = useContext(AppContext);

  const checkDate = (date) => {
    const today = new Date();
    if (
      date.getDate() == today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
      return "today";
    else if (
      date.getDate() <= today.getDate() &&
      date.getMonth() <= today.getMonth() &&
      date.getFullYear() <= today.getFullYear()
    )
      return "history";
    else return "future";
  };

  const queryFunction = async ({ queryKey }) => {
    let isFetching = false;
    let type = null;
    const [_, date, country, timeFrame] = queryKey;
    let res;

    if (
      (checkDate(date.to) == "today" && checkDate(date.from) == "today") ||
      (checkDate(date.from) == "history" &&
        (checkDate(date.to) == "history" || checkDate(date.to) == "today"))
    ) {
      isFetching = true;
      type = "history";
      res = fetchHistory(country, date);
    } else if (
      (checkDate(date.from) == "future" || checkDate(date.from) == "today") &&
      checkDate(date.to) == "future"
    ) {
      isFetching = true;
      type = "future";
      res = fetchForecast(country, date);
    } else if (
      checkDate(date.from) == "history" &&
      checkDate(date.to) == "future"
    ) {
      toast.error(
        "Conflicting Range : should be either before or after today!"
      );
    }

    if (isFetching) {
      let data = await res;

      if (data.status !== 200) {
        return toast.error(data.response.data.error.message);
      }

      toast.promise(res, {
        loading: "Fetching...",
        success: "Fetched successfully!",
        error: "Error fetching!",
      });

      switch (type) {
        case "history":
          res.then((res) => setHistory(res.data));
          setLast("history");
          break;
        case "future":
          res.then((res) => setFuture(res.data));
          setLast("future");
          break;
      }
    }
  };

  const debounceFn = async ({ queryKey }) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      queryFunction({ queryKey });
    }, 1500);
  };

  useQuery({
    queryKey: ["weather", date, country],
    queryFn: debounceFn,
    enabled: !!date && !!selectedTimeFrame && !!country,
  });

  return (
    <div className="md:w-4/5 bg-primary text-white px-5 rounded-md lg:rounded-full mx-auto mb-5 flex flex-col flex-wrap md:flex-row py-4 md:items-center justify-between md:gap-12">
      <div className="flex items-center justify-between mb-5 md:mb-0">
        <Select
          disabled={last == "future"}
          value={selectedTimeFrame}
          onValueChange={(value) => setSelectedTimeFrame(value)}
        >
          <SelectTrigger className="bg-transparent capitalize font-semibold flex-1 min-w-[35%]">
            <SelectValue />
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
        <Input
          className="flex h-10 w-full rounded-md border border-white bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Enter Region"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div className="flex items-start justify-start ">
        <div className=" w-[20%]">
          <DateRangePicker
            date={date}
            setDate={setDate}
            className={"bg-transparent max-w-[30%]"}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
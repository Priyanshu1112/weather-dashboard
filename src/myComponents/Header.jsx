import React, { useContext, useState, useEffect, useMemo } from "react";
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
import { fetchWeather } from "@/actions/fetchCurrent";
import { AppContext } from "@/lib/AppContext";
import { toast } from "sonner";
import debounce from "lodash/debounce";

const timeFrames = ["daily", "weekly", "monthly"];

const Header = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("daily");
  const [country, setCountry] = useState("India");
  const [date, setDate] = useState({
    from: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    to: new Date(),
  });

  const { setCurrent } = useContext(AppContext);

  const debouncedQueryKey = useMemo(() => {
    return debounce((newQueryKey) => {
      setQueryKey(newQueryKey);
    }, 1500); // 300ms debounce time
  }, []);

  const [queryKey, setQueryKey] = useState([
    "current",
    { timeFrame: selectedTimeFrame, country },
  ]);

  useEffect(() => {
    debouncedQueryKey(["current", { date, country }]);
  }, [selectedTimeFrame, country, date, debouncedQueryKey]);

  const { data, isLoading, error } = useQuery(queryKey, fetchWeather, {
    enabled: !!country,
    refetchOnConnect: true,
    refetchOnMount: true,
    onSuccess: (data) => {
      setCurrent(data);
      toast.success("Successfully fetched!");
    },
    onError: (error) => {
      toast.error("Fetching failed: " + error.message);
    },
  });
  

  useEffect(() => {
    let loadingToastId;
    if (isLoading) {
      loadingToastId = toast.loading("Fetching...");
    } else if (!isLoading && loadingToastId) {
      toast.dismiss(loadingToastId);
    }
    return () => {
      if (loadingToastId) {
        toast.dismiss(loadingToastId);
      }
    };
  }, [isLoading]);

  return (
    <div className="w-4/5 bg-primary text-white py-1 px-5 rounded-full mx-auto mb-5 flex justify-between gap-12">
      <Select
        value={selectedTimeFrame}
        onValueChange={(value) => setSelectedTimeFrame(value)}
      >
        <SelectTrigger className="bg-transparent capitalize font-semibold flex-1 max-w-[30%]">
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
        className="bg-transparent max-w-[30%] border-0 flex-1 border-b-[1px] font-semibold rounded-none focus-visible:ring-0 focus-visible:border-b-2 border-white"
        placeholder="Enter Region"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <DateRangePicker
        date={date}
        setDate={setDate}
        className={"bg-transparent max-w-[30%]"}
      />
    </div>
  );
};

export default Header;

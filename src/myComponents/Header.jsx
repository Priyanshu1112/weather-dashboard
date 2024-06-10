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
    <div className="md:w-4/5 bg-primary text-white px-5 rounded-md lg:rounded-full mx-auto mb-5 flex flex-col flex-wrap md:flex-row py-4 md:items-center justify-between md:gap-12">
      <div className="flex items-center justify-between mb-5 md:mb-0">
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
          // className="bg-transparent border-0 flex-1 border-b-[1px] font-semibold rounded-none focus-visible:ring-0 focus-visible:border-b-2 border-white"
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
            className={"bg-transparent w-full"}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

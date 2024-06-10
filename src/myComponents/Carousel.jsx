import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

const CarouselWrapper = ({ height, current }) => {
  const carousalRef = useRef(null);
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(0);

  const updateWidth = () => {
    console.log("updateWidth");
    if (carousalRef.current) {
      setWidth(carousalRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    if (carousalRef.current) {
      setWidth(carousalRef.current.offsetWidth);
    } else return;

    const intervalId = setInterval(() => {
      setActive((prevActive) => (prevActive === 2 ? 0 : prevActive + 1));
    }, 5000);

    window.addEventListener("resize", updateWidth);

    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
      window.removeEventListener("resize", updateWidth); // Cleanup resize listener on component unmount
    };
  }, [carousalRef]);

  const carouselContent = [
    [
      { label: "Temperature", value: current.temp_c },
      { label: "FeelsLike", value: current.feelslike_c },
      { label: "Humidity", value: current.humidity },
      { label: "WindChill", value: current.windchill_c },
      { label: "visibility", value: current.vis_km },
    ],
    [
      { label: "Temperature2", value: current.temp_c },
      { label: "FeelsLike", value: current.feelslike_c },
      { label: "Humidity", value: current.humidity },
      { label: "WindChill", value: current.windchill_c },
      { label: "Pressure", value: current.pressure_mb },
    ],
    [
      { label: "Temperature3", value: current.temp_c },
      { label: "FeelsLike", value: current.feelslike_c },
      { label: "Humidity", value: current.humidity },
      { label: "WindChill", value: current.windchill_c },
      { label: "Pressure", value: current.pressure_mb },
    ],
  ];

  return (
    <div
      className={cn(
        "flex-[.4] flex flex-col bg-white rounded-lg mt-5 md:mt-0",
        `max-h-[${height}px] `
      )}
    >
      <h1 className="px-4 pt-5 flex justify-between">
        Top Contents{" "}
        <span className="flex items-center">
          {current.condition.text}{" "}
          <img src={current.condition.icon} className="w-8 h-8 ml-2" />{" "}
        </span>
      </h1>

      <div className=" w-[90%] overflow-hidden mx-auto mt-6 flex-1 flex flex-col pb-5 justify-between">
        <div
          style={{ transform: `translateX(-${active * width}px)` }}
          className={cn("flex transition-all duration-300")}
        >
          {carouselContent.map((content) => {
            return (
              <div
                ref={carousalRef}
                key={self.crypto.randomUUID()}
                className="min-w-full"
              >
                {content.map((data) => {
                  return (
                    <p key={self.crypto.randomUUID()}>
                      {data.label} {data.value}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="mx-auto flex mt-10 justify-center gap-2">
          {Array.from({ length: 3 }).map((_, idx) => {
            return (
              <div
                key={self.crypto.randomUUID()}
                className={cn(
                  "w-4 h-4 rounded-full bg-slate-300 transition-all duration-300",
                  idx == active && "bg-slate-500"
                )}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CarouselWrapper;

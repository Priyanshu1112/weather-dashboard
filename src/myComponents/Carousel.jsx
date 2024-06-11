import { AppContext } from "@/lib/AppContext";
import { cn } from "@/lib/utils";
import React, { useContext, useEffect, useRef, useState } from "react";
import BarChart from "./BarChart";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const CarouselWrapper = ({ height }) => {
  const plugin = React.useRef(Autoplay({ delay: 5000 }));

  return (
    <div
      style={{ maxHeight: `${height}px` }}
      className={cn("flex-[.4] flex flex-col bg-white rounded-lg")}
    >
      <h1 className="px-4 pt-5 flex justify-between">Top Contents</h1>

      <Carousel plugins={[plugin.current]} className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 2 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <BarChart index={index} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CarouselWrapper;

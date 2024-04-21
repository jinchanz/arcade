"use client";

import { useContext, useEffect, useState } from "react";

import { AppContext } from "@/contexts/AppContext";
import WorksCarousel from "@/components/works-carousel";
import { url } from "inspector";

const imageList = [
  {
    url: "/images/works/1.jpg",
    prompt: "a design rendering of new building development, elegent office tower with clean facade design in the style of metropolis meets nature"
  },
  {
    url: "/images/works/2.jpg",
    prompt: "a design rendering of new building development, elegent office tower with clean facade design in the style of metropolis meets nature"
  },
  {
    url: "/images/works/3.jpg",
    prompt: "a design rendering of new building development, elegent office tower with clean facade design in the style of metropolis meets nature"
  }
];

export default function () {
  const { user } = useContext(AppContext);
  

  return (
    <div className="h-[calc(100vh_-_80px)]">
      <WorksCarousel images={imageList} />
    </div>
  );
}

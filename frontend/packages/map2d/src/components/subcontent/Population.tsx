import "ol/ol.css";
import { MapOptions } from "ol/Map";
import { useState } from "react";

export interface PopulationProps extends MapOptions {
  selectedTab: string;
}

export const Population = ({ selectedTab }: PopulationProps) => {

  return (
    <div className="content-wrapper">
      <h3>유동인구 분석</h3>
    </div>
  );
}

import "ol/ol.css";
import { MapOptions } from "ol/Map";
import { useState } from "react";

export interface EtcProps extends MapOptions {
  selectedTab: string;
}

export const Etc = ({ selectedTab }: EtcProps) => {

  return (
    <div className="content-wrapper">
      <h3>기타분석</h3>
    </div>
  );
}

import "ol/ol.css";
import { MapOptions } from "ol/Map";
import { useState } from "react";

export interface Administrative extends MapOptions {

}

export const Administrative = () => {

  return (
    <div className="content-wrapper">
      <h3>행정정보</h3>
    </div>
  );
}

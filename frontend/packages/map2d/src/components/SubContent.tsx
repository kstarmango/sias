import "ol/ol.css";
import { RealEstate } from "./subcontent/RealEstate";
/**
 * 좌측 분석기능 검색 조건 창
 */
export const SubContent = () => {

  return (
    <div className="sub-contents">
      <button type="button" className="close sub-content"></button>
      <RealEstate />
      <RealEstate />
      <RealEstate />
      <RealEstate />
      <RealEstate />
      <RealEstate />
      <RealEstate />
      <RealEstate />
    </div>
  )
}

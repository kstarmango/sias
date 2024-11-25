import { atom } from "recoil";
import { AreaSalesAnalysisCondition, CommPopAnalysisCondition, FestivalInfluxAnalysisCondition, FestivalRevenueAnalysisCondition, InflowPopAnalysisCondition, LifeAnalysisCondition, LifeDistanceFacCondition, LifeTrafficAnalysisCondition, LifeVulnAnalysisCondition, LocationAnalysisCondition, PopFlowAnalysisCondition, SalesAnalysisCondition } from "@src/types/analysis-condition";

/** 유동 인구 분석 조건 */
export const popFlowAnalysisConditionState = atom<PopFlowAnalysisCondition>({
  key: 'popFlowAnalysisConditionState',
  default: {
    sgg: 'ENTIRE',
    emd: 'ENTIRE',
    year: null,
    month: null,
  }
});

/** 유입 인구 분석 조건 */
export const inflowPopAnalysisConditionState = atom<InflowPopAnalysisCondition>({
  key: 'inflowPopAnalysisConditionState',
  default: {
    inputWkt: '',
    year: null,
    month: null,
    sgg: false
  }
});

/** 매출 분석 조건 */
export const salesAnalysisConditionState = atom<SalesAnalysisCondition>({
  key: 'salesAnalysisConditionState',
  default: {
    sgg: 'ENTIRE',
    emd: 'ENTIRE',
    year: null,
    month: null,
    business: 'ENTIRE'
  }
});

/** 생활 서비스 분석 조건 */
export const lifeAnalysisConditionState = atom<LifeAnalysisCondition>({
  key: 'lifeAnalysisConditionState',
  default: {
    sgg: 'ENTIRE',
    emd: 'ENTIRE',
    lifeServiceFacility: 'ENTIRE',
    visualType: 'POINT'
  }
});

/** 교통사고 다발지역 분석 조건 */
export const lifeTrafficAnalysisConditionState = atom<LifeTrafficAnalysisCondition>({
  key: 'lifeTrafficAnalysisConditionState',
  default: {
    inputWkt: '',
    buffer: 0,
    weather: false
  }
});

/** 취약지역 분석 조건 */
export const lifeVulnAnalysisConditionState = atom<LifeVulnAnalysisCondition>({
  key: 'lifeVulnAnalysisConditionState',
  default: {
    sgg: 'ENTIRE',
    emd: 'ENTIRE',
    gwangju: false,
    lifeServiceFacility: 'ENTIRE',
    popInclude: false,
    analysisPop: 'ENTIRE'
  }
});

/** 최단 거리 시설 분석 조건 */
export const lifeDistanceFacConditionState = atom<LifeDistanceFacCondition>({
  key: 'lifeDistanceFacConditionState',
  default: {
    sgg: 'ENTIRE',
    emd: 'ENTIRE',
    startPoint: '',
    endFacility: ''
  }
});

/** 상권 인구 분석 조건 */
export const commPopAnalysisConditionState = atom<CommPopAnalysisCondition>({
  key: 'commPopAnalysisConditionState',
  default: {
    sgg: 'ENTIRE',
    emd: 'ENTIRE',
    startDate: null,
    endDate: null,
    weight: false
  }
});

/** 지점 분석 조건 */
export const locationAnalysisConditionState = atom<LocationAnalysisCondition>({
  key: 'locationAnalysisConditionState',
  default: {
    inputWkt: '',
    startDate: null,
    endDate: null,
    weight: false
  }
});

/** 상권 매출 분석 조건 */
export const areaSalesAnalysisConditionState = atom<AreaSalesAnalysisCondition>({
  key: 'areaSalesAnalysisConditionState',
  default: {
    inputWkt: '',
    buffer: 0,
    startDate: null,
    endDate: null,
    business: 'ENTIRE'
  }
});

/** 축제 유입 분석 조건 */
export const festivalInfluxAnalysisConditionState = atom<FestivalInfluxAnalysisCondition>({
  key: 'festivalInfluxAnalysisConditionState',
  default: {
    inputWkt: '',
    buffer: 0,
    startDate: null,
    endDate: null,
    sgg: false,
    weight: false
  }
});

/** 축제 매출 분석 조건 */
export const festivalRevenueAnalysisConditionState = atom<FestivalRevenueAnalysisCondition>({
  key: 'festivalRevenueAnalysisConditionState',
  default: {
    inputWkt: '',
    buffer: 0,
    startDate: null,
    endDate: null
  }
});


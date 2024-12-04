import { atom } from "recoil";

import { AreaSalesAnalysisCondition, CommPopAnalysisCondition, FestivalInfluxAnalysisCondition, FestivalRevenueAnalysisCondition, InflowPopAnalysisCondition, LifeAnalysisCondition, LifeDistanceFacCondition, LifeTrafficAnalysisCondition, LifeVulnAnalysisCondition, LocationAnalysisCondition, PopFlowAnalysisCondition, SalesAnalysisCondition } from "@src/types/analysis-condition";

// 분석 결과 팝업창 열기/닫기 이동 예정
export const AnalysisResultModalOpenState = atom<{modalOpen: boolean, title: string, data: any}>({
  key: 'AnalysisResultModalOpenState',
  default: {
    modalOpen: false,
    title: '',
    data: {}
  }
});

/** 유동 인구 분석 조건 */
export const popFlowAnalysisConditionState = atom<PopFlowAnalysisCondition>({
  key: 'popFlowAnalysisConditionState',
  default: {
    inputWkt: '',
    sgg: 'ENTIRE',
    emd: 'ENTIRE',
    year: '',
    month: ''
  }
});

/** 유입 인구 분석 조건 */
export const inflowPopAnalysisConditionState = atom<InflowPopAnalysisCondition>({
  key: 'inflowPopAnalysisConditionState',
  default: {
    inputWkt: '',
    year: '',
    month: '',
    sgg: 'ENTIRE',
    emd: 'ENTIRE',
    isSggInclude: false,
    isJeollanamDoInclude: false
  }
});

/** 매출 분석 조건 */
export const salesAnalysisConditionState = atom<SalesAnalysisCondition>({
  key: 'salesAnalysisConditionState',
  default: {
    inputWkt: '',
    sgg: 'ENTIRE',
    emd: 'ENTIRE',
    year: '',
    month: '',
    business: 'ENTIRE'
  }
});

/** 생활 서비스 분석 조건 */
export const lifeAnalysisConditionState = atom<LifeAnalysisCondition>({
  key: 'lifeAnalysisConditionState',
  default: {
    inputWkt: '',
    sgg: 'ENTIRE',
    emd: 'ENTIRE',
    lifeServiceFacility: '',
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
    inputWkt: '',
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
    inputWkt: '',
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
    inputWkt: '',
    buffer: 0,
    sgg: 'ENTIRE',
    emd: 'ENTIRE',
    startDate: '',
    endDate: '',
    weight: false
  }
});

/** 지점 분석 조건 */
export const locationAnalysisConditionState = atom<LocationAnalysisCondition>({
  key: 'locationAnalysisConditionState',
  default: {
    inputWkt: '',
    startDate: '',
    endDate: '',
    weight: false
  }
});

/** 상권 매출 분석 조건 */
export const areaSalesAnalysisConditionState = atom<AreaSalesAnalysisCondition>({
  key: 'areaSalesAnalysisConditionState',
  default: {
    inputWkt: '',
    buffer: 0,
    startDate: '',
    endDate: '',
    business: 'ENTIRE'
  }
});

/** 축제 유입 분석 조건 */
export const festivalInfluxAnalysisConditionState = atom<FestivalInfluxAnalysisCondition>({
  key: 'festivalInfluxAnalysisConditionState',
  default: {
    x_coord: 0,
    y_coord: 0,
    startDate: '',
    endDate: '',
    radius: 100,
    des_cd: 46
  }
});

/** 축제 매출 분석 조건 */
export const festivalRevenueAnalysisConditionState = atom<FestivalRevenueAnalysisCondition>({
  key: 'festivalRevenueAnalysisConditionState',
  default: {
    x_coord: 0,
    y_coord: 0,
    radius: 100,
    order: 'sale_all',
    startDate: '',
    endDate: ''
  }
});


/** 행정구역 조건 */
interface AdminstrCondition {
  sgg: string;
  emd: string;
}

/** 사용자 영역 조건 */
interface UserAreaCondition {
  inputWkt: string;
}

/** 기간 선택 조건 */
interface TimeCondition {
  year: number | null;
  month: number | null;
}

/** 시작 종료 기간 조건 */
interface StartEndTimeCondition {
  startDate: string | null;
  endDate: string | null;
}

/** 분석 시작점, 종료 시설 조건 */
interface AnalysisStartEndCondition {
  startPoint: string;
  endFacility: LifeFacilityCondition['lifeServiceFacility'] | '';
}

/** 축제 조건 */
interface FestivalCondition {
  festival: string;
}

/** 생활서비스 시설 조건 */
interface LifeFacilityCondition {
  lifeServiceFacility: '' | 'ENTIRE' | 'PUBLIC_ADMINISTRATION_NATIONAL_DEFENSE_SOCIAL_SECURITY' | 'EDUCATION_SERVICES' | 'PROFESSIONAL_SCIENCE_TECHNOLOGY_SERVICES' | 'ASSOCIATIONS_UNIONS_REPAIR_OTHER_PERSONAL_SERVICES';
}

/** 생활 서비스 시각화 조건 */
interface LifeVisualCondition {
  visualType: '' | 'POINT' | 'GRADUATED' | 'HEATMAP' | 'CLUSTER';
}

/** 업종 포함 조건 */
interface BusinessCondition  {
  business: '' | 'ENTIRE' | 'AGRICULTURE_FORESTRY_FISHING' | 'MINING' | 'MANUFACTURING' | 'ELECTRICITY_GAS_STEAM_AIR_CONDITIONING_SUPPLY' | 'REAL_ESTATE' | 'CONSTRUCTION' | 'WHOLESALE_RETAIL_TRADE' | 'ARTS_SPORTS_RECREATION_RELATED_SERVICES' | 'EDUCATION_SERVICES' | 'INFORMATION_COMMUNICATION' | 'FINANCE_INSURANCE' | 'TRANSPORTATION_STORAGE' | 'PUBLIC_ADMINISTRATION_NATIONAL_DEFENSE_SOCIAL_SECURITY' | 'ACCOMMODATION_FOOD_SERVICE' | 'PROFESSIONAL_SCIENCE_TECHNOLOGY_SERVICES' | 'ASSOCIATIONS_UNIONS_REPAIR_OTHER_PERSONAL_SERVICES';
}

/** 인구 정보 그룹 */
const populationGroups = {
  total: ['Total Population (All)', 'Total Population (Male)', 'Total Population (Female)'],
  youth: ['Youth Population (All)', 'Youth Population (Male)', 'Youth Population (Female)'],
  workingAge: ['Working Age Population (All)', 'Working Age Population (Male)', 'Working Age Population (Female)'],
  elderly: ['Elderly Population (All)', 'Elderly Population (Male)', 'Elderly Population (Female)'],
  infants: ['Infant Population (All)', 'Infant Population (Male)', 'Infant Population (Female)'],
  students: [
    'Elementary School Students (All)', 'Elementary School Students (Male)', 'Elementary School Students (Female)',
    'Middle School Students (All)', 'Middle School Students (Male)', 'Middle School Students (Female)',
    'High School Students (All)', 'High School Students (Male)', 'High School Students (Female)'
  ],
  ageGroups: [
    '20s Population (All)', '20s Population (Male)', '20s Population (Female)',
    '30s Population (All)', '30s Population (Male)', '30s Population (Female)',
    '40s Population (All)', '40s Population (Male)', '40s Population (Female)',
    '50s Population (All)', '50s Population (Male)', '50s Population (Female)',
    '60s Population (All)', '60s Population (Male)', '60s Population (Female)',
    '70s Population (All)', '70s Population (Male)', '70s Population (Female)',
    '80s Population (All)', '80s Population (Male)', '80s Population (Female)',
    '90s Population (All)', '90s Population (Male)', '90s Population (Female)',
    '100+ Population (All)', '100+ Population (Male)', '100+ Population (Female)'
  ]
}

/** 인구 정보 조건 */
interface PopulationInfoCondition {
  popInclude: boolean;
  analysisPop: typeof populationGroups[keyof typeof populationGroups][number];
}

/** 
 * 인구 정보 세부 분류 목록
 * @type { 인구정보 대분류 항목 : 세부 분류 목록 배열 }
 */
export const analysisPopDetailArr: Record<string, string[]> = {
  'total-population': populationGroups.total,
  'youth': populationGroups.youth,
  'working-age': populationGroups.workingAge,
  'elderly': populationGroups.elderly,
  'infants': populationGroups.infants,
  'students': populationGroups.students,
  'age-groups': populationGroups.ageGroups
}

/** 영역 조건 */
type AreaCondition = AdminstrCondition & UserAreaCondition;

/** 축제 영역 조건 */
type FestivalAreaCondition = FestivalCondition & UserAreaCondition & { buffer: number };

/** 버퍼 포함 영역 조건 */
type BufferIncludeAreaCondition = UserAreaCondition & { buffer?: number };

/** 유동인구 분석 조건 */
export type PopFlowAnalysisCondition = AreaCondition & TimeCondition;

/** 유입인구 분석 조건 */
export type InflowPopAnalysisCondition = AreaCondition & TimeCondition & { isSggInclude: boolean, isJeollanamDoInclude: boolean };

/** 매출 분석 조건 */
export type SalesAnalysisCondition = AreaCondition & TimeCondition & BusinessCondition;

/** 생활정보 분석 조건 */
export type LifeAnalysisCondition = AreaCondition & LifeFacilityCondition & LifeVisualCondition;

/** 생활 교통 분석 조건 */
export type LifeTrafficAnalysisCondition = BufferIncludeAreaCondition & { weather: boolean };

/** 생활 취약지역 분석 조건 */
export type LifeVulnAnalysisCondition = AreaCondition & LifeFacilityCondition & PopulationInfoCondition & { gwangju: boolean };

/** 생활 최단거리 시설 분석 조건 */
export type LifeDistanceFacCondition = AreaCondition & AnalysisStartEndCondition;

/** 상권 인구 분석 조건 */
export type CommPopAnalysisCondition = AdminstrCondition & BufferIncludeAreaCondition & StartEndTimeCondition & { weight: boolean };

/** 지점 분석 조건 */
export type LocationAnalysisCondition = UserAreaCondition & StartEndTimeCondition & { weight: boolean };

/** 상권 매출 분석 조건 */
export type AreaSalesAnalysisCondition = BufferIncludeAreaCondition & StartEndTimeCondition & BusinessCondition;

/** 축제 유입 분석 조건 */
export type FestivalInfluxAnalysisCondition = FestivalAreaCondition & StartEndTimeCondition & { isSggInclude: boolean } & { weight: boolean };

/** 축제 매출 분석 조건 */
export type FestivalRevenueAnalysisCondition = FestivalAreaCondition & StartEndTimeCondition;

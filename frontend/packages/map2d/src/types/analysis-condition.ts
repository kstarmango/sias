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
  year: number | '';
  month: number | '';
}

/** 시작 종료 기간 조건 */
interface StartEndTimeCondition {
  startDate: string | '';
  endDate: string | '';
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
  lifeServiceFacility: string;
}

/** 생활 서비스 시각화 조건 */
interface LifeVisualCondition {
  visualType: '' | 'POINT' | 'GRADUATED' | 'HEATMAP' | 'CLUSTER';
}

/** 업종 포함 조건 */
interface BusinessCondition  {
  business: '' | 'ENTIRE' | 'AGRICULTURE_FORESTRY_FISHING' | 'MINING' | 'MANUFACTURING' | 'ELECTRICITY_GAS_STEAM_AIR_CONDITIONING_SUPPLY' | 'REAL_ESTATE' | 'CONSTRUCTION' | 'WHOLESALE_RETAIL_TRADE' | 'ARTS_SPORTS_RECREATION_RELATED_SERVICES' | 'EDUCATION_SERVICES' | 'INFORMATION_COMMUNICATION' | 'FINANCE_INSURANCE' | 'TRANSPORTATION_STORAGE' | 'PUBLIC_ADMINISTRATION_NATIONAL_DEFENSE_SOCIAL_SECURITY' | 'ACCOMMODATION_FOOD_SERVICE' | 'PROFESSIONAL_SCIENCE_TECHNOLOGY_SERVICES' | 'ASSOCIATIONS_UNIONS_REPAIR_OTHER_PERSONAL_SERVICES';
}

/** 버퍼 조건 */
interface BufferCondition {
  x_coord: number;
  y_coord: number;
  radius: number;
}

/** 인구 정보 그룹 */
const populationGroups = {
  total: ['Total_Population_All', 'Total_Population_Male', 'Total_Population_Female'],
  youth: ['Youth_Population_All', 'Youth_Population_Male', 'Youth_Population_Female'],
  workingAge: ['Working_Age_Population_All', 'Working_Age_Population_Male', 'Working_Age_Population_Female'],
  elderly: ['Elderly_Population_All', 'Elderly_Population_Male', 'Elderly_Population_Female'],
  infants: ['Infant_Population_All', 'Infant_Population_Male', 'Infant_Population_Female'],
  students: [
    'Elementary_School_Students_All', 'Elementary_School_Students_Male', 'Elementary_School_Students_Female',
    'Middle_School_Students_All', 'Middle_School_Students_Male', 'Middle_School_Students_Female',
    'High_School_Students_All', 'High_School_Students_Male', 'High_School_Students_Female'
  ],
  ageGroups: [
    'Pop_20s_All', 'Pop_20s_Male', 'Pop_20s_Female',
    'Pop_30s_All', 'Pop_30s_Male', 'Pop_30s_Female',
    'Pop_40s_All', 'Pop_40s_Male', 'Pop_40s_Female',
    'Pop_50s_All', 'Pop_50s_Male', 'Pop_50s_Female',
    'Pop_60s_All', 'Pop_60s_Male', 'Pop_60s_Female',
    'Pop_70s_All', 'Pop_70s_Male', 'Pop_70s_Female',
    'Pop_80s_All', 'Pop_80s_Male', 'Pop_80s_Female',
    'Pop_90s_All', 'Pop_90s_Male', 'Pop_90s_Female',
    'Pop_100_All', 'Pop_100_Male', 'Pop_100_Female'
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

/** 시군구 정보 */
export type SggInfo = {
  id: number;
  sig_cd: string;
  sig_kor_nm: string;
  geom: string;
}

/** 읍면동 정보 */
export type EmdInfo = {
  id: number;
  emd_cd: string;
  emd_kor_nm: string;
  geom: string;
}

/** 생활서비스 카테고리 정보 */
export type LifeCatInfo = {
  id: number;
  psy_nm: string;
  log_nm: string;
  life_category: string;
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
export type FestivalInfluxAnalysisCondition = BufferCondition & StartEndTimeCondition & { des_cd: number };

/** 축제 매출 분석 조건 */
export type FestivalRevenueAnalysisCondition = BufferCondition & StartEndTimeCondition & { order: string };

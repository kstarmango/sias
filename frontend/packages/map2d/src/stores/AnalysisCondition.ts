import { atom } from "recoil";
import { AnalysisCondition } from "../types/analysis-condition";

export const analysisConditionState = atom<AnalysisCondition>({
  key: 'analysisConditionState',
  default: {
    areaType: 'admin',
    sgg: '전체',
    emd: '전체',
    year: '2024년',
    month: '1월'
  }
});

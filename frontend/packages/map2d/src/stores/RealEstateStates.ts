import { atom } from 'recoil';

// 부동산 정보 - 토지행정 서비스 분석 자료 저장
export const landAdminAnalysisState = atom({
    key: 'landAdminAnalysisState',
    default: {},
});

// 부동산 정보 - 토지행정 서비스 통계 팝업창 상태
export const activeStatisticPopupState = atom({
    key: "activeStatisticPopupState",
    default: false
});

// 부동산 정보 - 토지행정 서비스 통계 컬러 기본값 저장
export const defaultColorsState = atom({
    key: "defaultColorsState",
    default: false
});
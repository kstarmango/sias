import { atom } from 'recoil';

// 브이월드 OpenAPI 행정구역(시군구) 목록 저장
export const sggState = atom({
    key: 'sggState',
    default: [],
});

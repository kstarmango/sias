import { atom } from 'recoil';

// 레이어 그룹의 가시성 상태 관리 atom
export const layersState = atom({
    key: 'layersState',
    default: [],
});

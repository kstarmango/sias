import { atom } from "recoil";

export const activeMenuState = atom<string | null>({
    key: "activeMenu",
    default: null,
});

export const activeLayerBox = atom({
    key: "activeLayerBox",
    default: false
});
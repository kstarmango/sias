import {atom} from "recoil";
import {Authentication} from "@shared/auth/AuthContext.ts";
import persistAtom from "@shared/recoils/RecoilPersist.ts";

export const AuthState = atom<Authentication | undefined>({
  key: 'AuthState',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
import {useNavigate} from "react-router-dom";
import {createContext, PropsWithChildren, useContext, useMemo, useState} from "react";
import {useRecoilState, useResetRecoilState} from "recoil";
import {AuthState} from "@src/recoils/MapTool.ts";

export interface AuthActions<T> {
  setAuth: (args: T) => void,
}

export type AuthenticatedContext<T> = {
  authenticated: true;
  authentication: T;
};

export type UnauthenticatedContext = {
  authenticated: false;
  authentication: undefined;
};

export type AuthContextProps<T = unknown> = (AuthenticatedContext<T> | UnauthenticatedContext) & AuthActions<T>;

export interface Authentication {
  username: string,
  roles?: string[],
}

export const AuthContext = createContext<AuthContextProps<Authentication>>({
  authenticated: false,
  authentication: undefined,
  setAuth: () => {
  },
});

// export const createAuthContext = <T = unknown>() => {
//   return createContext<AuthContextProps<T> | undefined>(undefined);
// }

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [auth, setAuth] = useRecoilState(AuthState);
  const resetUser = useResetRecoilState(AuthState);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  // const setAuthentication = async (data: Principal) => {
  //   setPrincipal(data);
  //   navigate("/profile");
  // };

  // // call this function to sign out logged in user
  // const logout = async () => {
  //   resetUser();
  //   // setUser(null);
  //   navigate("/", {replace: true});
  // };

  console.log(auth);

  const contextValue = useMemo<AuthContextProps<Authentication>>(() => (
    auth ? {
      authenticated: true,
      authentication: auth,
      setAuth: setAuth,
    } : {
      authenticated: false,
      authentication: undefined,
      setAuth: setAuth,
    }
  ), [auth]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

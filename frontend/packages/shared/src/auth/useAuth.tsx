import {PropsWithChildren, useContext, useMemo} from "react";
import {useRecoilState} from "recoil";
import {AuthContext, AuthContextProps, Authentication} from ".";
import {AuthState} from "@shared/auth/AuthState.ts";

// export const createAuthContext = <T = unknown>() => {
//   return createContext<AuthContextProps<T> | undefined>(undefined);
// }

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [auth, setAuth] = useRecoilState(AuthState);
  // const resetUser = useResetRecoilState(AuthState);
  // const navigate = useNavigate();

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

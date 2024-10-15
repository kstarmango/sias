import {createContext} from "react";

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


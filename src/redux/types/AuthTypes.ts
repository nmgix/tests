import { DefaultState } from ".";

export type AuthUserData = {
  id: string | null;
};

export interface AuthState extends DefaultState {
  state: AuthUserData;
}

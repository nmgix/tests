import axios, { AxiosResponse } from "axios";

export type AuthData = {
  username: string;
  password: string;
};

export type RegisterData = AuthData & {
  passwordRepeat: string;
};

export const loginUser: (data: AuthData) => Promise<boolean | null> = async ({ username, password }) => {
  let res = await axios
    .post<any, AxiosResponse<{ access_token: string }>>(
      process.env.REACT_APP_SERVER_ADRESS! + process.env.REACT_APP_LOGIN_PATH!,
      new URLSearchParams({
        username,
        password,
      })
    )
    .then((res) => {
      axios.defaults.headers.common = { Authorization: `bearer ${res.data.access_token}` };
      return true;
    })
    .catch((err) => {
      return null;
    });
  return res;
};

export const registerUser: (data: AuthData) => Promise<boolean | null> = async ({ username, password }) => {
  let res = await axios
    .post(process.env.REACT_APP_SERVER_ADRESS! + process.env.REACT_APP_REGISTER_PATH!, null, {
      params: {
        username,
        password,
      },
    })
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      return null;
    });
  if (!res) {
    return null;
  }
  let loginRes = await loginUser({ username, password });
  return loginRes;
};

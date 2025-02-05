import axios, { AxiosResponse } from "axios";
import { LinkData } from "./components/PageComponents/User/Content";

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
      axios.defaults.headers.common = { Authorization: `Bearer ${res.data.access_token}` };
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

export type Filters = {
  short: boolean | null;
  target: boolean | null;
  counter: boolean | null;
};
type RetrieveLinksProps = {
  offset: number;
  limit: number;
  filters: Filters;
};

export const retrieveLinks: (props: RetrieveLinksProps) => Promise<LinkData[] | null> = async ({
  offset,
  limit,
  filters,
}): Promise<LinkData[] | null> => {
  let params = new URLSearchParams();
  Object.keys(filters)
    .filter((key) => filters[key as keyof Filters] !== null)
    .map((key) => {
      let chooseAscDesc = filters[key as keyof Filters] ? `asc_${key}` : `desc_${key}`;
      return params.append("order", chooseAscDesc);
    });
  params.append("offset", offset.toString());
  params.append("limit", limit.toString());

  let res = await axios
    .get<any, AxiosResponse<LinkData[]>>(process.env.REACT_APP_SERVER_ADRESS! + process.env.REACT_APP_STATISTICS_PATH, {
      params: params,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return null;
    });
  return res;
};

export const generateLink: (fullLink: string) => Promise<LinkData | null> = async (
  fullLink
): Promise<LinkData | null> => {
  let res = await axios
    .post<any, AxiosResponse<LinkData>>(
      process.env.REACT_APP_SERVER_ADRESS! + process.env.REACT_APP_SQUEEZE_PATH!,
      null,
      {
        params: {
          link: fullLink,
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return null;
    });
  if (!res) {
    return null;
  }
  return res.data;
};

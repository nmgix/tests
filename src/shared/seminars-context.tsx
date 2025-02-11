import { createContext, useState } from "react";
import { Seminar } from "./seminar";
import { axiosInstance } from "./axios";
import { Api, ApiErrors } from "./api-messages";

type Tail<T extends any[]> = T extends [any, ...infer R] ? R : never; // gpt, чтобы исключать первый элемент (cb: Promise<T>) из reqWrapper пропсов [cb, onFail, onSuccess, reqLimit]
const reqWrapper = async <T = any | undefined,>(cb: Promise<T>, onFail?: (err?: Error) => void, onSuccess?: (val?: T) => void, reqLimit = 5000) => {
  const timeout = setTimeout(() => {
    if (onFail) onFail();
    return;
  }, reqLimit);
  await cb
    .then(val => {
      clearTimeout(timeout);
      if (onSuccess) onSuccess(val);
    })
    .catch(val => {
      if (onFail) onFail(val);
    });
};

export interface ISeminarsContext {
  seminars: Seminar[] | null; // [Seminar,Seminar,Seminar] || [] || null aka "loading"
  setSeminars: React.Dispatch<React.SetStateAction<Seminar[] | null>>;
  apiFetchSeminars: <T = any>(pagination: { from: number; limit: number }, ...args: Tail<Parameters<typeof reqWrapper<T>>>) => Promise<void>;
  apiDeleteSeminar: <T = any>(id: Seminar["id"], ...args: Tail<Parameters<typeof reqWrapper<T>>>) => Promise<void>;
  apiEditSeminar?: <T = any>(seminar: { id: number } & Partial<Seminar>, ...args: Tail<Parameters<typeof reqWrapper<T>>>) => Promise<void>;
}

export const SeminarsContext = createContext<ISeminarsContext>({} as ISeminarsContext);

export const SeminarContextProvider = ({ children }: { children: React.ReactElement | React.ReactElement[] }) => {
  const [seminars, setSeminars] = useState<Seminar[] | null>(null);

  const apiFetchSeminars: ISeminarsContext["apiFetchSeminars"] = async ({ from = 0, limit = 5 }, cbFail, cbSuccess, reqLimit) => {
    await reqWrapper<Seminar[]>(
      new Promise(async (res, rej) => {
        const req = await axiosInstance.get<Seminar[]>(Api.Seminars, { params: { start: from, limit } });
        if (req.status === 200) res(req.data);
        else rej(ApiErrors.edit);
      }),
      cbFail,
      seminars => {
        if (cbSuccess) cbSuccess(seminars as any); // зачем тогда дженерик добавлял
      },
      reqLimit
    );
  };
  const apiDeleteSeminar: ISeminarsContext["apiDeleteSeminar"] = async (id, cbFail, cbSuccess, reqLimit) => {
    await reqWrapper<undefined>(
      new Promise(async (res, rej) => {
        const req = await axiosInstance.delete(`${Api.Seminars}/${id}`);
        if (req.status === 200) res(req.data);
        else rej(ApiErrors.edit);
      }),
      cbFail,
      cbSuccess,
      reqLimit
    );
  };
  const apiEditSeminar: ISeminarsContext["apiEditSeminar"] = async (seminar, cbFail, cbSuccess, reqLimit = 5000) => {
    await reqWrapper<undefined>(
      new Promise(async (res, rej) => {
        const req = await axiosInstance.patch(`${Api.Seminars}/${seminar.id}`, JSON.stringify(seminar));
        if (req.status === 200) res(req.data);
        else rej(ApiErrors.edit);
      }),
      cbFail,
      cbSuccess,
      reqLimit
    );
  };

  return <SeminarsContext value={{ apiDeleteSeminar, apiEditSeminar, apiFetchSeminars, seminars, setSeminars }}>{children}</SeminarsContext>;
};

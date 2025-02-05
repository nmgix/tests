import { Request } from "express";

export type CargoItem = {
  date: Date;
  name: string;
  distance: number;
  count: number;
  id?: number;
};

export type IGetCargoLimitedReq = Request<{}, {}, {}, { page?: number; limit?: number }>;
export type IPostCargoReq = Request<{}, {}, { cargo: CargoItem[] }>;
export type IDeleteCargoReq = Request<{}, {}, {}, { id?: number }>;

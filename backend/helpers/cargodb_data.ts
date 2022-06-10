import { Request } from "express";

export type CargoItem = {
  date: Date;
  name: string;
  id: number;
  distance: number;
  count: number;
};

export type IGetCargoLimitedReq = Request<{}, {}, {}, { page?: number; limit?: number }>;

// export type IPostCargoReq = Request<{}, {}, {  }>;

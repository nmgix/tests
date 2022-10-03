export type TileType = "floor" | "wall";

export type EntityPosition = {
  x: number;
  y: number;
};

export type MapNodeSize = {
  width: number;
  height: number;
};

export enum BuffsEnum {
  "heal" = "Лечение",
  "boost" = "Ускорение",
}

export interface BuffType {
  buff: string;
  name: string;
}

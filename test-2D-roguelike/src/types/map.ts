export type MapNodeSize = {
  width: number;
  height: number;
};

export type TileType = "floor" | "wall";

export type MapArrayTile = {
  type: TileType;
  coordinates: {
    x: number;
    y: number;
  };
};

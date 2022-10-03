import { EntityPosition, MapNodeSize, TileType } from "../../types/gameTypes";
import { Asset } from "./Asset";
import { Entity } from "./Entity";

export class Tile extends Entity implements Asset {
  public asset: string;
  public size: MapNodeSize = { width: 1, height: 1 };

  constructor(public type: TileType, public position: EntityPosition) {
    super();

    switch (type) {
      case "floor": {
        this.asset = require("./resources/images/tile-.png");
        break;
      }
      case "wall": {
        this.asset = require("./resources/images/tile-W.png");
        break;
      }
    }
  }
}

// export interface Tile extends Asset, Entity {}

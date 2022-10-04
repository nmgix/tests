import { EntityPosition, MapNodeSize, TileType } from "../../types/gameTypes";
import { Entity } from "./Entity";

export class Tile extends Entity {
  public size: MapNodeSize = { width: 1, height: 1 };

  constructor(public type: TileType, public position: EntityPosition) {
    super();

    // switch (type) {
    //   case "floor": {
    //     this.asset = require("./resources/images/tile-.png");
    //     break;
    //   }
    //   case "wall": {
    //     this.asset = require("./resources/images/tile-W.png");
    //     break;
    //   }
    // }
    // тут будет implement другого класса либо entity, но в рендер методе entity будет провека на тип и доабвление класса нужного
  }
}

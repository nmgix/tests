import { EntityPosition } from "../../types/entity";
import { MapNodeSize, TileType } from "../../types/map";
import { Entity } from "./Entity";
import { Game } from "./Game";

export class Tile extends Entity {
  public size: MapNodeSize = { width: 1, height: 1 };

  constructor(public type: TileType, public position: EntityPosition, game: Game) {
    super(game);
  }
}

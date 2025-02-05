import { EntityPosition } from "../../types/entity";
import { MapNodeSize } from "../../types/map";
import { Entity } from "./Entity";
import { Game } from "./Game";

export class MapNode extends Entity {
  constructor(public size: MapNodeSize, public position: EntityPosition, game: Game) {
    super(game, false);
  }
  public paths: MapNode[] = [];
}

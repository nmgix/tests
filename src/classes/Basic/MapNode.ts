import { EntityPosition, MapNodeSize } from "../../types/gameTypes";
import { Entity } from "./Entity";

export class MapNode extends Entity {
  constructor(public size: MapNodeSize, public position: EntityPosition) {
    super();
  }
  public paths: MapNode[] = [];
}

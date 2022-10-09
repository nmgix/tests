import { EntityPosition } from "../types/entity";
import { MapNodeSize } from "../types/map";

export function coordsIntersect(r1: EntityPosition & MapNodeSize, r2: EntityPosition & MapNodeSize) {
  var x = Math.max(r1.x, r2.x);
  var y = Math.max(r1.y, r2.y);
  var xx = Math.min(r1.x + r1.width, r2.x + r2.width);
  var yy = Math.min(r1.y + r1.height, r2.y + r2.height);
  return { x: x, y: y, w: xx - x, h: yy - y };
}

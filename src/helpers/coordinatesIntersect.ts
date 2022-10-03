import { EntityPosition, MapNodeSize } from "../types/gameTypes";

export function coordsIntersect(obj1: EntityPosition & MapNodeSize, obj2: EntityPosition & MapNodeSize) {
  return (
    (obj1.x + obj1.width > obj2.x && obj1.x + obj1.width < obj2.x + obj2.width) ||
    (obj2.x + obj2.width > obj2.x && obj2.x + obj2.width < obj1.x + obj1.width) ||
    (obj1.y + obj1.height > obj2.y && obj1.y + obj1.height < obj2.y + obj2.height) ||
    (obj2.y + obj2.height > obj2.y && obj2.y + obj2.height < obj1.y + obj1.height)
  );
}

import { EnitityTiles } from "../types/entity";

export const createTile = (
  parent: Element,
  top: number,
  left: number,
  type: keyof typeof EnitityTiles,
  withCoords?: boolean
) => {
  const tile = document.createElement("div");
  tile.classList.add(...["cell", EnitityTiles[type]]);
  if (withCoords) {
    tile.classList.add(...[`x-${left}`, `y-${top}`]);
  }
  tile.style.top = `${top * 40}px`;
  tile.style.left = `${left * 40}px`;
  tile.style.zIndex = "6";
  parent.appendChild(tile);
  return tile;
};

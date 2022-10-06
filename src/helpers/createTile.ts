export enum Tiles {
  floor = "tile",
  wall = "tileW",
  enemy = "tileE",
  hero = "tileP",
  heal = "tileHP",
  sword = "tileSW",
}

export const createTile = (
  parent: Element,
  top: number,
  left: number,
  type: keyof typeof Tiles,
  withCoords?: boolean
) => {
  const tile = document.createElement("div");
  tile.classList.add(...["cell", Tiles[type]]);
  if (withCoords) {
    tile.classList.add(...[`x-${left}`, `y-${top}`]);
  }
  tile.style.top = `${top * 40}px`;
  tile.style.left = `${left * 40}px`;
  tile.style.zIndex = "6";
  parent.appendChild(tile);
};

export const createTile = (parent: Element, top: number, left: number, floor: boolean, withCoords?: boolean) => {
  const tile = document.createElement("div");
  if (floor) {
    tile.classList.add(...["cell", "tile"]);
  } else {
    tile.classList.add(...["cell", "tileW"]);
  }
  if (withCoords) {
    tile.classList.add(...[`x-${left}`, `y-${top}`]);
  }
  tile.style.top = `${top * 40}px`;
  tile.style.left = `${left * 40}px`;
  tile.style.zIndex = "6";
  parent.appendChild(tile);
};

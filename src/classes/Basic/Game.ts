import { coordsIntersect } from "../../helpers/coordinatesIntersect";
import { randomInteger } from "../../helpers/randmonInteger";
import { EntityPosition, MapNodeSize } from "../../types/gameTypes";
import { MapNode } from "./MapNode";
import { Entity } from "./Entity";
import { Buff } from "./Buff";
import { Weapon } from "./Weapon";
import { Enemy } from "../Entities/Enemy";
import { Hero } from "../Entities/Hero";

const gameSettings = {
  pathThreshold: 5,
  gameSize: {
    width: 40,
    height: 20,
  },
};

export class Game {
  constructor() {
    this.generateMap();
    this.gameReady = true;
    console.log(this);
    this.renderMap();
  }
  public gameReady: boolean = false;
  public mapGraph: MapNode[] = [];
  public entities: Entity[] = [];
  public hero: Hero;

  generateMap = () => {
    // создание комнат
    let roomsCount = randomInteger(5, 10);
    for (let i = 0; i < roomsCount; i++) {
      let room = this.generateRoom();
      if (room) {
        // будет рандомно из списка всех остальных нод брать 1-2 как ноды с связью чтобы потом строить тоннель по этой связи
        if (this.mapGraph.length > 0) {
          let currentMapGraph = this.mapGraph.filter((node) => node.uuid !== room!.uuid);
          let resultPaths: MapNode[] = [];

          let findRooms = (graph: MapNode[], tries = 0, added = 0) => {
            if (added === 3 || graph.length <= 0) {
              return;
            }
            if (tries > 3) {
              // если после 3+ попыток не получилось, добавить любую ближайшую (потому что если их всего две, то расстояние может быть больше трёх клеток)
              // найти ближайшее значение по X
              let closestX = graph.reduce(function (prev, curr) {
                return Math.abs(curr.position.x - gameSettings.pathThreshold) <
                  Math.abs(prev.position.x - gameSettings.pathThreshold)
                  ? curr
                  : prev;
              });
              // найти ближайшее значение по Y
              let closestY = graph.reduce(function (prev, curr) {
                return Math.abs(curr.position.y - gameSettings.pathThreshold) <
                  Math.abs(prev.position.y - gameSettings.pathThreshold)
                  ? curr
                  : prev;
              });
              if (!closestX && !closestY) {
                return;
              } else {
                if (closestX.uuid === closestY.uuid) {
                  resultPaths.push(closestX);
                  return;
                } else {
                  resultPaths.push(...[closestX, closestY]);
                  return;
                }
              }
            } else {
              // сначала найти первые три ближайшие комнаты в диапозоне 5 клеток рекурсивно?\

              // наверное ещё ширину было бы желательно считать, но может быть просто пускать клетки из середины

              // найти ближайшее значение по X
              let closestX = graph.reduce(function (prev, curr) {
                return Math.abs(curr.position.x - gameSettings.pathThreshold) <
                  Math.abs(prev.position.x - gameSettings.pathThreshold)
                  ? curr
                  : prev;
              });
              // найти ближайшее значение по Y
              let closestY = graph.reduce(function (prev, curr) {
                return Math.abs(curr.position.y - gameSettings.pathThreshold) <
                  Math.abs(prev.position.y - gameSettings.pathThreshold)
                  ? curr
                  : prev;
              });
              if (!closestX && !closestY) {
                return findRooms(graph, ++tries, added);
              } else {
                if (closestX.uuid === closestY.uuid) {
                  resultPaths.push(closestX);
                  return findRooms(
                    graph.filter((path) => path.uuid !== closestX.uuid),
                    0,
                    ++added
                  );
                } else {
                  if (added === 2) {
                    let directions = [closestX, closestY];
                    let randomDirection = directions[Math.floor(Math.random() * directions.length)];
                    resultPaths.push(randomDirection);
                    return;
                  } else {
                    resultPaths.push(...[closestX, closestY]);
                    added = added + 2;
                    // (!== (closestX.uuid || closestY.uuid)) ?
                    return findRooms(
                      graph.filter((path) => path.uuid !== closestX.uuid && path.uuid !== closestY.uuid),
                      0,
                      added
                    );
                  }
                }
              }
            }
          };
          findRooms(currentMapGraph);

          // добавлеям все пути комнате
          room.paths = resultPaths;
          // добавляем всем путям нашу комнату
          resultPaths.forEach((path) => {
            path.paths.push(room!);
          });

          //   // let randomNodesAmount = randomInteger(1, currentMapGraph.length);
          //   // const shuffledNodes = currentMapGraph.sort(() => 0.5 - Math.random()).slice(0, randomNodesAmount);
          //   // room.paths = shuffledNodes;
          //   let closest = currentMapGraph.map(room => {

          //   })
        }

        this.mapGraph.push(room);
      }
    }
    for (let i = 0; i < this.mapGraph.length; i++) {
      let currentNode = this.mapGraph[i];
      if (currentNode.paths.length === 0) {
        let currentMapGraph = this.mapGraph.filter((node) => node.uuid !== currentNode.uuid);
        let randomNodesAmount = randomInteger(1, currentMapGraph.length);
        const shuffledNodes = currentMapGraph.sort(() => 0.5 - Math.random()).slice(0, randomNodesAmount);
        currentNode.paths = shuffledNodes;
      }
    }
    // создание баффов
    let buffsCount = randomInteger(10, 10);
    for (let i = 0; i < buffsCount; i++) {
      let heal = new Buff("heal");
      let room = this.mapGraph[Math.floor(Math.random() * this.mapGraph.length)];
      heal.position = {
        x: randomInteger(room.position.x, room.position.x + room.size.width - 1),
        y: randomInteger(room.position.y, room.position.y + room.size.height - 1),
      };
      heal.createEntity(this);
    }
    // создание оружия
    let weaponCount = randomInteger(2, 2);
    for (let i = 0; i < weaponCount; i++) {
      let weapon = new Weapon();
      let room = this.mapGraph[Math.floor(Math.random() * this.mapGraph.length)];
      weapon.position = {
        x: randomInteger(room.position.x, room.position.x + room.size.width - 1),
        y: randomInteger(room.position.y, room.position.y + room.size.height - 1),
      };
      weapon.createEntity(this);
    }
    // создание врагов
    let enemiesCount = randomInteger(10, 10);
    for (let i = 0; i < enemiesCount; i++) {
      let enemy = new Enemy();
      let room = this.mapGraph[Math.floor(Math.random() * this.mapGraph.length)];
      enemy.position = {
        x: randomInteger(room.position.x, room.position.x + room.size.width - 1),
        y: randomInteger(room.position.y, room.position.y + room.size.height - 1),
      };
      enemy.createEntity(this);
    }
    // создание героя
    let hero = new Hero();
    let room = this.mapGraph[Math.floor(Math.random() * this.mapGraph.length)];
    hero.position = {
      x: randomInteger(room.position.x, room.position.x + room.size.width - 1),
      y: randomInteger(room.position.y, room.position.y + room.size.height - 1),
    };
    this.hero = hero;
  };
  generateRoom: (tries?: number) => MapNode | null = (tries = 0) => {
    if ((tries > 500 && this.mapGraph.length > 3) || tries > 3000) {
      return null;
    }
    let currentNodeSize: MapNodeSize = {
      width: randomInteger(3, 8),
      height: randomInteger(3, 8),
    };
    let currentPosition: EntityPosition = {
      x: randomInteger(1, gameSettings.gameSize.width - currentNodeSize.width - 1),
      y: randomInteger(1, gameSettings.gameSize.height - currentNodeSize.height - 1),
    };
    if (this.mapGraph.length === 0) {
      return new MapNode(currentNodeSize, currentPosition);
    } else {
      let intersectingNode = this.mapGraph.find((node) => {
        let intersect = coordsIntersect(
          {
            width: currentNodeSize.width + 2,
            height: currentNodeSize.height + 2,
            x: currentPosition.x - 1 === -1 ? currentPosition.x : currentPosition.x - 1,
            y: currentPosition.y - 1 === -1 ? currentPosition.y : currentPosition.y - 1,
          },
          { width: node.size.width, height: node.size.height, x: node.position.x, y: node.position.y }
        );
        console.log(intersect);
        if (intersect.w > 0 && intersect.h > 0) {
          return true;
        } else {
          return false;
        }
      });
      if (intersectingNode) {
        return this.generateRoom(++tries);
      } else {
        return new MapNode(currentNodeSize, currentPosition);
      }
    }
  };
  //   generatePaths = () => {
  //     // здесь будет постройка пути и проверка не пересекается ли он, но тут пока сомнения
  //   };

  renderMap = () => {
    // эта функция будет вызываться на каждом ходу чтобы двигать все объекты (врагов, например)

    // рендер комнаты
    const gameFieldDiv = document.getElementsByClassName("field")[0];

    for (let heightI = 0; heightI < gameSettings.gameSize.height; heightI++) {
      for (let widthJ = 0; widthJ < gameSettings.gameSize.width; widthJ++) {
        const tile = document.createElement("div");
        tile.classList.add(...["cell", "tileW"]);
        tile.style.top = `${heightI * 40}px`;
        tile.style.left = `${widthJ * 40}px`;
        gameFieldDiv.appendChild(tile);
      }
    }

    // рендер комнат
    for (let i = 0; i < this.mapGraph.length; i++) {
      let currentNode = this.mapGraph[i];
      for (
        let heightI = currentNode.position.y;
        heightI < currentNode.position.y + currentNode.size.height;
        heightI++
      ) {
        for (let widthJ = currentNode.position.x; widthJ < currentNode.position.x + currentNode.size.width; widthJ++) {
          const tile = document.createElement("div");
          tile.classList.add(...["cell", "tile", `x-${widthJ}`, `y-${heightI}`]);
          tile.style.top = `${heightI * 40}px`;
          tile.style.left = `${widthJ * 40}px`;
          gameFieldDiv.appendChild(tile);
          // console.log(currentNode.uuid, { width: widthJ, height: heightI });
        }
      }
    }

    // рендер путей
    const ranNodes: MapNode[] = [];
    // если нода из списка paths текущей ноды есть в списке выше, пусть строить не надо
    // for (let i = 0; i < this.mapGraph.length; i++) {
    //   let currentNode = this.mapGraph[i];
    //   let currentPaths = currentNode.paths.filter((el) => !ranNodes.includes(el));
    //   for (let j = 0; j < currentPaths.length; j++) {
    //     let nodePath = currentPaths[j];
    //     // проверка находится ли по середине горизонтально
    //     let middleSidedNode =
    //       (nodePath.position.x > currentNode.position.x &&
    //         nodePath.position.x < currentNode.position.x + currentNode.size.width / 2) ||
    //       (nodePath.position.x + nodePath.size.width > currentNode.position.x + currentNode.size.width / 2 &&
    //         nodePath.position.x + nodePath.size.width < currentNode.position.x + currentNode.size.width);
    //     if (middleSidedNode) {
    //       console.log("middlesided");
    //       // middleSided
    //     } else {
    //       console.log("right");
    //       // проверка справа или слева горизонтально
    //       let rightSidedNode = currentNode.position.x + currentNode.size.width / 2 < nodePath.position.x;
    //       console.log(rightSidedNode);
    //       if (rightSidedNode) {
    //         let firstNode: EntityPosition = {
    //           x: currentNode.position.x + currentNode.size.width,
    //           y: randomInteger(currentNode.position.y, currentNode.position.y + currentNode.size.height),
    //         };
    //         let secondNode: EntityPosition = {
    //           x: nodePath.position.x,
    //           y: randomInteger(nodePath.position.y, nodePath.position.y + nodePath.size.height),
    //         };
    //         // let middle = nodePath.position.x - (currentNode.position.x + currentNode.size.width);
    //         let middle = Math.floor((currentNode.position.x + currentNode.size.width + nodePath.position.x) / 2);
    //         console.log(firstNode, secondNode, middle);
    //         for (let i = firstNode.x; i < middle - currentNode.position.x; i++) {
    //           // тут слева направа рендер пути
    //           const tile = document.createElement("div");
    //           tile.classList.add(...["cell", "tile"]);
    //           tile.style.top = `${firstNode.y * 40}px`;
    //           tile.style.left = `${i * 40}px`;
    //           tile.style.zIndex = "6";
    //           gameFieldDiv.appendChild(tile);
    //         }
    //         for (let i = secondNode.x; i > nodePath.position.x - middle; i--) {
    //           // тут справа налево рендер пути
    //           const tile = document.createElement("div");
    //           tile.classList.add(...["cell", "tile"]);
    //           tile.style.top = `${secondNode.y * 40}px`;
    //           tile.style.left = `${i * 40}px`;
    //           tile.style.zIndex = "6";
    //           gameFieldDiv.appendChild(tile);
    //         }
    //         // надо как-то проверять, есть ли ними полоса ячеек, если нет, то выбирать любую из сторон (левую или правую) для вертикального пути
    //         // тут по середитне между ними
    //       } else {
    //         console.log("left");
    //         // leftSided
    //       }

    //       // находится ли по середине вертикально

    //       // сверху или снизу вертикально
    //     }
    //   }

    //   // рендер объектов
    // }
  };
}

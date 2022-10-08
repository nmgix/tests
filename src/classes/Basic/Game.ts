import { coordsIntersect } from "../../helpers/coordinatesIntersect";
import { randomInteger } from "../../helpers/randomInteger";
import { EntityPosition, MapArrayTile, MapNodeSize } from "../../types/gameTypes";
import { MapNode } from "./MapNode";
import { Entity } from "./Entity";
import { Buff } from "./Buff";
import { Weapon } from "./Weapon";
import { Enemy } from "../Entities/Enemy";
import { Hero } from "../Entities/Hero";
import { createTile } from "../../helpers/createTile";
import { PlayerController } from "../Controllers/PlayerController";

const gameSettings = {
  pathThreshold: 5,
  gameSize: {
    width: 40,
    height: 20,
  },
  generateRooms: {
    from: 5,
    to: 10,
  },
};

export class Game {
  constructor() {
    this.generateMap();
    this.saveMap()
      .then(() => this.generateEntities())
      .then(() => this.renderMap())
      .then(() => this.renderEntities())
      .then(() => (this.playerController = new PlayerController(this)))
      .then(() => (this.gameReady = true))
      .catch((err) => {
        console.log(err);
        alert("Случилась ошибка, попробуйте перезапустить игру");
      });
  }
  public gameReady: boolean = false;
  public mapGraph: MapNode[] = [];
  public mapArray: MapArrayTile[][] = [...Array(gameSettings.gameSize.height)].map((el) =>
    Array(gameSettings.gameSize.width).fill({})
  );
  public entities: (Entity | Buff | Enemy | Hero | Weapon)[] = [];
  public playerController: PlayerController;
  // public hero: Hero;

  generateMap = () => {
    // создание комнат
    let roomsCount = randomInteger(gameSettings.generateRooms.from, gameSettings.generateRooms.to);
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
            let directions = [closestX, closestY];

            if (tries > 3) {
              if (!closestX && !closestY) {
                return;
              } else {
                directions = directions.filter(
                  (directionPath) => !resultPaths.find((resultPath) => directionPath.uuid === resultPath.uuid)
                );
                if (directions.length === 0) {
                  return;
                }
                if (!directions[1]) {
                  resultPaths.push(directions[0]);
                  return;
                } else if (!directions[0]) {
                  resultPaths.push(directions[1]);
                  return;
                } else {
                  if (directions[0] === directions[1]) {
                    resultPaths.push(directions[0]);
                    return;
                  } else {
                    resultPaths.push(...directions);
                    return;
                  }
                }
              }
            } else {
              if (!closestX && !closestY) {
                return findRooms(graph, ++tries, added);
              } else {
                directions = directions.filter(
                  (directionPath) => !resultPaths.find((resultPath) => directionPath.uuid === resultPath.uuid)
                );
                if (directions.length === 0) {
                  return;
                }
                if (closestX.uuid === closestY.uuid) {
                  let existingNode = resultPaths.find((node) => {
                    let found = node.paths.find((nodePaths) => nodePaths.uuid === closestX.uuid);
                    return found !== undefined;
                  });
                  if (existingNode) {
                    return;
                  } else {
                    resultPaths.push(closestX);
                    return findRooms(
                      graph.filter((path) => path.uuid !== closestX.uuid),
                      0,
                      ++added
                    );
                  }
                } else {
                  if (directions.length === 0) {
                    return;
                  }
                  if (added === 2) {
                    let randomDirection = directions[Math.floor(Math.random() * directions.length)];
                    resultPaths.push(randomDirection);
                    return;
                  } else {
                    resultPaths.push(...directions);
                    added = added + 2;
                    return findRooms(
                      graph.filter((path) => !directions.find((directionPath) => path.uuid === directionPath.uuid)),
                      0,
                      added
                    );
                  }
                }
              }
            }
          };
          findRooms(currentMapGraph);

          room.paths = resultPaths;
        }

        this.mapGraph.push(room);
      }
    }
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
      return new MapNode(currentNodeSize, currentPosition, this);
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
        if (intersect.w > 0 && intersect.h > 0) {
          return true;
        } else {
          return false;
        }
      });
      if (intersectingNode) {
        return this.generateRoom(++tries);
      } else {
        return new MapNode(currentNodeSize, currentPosition, this);
      }
    }
  };
  generateEntities = () => {
    // создание баффов
    let buffsCount = randomInteger(10, 10);
    for (let i = 0; i < buffsCount; i++) {
      new Buff("heal", this);
    }
    // создание оружия
    let weaponCount = randomInteger(2, 2);
    for (let i = 0; i < weaponCount; i++) {
      new Weapon(this);
    }
    // создание врагов
    let enemiesCount = randomInteger(10, 10);
    for (let i = 0; i < enemiesCount; i++) {
      new Enemy(this);
    }
    // создание героя
    new Hero(this);
  };

  saveMap(): Promise<void> {
    return new Promise((res, rej) => {
      for (let heightI = 0; heightI < gameSettings.gameSize.height; heightI++) {
        for (let widthJ = 0; widthJ < gameSettings.gameSize.width; widthJ++) {
          this.mapArray[heightI][widthJ] = { type: "wall", coordinates: { x: widthJ, y: heightI } };
        }
      }

      for (let i = 0; i < this.mapGraph.length; i++) {
        let currentNode = this.mapGraph[i];
        for (
          let heightI = currentNode.position.y;
          heightI < currentNode.position.y + currentNode.size.height;
          heightI++
        ) {
          for (
            let widthJ = currentNode.position.x;
            widthJ < currentNode.position.x + currentNode.size.width;
            widthJ++
          ) {
            this.mapArray[heightI][widthJ] = { type: "floor", coordinates: { x: widthJ, y: heightI } };
          }
        }
      }

      for (let i = 0; i < this.mapGraph.length; i++) {
        let currentNode = this.mapGraph[i];
        for (let j = 0; j < currentNode.paths.length; j++) {
          let currentChildNode = currentNode.paths[j];

          let x1 = currentNode.position.x;
          let y1 = currentNode.position.y;
          let w1 = currentNode.size.width;
          let h1 = currentNode.size.height;

          let x2 = currentChildNode.position.x;
          let y2 = currentChildNode.position.y;
          let w2 = currentChildNode.size.width;
          let h2 = currentChildNode.size.height;

          let verticalFirst = x1 + w1 < x2;
          let verticalSecond = x2 + w2 < x1;
          let vertical = verticalFirst || verticalSecond;

          let horizontalFirst = y1 + h1 < y2;
          let horizontalSecond = y2 + h2 < y1;
          let horizontal = horizontalFirst || horizontalSecond;

          if (vertical) {
            let firstNode: EntityPosition;
            let secondNode: EntityPosition;

            if (verticalFirst) {
              firstNode = {
                x: x1 + w1 - 1,
                y: randomInteger(y1, y1 + h1 - 1),
              };
              secondNode = {
                x: x2,
                y: randomInteger(y2, y2 + h2 - 1),
              };
            } else {
              firstNode = {
                x: x1,
                y: randomInteger(y1, y1 + h1 - 1),
              };
              secondNode = {
                x: x2 + w2 - 1,
                y: randomInteger(y2, y2 + h2 - 1),
              };
            }
            let middle = Math.floor((firstNode.x + secondNode.x) / 2);
            for (
              let i = firstNode.x < middle ? firstNode.x : middle;
              i < (firstNode.x < middle ? middle : firstNode.x);
              i++
            ) {
              // createTile(gameFieldDiv, firstNode.y, i, true);
              this.mapArray[firstNode.y][i] = { type: "floor", coordinates: { x: i, y: firstNode.y } };
            }
            for (
              let i = secondNode.x > middle ? secondNode.x : middle;
              i > (secondNode.x > middle ? middle : secondNode.x);
              i--
            ) {
              // createTile(gameFieldDiv, secondNode.y, i, true, true);
              this.mapArray[secondNode.y][i] = { type: "floor", coordinates: { x: i, y: secondNode.y } };
            }
            for (
              let i = firstNode.y > secondNode.y ? firstNode.y : secondNode.y;
              i > (firstNode.y > secondNode.y ? secondNode.y : firstNode.y) - 1;
              i--
            ) {
              // createTile(gameFieldDiv, i, middle, true, true);
              this.mapArray[i][middle] = { type: "floor", coordinates: { x: middle, y: i } };
            }
          } else if (horizontal) {
            let firstNode: EntityPosition;
            let secondNode: EntityPosition;

            if (horizontalFirst) {
              firstNode = {
                x: randomInteger(x1, x1 + w1 - 1), // -1  потому что грубо говоря 17 - первая клетка комнаты, ширина 7 и получается что вместе ширина и коордианата больше комнаты на 1
                y: y1 + h1 - 1,
              };
              secondNode = {
                x: randomInteger(x2, x2 + w2 - 1),
                y: y2,
              };
            } else {
              firstNode = {
                x: randomInteger(x1, x1 + w1 - 1),
                y: y1,
              };
              secondNode = {
                x: randomInteger(x2, x2 + w2 - 1),
                y: y2 + h2 - 1,
              };
            }

            let middle = Math.floor((firstNode.y + secondNode.y) / 2);

            for (
              let i = firstNode.y < middle ? firstNode.y : middle;
              i < (firstNode.y < middle ? middle : firstNode.y);
              i++
            ) {
              this.mapArray[i][firstNode.x] = { type: "floor", coordinates: { x: firstNode.x, y: i } };
            }
            for (
              let i = secondNode.y > middle ? secondNode.y : middle;
              i > (secondNode.y > middle ? middle : secondNode.y);
              i--
            ) {
              this.mapArray[i][secondNode.x] = { type: "floor", coordinates: { x: secondNode.x, y: i } };
            }
            for (
              let i = firstNode.x > secondNode.x ? firstNode.x : secondNode.x;
              i > (firstNode.x > secondNode.x ? secondNode.x : firstNode.x) - 1;
              i--
            ) {
              this.mapArray[middle][i] = { type: "floor", coordinates: { x: i, y: middle } };
            }
          }
        }
      }
      res();
    });
  }
  renderMap = () => {
    const gameFieldDiv = document.getElementsByClassName("field")[0];
    for (let i = 0; i < this.mapArray.length; i++) {
      for (let j = 0; j < this.mapArray[i].length; j++) {
        createTile(gameFieldDiv, i, j, this.mapArray[i][j].type === "floor" ? "floor" : "wall", true);
      }
    }
  };

  renderEntities = () => {
    const gameFieldDiv = document.getElementsByClassName("field")[1];
    var child = gameFieldDiv.lastElementChild;
    while (child) {
      gameFieldDiv.removeChild(child);
      child = gameFieldDiv.lastElementChild;
    }
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      let tile = createTile(gameFieldDiv, entity.position.y, entity.position.x, entity.type, true);
      if (entity.type === "enemy" || entity.type === "hero") {
        entity.invokeLogic(tile);
      }
    }
  };
}

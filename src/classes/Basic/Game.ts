import { coordsIntersect } from "../../helpers/coordinatesIntersect";
import { randomInteger } from "../../helpers/randmonInteger";
import { EntityPosition, MapNodeSize } from "../../types/gameTypes";
import { MapNode } from "./MapNode";
import { Entity } from "./Entity";
import { Buff } from "./Buff";
import { Weapon } from "./Weapon";
import { Enemy } from "../Entities/Enemy";
import { Hero } from "../Entities/Hero";

const gameSize = {
  width: 40,
  height: 20,
};

export class Game {
  constructor() {
    this.generateMap();
    this.gameReady = true;
    console.log(this);
    this.renderGame();
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
          let randomNodesAmount = randomInteger(1, currentMapGraph.length);
          const shuffledNodes = currentMapGraph.sort(() => 0.5 - Math.random()).slice(0, randomNodesAmount);
          room.paths = shuffledNodes;
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
      x: randomInteger(1, gameSize.width - currentNodeSize.width - 1),
      y: randomInteger(1, gameSize.height - currentNodeSize.height - 1),
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

  renderGame = () => {
    // эта функция будет вызываться на каждом ходу чтобы двигать все объекты (врагов, например)

    // рендер комнаты
    const gameFieldDiv = document.getElementsByClassName("field")[0];

    for (let heightI = 0; heightI < gameSize.height; heightI++) {
      for (let widthJ = 0; widthJ < gameSize.width; widthJ++) {
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

    // рендер объектов
  };
}

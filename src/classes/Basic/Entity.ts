import { EntityPosition, MapNodeSize, MapArrayTile } from "../../types/gameTypes";
import { v4 as uuid } from "uuid";
import { Game } from "./Game";
import { Tiles } from "../../helpers/createTile";

export class Entity {
  public uuid: string;

  public size: MapNodeSize;
  public position: EntityPosition;
  public type: keyof typeof Tiles;

  constructor() {
    this.uuid = uuid();
  }

  generatePosition: () => {
    // тут будет проверка свободен ли тайл
  };

  createEntity: (gameInstance: Game) => void = (gameInstance) => {
    gameInstance.entities.push(this);
  };
  destroyEntity: (gameInstance: Game) => void = (gameInstance) => {
    gameInstance.entities.filter((entity) => entity.uuid !== this.uuid);
  };
}

type Directions = "x+" | "x-" | "y+" | "y-";

export class MovableEntity extends Entity {
  public game: Game;

  constructor(game: Game) {
    super();
    this.game = game;
  }

  predict = (nextTilePosition: EntityPosition): boolean => {
    let nextTile: MapArrayTile = this.game.mapArray[nextTilePosition.y][nextTilePosition.x];

    let occupiedByEntity = this.game.entities.find(
      (entity) =>
        entity.position.x === nextTilePosition.x && entity.position.y === nextTilePosition.y && entity.type === "enemy"
    );

    return nextTile.type === "floor" && !occupiedByEntity;
  };

  move = (direction: Directions) => {
    switch (direction) {
      case "x+": {
        let available = this.predict({ x: this.position.x + 1, y: this.position.y });
        if (!available) {
          return;
        }
        this.position.x = this.position.x + 1;
        break;
      }
      case "x-": {
        let available = this.predict({ x: this.position.x - 1, y: this.position.y });
        if (!available) {
          return;
        }
        this.position.x = this.position.x - 1;
        break;
      }
      case "y+": {
        let available = this.predict({ x: this.position.x, y: this.position.y + 1 });
        if (!available) {
          return;
        }
        this.position.y = this.position.y + 1;
        break;
      }
      case "y-": {
        let available = this.predict({ x: this.position.x, y: this.position.y - 1 });
        if (!available) {
          return;
        }
        this.position.y = this.position.y - 1;
        break;
      }
    }

    this.game.entities = this.game.entities.map((entity) => {
      if (entity.uuid === this.uuid) {
        entity = this;
      }
      return entity;
    });
    this.game.renderEntities();
  };
}

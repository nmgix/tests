import { EntityPosition, MapNodeSize, MapArrayTile, Directions } from "../../types/gameTypes";
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

  entityLogic?: () => any | void;
}

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

  move = (direction: Directions | string) => {
    switch (direction) {
      case "x+": {
        let available = this.predict({ x: this.position.x + 1, y: this.position.y });
        if (!available) {
          return false;
        }
        this.position.x = this.position.x + 1;
        return true;
      }
      case "x-": {
        let available = this.predict({ x: this.position.x - 1, y: this.position.y });
        if (!available) {
          return false;
        }
        this.position.x = this.position.x - 1;
        return true;
      }
      case "y+": {
        let available = this.predict({ x: this.position.x, y: this.position.y + 1 });
        if (!available) {
          return false;
        }
        this.position.y = this.position.y + 1;
        return true;
      }
      case "y-": {
        let available = this.predict({ x: this.position.x, y: this.position.y - 1 });
        if (!available) {
          return false;
        }
        this.position.y = this.position.y - 1;
        return true;
      }
    }
  };
}

import { Game } from "../Basic/Game";
import { HealthController } from "./HealthController";
import { Entity } from "../Basic/Entity";
import { Directions, EntityPosition, MapArrayTile } from "../../types/gameTypes";

export class CharacterController extends Entity {
  public healthController: HealthController = new HealthController(this);

  constructor(game: Game) {
    super(game);
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

  giveDamage = () => {};

  recieveDamage = () => {};
}

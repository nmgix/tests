import { Game } from "../Basic/Game";
import { HealthController } from "./HealthController";
import { Entity } from "../Basic/Entity";
import { Weapon } from "../Basic/Weapon";
import { Enemy } from "../Entities/Enemy";
import { Buff } from "../Basic/Buff";
import { Hero } from "../Entities/Hero";
import { EntityPosition } from "../../types/entity";
import { MapArrayTile } from "../../types/map";
import { Directions } from "../../types/miscellaneous";

export class CharacterController extends Entity {
  public healthController: HealthController = new HealthController(this);

  public weapon: Weapon | null;
  public damage: number = 10;

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

  attack = (target?: (Weapon | Entity | Buff | Enemy | Hero)["type"]) => {
    this.game.entities.map((entity) => {
      if (target ? entity.type === target : entity.type === "enemy" || entity.type === "hero") {
        if (
          (entity.position.x + 1 === this.position.x && entity.position.y === this.position.y) ||
          (entity.position.x - 1 === this.position.x && entity.position.y === this.position.y) ||
          (entity.position.y + 1 === this.position.y && entity.position.x === this.position.x) ||
          (entity.position.y - 1 === this.position.y && entity.position.x === this.position.x)
        ) {
          let currentEntity = entity as CharacterController;
          currentEntity.healthController.damage(this.weapon ? this.weapon.damage : this.damage);
        }
      }
    });
  };
}

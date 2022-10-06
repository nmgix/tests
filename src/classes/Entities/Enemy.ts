import { MovableEntity } from "../Basic/Entity";
import { Game } from "../Basic/Game";
import { EnemyController } from "../Controllers/EnemyController";

export class Enemy extends MovableEntity {
  public enemyController: EnemyController;

  constructor(game: Game) {
    super(game);
    this.size = {
      width: 1,
      height: 1,
    };
    this.type = "enemy";
    this.enemyController = new EnemyController(this);
    this.entityLogic = this.enemyController.randomMove;
  }
}

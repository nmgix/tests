import { Game } from "../Basic/Game";
import { CharacterController } from "../Controllers/CharacterController";
import { EnemyController } from "../Controllers/EnemyController";

export class Enemy extends CharacterController {
  public enemyController: EnemyController = new EnemyController(this);

  constructor(game: Game) {
    super(game);
    this.size = {
      width: 1,
      height: 1,
    };
    this.type = "enemy";
    this.entityLogic.push(this.enemyController.randomMove);
  }
}

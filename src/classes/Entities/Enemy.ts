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
    this.onUpdateEntityLogic.push(this.enemyController.randomMove);

    this.onUpdateEntityLogic.push(() => {
      const healthController = this.healthController;
      const healthBlock = this.tileDiv.querySelector(".health-wrapper")! as HTMLDivElement;

      if (healthController.health.current === healthController.health.max) {
        healthBlock.style.opacity = "0";
      } else {
        healthBlock.style.opacity = "1";
      }
    });

    this.onUpdateEntityLogic.push(() => {
      if (Math.random() <= 0.3) {
        return;
      } else {
        this.attack("hero");
      }
    });
  }
}

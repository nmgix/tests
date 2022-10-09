import { BuffsStats } from "../../types/gameTypes";
import { Buff } from "../Basic/Buff";
import { Game } from "../Basic/Game";
import { Weapon } from "../Basic/Weapon";
import { CharacterController } from "../Controllers/CharacterController";
import { PlayerController } from "../Controllers/PlayerController";

export class Hero extends CharacterController {
  public playerController: PlayerController;
  public buffs: Buff[] = [];

  constructor(game: Game) {
    super(game);
    this.size = {
      width: 1,
      height: 1,
    };
    this.type = "hero";
    this.playerController = new PlayerController(game);

    this.onUpdateEntityLogic.push(() => {
      if (this.buffs.length > 0) {
        this.buffs = this.buffs.filter((buff) => {
          if (buff.type === "heal") {
            this.healthController.heal(BuffsStats[buff.type]);
            // сюда надо тайл передавать, в котором сейчас объект иначе ЛИШНИЙ перерендер для чисто одного места сделать не получится
            // this.invokeLogic("onUpdateEntityLogic");
            return false;
          } else {
            return true;
          }
        });
      }
    });
  }
}

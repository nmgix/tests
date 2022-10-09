import { BuffsStats } from "../../types/buff";
import { Buff } from "../Basic/Buff";
import { Game } from "../Basic/Game";
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

    this.onUpdateEntityLogic.push((once?: boolean) => {
      if (this.buffs.length > 0) {
        this.buffs = this.buffs.filter((buff) => {
          if (buff.type === "heal") {
            if (typeof once !== "boolean" || (typeof once === "boolean" && !once)) {
              this.healthController.heal(BuffsStats[buff.type]);
              this.invokeLogic("onUpdateEntityLogic", true);
            }
            return false;
          } else {
            return true;
          }
        });
      }
    });
  }
}

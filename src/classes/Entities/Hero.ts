import { Buff } from "../Basic/Buff";
import { Game } from "../Basic/Game";
import { Weapon } from "../Basic/Weapon";
import { CharacterController } from "../Controllers/CharacterController";
import { PlayerController } from "../Controllers/PlayerController";

export class Hero extends CharacterController {
  public playerController: PlayerController;
  public buffs: Buff[];

  constructor(game: Game) {
    super(game);
    this.size = {
      width: 1,
      height: 1,
    };
    this.type = "hero";
    this.playerController = new PlayerController(game);
  }
}

import { Buff } from "../Basic/Buff";
import { Game } from "../Basic/Game";
import { Weapon } from "../Basic/Weapon";
import { CharacterController } from "../Controllers/CharacterController";

export class Hero extends CharacterController {
  // будет управление и  (?) инвентарь
  public buffs: Buff[];
  public weapon: Weapon | null;

  constructor(game: Game) {
    super(game);
    this.size = {
      width: 1,
      height: 1,
    };
    this.type = "hero";
  }
}

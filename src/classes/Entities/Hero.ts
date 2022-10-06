import { Buff } from "../Basic/Buff";
import { MovableEntity } from "../Basic/Entity";
import { Game } from "../Basic/Game";
import { Weapon } from "../Basic/Weapon";

export class Hero extends MovableEntity {
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

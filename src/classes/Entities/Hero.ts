import { Asset } from "../Basic/Asset";
import { Buff } from "../Basic/Buff";
import { MovableEntity } from "../Basic/Entity";
import { Weapon } from "../Basic/Weapon";

export class Hero extends MovableEntity implements Asset {
  public asset = require("../../resources/images/tile-P.png");
  // будет управление и  (?) инвентарь
  public buffs: Buff[];
  public weapon: Weapon | null;

  constructor() {
    super();
    this.size = {
      width: 1,
      height: 1,
    };
  }
}

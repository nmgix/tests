import { Game } from "./Game";
import { ToolsController } from "../Controllers/ToolsController";
import { Hero } from "../Entities/Hero";

export class Weapon extends ToolsController {
  public damage: number = 20;

  constructor(game: Game) {
    super(game);
    this.type = "sword";
  }

  pickWeapon: (owner: Hero) => void = (owner) => {
    owner.weapon = this;
  };
  deleteWeapon: (owner: Hero) => void = (owner) => {
    owner.weapon = null;
  };
}

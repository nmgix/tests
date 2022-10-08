import { Entity } from "./Entity";
import { Hero } from "../Entities/Hero";
import { Game } from "./Game";

export class Weapon extends Entity {
  public damage: number = 20;

  constructor(game: Game) {
    super(game);
    this.type = "sword";
  }

  pickWeapon: (owner: Hero) => void = (owner) => {
    owner.weapon = this;
  };
  deleteWeapon: (owner: Hero) => void = (owner) => {
    // будет использоваться в паре с destroyEntity
    owner.weapon = null;
  };
}

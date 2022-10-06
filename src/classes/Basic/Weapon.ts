import { Entity } from "./Entity";
import { Hero } from "../Entities/Hero";

export class Weapon extends Entity {
  constructor() {
    super();
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

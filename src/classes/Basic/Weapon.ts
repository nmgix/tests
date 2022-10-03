import { Entity } from "./Entity";
import { Asset } from "./Asset";
import { Hero } from "../Entities/Hero";

export class Weapon extends Entity implements Asset {
  public asset: string = require("../../resources/images/tile-SW.png");
  constructor() {
    super();
  }

  pickWeapon: (owner: Hero) => void = (owner) => {
    owner.weapon = this;
  };
  deleteWeapon: (owner: Hero) => void = (owner) => {
    // будет использоваться в паре с destroyEntity
    owner.weapon = null;
  };
}

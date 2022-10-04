import { BuffsEnum, BuffType } from "../../types/gameTypes";
import { Hero } from "../Entities/Hero";
import { Entity } from "./Entity";

export class Buff extends Entity {
  public characteristics: BuffType;

  constructor(type: keyof typeof BuffsEnum) {
    super();
    this.characteristics = {
      buff: type,
      name: BuffsEnum[type],
    };
  }

  pickBuff: (owner: Hero) => void = (owner) => {
    owner.buffs.push(this);
  };
  deleteBuff: (owner: Hero) => void = (owner) => {
    // будет использоваться в паре с destroyEntity
    owner.buffs.filter((buff) => buff.uuid !== this.uuid);
  };
}

// export interface Buff extends Entity, Asset {}

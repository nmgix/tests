import { BuffsEnum, BuffType } from "../../types/gameTypes";
import { Hero } from "../Entities/Hero";
import { Entity } from "./Entity";
import { Game } from "./Game";

export class Buff extends Entity {
  public characteristics: BuffType;

  constructor(type: keyof typeof BuffsEnum, game: Game) {
    super(game);
    this.characteristics = {
      buff: type,
      name: BuffsEnum[type],
    };
    this.type = "heal";
  }

  pickBuff: (owner: Hero) => void = (owner) => {
    owner.buffs.push(this);
  };
  deleteBuff: (owner: Hero) => void = (owner) => {
    // будет использоваться в паре с destroyEntity
    owner.buffs.filter((buff) => buff.uuid !== this.uuid);
  };
}

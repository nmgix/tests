import { MovableCollideExceptions } from "../../types/checkExceptions";
import { CharacterController } from "../Controllers/CharacterController";
import { Hero } from "../Entities/Hero";
import { Entity } from "./Entity";
import { Game } from "./Game";

export class Buff extends Entity {
  // public characteristics: BuffType;

  constructor(
    // type: keyof typeof BuffsEnum,
    game: Game
  ) {
    super(game);
    // this.characteristics = {
    //   buff: type,
    //   name: BuffsEnum[type],
    // };
    this.type = "heal";

    this.onUpdateEntityLogic.push(() => {
      const intersectingCharacter = this.game.entities.find(
        (entity) =>
          entity.type in MovableCollideExceptions &&
          (entity as CharacterController).healthController.health.current <
            (entity as CharacterController).healthController.health.max &&
          entity.position.x === this.position.x &&
          entity.position.y === this.position.y
      ) as Hero;

      if (intersectingCharacter && intersectingCharacter.type === "hero") {
        (intersectingCharacter as Hero).buffs.push(this);
        this.destroyEntity();
      }
    });
  }

  pickBuff: (owner: Hero) => void = (owner) => {
    owner.buffs.push(this);
  };
  deleteBuff: (owner: Hero) => void = (owner) => {
    // будет использоваться в паре с destroyEntity
    owner.buffs.filter((buff) => buff.uuid !== this.uuid);
  };
}

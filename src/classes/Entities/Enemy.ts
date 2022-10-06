import { MovableEntity } from "../Basic/Entity";
import { Game } from "../Basic/Game";

export class Enemy extends MovableEntity {
  constructor(game: Game) {
    super(game);
    this.size = {
      width: 1,
      height: 1,
    };
    this.type = "enemy";
  }
}

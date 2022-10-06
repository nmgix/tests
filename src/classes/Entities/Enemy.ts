import { MovableEntity } from "../Basic/Entity";

export class Enemy extends MovableEntity {
  constructor() {
    super();
    this.size = {
      width: 1,
      height: 1,
    };
    this.type = "enemy";
  }
}

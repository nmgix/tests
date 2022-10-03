import { Asset } from "../Basic/Asset";
import { MovableEntity } from "../Basic/Entity";

export class Enemy extends MovableEntity implements Asset {
  public asset = require("../../resources/images/tile-E.png");
  constructor() {
    super();
    this.size = {
      width: 1,
      height: 1,
    };
  }
}

import { BuffsStats } from "../../types/tool";
import { ToolsController } from "../Controllers/ToolsController";
import { Hero } from "../Entities/Hero";
import { Game } from "./Game";

export class Buff extends ToolsController {
  constructor(game: Game) {
    super(game);

    this.type = "heal";
  }

  useBuff: (owner: Hero) => void = (owner) => {
    switch (this.type) {
      case "heal": {
        owner.healthController.heal(BuffsStats[this.type]);
        // this.invokeLogic("onUpdateEntityLogic", true);
      }
    }
  };
}

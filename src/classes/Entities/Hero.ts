import { BuffsStats, ToolsCollideExceptions } from "../../types/tool";
import { Buff } from "../Basic/Buff";
import { Game } from "../Basic/Game";
import { Weapon } from "../Basic/Weapon";
import { CharacterController } from "../Controllers/CharacterController";
import { PlayerController } from "../Controllers/PlayerController";
import { ToolsController } from "../Controllers/ToolsController";
import { InventoryController } from "../Controllers/InventoryController";

export class Hero extends CharacterController {
  public playerController: PlayerController;
  public buffs: Buff[] = [];
  public inventoryController: InventoryController = new InventoryController(this);

  constructor(game: Game) {
    super(game);
    this.size = {
      width: 1,
      height: 1,
    };
    this.type = "hero";
    this.playerController = new PlayerController(game);

    this.onUpdateEntityLogic.push((once?: boolean) => {
      if (this.buffs.length > 0) {
        this.buffs = this.buffs.filter((buff) => {
          if (buff.type === "heal") {
            if (typeof once !== "boolean" || (typeof once === "boolean" && !once)) {
              this.healthController.heal(BuffsStats[buff.type]);
              this.invokeLogic("onUpdateEntityLogic", true);
            }
            return false;
          } else {
            return true;
          }
        });
      }
    });

    this.onUpdateEntityLogic.push(() => {
      const intersectingTool = this.game.entities.find(
        (entity) =>
          entity.type in ToolsCollideExceptions &&
          entity.position.x === this.position.x &&
          entity.position.y === this.position.y
      ) as ToolsController;

      if (intersectingTool) {
        intersectingTool.pickTool(this);
        intersectingTool.destroyEntity();
      }
    });
  }

  useTool: (inventorySlot: number) => void = (inventorySlot) => {
    let currentTool = this.inventoryController.inventory[inventorySlot];
    this.inventoryController.removeItem(currentTool);

    switch (currentTool.type) {
      case "heal": {
        this.healthController.heal(BuffsStats[currentTool.type]);
        break;
      }
      case "sword": {
        this.weapon = currentTool as Weapon;
        break;
      }
    }
    this.invokeLogic("onUpdateEntityLogic");
  };
}

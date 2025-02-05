import { Entity } from "../Basic/Entity";
import { Hero } from "../Entities/Hero";
export class ToolsController extends Entity {
  pickTool = (owner: Hero) => {
    owner.inventoryController.addItem(this);
    this.game.entities = this.game.entities.filter((entity) => entity.uuid !== this.uuid);
    owner.invokeLogic("onUpdateEntityLogic");
  };

  dropTool = (owner: Hero) => {
    owner.inventoryController.removeItem(this);
    this.game.entities.push(this);
    owner.invokeLogic("onUpdateEntityLogic");
  };
}

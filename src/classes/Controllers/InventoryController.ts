import { Hero } from "../Entities/Hero";
import { ToolsController } from "./ToolsController";
import { createTile } from "../../helpers/createTile";
export class InventoryController {
  public inventory: ToolsController[] = [];
  public hero: Hero;

  constructor(hero: Hero) {
    this.hero = hero;

    this.hero.onUpdateEntityLogic.push(() => {
      let idk = this.hero.tileDiv.querySelectorAll(".inventory-wrapper");
      idk.forEach((node) => this.hero.tileDiv.removeChild(node));

      const inventoryWrapper = document.createElement("div");
      inventoryWrapper.classList.add("inventory-wrapper");

      const inventory = document.createElement("ul");
      inventory.classList.add("inventory");

      this.inventory.forEach((item, index) => {
        // console.log(item);
        // console.log(index);
        createTile(inventory, 0, index, item.type, true, "li");
      });

      inventoryWrapper.appendChild(inventory);
      this.hero.tileDiv.appendChild(inventoryWrapper);
    });
  }

  addItem = (item: ToolsController) => {
    this.inventory.push(item);
  };

  removeItem = (item: ToolsController) => {
    this.inventory = this.inventory.filter((invItem) => invItem.uuid !== item.uuid);
  };
}

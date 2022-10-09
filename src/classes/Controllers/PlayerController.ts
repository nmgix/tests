import { Hero } from "../Entities/Hero";
import { Game } from "../Basic/Game";
import { Buff } from "../Basic/Buff";
import { Weapon } from "../Basic/Weapon";

export class PlayerController {
  public game: Game;
  private hero: Hero;

  constructor(game: Game) {
    this.game = game;
    this.hero = game.entities.find((entity) => entity.type === "hero") as Hero;

    document.addEventListener("keydown", this.handleControlMovement);

    this.hero.onDestroyEntityLogic.push(() => {
      if (this.hero.healthController.health.current <= 0) {
        document.removeEventListener("keydown", this.handleControlMovement);
      }
    });

    this.hero.onDestroyEntityLogic.push(() => {
      if (confirm("Игра окончена, вас убили")) {
        this.game.initGame();
      }
    });
  }

  handleControlMovement = (e: KeyboardEvent) => {
    if (e.repeat) {
      return;
    }

    switch (e.code) {
      case "KeyW": {
        let succeeded = this.hero.move("y-");
        if (succeeded) {
          this.game.renderEntities();
        }
        break;
      }
      case "KeyS": {
        let succeeded = this.hero.move("y+");
        if (succeeded) {
          this.game.renderEntities();
        }
        break;
      }
      case "KeyA": {
        let succeeded = this.hero.move("x-");
        if (succeeded) {
          this.game.renderEntities();
        }
        break;
      }
      case "KeyD": {
        let succeeded = this.hero.move("x+");
        if (succeeded) {
          this.game.renderEntities();
        }
        break;
      }

      case "Space": {
        this.hero.attack("enemy");
        this.game.renderEntities();
        break;
      }

      case "Digit1":
      case "Digit2":
      case "Digit3":
      case "Digit4":
      case "Digit5":
      case "Digit6":
      case "Digit7":
      case "Digit8":
      case "Digit9":
      case "Digit0": {
        this.hero.useTool(e.code === "Digit0" ? 9 : Number(e.code.replace("Digit", "")) - 1);
        break;
      }

      default: {
        break;
      }
    }
  };
}

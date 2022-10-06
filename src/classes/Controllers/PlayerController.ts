import { Hero } from "../Entities/Hero";
import { Game } from "../Basic/Game";

export class PlayerController {
  private hero: Hero;

  constructor(game: Game) {
    document.addEventListener("keydown", (e) => this.handleControlMovement(e as KeyboardEvent));

    this.hero = game.entities.find((entity) => entity.type === "hero") as Hero;
  }

  handleControlMovement = (e: KeyboardEvent) => {
    if (e.repeat) {
      return;
    }

    switch (e.code) {
      case "KeyW": {
        this.hero.move("y-");
        break;
      }
      case "KeyS": {
        this.hero.move("y+");
        break;
      }
      case "KeyA": {
        this.hero.move("x-");
        break;
      }
      case "KeyD": {
        this.hero.move("x+");
        break;
      }

      default: {
        break;
      }
    }
  };
}

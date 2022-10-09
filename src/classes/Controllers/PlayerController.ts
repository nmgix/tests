import { Hero } from "../Entities/Hero";
import { Game } from "../Basic/Game";

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
      }

      default: {
        break;
      }
    }
  };
}

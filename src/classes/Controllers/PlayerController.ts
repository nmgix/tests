import { Hero } from "../Entities/Hero";
import { Game } from "../Basic/Game";

export class PlayerController {
  private hero: Hero;
  private game: Game;

  constructor(game: Game) {
    this.game = game;

    document.addEventListener("keydown", (e) => this.handleControlMovement(e as KeyboardEvent));

    this.hero = game.entities.find((entity) => entity.type === "hero") as Hero;
  }

  handleControlMovement = (e: KeyboardEvent) => {
    if (e.repeat) {
      return;
    }

    const updateScene = () => {
      this.game.entities = this.game.entities.map((entity) => {
        if (entity.uuid === this.hero.uuid) {
          entity = this.hero;
        }
        return entity;
      });
      this.game.renderEntities();
    };

    switch (e.code) {
      case "KeyW": {
        let succeeded = this.hero.move("y-");
        if (succeeded) {
          updateScene();
        }
        break;
      }
      case "KeyS": {
        let succeeded = this.hero.move("y+");
        if (succeeded) {
          updateScene();
        }
        break;
      }
      case "KeyA": {
        let succeeded = this.hero.move("x-");
        if (succeeded) {
          updateScene();
        }
        break;
      }
      case "KeyD": {
        let succeeded = this.hero.move("x+");
        if (succeeded) {
          updateScene();
        }
        break;
      }

      default: {
        break;
      }
    }
  };
}

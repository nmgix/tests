import { Hero } from "../Entities/Hero";
import { Game } from "../Basic/Game";
import { Enemy } from "../Entities/Enemy";

export class PlayerController {
  public game: Game;
  private hero: Hero;

  constructor(game: Game) {
    this.game = game;
    this.hero = game.entities.find((entity) => entity.type === "hero") as Hero;

    document.addEventListener("keydown", (e) => this.handleControlMovement(e as KeyboardEvent));
  }

  handleControlMovement = (e: KeyboardEvent) => {
    if (e.repeat) {
      return;
    }

    // const updateScene = () => {
    //   // this.game.entities = this.game.entities.map((entity) => {
    //   //   if (entity.uuid === this.hero.uuid) {
    //   //     entity = this.hero;
    //   //   }
    //   //   return entity;
    //   // });
    //   this.game.renderEntities();
    // };

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

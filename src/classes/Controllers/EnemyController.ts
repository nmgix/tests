import { Enemy } from "../Entities/Enemy";

export class EnemyController {
  constructor(public enemy: Enemy) {}

  randomMove = () => {
    if (Math.random() <= 0.5) {
      return;
    } else {
      let directions: string[] = [];
      let hero = this.enemy.game.entities.find((entity) => entity.type === "hero");

      if (hero!.position.x + 1 === this.enemy.position.x && hero!.position.y + 1 === this.enemy.position.y) {
        directions = ["x-", "y-"];
      } else if (hero!.position.x - 1 === this.enemy.position.x && hero!.position.y + 1 === this.enemy.position.y) {
        directions = ["x+", "y-"];
      } else if (hero!.position.x + 1 === this.enemy.position.x && hero!.position.y - 1 === this.enemy.position.y) {
        directions = ["x+", "y-"];
      } else if (hero!.position.x - 1 === this.enemy.position.x && hero!.position.y - 1 === this.enemy.position.y) {
        directions = ["x-", "y-"];
      } else if (hero!.position.x + 2 === this.enemy.position.x || hero!.position.x + 1 === this.enemy.position.x) {
        directions = ["x+", "y+", "y-"];
      } else if (hero!.position.x - 2 === this.enemy.position.x || hero!.position.x - 1 === this.enemy.position.x) {
        directions = ["x-", "y+", "y-"];
      } else if (hero!.position.y + 2 === this.enemy.position.y || hero!.position.y + 1 === this.enemy.position.y) {
        directions = ["x+", "x-", "y+"];
      } else if (hero!.position.y - 2 === this.enemy.position.y || hero!.position.y - 1 === this.enemy.position.y) {
        directions = ["x+", "x-", "y-"];
      } else {
        directions = ["x+", "x-", "y+", "y-"];
      }
      let direction = directions[Math.floor(Math.random() * directions.length)];
      this.enemy.move(direction);
    }
  };
}

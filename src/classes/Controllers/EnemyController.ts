import { Enemy } from "../Entities/Enemy";

export class EnemyController {
  constructor(public enemy: Enemy) {}

  randomMove = () => {
    if (Math.random() <= 0.5) {
      return;
    } else {
      let directions: string[] = [];
      let hero = this.enemy.game.entities.find((entity) => entity.type === "hero");

      // герой в левой верхней клетке от врага
      if (hero!.position.x + 1 === this.enemy.position.x && hero!.position.y + 1 === this.enemy.position.y) {
        directions = ["x-", "y-"];
      }

      // герой в правой верхней клетке от врага
      else if (hero!.position.x - 1 === this.enemy.position.x && hero!.position.y + 1 === this.enemy.position.y) {
        directions = ["x+", "y-"];
      }

      // герой в левой нижней клетке от врага
      if (hero!.position.x + 1 === this.enemy.position.x && hero!.position.y - 1 === this.enemy.position.y) {
        directions = ["x+", "y-"];
      }

      // герой в правой нижней клетке от врага
      else if (hero!.position.x - 1 === this.enemy.position.x && hero!.position.y - 1 === this.enemy.position.y) {
        directions = ["x-", "y-"];
      }

      // если герой слева от врага меньше чем на 3 клетки
      else if (hero!.position.x + 2 === this.enemy.position.x || hero!.position.x + 1 === this.enemy.position.x) {
        directions = ["x+", "y+", "y-"];
      } else if (
        // если герой справа от врага меньше чем на 3 клетки
        hero!.position.x - 2 === this.enemy.position.x ||
        hero!.position.x - 1 === this.enemy.position.x
      ) {
        directions = ["x-", "y+", "y-"];
        // если герой сверху над врага меньше чем на 3 клетки
      } else if (hero!.position.y + 2 === this.enemy.position.y || hero!.position.y + 1 === this.enemy.position.y) {
        directions = ["x+", "x-", "y+"];
        // если герой снизу под врага меньше чем на 3 клетки
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

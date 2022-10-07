import { Enemy } from "../Entities/Enemy";

export class EnemyController {
  constructor(public enemy: Enemy) {}

  randomMove = () => {
    if (Math.random() <= 0.5) {
      return;
    } else {
      let directions: string[] = [];
      let closestHero = this.enemy.game.entities.find((entity) => entity.type === "hero");

      // герой в левой верхней клетке от врага
      if (
        closestHero!.position.x + 1 === this.enemy.position.x &&
        closestHero!.position.y + 1 === this.enemy.position.y
      ) {
        directions = ["x-", "y-"];
      }

      // герой в правой верхней клетке от врага
      else if (
        closestHero!.position.x - 1 === this.enemy.position.x &&
        closestHero!.position.y + 1 === this.enemy.position.y
      ) {
        directions = ["x+", "y-"];
      }

      // герой в левой нижней клетке от врага
      if (
        closestHero!.position.x + 1 === this.enemy.position.x &&
        closestHero!.position.y - 1 === this.enemy.position.y
      ) {
        directions = ["x+", "y-"];
      }

      // герой в правой нижней клетке от врага
      else if (
        closestHero!.position.x - 1 === this.enemy.position.x &&
        closestHero!.position.y - 1 === this.enemy.position.y
      ) {
        directions = ["x-", "y-"];
      }

      // если герой слева от врага меньше чем на 3 клетки
      else if (
        closestHero!.position.x + 2 === this.enemy.position.x ||
        closestHero!.position.x + 1 === this.enemy.position.x
      ) {
        directions = ["x+", "y+", "y-"];
      } else if (
        // если герой справа от врага меньше чем на 3 клетки
        closestHero!.position.x - 2 === this.enemy.position.x ||
        closestHero!.position.x - 1 === this.enemy.position.x
      ) {
        directions = ["x-", "y+", "y-"];
        // если герой сверху над врага меньше чем на 3 клетки
      } else if (
        closestHero!.position.y + 2 === this.enemy.position.y ||
        closestHero!.position.y + 1 === this.enemy.position.y
      ) {
        directions = ["x+", "x-", "y+"];
        // если герой снизу под врага меньше чем на 3 клетки
      } else if (
        closestHero!.position.y - 2 === this.enemy.position.y ||
        closestHero!.position.y - 1 === this.enemy.position.y
      ) {
        directions = ["x+", "x-", "y-"];
      } else {
        directions = ["x+", "x-", "y+", "y-"];
      }
      let direction = directions[Math.floor(Math.random() * directions.length)];
      this.enemy.move(direction);
    }
  };
}

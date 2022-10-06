import { Enemy } from "../Entities/Enemy";

export class EnemyController {
  constructor(public enemy: Enemy) {}

  randomMove = () => {
    // тут проверка что герой находится по вертикали или горизонтали к врагу ближе чем или равно 2 блока, если горизонталь или вертикаль,
    // то эта ось по направлению к персонажу удалляется из directions
    // это нужно для того, чтобы персонажи друг в друга не влетали

    // у них одианковая логика передвижения (героя и врагов) и они в момент рендера не могут просчитать что идут на одну и ту-же координату

    // к тому-же надо добавить шанс что враг будет стоять на месте (у них же нет шила в одном месте?)

    let directions = ["x+", "x-", "y+", "y-"];
    let direction = directions[Math.floor(Math.random() * directions.length)];
    this.enemy.move(direction);
  };
}

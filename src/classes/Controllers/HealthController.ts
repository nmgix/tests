import { Entity } from "../Basic/Entity";
export class HealthController {
  public health: {
    max: number;
    min: number;
    current: number;
  };

  constructor(character: Entity) {
    character.entityLogic.push(() => {
      // создание position absolute двух дивов, с красными хп как z index 9 и с зелёными как z index 10
    });
  }

  damage = (health: number) => {
    this.health.current = this.health.current - health;
  };

  heal = (health: number) => {
    this.health.current = this.health.current + health;
  };
}

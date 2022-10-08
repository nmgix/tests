import { Entity } from "../Basic/Entity";
export class HealthController {
  public health: {
    max: number;
    min: number;
    current: number;
  };

  constructor(character: Entity) {
    this.health = {
      min: 0,
      max: 100,
      current: 100,
    };

    character.entityLogic.push((tile: HTMLDivElement) => {
      const healtWrapper = document.createElement("div");
      healtWrapper.classList.add("health-wrapper");

      const healthBackbar = document.createElement("div");
      healthBackbar.classList.add("health-backbar");

      const healthFrontbar = document.createElement("div");
      healthFrontbar.classList.add("health-frontbar");
      healthFrontbar.style.width = `${(this.health.current * this.health.max) / 100}%`;

      healtWrapper.appendChild(healthBackbar);
      healtWrapper.appendChild(healthFrontbar);

      tile.appendChild(healtWrapper);
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

class Entity {
  constructor(tiles: Tile[]) {}

  position: {
    x: number;
    y: number;
  };

  generatePosition: () => {
    // тут будет проверка свободен ли тайл
  };
}

class MovableEntity extends Entity {
  move: () => {
    // тут будет проверка свободен ли тайл
  };
}

class Buff {
  name: string;
  buff: string;
}

class Hero extends MovableEntity {
  // будет управление и  (?) инвентарь
  buffs: Buff[];
}
class Enemy extends MovableEntity {}

type TileType = "floor" | "wall";
class Tile {
  constructor(tileType: TileType) {
    this.type = tileType;
    switch (tileType) {
      case "floor": {
        this.asset = require("./resources/images/tile-.png");
      }
      case "wall": {
        this.asset = require("./resources/images/tile-W.png");
      }
    }
  }

  type: TileType;
  asset: string;
}

class MapNode extends Entity {
  constructor(tiles: Tile[]) {
    super(tiles);
  }
}

class Game {
  constructor() {
    console.log("игра началась");
  }

  mapGraph: MapNode[];
  //   map: Tile[];

  generateMap: () => {
    // здесь будет построение графа карты
  };
  generateRooms: () => {
    // здесь будет создаваться сама комната, здесь будет логика рандомизации размера и проверки не пересекается ли
  };
  generatePaths: () => {
    // здесь будет постройка пути и проверка не пересекается ли он, но тут пока сомнения
  };

  renderGame: () => {
    // эта функция будет вызываться на каждом ходу чтобы двигать все объекты (врагов, например)
  };
}

const game = new Game();

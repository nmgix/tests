import { EntityPosition, MapNodeSize, MapArrayTile, Directions } from "../../types/gameTypes";
import { v4 as uuid } from "uuid";
import { Game } from "./Game";
import { Tiles } from "../../helpers/createTile";

enum CollideExceptions {
  buff = "buff",
  weapon = "weapon",
}

export class Entity {
  public uuid: string;
  public size: MapNodeSize;
  public position: EntityPosition;
  public type: keyof typeof Tiles;

  public game: Game;

  public entityLogic: ((args?: any) => any | void)[] = [];

  constructor(game: Game, randomlyCreate: boolean = true) {
    this.uuid = uuid();
    this.game = game;
    if (randomlyCreate) {
      this.createEntity();
    }
  }

  createEntity: () => void = () => {
    let availableMapTiles = this.game.mapArray
      .map((line) => {
        let result = line.filter((tile) => tile.type === "floor");
        return result;
      })
      .filter((arr) => arr.length > 0);

    const findEmptyTile = (): MapArrayTile => {
      let randomTileArray: MapArrayTile[] = availableMapTiles[Math.floor(Math.random() * availableMapTiles.length)];
      let randomTile: MapArrayTile = randomTileArray[Math.floor(Math.random() * randomTileArray.length)];

      if (this.type in CollideExceptions) {
        return randomTile;
      } else {
        let occupiedEntityTiles = this.game.entities.filter((entity) => {
          if (entity.type in CollideExceptions) {
            return false;
          } else {
            return entity.position.x === randomTile.coordinates.x && entity.position.y === randomTile.coordinates.y;
          }
        });

        if (occupiedEntityTiles.length > 0) {
          return findEmptyTile();
        } else {
          return randomTile;
        }
      }
    };
    let randomTile = findEmptyTile();

    this.position = {
      x: randomTile.coordinates.x,
      y: randomTile.coordinates.y,
    };

    this.game.entities.push(this);
  };
  destroyEntity: () => void = () => {
    // console.log("destroying!");
    this.game.entities = this.game.entities.filter((entity) => entity.uuid !== this.uuid);
  };

  invokeLogic = (args?: any) => {
    for (let i = 0; i < this.entityLogic.length; i++) {
      this.entityLogic[i](args);
    }
  };
}

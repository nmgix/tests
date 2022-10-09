import { v4 as uuid } from "uuid";
import { ToolsCollideExceptions } from "../../types/tool";
import { EntityPosition, EnitityTiles } from "../../types/entity";
import { MapNodeSize, MapArrayTile } from "../../types/map";
import { Game } from "./Game";

export class Entity {
  public uuid: string;
  public size: MapNodeSize;
  public position: EntityPosition;
  public type: keyof typeof EnitityTiles;

  public game: Game;

  public onUpdateEntityLogic: ((args?: any) => any | void)[] = [];
  public onDestroyEntityLogic: ((args?: any) => any | void)[] = [];

  public tileDiv: HTMLDivElement;

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

      if (this.type in ToolsCollideExceptions) {
        return randomTile;
      } else {
        let occupiedEntityTiles = this.game.entities.filter((entity) => {
          if (entity.type in ToolsCollideExceptions) {
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
    this.game.entities = this.game.entities.filter((entity) => entity.uuid !== this.uuid);
  };

  invokeLogic = (cycle: "onUpdateEntityLogic" | "onDestroyEntityLogic", args?: any) => {
    for (let i = 0; i < this[cycle].length; i++) {
      this[cycle][i](args);
    }
  };
}

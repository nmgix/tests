import { Entity } from "../classes/Basic/Entity";
import { Buff } from "../classes/Basic/Buff";
import { Enemy } from "../classes/Entities/Enemy";
import { Hero } from "../classes/Entities/Hero";
import { Weapon } from "../classes/Basic/Weapon";

export type EntityPosition = {
  x: number;
  y: number;
};

export type EntityUnion = Entity | Buff | Enemy | Hero | Weapon;

export enum EnitityTiles {
  floor = "tile",
  wall = "tileW",
  enemy = "tileE",
  hero = "tileP",
  heal = "tileHP",
  sword = "tileSW",
}

export enum MovableCollideExceptions {
  hero,
  enemy,
}

import {
  AnimatedSprite,
  Application,
  DisplayObject,
  Resource,
  Sprite,
  Texture,
} from "pixi.js";
import { Enemy } from "./Enemy";
import { GameMap } from "./GameMap";
import { Item } from "./Item";

export type Direction = "left" | "right" | "top" | "down" | "stop";
export type Action = "shoot";

class Bullet extends Sprite {
  target?: DisplayObject = undefined;
  speed: number = 5000;
}

export class Player extends AnimatedSprite {
  item: Item;
  moveSpeed: number = 3; // pixel per frame
  app: Application;
  map: GameMap;
  currentDirection: Direction = "left";
  time: number = 0;
  bullets: Bullet[] = [];
  shootingInterval = 3000;
  enemies: Enemy[] = [];

  constructor(
    map: GameMap,
    app: Application,
    textures: Texture<Resource>[],
    enemies: Enemy[]
  ) {
    super(textures);

    this.map = map;
    this.app = app;

    this.anchor.set(0.5);

    this.width = 80;
    this.height = 75;

    this.item = new Item(this);
    this.enemies = enemies;
    this.x = 0;
    this.y = 0;
  }

  flipVertical = () => {
    this.scale.x *= -1;
  };

  shootAtEnemy = (delta: number) => {
    this.time += delta;

    if (Math.floor(this.time) >= this.shootingInterval) {
      // TODO get nearest enemy
      const enemy = this.enemies[0]!;
      this.time = 0;
      // new bullet
      console.log("shoot");

      const bullet = Bullet.from("ground_1.png") as Bullet;
      bullet.target = enemy;
      bullet.width = 30;
      bullet.height = 5;
      bullet.position = this.position;
      this.bullets.push(bullet);
      this.map.addChild(bullet);
    }
  };

  update = (delta: number) => {
    this.shootAtEnemy(delta);
    this.bullets.forEach((bullet, i) => {
      //   if (bullet.x === bullet.target!.x && bullet.y === bullet.target!.y) {
      //     this.destroy();
      //     this.bullets.splice(i, 1);
      //     console.log("target reached");
      //   }
      const dx = bullet.x - bullet.target!.x;
      console.log("dx: ", dx);
      const dy = bullet.y - bullet.target!.y;
      const angle = Math.atan2(dy, dx);

      // TODO: Why is that 0??
      bullet.x += Math.cos(angle) * bullet.speed;
      bullet.y += Math.sin(angle) * bullet.speed;
    });
  };

  move = (direction: Direction, delta: number) => {
    // actually move the map in opposite direction
    // this.map.moveMap(direction, this.moveSpeed, delta);

    switch (direction) {
      case "down":
        this.play();
        this.y += this.moveSpeed;
        this.map.pivot.y = this.y;
        // this.y += this.moveSpeed * delta;
        break;
      case "left":
        this.play();
        this.x -= this.moveSpeed;
        this.map.pivot.x = this.x;
        // this.x -= this.moveSpeed * delta;
        if (this.currentDirection !== "left") {
          this.flipVertical();
          this.currentDirection = "left";
        }
        break;
      case "right":
        this.play();
        // this.x += this.moveSpeed * delta;
        this.x += this.moveSpeed;
        this.map.pivot.x = this.x;
        if (this.currentDirection !== "right") {
          this.flipVertical();
          this.currentDirection = "right";
        }

        break;
      case "top":
        this.play();
        this.y -= this.moveSpeed;
        this.map.pivot.y = this.y;
        // this.y -= this.moveSpeed * delta;
        break;
      case "stop":
        this.stop();
        break;
    }
  };
}

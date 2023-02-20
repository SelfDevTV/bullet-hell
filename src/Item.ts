import { Graphics, Rectangle } from "pixi.js";
import { Enemy } from "./Enemy";
import { Player } from "./Player";

export class Item {
  damage: number = 1;
  shootingInterval: number = 2000; // every 2 seoncds
  bulletSpeed: number = 500; // 500 pixels per seconds
  weapon: Graphics;
  player: Player;

  constructor(player: Player) {
    this.player = player;
    this.weapon = new Graphics();
    this.weapon.beginFill(0xffff00);
    this.weapon.lineStyle(5, 0xff0000);
    this.weapon.drawRect(0, 0, 50, 10);
  }

  shootAt = (enemy: Enemy) => {
    console.log("shoot");
    // TODO: Shoot at enemy

    const dx = this.weapon.x - enemy.x;
    const dy = this.weapon.y - enemy.y;
    const angle = Math.atan2(dy, dx);

    this.weapon.x += Math.cos(angle) * -this.bulletSpeed;
    this.weapon.y += Math.sin(angle) * -this.bulletSpeed;
  };
}

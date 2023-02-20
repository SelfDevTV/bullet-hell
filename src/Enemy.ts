import { AnimatedSprite, DisplayObject, Texture, Resource } from "pixi.js";

export class Enemy extends AnimatedSprite {
  target: DisplayObject = this;
  moveSpeed: number = 1;
  hitpoints: number = 100;
  isDead: boolean = false;

  constructor(textures: Texture<Resource>[]) {
    super(textures);

    this.anchor.set(0.5);

    this.width = 180;
    this.height = 130;
  }

  // spawn on rando position
  spawn = () => {
    // spawn outside of camera
  };

  // defaults to player
  moveTowards = (obj: DisplayObject) => {
    this.target = obj;
    this.play();
  };

  //   { player x = 5, y = 10}

  //   { enemy x = 2, y = 10}

  update = () => {
    const dx = this.x - this.target.x;
    const dy = this.y - this.target.y;
    const angle = Math.atan2(dy, dx);

    this.x += Math.cos(angle) * -this.moveSpeed;
    this.y += Math.sin(angle) * -this.moveSpeed;
  };
}

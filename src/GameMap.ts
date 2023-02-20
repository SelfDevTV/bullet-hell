import { Application, Container, DisplayObject, Point, Sprite } from "pixi.js";

export class GameMap extends Container {
  app: Application;
  textures: string[] = ["ground_1.png", "ground_2.png"];
  worldWidth: number;
  worldHeight: number;

  tileSize: number = 100; // 10 x 10 pixel per tile

  constructor(app: Application) {
    super();
    this.app = app;
    this.worldWidth = 1000;
    this.worldHeight = 1000;
    this.x = app.screen.width / 2;
    this.y = app.screen.height / 2;

    this.pivot.x = this.width / 2;
    this.pivot.y = this.height / 2;

    this.drawMap();
  }

  draw = () => {
    this.app.stage.addChild(this);
  };

  addToGameWorld = (obj: DisplayObject, point?: Point) => {
    obj.position = point || obj.position;
    this.addChild(obj);
  };

  drawMap = () => {
    const tilesX = Math.round(this.worldWidth / this.tileSize);

    const tilesY = Math.round(this.worldHeight / this.tileSize);

    const map = new Container();

    for (let i = 0; i < tilesX * 5; i++) {
      for (let j = 0; j < tilesY * 5; j++) {
        const randomIndex = Math.round(
          Math.random() * (this.textures.length - 1)
        );

        const tile = Sprite.from(this.textures[randomIndex]);
        tile.width = this.tileSize;
        tile.height = this.tileSize;

        tile.x = i * this.tileSize;
        tile.y = j * this.tileSize;

        map.addChild(tile);
      }
    }
    map.pivot.x = this.x;
    map.pivot.y = this.y;

    this.addChild(map);
  };
}

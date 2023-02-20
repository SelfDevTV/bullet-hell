import { Application, Ticker, Texture, DisplayObject } from "pixi.js";
import { Enemy } from "./Enemy";
import { GameMap } from "./GameMap";
import { Keyboard } from "./Keyboard";
import { Player } from "./Player";

export class GameManager {
  gameMap: GameMap;
  player: Player;
  enemies: Enemy[] = [];
  app: Application;
  ticker?: Ticker;
  entities: DisplayObject[] = [];

  playerImages: string[] = [
    "player/2_animation_walk_000.png",
    "player/2_animation_walk_001.png",
    "player/2_animation_walk_002.png",
    "player/2_animation_walk_003.png",
    "player/2_animation_walk_004.png",
    "player/2_animation_walk_005.png",
    "player/2_animation_walk_006.png",
    "player/2_animation_walk_007.png",
    "player/2_animation_walk_008.png",
    "player/2_animation_walk_009.png",
    "player/2_animation_walk_010.png",
    "player/2_animation_walk_011.png",
    "player/2_animation_walk_012.png",
    "player/2_animation_walk_013.png",
    "player/2_animation_walk_014.png",
    "player/2_animation_walk_015.png",
    "player/2_animation_walk_016.png",
    "player/2_animation_walk_017.png",
    "player/2_animation_walk_018.png",
    "player/2_animation_walk_019.png",
  ];

  enemyImages: string[] = [
    "enemies/enemy_horse_001/7_animation_walk_000.png",
    "enemies/enemy_horse_001/7_animation_walk_001.png",
    "enemies/enemy_horse_001/7_animation_walk_002.png",
    "enemies/enemy_horse_001/7_animation_walk_003.png",
    "enemies/enemy_horse_001/7_animation_walk_004.png",
    "enemies/enemy_horse_001/7_animation_walk_005.png",
    "enemies/enemy_horse_001/7_animation_walk_006.png",
    "enemies/enemy_horse_001/7_animation_walk_007.png",
    "enemies/enemy_horse_001/7_animation_walk_008.png",
    "enemies/enemy_horse_001/7_animation_walk_009.png",
    "enemies/enemy_horse_001/7_animation_walk_010.png",
    "enemies/enemy_horse_001/7_animation_walk_011.png",
    "enemies/enemy_horse_001/7_animation_walk_012.png",
    "enemies/enemy_horse_001/7_animation_walk_013.png",
    "enemies/enemy_horse_001/7_animation_walk_014.png",
    "enemies/enemy_horse_001/7_animation_walk_015.png",
    "enemies/enemy_horse_001/7_animation_walk_016.png",
    "enemies/enemy_horse_001/7_animation_walk_017.png",
    "enemies/enemy_horse_001/7_animation_walk_018.png",
    "enemies/enemy_horse_001/7_animation_walk_019.png",
  ];

  constructor(app: Application) {
    Keyboard.init();

    this.app = app;

    this.gameMap = new GameMap(this.app);

    const playerTextures = [];
    for (let i = 0; i < this.playerImages.length; i++) {
      const texture = Texture.from(this.playerImages[i]);
      playerTextures.push(texture);
    }

    this.gameMap.draw();
    this.player = new Player(
      this.gameMap,
      this.app,
      playerTextures,
      this.enemies
    );
    this.gameMap.addChild(this.player);
    this.gameMap.addChild(this.player.item.weapon);
    this.spawnEnemy();

    this.startGameLoop();
  }

  spawnEnemy = () => {
    const enemyTextures = [];
    for (let i = 0; i < this.enemyImages.length; i++) {
      const texture = Texture.from(this.enemyImages[i]);
      enemyTextures.push(texture);
    }

    const enemy = new Enemy(enemyTextures);
    enemy.x = this.player.x + 100;
    enemy.y = this.player.y + 100;
    enemy.moveTowards(this.player);
    this.enemies.push(enemy);
    this.gameMap.addChild(enemy);
  };

  updatePlayer = (delta: number) => {
    const left: boolean = Keyboard.state.get("KeyA") || false;
    const right: boolean = Keyboard.state.get("KeyD") || false;
    const top: boolean = Keyboard.state.get("KeyW") || false;
    const down: boolean = Keyboard.state.get("KeyS") || false;

    if (left) this.player.move("left", delta);
    if (right) this.player.move("right", delta);
    if (top) this.player.move("top", delta);
    if (down) this.player.move("down", delta);

    if (!left && !right && !top && !down) this.player.move("stop", delta);

    // TODO: Get nearest enemy
    this.player.update(this.ticker!.deltaMS);
  };

  startGameLoop = () => {
    this.ticker = Ticker.shared.add((time: number) => {
      this.updatePlayer(time);
      this.enemies.forEach((enemy) => enemy.update());
    });
  };
}

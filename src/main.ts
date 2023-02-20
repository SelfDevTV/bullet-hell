import { Application } from "pixi.js";
import { GameManager } from "./GameManager";

export const init = () => {
  const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  document.body.appendChild(app.view as unknown as Node);
  const gm = new GameManager(app);
};

init();

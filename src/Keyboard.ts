export class Keyboard {
  public static readonly state: Map<string, boolean> = new Map();

  static init = (): void => {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  };

  private static handleKeyDown = (e: KeyboardEvent) => {
    Keyboard.state.set(e.code, true);
  };

  private static handleKeyUp = (e: KeyboardEvent) => {
    Keyboard.state.set(e.code, false);
  };
}

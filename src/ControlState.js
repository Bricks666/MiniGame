export class ControlState {
  #currentAction;
  #keyMap;

  constructor() {
    this.#currentAction = "";
    this.#keyMap = new Map([
      [65, "left"],
      [87, "up"],
      [83, "down"],
      [68, "right"],
      [32, "fire"],
    ]);
    document.addEventListener("keydown", (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      this.#currentAction = this.#keyMap.get(evt.keyCode) || "";
      console.log(this.#currentAction);
    });
    document.addEventListener("keyup", (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      this.#currentAction = "";
      this.update();
      console.log(`${this.#currentAction} отпущена`);
    });
  }

  get currentAction() {
    return this.#currentAction;
  }
  /* Придумать способ передачи этих данных в игровой класс для дальнейшей обработки */
  update() {
    switch (this.#currentAction) {
      case "up":
        break;
      case "down":
        break;
      case "left":
        break;
      case "right":
        break;
      case "fire":
        break;
    }
  }
}

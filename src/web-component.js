import { GameOfLife } from "./index.js";

if (!customElements.get("game-of-life")) {
  customElements.define("game-of-life", GameOfLife);
}

import { Model } from "./src/client/model";
import { startGame } from "./src/client/startGame";

declare global {
  interface Window {
    Cypress: any;
    connect4: {
      model: Model;
      startGame: typeof startGame;
    };
  }
}

import { BoardModel } from "./models";
import { NUM_BOARD_ROWS } from "./constants";

export function hasDraw(boardModel: BoardModel) {
  return boardModel.every(column => column.length === NUM_BOARD_ROWS);
}

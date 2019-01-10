import { BoardModel } from "./models";
import { NUM_BOARD_ROWS } from "./constants";

export function hasIllegalMove(boardModel: BoardModel) {
  return boardModel.some(column => column.length > NUM_BOARD_ROWS);
}

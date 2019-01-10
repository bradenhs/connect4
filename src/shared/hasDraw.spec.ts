import test from "ava";
import { getBoardModel } from "./getBoardModel";
import { hasDraw } from "./hasDraw";
import { range } from "lodash";
import { NUM_BOARD_ROWS, NUM_BOARD_COLUMNS } from "./constants";

test("full board = a draw", t => {
  const fullMoveList = range(NUM_BOARD_ROWS * NUM_BOARD_COLUMNS).map(index => {
    return Math.floor(index / NUM_BOARD_ROWS);
  });
  const boardModel = getBoardModel(fullMoveList);

  const actual = hasDraw(boardModel);
  const expected = true;

  t.is(actual, expected);
});

test("partial board != a draw", t => {
  const boardModel = getBoardModel([0, 1]);

  const actual = hasDraw(boardModel);
  const expected = false;

  t.is(actual, expected);
});

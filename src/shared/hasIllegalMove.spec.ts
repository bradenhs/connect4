import test from "ava";
import { getBoardModel } from "./getBoardModel";
import { hasIllegalMove } from "./hasIllegalMove";

test("has illegal move returns true", t => {
  // left column is overflowing
  const boardModel = getBoardModel([0, 0, 0, 0, 0, 0, 0]);

  const actual = hasIllegalMove(boardModel);
  const expected = true;

  t.is(actual, expected);
});

test("has illegal move returns false", t => {
  const boardModel = getBoardModel([0, 0, 0, 0, 0, 0]);

  const actual = hasIllegalMove(boardModel);
  const expected = false;

  t.is(actual, expected);
});

import test from "ava";
import { Player } from "./models";
import { getBoardModel } from "./getBoardModel";

test("empty moves list => board model", t => {
  const moves: number[] = [];

  const actual = getBoardModel(moves);
  const expected: Player[][] = [[], [], [], [], [], [], []];

  t.deepEqual(actual, expected);
});

test("normal moves list => board model", t => {
  const moves = [0, 0, 1, 1, 0, 2, 3];

  const actual = getBoardModel(moves);
  const expected: Player[][] = [
    ["P1", "P2", "P1"],
    ["P1", "P2"],
    ["P2"],
    ["P1"],
    [],
    [],
    []
  ];

  t.deepEqual(actual, expected);
});

test("lots of moves in same column => board model", t => {
  const moves = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const actual = getBoardModel(moves);
  const expected: Player[][] = [
    ["P1", "P2", "P1", "P2", "P1", "P2", "P1", "P2", "P1"],
    [],
    [],
    [],
    [],
    [],
    []
  ];

  // Note: even though this overflows the leftmost column that's
  // okay because the hasIllegalMove function can then be used to
  // catch this.
  t.deepEqual(actual, expected);
});

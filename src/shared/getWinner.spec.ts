import test from "ava";
import { BoardModel } from "./models";
import { getWinner } from "./getWinner";

test("not a win", t => {
  const boardModel: BoardModel = [["P1", "P1", "P1"], [], [], [], [], [], []];

  const actual = getWinner(boardModel);
  const expected = null;

  t.deepEqual(actual, expected);
});

test("vertical win", t => {
  const boardModel: BoardModel = [
    ["P1", "P1", "P1", "P1"],
    [],
    [],
    [],
    [],
    [],
    []
  ];

  const actual = getWinner(boardModel);
  const expected: ReturnType<typeof getWinner> = {
    player: "P1",
    winningPieces: [
      {
        columnNumber: 0,
        rowNumber: 0
      },
      {
        columnNumber: 0,
        rowNumber: 1
      },
      {
        columnNumber: 0,
        rowNumber: 2
      },
      {
        columnNumber: 0,
        rowNumber: 3
      }
    ]
  };

  t.deepEqual(actual, expected);
});

test("horizontal win", t => {
  const boardModel: BoardModel = [["P1"], ["P1"], ["P1"], ["P1"], [], [], []];

  const actual = getWinner(boardModel);
  const expected: ReturnType<typeof getWinner> = {
    player: "P1",
    winningPieces: [
      {
        columnNumber: 0,
        rowNumber: 0
      },
      {
        columnNumber: 1,
        rowNumber: 0
      },
      {
        columnNumber: 2,
        rowNumber: 0
      },
      {
        columnNumber: 3,
        rowNumber: 0
      }
    ]
  };

  t.deepEqual(actual, expected);
});

test("diagonal win (top-left => bottom-right)", t => {
  const boardModel: BoardModel = [
    ["P2", "P2", "P2", "P1"],
    ["P2", "P2", "P1"],
    ["P2", "P1"],
    ["P1"],
    [],
    [],
    []
  ];

  const actual = getWinner(boardModel);
  const expected: ReturnType<typeof getWinner> = {
    player: "P1",
    winningPieces: [
      {
        columnNumber: 0,
        rowNumber: 3
      },
      {
        columnNumber: 1,
        rowNumber: 2
      },
      {
        columnNumber: 2,
        rowNumber: 1
      },
      {
        columnNumber: 3,
        rowNumber: 0
      }
    ]
  };

  t.deepEqual(actual, expected);
});

test("diagonal win (bottom-right => top-left)", t => {
  const boardModel: BoardModel = [
    ["P1"],
    ["P2", "P1"],
    ["P2", "P2", "P1"],
    ["P2", "P2", "P2", "P1"],
    [],
    [],
    []
  ];

  const actual = getWinner(boardModel);
  const expected: ReturnType<typeof getWinner> = {
    player: "P1",
    winningPieces: [
      {
        columnNumber: 0,
        rowNumber: 0
      },
      {
        columnNumber: 1,
        rowNumber: 1
      },
      {
        columnNumber: 2,
        rowNumber: 2
      },
      {
        columnNumber: 3,
        rowNumber: 3
      }
    ]
  };

  t.deepEqual(actual, expected);
});

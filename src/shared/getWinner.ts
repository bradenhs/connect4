import { BoardModel } from "./models";
import { NUM_BOARD_COLUMNS, NUM_BOARD_ROWS } from "./constants";

type Check = {
  columnDelta: number;
  rowDelta: number;
};

const horizontalCheckPlan: Check[] = [
  { columnDelta: 0, rowDelta: 0 },
  { columnDelta: 1, rowDelta: 0 },
  { columnDelta: 2, rowDelta: 0 },
  { columnDelta: 3, rowDelta: 0 }
];

const verticalCheckPlan: Check[] = [
  { columnDelta: 0, rowDelta: 0 },
  { columnDelta: 0, rowDelta: 1 },
  { columnDelta: 0, rowDelta: 2 },
  { columnDelta: 0, rowDelta: 3 }
];

const diagonalTopLeftToBottomRightCheckPlan: Check[] = [
  { columnDelta: 0, rowDelta: 0 },
  { columnDelta: 1, rowDelta: 1 },
  { columnDelta: 2, rowDelta: 2 },
  { columnDelta: 3, rowDelta: 3 }
];

const diagonalBottomLeftToTopRightCheckPlan: Check[] = [
  { columnDelta: 0, rowDelta: 0 },
  { columnDelta: 1, rowDelta: -1 },
  { columnDelta: 2, rowDelta: -2 },
  { columnDelta: 3, rowDelta: -3 }
];

const checkPlans = [
  horizontalCheckPlan,
  verticalCheckPlan,
  diagonalBottomLeftToTopRightCheckPlan,
  diagonalTopLeftToBottomRightCheckPlan
];

export function getWinner(boardModel: BoardModel) {
  for (let columnNumber = 0; columnNumber < boardModel.length; columnNumber++) {
    const column = boardModel[columnNumber];

    for (let rowNumber = 0; rowNumber < column.length; rowNumber++) {
      const winner = getWinnerAtSquare(boardModel, columnNumber, rowNumber);

      if (winner !== null) {
        return winner;
      }
    }
  }

  return null;
}

function getWinnerAtSquare(
  boardModel: BoardModel,
  columnNumber: number,
  rowNumber: number
) {
  const winningCheckPlan = checkPlans.find(plan => {
    const [initialCheck, ...remainingChecks] = plan;

    const initialCheckPlayer = getPlayerAtSquare(
      boardModel,
      columnNumber + initialCheck.columnDelta,
      rowNumber + initialCheck.rowDelta
    );

    if (initialCheckPlayer === null) {
      return false;
    }

    return remainingChecks.every(check => {
      return (
        initialCheckPlayer ===
        getPlayerAtSquare(
          boardModel,
          columnNumber + check.columnDelta,
          rowNumber + check.rowDelta
        )
      );
    });
  });

  if (winningCheckPlan === undefined) {
    return null;
  }

  const winningPieces = winningCheckPlan.map(check => {
    return {
      columnNumber: columnNumber + check.columnDelta,
      rowNumber: rowNumber + check.rowDelta
    };
  });

  const player = getPlayerAtSquare(
    boardModel,
    winningPieces[0].columnNumber,
    winningPieces[0].rowNumber
  );

  if (player === null) {
    throw new Error("Player should not be null at this point");
  }

  return { player, winningPieces };
}

function getPlayerAtSquare(
  boardModel: BoardModel,
  columnNumber: number,
  rowNumber: number
) {
  if (
    columnNumber < 0 ||
    columnNumber >= NUM_BOARD_COLUMNS ||
    rowNumber < 0 ||
    rowNumber >= NUM_BOARD_ROWS
  ) {
    return null;
  }

  const player = boardModel[columnNumber][rowNumber];

  if (player === undefined) {
    return null;
  }

  return player;
}

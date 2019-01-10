import React from "react";
import { GameToken } from "./GameToken";
import { observer } from "mobx-react-lite";
import { useModel } from "../../model";
import { getBoardModel } from "../../../shared/getBoardModel";
import { getWinner } from "../../../shared/getWinner";

export const GameTokenCollection = observer(() => {
  const model = useModel();

  const boardModel = getBoardModel(model.moves);
  const winner = getWinner(boardModel);
  const winningPieces = winner === null ? [] : winner.winningPieces;
  const tokens: JSX.Element[] = [];

  boardModel.forEach((column, columnNumber) => {
    let rowNumber = 0;
    column.forEach(player => {
      const emphasize = winningPieces.some(piece => {
        return (
          piece.columnNumber === columnNumber && piece.rowNumber === rowNumber
        );
      });

      tokens.push(
        <GameToken
          emphasize={emphasize}
          key={`${model.gameId}-${columnNumber}-${rowNumber}`}
          columnNumber={columnNumber}
          rowNumber={rowNumber}
          player={player}
        />
      );

      rowNumber++;
    });
  });

  return <>{tokens}</>;
});

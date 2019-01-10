import { BoardModel, Player } from "./models";

export function getBoardModel(moves: number[]) {
  const boardModel: BoardModel = [[], [], [], [], [], [], []];

  moves.forEach((move, index) => {
    const player: Player = index % 2 === 0 ? "P1" : "P2";
    boardModel[move as number].push(player);
  });

  return boardModel;
}

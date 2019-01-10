import { NUM_BOARD_COLUMNS } from "./constants";
import { range, random, sample } from "lodash";
import { hasIllegalMove } from "./hasIllegalMove";
import { getBoardModel } from "./getBoardModel";

export function getRandomLegalMove(moves: number[]) {
  const legalMoves = range(NUM_BOARD_COLUMNS).filter(move => {
    return !hasIllegalMove(getBoardModel([...moves, move]));
  });

  if (legalMoves.length === 0) {
    // No legal moves so just choose one
    return random(0, NUM_BOARD_COLUMNS);
  }

  return sample(legalMoves)!;
}

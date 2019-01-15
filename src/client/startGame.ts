import { Model } from "./model";
import { transaction, when } from "mobx";
import { Player } from "../shared/models";
import { sleep } from "./utils/sleep";
import { sample } from "lodash";
import { hasIllegalMove } from "../shared/hasIllegalMove";
import { getBoardModel } from "../shared/getBoardModel";
import { hasDraw } from "../shared/hasDraw";
import { getWinner } from "../shared/getWinner";
import { showToast } from "./utils/showToast";
import { getRandomLegalMove } from "../shared/getRandomLegalMove";
import { NUM_BOARD_COLUMNS } from "../shared/constants";

let gameIdCounter = 0;

export function startGame(
  model: Model,
  player1Url: string,
  player2Url: string
) {
  transaction(() => {
    if (model.gameSpeed === "paused") {
      model.gameSpeed = "normal";
    }

    model.player1Url = player1Url;
    model.player2Url = player2Url;

    model.gameId = gameIdCounter++;
    model.messages = [
      {
        text: "New game started!",
        intent: "primary"
      }
    ];
    model.moves = [];
    model.helpOpen = false;

    executeTurn(model.gameId, model);
  });
}

async function executeTurn(gameId: number, model: Model) {
  if (isGameOver(gameId, model)) {
    return;
  }

  if (model.gameSpeed === "paused") {
    await when(() => model.gameSpeed !== "paused");
    executeTurn(gameId, model);
    return;
  }

  const currentPlayer: Player = model.moves.length % 2 === 0 ? "P1" : "P2";
  const currentPlayerName = `Player ${currentPlayer === "P1" ? 1 : 2}`;

  let nextMove: number;
  let message: string | undefined;

  try {
    const result = await getNextMove(model);
    nextMove = result.nextMove;
    message = result.message;
  } catch (err) {
    console.error(err);
    showToast({
      message:
        "An unexpected error occurred and the game is unable to continue.",
      intent: "danger",
      icon: "issue"
    });
    return;
  }

  if (isGameOver(gameId, model)) {
    return;
  }

  const shouldContinue = transaction(() => {
    model.moves.push(nextMove);

    model.messages.push({
      text: `${currentPlayerName} just moved in column ${nextMove + 1}`,
      intent: "primary"
    });

    if (message !== undefined) {
      model.messages.push({
        text: `${currentPlayerName} says: ${message}`,
        intent: "none"
      });
    }

    const boardModel = getBoardModel(model.moves);

    if (hasIllegalMove(boardModel)) {
      model.messages.push({
        text: `${currentPlayerName} made an illegal move. They lose.`,
        intent: "danger"
      });
      return false;
    }

    if (hasDraw(boardModel)) {
      model.messages.push({
        text: `Draw!`,
        intent: "warning"
      });
      return false;
    }

    if (getWinner(boardModel) !== null) {
      model.messages.push({
        text: `${currentPlayerName} wins!`,
        intent: "success"
      });
      return false;
    }

    return true;
  });

  if (shouldContinue) {
    if (model.gameSpeed === "normal") {
      await sleep(700);
    }

    executeTurn(gameId, model);
  }
}

async function getNextMove(model: Model) {
  const nextMoveUrl =
    model.moves.length % 2 === 0 ? model.player1Url : model.player2Url;

  if (nextMoveUrl === null) {
    throw new Error("Next move should be defined");
  }

  if (nextMoveUrl === "random") {
    return {
      nextMove: getRandomLegalMove(model.moves),
      message: sample([
        "Take that!",
        "For the win! Maybe...",
        "Well, I had to move somewhere :)"
      ])
    };
  }

  const response = await fetch(nextMoveUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ moves: model.moves })
  });

  const result = (await response.json()) as {
    nextMove: number;
    message?: string;
  };

  if (
    typeof result !== "object" ||
    result === null ||
    typeof result.nextMove !== "number" ||
    result.nextMove < 0 ||
    result.nextMove > NUM_BOARD_COLUMNS - 1 ||
    (result.message !== undefined && typeof result.message !== "string")
  ) {
    throw new Error("Invalid response");
  }

  return {
    nextMove: parseInt(result.nextMove.toString(), 10),
    message: result.message
  };
}

function isGameOver(gameId: number, model: Model) {
  return gameId !== model.gameId;
}

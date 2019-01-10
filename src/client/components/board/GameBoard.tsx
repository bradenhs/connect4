import React from "react";
import { observer } from "mobx-react-lite";
import { GRID_SQUARE_SIZE } from "../../constants";
import { style } from "typestyle";
import { Grid } from "./Grid";
import { GameTokenCollection } from "./GameTokenCollection";
import { Colors } from "@blueprintjs/core";
import { NUM_BOARD_COLUMNS, NUM_BOARD_ROWS } from "../../../shared/constants";

const gameBoardContainerClassName = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%"
});

const gameBoardClassName = style({
  position: "relative",
  width: NUM_BOARD_COLUMNS * GRID_SQUARE_SIZE + "px",
  height: NUM_BOARD_ROWS * GRID_SQUARE_SIZE + "px",
  border: `20px solid ${Colors.BLUE3}`,
  borderTop: `5px solid ${Colors.GOLD4}`,
  boxSizing: "content-box",
  zIndex: 3
});

export const GameBoard = observer(() => {
  return (
    <div className={gameBoardContainerClassName}>
      <div className={gameBoardClassName}>
        <Grid />
        <GameTokenCollection />
      </div>
    </div>
  );
});

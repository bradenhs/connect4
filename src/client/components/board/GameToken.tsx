import React from "react";
import { observer } from "mobx-react-lite";
import { Player } from "../../../shared/models";
import { style, keyframes } from "typestyle";
import {
  GRID_SQUARE_SIZE,
  PLAYER_1_COLOR,
  PLAYER_2_COLOR
} from "../../constants";
import { NUM_BOARD_ROWS } from "../../../shared/constants";

type Props = {
  columnNumber: number;
  rowNumber: number;
  player: Player;
  emphasize: boolean;
};

const gameTokenClassName = style({
  marginTop: "8px",
  marginLeft: "8px",
  width: GRID_SQUARE_SIZE - 16 + "px",
  height: GRID_SQUARE_SIZE - 16 + "px",
  borderRadius: "100%",
  position: "absolute",
  animationName: keyframes({
    from: {
      opacity: 0,
      transform: "translateY(-100px)"
    },
    to: {
      opacity: 1,
      transform: "translateY(0px)"
    }
  }),
  animationDuration: ".3s",
  animationTimingFunction: "ease"
});

export const GameToken = observer<Props>(props => {
  return (
    <div
      className={gameTokenClassName}
      data-testid={`${props.player}-token`}
      style={{
        background: props.player === "P1" ? PLAYER_1_COLOR : PLAYER_2_COLOR,
        boxShadow: `inset 0 0 0 10px ${
          props.emphasize ? "rgba(255,255,255,.2)" : "rgba(0,0,0,.1)"
        }`,
        top: (NUM_BOARD_ROWS - 1 - props.rowNumber) * GRID_SQUARE_SIZE + "px",
        left: props.columnNumber * GRID_SQUARE_SIZE + "px"
      }}
    />
  );
});

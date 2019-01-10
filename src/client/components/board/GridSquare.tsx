import React from "react";
import { GRID_SQUARE_SIZE } from "../../constants";
import { style } from "typestyle";
import { Colors } from "@blueprintjs/core";

type Props = {
  columnNumber: number;
  rowNumber: number;
};

const gridSquareClassName = style({
  position: "absolute",
  height: GRID_SQUARE_SIZE + "px",
  width: GRID_SQUARE_SIZE + "px",
  boxShadow: `inset 0 0 0 10px ${Colors.GOLD4}`,
  zIndex: 3
});

export function GridSquare({ columnNumber, rowNumber }: Props) {
  return (
    <div
      className={gridSquareClassName}
      style={{
        left: columnNumber * GRID_SQUARE_SIZE + "px",
        top: rowNumber * GRID_SQUARE_SIZE + "px"
      }}
    />
  );
}

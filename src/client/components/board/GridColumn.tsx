import React from "react";
import { observer } from "mobx-react-lite";
import { range } from "lodash";
import { NUM_BOARD_ROWS } from "../../../shared/constants";
import { GridSquare } from "./GridSquare";

type Props = {
  columnNumber: number;
};

export const GridColumn = observer<Props>(props => {
  return (
    <>
      {range(NUM_BOARD_ROWS).map(rowNumber => {
        return (
          <GridSquare
            key={rowNumber}
            rowNumber={rowNumber}
            columnNumber={props.columnNumber}
          />
        );
      })}
    </>
  );
});

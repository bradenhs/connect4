import React from "react";
import { observer } from "mobx-react-lite";
import { range } from "lodash";
import { NUM_BOARD_COLUMNS } from "../../../shared/constants";
import { GridColumn } from "./GridColumn";

export const Grid = observer(() => {
  return (
    <>
      {range(NUM_BOARD_COLUMNS).map(columnNumber => {
        return <GridColumn columnNumber={columnNumber} key={columnNumber} />;
      })}
    </>
  );
});

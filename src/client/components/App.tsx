import React from "react";
import { observer } from "mobx-react-lite";
import { HelpDialog } from "./HelpDialog";
import { Header } from "./Header";
import { GameBoard } from "./board/GameBoard";
import { GameControls } from "./GameControls";
import { GameMessageArea } from "./GameMessageArea";
import { style } from "typestyle";
import { Colors } from "@blueprintjs/core";

const gameContainerClassName = style({
  display: "flex",
  height: "calc(100vh - 50px)"
});

const leftColumnClassName = style({
  flexGrow: 1
});

const rightColumnClassName = style({
  width: "300px",
  borderLeft: `1px solid ${Colors.DARK_GRAY1}`,
  background: Colors.DARK_GRAY3,
  display: "flex",
  flexDirection: "column"
});

export const App = observer(() => {
  return (
    <div className="bp3-dark">
      <Header />
      <HelpDialog />
      <div className={gameContainerClassName}>
        <div className={leftColumnClassName}>
          <GameBoard />
        </div>
        <div className={rightColumnClassName}>
          <GameMessageArea />
          <GameControls />
        </div>
      </div>
    </div>
  );
});

import React from "react";
import { observer } from "mobx-react-lite";
import { Button, ButtonGroup, Colors } from "@blueprintjs/core";
import { style } from "typestyle";
import { useModel } from "../model";

const gameControlsClassName = style({
  padding: "15px 20px 20px 20px",
  borderTop: `1px solid ${Colors.DARK_GRAY2}`,
  background: Colors.DARK_GRAY4
});

const gameSpeedLabel = style({
  fontWeight: "bold",
  marginBottom: "10px",
  display: "block"
});

export const GameControls = observer(() => {
  const model = useModel();

  return (
    <div className={gameControlsClassName}>
      <label className={gameSpeedLabel}>Game Speed</label>
      <ButtonGroup fill>
        <Button
          rightIcon="pause"
          onClick={() => (model.gameSpeed = "paused")}
          active={model.gameSpeed === "paused"}
        >
          Paused
        </Button>
        <Button
          rightIcon="play"
          onClick={() => (model.gameSpeed = "normal")}
          active={model.gameSpeed === "normal"}
        >
          Normal
        </Button>
        <Button
          rightIcon="fast-forward"
          onClick={() => (model.gameSpeed = "fast")}
          active={model.gameSpeed === "fast"}
        >
          Fast
        </Button>
      </ButtonGroup>
    </div>
  );
});

import React from "react";
import { observer } from "mobx-react-lite";
import { useModel } from "../model";
import { Dialog, H3, H4, Button, Colors } from "@blueprintjs/core";
import { classes, style } from "typestyle";

const helpDialogClassName = classes(
  "bp3-dark",
  style({
    padding: "20px"
  })
);

const codeBlock = style({
  padding: "10px",
  borderRadius: "3px",
  background: Colors.DARK_GRAY2,
  display: "block",
  whiteSpace: "pre-line",

  marginBottom: "15px"
});

const listClassName = classes(
  "bp3-text-muted",
  style({
    marginTop: "0px",
    marginBottom: "30px"
  })
);

const inputJson = `{
··"moves": [0,0,1,3,2]
}`;

const returnJson = `{
··"nextMove": 3,
··"message": "Take that!" // optional
}`;

export const HelpDialog = observer(() => {
  const model = useModel();

  return (
    <Dialog
      className={helpDialogClassName}
      isOpen={model.helpOpen}
      onClose={closeHelp}
    >
      <H3>
        <span>Welcome to Connect 4</span>&nbsp;&nbsp;😄
      </H3>
      <H4>How to Play</H4>
      <p className="bp3-text-muted">
        <b>1.</b> Code up a server that accepts a POST with JSON in this form:
      </p>
      <code className={codeBlock}>{inputJson}</code>
      <p className="bp3-text-muted">
        <b>2.</b> And returns JSON in this form:
      </p>
      <code className={codeBlock}>{returnJson}</code>
      <p className="bp3-text-muted">
        <b>3.</b> Then, enter the full URLs for the programs you'd like to play
        each other and press the "Start Game" button!
      </p>
      <H4>Tips and Tricks</H4>
      <ul className={listClassName}>
        <li>
          A "move" is a number 0-6. 0 for the leftmost column and 6 for the
          rightmost.
        </li>
        <li>The first player to move is always player 1.</li>
        <li>
          You'll probably want to transform the list of moves into some type of
          board object so your program can easily reason about it.
        </li>
        <li>Don't make any illegal moves! You'll lose.</li>
        <li>Don't forget about CORS.</li>
        <li>
          Want to see a game without coding anything? Enter the word{" "}
          <b>random</b> into the URL input.
        </li>
      </ul>
      <Button intent="primary" large onClick={closeHelp}>
        Get Started
      </Button>
    </Dialog>
  );

  function closeHelp() {
    model.helpOpen = false;
  }
});

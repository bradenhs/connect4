import React, { useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { Navbar, Icon, Button } from "@blueprintjs/core";
import { style, classes } from "typestyle";
import { useModel } from "../model";
import { showToast } from "../utils/showToast";
import { startGame } from "../startGame";

const rightSpacer = style({
  marginRight: "9px"
});

export const Header = observer(() => {
  const model = useModel();
  const player1InputRef = useRef<HTMLInputElement>(null);
  const player2InputRef = useRef<HTMLInputElement>(null);
  const [player1UrlInputHasError, setPlayer1UrlInputHasError] = useState(false);
  const [player2UrlInputHasError, setPlayer2UrlInputHasError] = useState(false);

  return (
    <Navbar>
      <Navbar.Group align="left">
        <Icon icon="grid-view" className={rightSpacer} />
        <Navbar.Heading>Connect 4</Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align="right">
        <div className={classes("bp3-input-group", rightSpacer)}>
          <span className="bp3-icon bp3-icon-desktop" />
          <input
            type="text"
            ref={player1InputRef}
            onBlur={handlePlayer1UrlInputBlur}
            className={classes(
              "bp3-input",
              player1UrlInputHasError && "bp3-intent-danger"
            )}
            placeholder="Player 1 Url"
          />
        </div>
        <div className={classes("bp3-input-group", rightSpacer)}>
          <span className="bp3-icon bp3-icon-desktop" />
          <input
            type="text"
            ref={player2InputRef}
            onBlur={handlePlayer2InputBlur}
            className={classes(
              "bp3-input",
              player2UrlInputHasError && "bp3-intent-danger"
            )}
            placeholder="Player 2 Url"
          />
        </div>
        <Button
          intent="primary"
          text="Start Game"
          onClick={handleStartGameButtonClick}
        />
        <Navbar.Divider />
        <Button text="How to Play" onClick={openHelp} />
      </Navbar.Group>
    </Navbar>
  );

  function handlePlayer1UrlInputBlur() {
    if (getPlayer1UrlInputValue() !== "") {
      setPlayer1UrlInputHasError(false);
    }
  }

  function handlePlayer2InputBlur() {
    if (getPlayer2UrlInputValue() !== "") {
      setPlayer2UrlInputHasError(false);
    }
  }

  function handleStartGameButtonClick() {
    const player1Url = getPlayer1UrlInputValue();
    const player2Url = getPlayer2UrlInputValue();

    if (player1Url === "" || player2Url === "") {
      let numMissing = 0;

      if (player1Url === "") {
        numMissing++;
        setPlayer1UrlInputHasError(true);
      }

      if (player2Url === "") {
        numMissing++;
        setPlayer2UrlInputHasError(true);
      }

      showToast({
        message: numMissing === 2 ? "URLs Missing" : "URL Missing",
        intent: "danger",
        icon: "issue"
      });

      return;
    }

    startGame(model, player1Url, player2Url);
  }

  function getPlayer1UrlInputValue() {
    return player1InputRef.current ? player1InputRef.current.value.trim() : "";
  }

  function getPlayer2UrlInputValue() {
    return player2InputRef.current ? player2InputRef.current.value.trim() : "";
  }

  function openHelp() {
    model.helpOpen = true;
  }
});

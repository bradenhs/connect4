import "whatwg-fetch";

import React from "react";
import { forceRenderStyles, cssRule } from "typestyle";
import { normalize } from "csstips";
import { attach } from "./utils/attach";
import { App } from "./components/App";
import { FocusStyleManager, Colors } from "@blueprintjs/core";

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import { ModelProvider, createModel } from "./model";
import { startGame } from "./startGame";

normalize();
forceRenderStyles();
cssRule("body", {
  background: Colors.DARK_GRAY2
});
FocusStyleManager.onlyShowFocusOnTabs();

const model = createModel();

if (window.Cypress) {
  window.connect4 = {
    model,
    startGame
  };
}

attach(
  <ModelProvider value={model}>
    <App />
  </ModelProvider>
);

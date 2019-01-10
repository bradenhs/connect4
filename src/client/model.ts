import { createContext, useContext, Provider } from "react";
import { observable } from "mobx";
import { Intent } from "@blueprintjs/core";

export type Model = {
  player1Url: string | null;
  player2Url: string | null;
  moves: number[];
  gameId: number | null;
  messages: { text: string; intent: Intent }[];
  helpOpen: boolean;
  gameSpeed: "paused" | "normal" | "fast";
};

const initialModel: Model = {
  player1Url: null,
  player2Url: null,
  gameId: null,
  moves: [],
  messages: [],
  helpOpen: true,
  gameSpeed: "normal"
};

const modelContext = createContext<Model | null>(null);

export function createModel() {
  return observable(initialModel);
}

export const ModelProvider = modelContext.Provider as Provider<Model>;

export function useModel() {
  const model = useContext(modelContext);

  if (model === null) {
    throw new Error(
      "Use the ModelProvider component as a parent of this component if you want to access the model via useModel."
    );
  }

  return model;
}

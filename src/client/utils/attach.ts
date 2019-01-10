import { ReactElement } from "react";
import { render } from "react-dom";

export function attach(component: ReactElement<any>) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  render(component, container);
}

import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useModel } from "../model";
import { style, keyframes } from "typestyle";
import { Callout } from "@blueprintjs/core";

const messageAreaClassName = style({
  flexGrow: 1,
  padding: "10px",
  overflowY: "scroll"
});

const messageClassName = style({
  marginBottom: "10px",
  animationName: keyframes({
    from: {
      opacity: 0,
      transform: "translateY(10px)"
    },
    to: {
      opacity: 1,
      transform: "translateY(0px)"
    }
  }),
  animationDuration: ".3s",
  animationTimingFunction: "ease"
});

export const GameMessageArea = observer(() => {
  const model = useModel();

  const messagesContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainer.current === null) {
      return;
    }

    messagesContainer.current.scroll({
      behavior: "smooth",
      top: messagesContainer.current.scrollHeight
    });
  });

  return (
    <div className={messageAreaClassName} ref={messagesContainer}>
      {model.messages.map((message, index) => {
        return (
          <Callout
            className={messageClassName}
            icon={message.intent === "none" ? "hand-right" : undefined}
            key={index}
            intent={message.intent}
          >
            {message.text}
          </Callout>
        );
      })}
    </div>
  );
});

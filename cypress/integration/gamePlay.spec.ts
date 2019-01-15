describe("Game Play", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad: win => {
        // @ts-ignore
        win.fetch = null;
      }
    });
    cy.window().then(win => {
      win.connect4.model.helpOpen = false;
    });
    cy.server();
  });

  it("should give win to p1", () => {
    fakeGame({
      turns: [
        { p1: 0, p2: 0 },
        { p1: 1, p2: 1 },
        { p1: 2, p2: 2 },
        { p1: 3, p2: 3 }
      ],
      expectedOutcome: "p1Win"
    });
  });

  it("should give win to p2", () => {
    fakeGame({
      turns: [
        { p1: 0, p2: 1 },
        { p1: 0, p2: 1 },
        { p1: 0, p2: 1 },
        { p1: 2, p2: 1 }
      ],
      expectedOutcome: "p2Win"
    });
  });

  it("should error on illegal move", () => {
    fakeGame({
      turns: [{ p1: 0, p2: 0 }, { p1: 0, p2: 0 }, { p1: 0, p2: 0 }, { p1: 0 }],
      expectedOutcome: "p1IllegalMove"
    });
  });

  it("should end in draw", () => {
    fakeGame({
      turns: [
        { p1: 0, p2: 0 },
        { p1: 0, p2: 0 },
        { p1: 0, p2: 0 },
        { p1: 1, p2: 1 },
        { p1: 1, p2: 1 },
        { p1: 1, p2: 1 },
        { p1: 3, p2: 2 },
        { p1: 2, p2: 2 },
        { p1: 2, p2: 2 },
        { p1: 2, p2: 3 },
        { p1: 3, p2: 3 },
        { p1: 3, p2: 3 },
        { p1: 4, p2: 4 },
        { p1: 4, p2: 4 },
        { p1: 4, p2: 4 },
        { p1: 6, p2: 5 },
        { p1: 5, p2: 5 },
        { p1: 5, p2: 5 },
        { p1: 5, p2: 6 },
        { p1: 6, p2: 6 },
        { p1: 6, p2: 6 },
        { p1: 6 }
      ],
      expectedOutcome: "draw"
    });
  });
});

function fakeGame(params: {
  turns: { p1: number; p2?: number }[];
  expectedOutcome:
    | "p1Win"
    | "p2Win"
    | "draw"
    | "p1IllegalMove"
    | "p2IllegalMove";
}) {
  for (let turn = 0; turn < params.turns.length; turn++) {
    cy.get(`[data-testid="P1-token"]`).should("have.length", turn);
    cy.route("POST", "http://player1", { nextMove: params.turns[turn].p1 });

    // There may be not a last p2 move
    if (params.turns[turn].p2 === undefined) {
      break;
    }

    cy.get(`[data-testid="P2-token"]`).should("have.length", turn);
    cy.route("POST", "http://player2", { nextMove: params.turns[turn].p2 });

    if (turn === 0) {
      cy.window().then(win => {
        win.connect4.model.gameSpeed = "fast";
        win.connect4.startGame(
          win.connect4.model,
          "http://player1",
          "http://player2"
        );
      });
    }
  }

  // Ensure final tokens have been placed
  cy.wait(100);

  // one hour - aka never :)
  const delay = 1000 * 60 * 60;

  // No more turns so don't return anything else
  cy.route({
    method: "POST",
    url: "http://player1",
    delay,
    response: false
  });

  cy.route({
    method: "POST",
    url: "http://player2",
    delay,
    response: false
  });

  if (params.expectedOutcome === "p1Win") {
    cy.queryByText("Player 1 wins!").should("exist");
  } else if (params.expectedOutcome === "p2Win") {
    cy.queryByText("Player 2 wins!").should("exist");
  } else if (params.expectedOutcome === "draw") {
    cy.queryByText("Draw!").should("exist");
  } else if (params.expectedOutcome === "p1IllegalMove") {
    cy.queryByText("Player 1 made an illegal move. They lose.").should("exist");
  } else if (params.expectedOutcome === "p2IllegalMove") {
    cy.queryByText("Player 2 made an illegal move. They lose.").should("exist");
  }
}

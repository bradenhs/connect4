describe("Player URLs Form", () => {
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
  });

  it("should error if Start Game is pressed with no input", () => {
    cy.getByText("Start Game").click();

    cy.queryByText("URLs Missing").should("exist");
  });

  it("should adjust error message if one input if filled out", () => {
    cy.getByPlaceholderText("Player 1 Url").type("random");
    cy.getByText("Start Game").click();

    cy.queryByText("URL Missing").should("exist");
  });

  it("should start the game when both inputs have values", () => {
    cy.getByPlaceholderText("Player 1 Url").type("random");
    cy.getByPlaceholderText("Player 2 Url").type("random");
    cy.getByText("Start Game").click();

    cy.queryByText("New game started!").should("exist");
  });

  it("should error if the url given is invalid", () => {
    cy.getByPlaceholderText("Player 1 Url").type("invalid url");
    cy.getByPlaceholderText("Player 2 Url").type("random");
    cy.getByText("Start Game").click();

    cy.queryByText(
      "An unexpected error occurred and the game is unable to continue."
    ).should("exist");
  });
});

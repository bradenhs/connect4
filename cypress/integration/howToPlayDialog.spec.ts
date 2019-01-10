describe("How to Play Dialog", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate through How to Play popup correctly", () => {
    cy.queryByText("Welcome to Connect 4").should("exist");

    cy.getByText("Get Started").click();
    cy.queryByText("Welcome to Connect 4")
      // I think Cypress doesn't pick up that this element is animating because
      // its not animating its position. Maybe? Whatever the case,
      // this test needs a wait here in order to function.
      .wait(1000)
      .should("not.exist");

    cy.getByText("How to Play").click();

    cy.queryByText("Welcome to Connect 4").should("exist");
  });
});

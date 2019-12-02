describe("Homepage", function() {
  beforeEach(() => {
    cy.visit("/")
  })

  it("Has text to log in", function() {
    cy.contains("Log in to use the app")
  })
})

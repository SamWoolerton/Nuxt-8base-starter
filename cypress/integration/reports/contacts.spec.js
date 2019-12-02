import locations from "../../fixtures/contact/list"

describe("Report", function() {
  beforeEach(() => {
    // otherwise won't allow access to authenticated pages
    cy.mockLogin()
    cy.mockGraphQL({ data: locations })
    cy.visit("/reports/contacts")
  })

  it("Displays table", function() {
    cy.contains("TYPE")
    cy.get("table tbody tr").should("have.length", 2)
    cy.get("table").contains("td", "lead")
    cy.get("table").contains("td", "client")
  })
})

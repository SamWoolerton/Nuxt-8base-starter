import contacts from "../../fixtures/contact/list"
import contactTypes from "../../fixtures/contact/types"

describe("Page", function() {
  beforeEach(() => {
    // otherwise won't allow access to authenticated pages
    cy.mockLogin()
    cy.mockGraphQL({
      handler: ({ query }) =>
        query.includes("contactsList") ? contacts : contactTypes
    })
    cy.visit("/app/contacts")
  })

  it("Displays table", function() {
    cy.contains("NAME")
    cy.get("table tbody tr").should("have.length", 4)
    cy.get("table").contains("td", "lead")
    cy.get("table").contains("td", "client")
    cy.get("table").contains("td", "Kayla")
    cy.get("table").contains("td", "tom@example.co")
  })
})

// many different implementations at https://github.com/cypress-io/cypress-documentation/issues/122

Cypress.Commands.add("mockGraphQL", ({ handler, data }) => {
  cy.on("window:before:load", win => {
    win.fetch = (path, { body, method }) => {
      if (path === Cypress.env("API_BASE_URL") && method === "POST") {
        if (handler) return responseStub(handler(JSON.parse(body)))
        return responseStub(data)
      }
      throw new Error("Unhandled fetch request that needs to be stubbed.")
    }
  })
})

function responseStub(result) {
  return Promise.resolve({
    json() {
      return Promise.resolve(result)
    },
    text() {
      return Promise.resolve(JSON.stringify(result))
    },
    ok: true
  })
}

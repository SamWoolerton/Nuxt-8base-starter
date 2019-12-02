// ***********************************************
// This example commands.js shows you how to create various custom commands and overwrite existing commands.
// For more comprehensive examples of custom commands please read more here: https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login", () => {
  Cypress.log({
    name: "loginVia8base"
  })

  cy.request({
    method: "POST",
    url: Cypress.env("API_BASE_URL"),
    body: {
      query: `mutation {
      userLogin(data: {
        email: "${Cypress.env("USER_EMAIL")}"
        password: "${Cypress.env("USER_PASSWORD")}"
        authProfileId: "${Cypress.env("AUTH_PROFILE_ID")}"
      }) {
        success
        auth {
          refreshToken
          idToken
        }
      }
    }`
    }
  }).then(res => {
    // when the app loads it will just get the token from here now
    localStorage.setItem("id_token", res.body.data.userLogin.auth.idToken)
  })
})

Cypress.Commands.add("mockLogin", () => {
  localStorage.setItem("id_token", "Placeholder")
})

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

require("dotenv").config()

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // modify config values
  config.baseUrl = "http://localhost:3000"

  // expose environment variables for Cypress to use
  const envKeys = [
    "API_BASE_URL",
    "API_CLIENT_ID",
    "AUTH_DOMAIN",
    "USER_EMAIL",
    "USER_PASSWORD",
    "AUTH_PROFILE_ID"
  ]
  envKeys.forEach(key => {
    config.env[key] = process.env[key]
  })

  // disable window.fetch so it falls back to xhr
  // Cypress can only intercept xhr at this stage
  on("window:before:load", window => {
    window.fetch = null
  })

  return config
}

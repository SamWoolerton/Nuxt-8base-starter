// original implementation from https://github.com/8base/vuejs-todos-app
import { Auth, AUTH_STRATEGIES } from "@8base/auth"

const baseUrl = window.location.origin

// from Authentication Profile in 8base
const domain = process.env.AUTH_DOMAIN
const clientId = process.env.API_CLIENT_ID
const logoutRedirectUri = `${baseUrl}/logout`
const redirectUri = `${baseUrl}/auth/callback`

// can use multiple auth strategies; by default, specifying 'web_8base' will configure the 8base auth client.
export default Auth.createClient(
  {
    strategy: AUTH_STRATEGIES.WEB_8BASE,
    subscribable: true
  },
  {
    domain,
    clientId,
    redirectUri,
    logoutRedirectUri
  }
)

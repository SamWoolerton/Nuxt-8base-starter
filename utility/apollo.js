import { HttpLink } from "apollo-link-http"
import { onError } from "apollo-link-error"
import { ApolloClient } from "apollo-client"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"

import { getToken } from "~/utility/auth"

export default store => {
  // docs: https://www.apollographql.com/docs/link/links/http/
  const httpLink = new HttpLink({
    uri: process.env.API_BASE_URL
  })

  const errorHandlers = {
    // /* Logout on expired token */
    TokenExpiredError: () => {
      store.commit("auth/notify", "tokenExpired")
      setTimeout(() => store.dispatch("auth/logout"), 500)
    },
    InvalidTokenError: () => {
      store.commit("auth/notify", "tokenExpired")
      setTimeout(() => store.dispatch("auth/logout"), 500)
    },
    default: ({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    }
  }

  // docs: https://www.apollographql.com/docs/link/links/error/
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(args =>
        (errorHandlers[args.code] || errorHandlers.default)(args)
      )
    }

    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  // docs: https://www.apollographql.com/docs/link/links/context/
  const authLink = setContext((_, { headers }) => ({
    headers: {
      authorization: `Bearer ${getToken()}`,
      ...headers
    }
  }))

  return new ApolloClient({
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache(),
    connectToDevTools: true
  })
}

/**
 * This exists as a workaround for the 8base CLI not providing a context object when invoking locally (which would make it pretty useless)
 * Just stub out the ability to make GraphQL requests and we're good to go
 */

import { GraphQLClient } from "graphql-request"

export default function buildCtx() {
  const path = require("path")
  require("dotenv").config({ path: path.resolve(process.cwd(), "..", ".env") })

  const { API_BASE_URL, API_TEMP_ACCESS_TOKEN } = process.env

  const client = new GraphQLClient(API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${API_TEMP_ACCESS_TOKEN}`
    }
  })

  return {
    api: {
      async gqlRequest(query, variables) {
        try {
          return await client.request(query, variables)
        } catch (err) {
          console.log("Error fetching data", err)
          return { errors: err.response.errors }
        }
      }
    }
  }
}

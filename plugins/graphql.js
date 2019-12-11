import Vue from "vue"
import gql from "graphql-tag"

import graphqlClientConstructor from "~/utility/apollo"
import {
  getFields,
  getAddTypes,
  getEditTypes,
  getAddVariables,
  getEditVariables,
  getDataFields
} from "~/utility/graphql"

export default ({ store }, inject) => {
  const graphqlClient = graphqlClientConstructor(store)
  // make another client without auth headers for logins and signups
  const noAuthClient = graphqlClientConstructor(store, { auth: false })

  const wrapper = {
    client: graphqlClient,
    noAuthClient,
    queries: 0,
    isLoading() {
      return !!this.queries
    },
    queryDirect(name, gql, { multiple = false } = {}) {
      return this.query(name, { query: gql }, { multiple })
    },
    async query(name, q, { multiple = false } = {}) {
      this.queries++
      try {
        const res = await graphqlClient.query(q)
        if (res instanceof Error) {
          throw new Error("Error fetching GraphQL data, " + res) // eslint-disable-line
        }
        this.queries--

        if (multiple) return { data: res.data }
        return { data: res.data[name] }
      } catch (err) {
        this.queries--
        return { err }
      }
    },
    async mutate(name, m) {
      this.queries++
      try {
        const res = await graphqlClient.mutate(m)
        if (res instanceof Error) {
          throw new Error("Error fetching GraphQL data, " + res) // eslint-disable-line
        }
        this.queries--
        return { data: res.data[name] }
      } catch (err) {
        this.queries--
        return {
          err: {
            status: true,
            message: err
          }
        }
      }
    },
    getAll(
      resource,
      [baseFields, relations],
      { onlyFields = "", includeQuery = "" } = {}
    ) {
      const allFields = getFields([baseFields, relations])

      // get all fields unless explicitly overridden
      const fields = onlyFields || allFields

      return this.queryDirect(
        `${resource}sList`,
        gql`
          {
            ${resource}sList {
              items {
                ${fields}
                ${includeQuery}
              }
            }
          }
        `
      )
    },
    addItem(resource, item, [fields, relations], query = "name") {
      const types = getAddTypes([fields, relations])
      const data = getDataFields([fields, relations])
      const variables = getAddVariables(item, relations)

      return this.mutate(`${resource}Create`, {
        mutation: gql`
        mutation(
          ${types}
        ) {
          ${resource}Create(
            data: {
              ${data}
            }
          ) {
            id
            ${query}
          }
        }
      `,
        variables
      })
    },
    updateItem(resource, item, [fields, relations], query = "name") {
      const types = getEditTypes([fields, relations])
      const data = getDataFields([fields, relations])
      const variables = getEditVariables(item, relations)

      return this.mutate(`${resource}Update`, {
        mutation: gql`
        mutation(
          ${types}
        ) {
          ${resource}Update(
            data: {
              ${data}
            }
            filter: { id: $id }
          ) {
            id
            ${query}
          }
        }
      `,
        variables
      })
    },
    removeItem(resource, id, { force = false } = {}) {
      const options = force ? ", force: true" : ""

      return this.mutate(`${resource}Delete`, {
        mutation: gql`
        mutation($id: ID!) {
          ${resource}Delete(data: { id: $id } ${options}) {
            success
          }
        }
      `,
        variables: {
          id
        }
      })
    },
    async getSwitchOptions(id) {
      const { data, err } = await this.query("tableField", {
        query: gql`
          query($id: ID!) {
            tableField(id: $id) {
              fieldType
              fieldTypeAttributes {
                ...switchFrag
              }
            }
          }

          fragment switchFrag on SwitchFieldTypeAttributes {
            format
            listOptions
          }
        `,
        variables: { id }
      })

      if (err) return { data, err }
      return { data: data.fieldTypeAttributes.listOptions, err }
    }
  }

  inject("apollo", Vue.observable(wrapper))
}

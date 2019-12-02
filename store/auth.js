// original implmentation from https://github.com/8base/vuejs-todos-app
import auth from "~/utility/auth_client"

import { getToken, setToken, clearToken } from "~/utility/auth"

const state = () => ({
  idToken: getToken(),
  notificationType: "login"
})

const getters = {
  token: ({ idToken }) => idToken,
  authenticated: ({ idToken }) => !!idToken
}

const mutations = {
  authenticated(state, { idToken }) {
    state.idToken = idToken
    setToken(idToken)
  },
  logout(state) {
    state.idToken = null
    clearToken()
  },
  notify(state, str) {
    state.notificationType = str
  }
}

const actions = {
  login(state, startPage = "/") {
    localStorage.setItem("startPage", startPage)
    auth.authorize()
    // don't need to commit 'login' or equivalent in this step
    // because this kicks off login process and will continue with handleAuthentication call from callback page
  },
  logout({ commit }) {
    auth.logout()
    commit("logout")
  },
  async handleAuthentication({ commit }) {
    const authResult = await auth.getAuthorizedData()
    commit("authenticated", authResult)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

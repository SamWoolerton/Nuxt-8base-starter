export const getToken = () => localStorage.getItem("id_token")
export const setToken = token => localStorage.setItem("id_token", token)
export const clearToken = () => localStorage.removeItem("id_token")

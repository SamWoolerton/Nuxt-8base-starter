export const pages = {
  app: [
    {
      title: "Welcome",
      to: "/",
      auth: false
    },
    {
      title: "Contacts",
      to: "/app/contacts"
    }
  ],
  reports: [
    {
      title: "Contact counts",
      to: "/reports/contacts"
    }
  ]
}

export const notificationOptions = {
  redirect: {
    color: "info",
    message: "You're not authorised to access that page"
  },
  loginComplete: { color: "success", message: "Logged in successfully" },
  logoutComplete: { color: "success", message: "Logged out successfully" },
  tokenExpired: {
    color: "info",
    message: "Your session has expired, so you'll be logged out"
  }
}

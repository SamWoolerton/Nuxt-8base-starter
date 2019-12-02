const unprotectedPages = [
  "/",
  "/auth/callback",
  "/auth/callback/",
  "/logout",
  "/logout/"
]

export default function(ctx) {
  const authenticated = ctx.store.getters["auth/authenticated"]
  const authenticatedPage = !unprotectedPages.includes(ctx.route.path) // basic but works for now so can make it more comprehensive later
  if (!authenticated && authenticatedPage) {
    ctx.store.commit("auth/notify", "redirect")
    return ctx.redirect("/")
  }
}

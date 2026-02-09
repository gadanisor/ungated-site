export default defineNuxtRouteMiddleware(async () => {
  const client = useSupabaseClient()

  // cere session-ul real (nu doar ref-ul care se hidratează)
  const { data, error } = await client.auth.getSession()
  if (error) return

  if (data.session) {
    return navigateTo('/dashboard')
  }
})

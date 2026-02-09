export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser()

  if (import.meta.client && user.value === undefined) {
    await nextTick()
  }

  if (!user.value) return navigateTo('/login')
})

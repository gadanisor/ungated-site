// composables/useMyProjects.ts
export const useMyProjects = () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  return useAsyncData(
    'projects',
    async () => {
      if (!user.value) return []

      const { data, error } = await client
        .from('project_members_with_profiles')
        .select('*')
        .eq('user_id', user.value.id)

      if (error) throw error
      return data
    },
    { watch: [user] }
  )
}

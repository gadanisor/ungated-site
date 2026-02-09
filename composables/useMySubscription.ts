type MySubscription = {
  plan: string | null
  status: string | null
  current_period_end?: string | null
}

export const useMySubscription = () => {
  const client = useSupabaseClient()

  return useAsyncData<MySubscription | null>('subscription', async () => {
    const { data, error } = await client
      .from('my_subscription')
      .select('*')
      .single()

    if (error) return null
    return data as MySubscription
  })
}

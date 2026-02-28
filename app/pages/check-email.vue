<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Check your email',
  description: 'A confirmation link has been sent to your email'
})

const router = useRouter()
const toast = useToast()
const { resendConfirmationEmail } = useSupabaseAuth()
const email = ref('')
const isResending = ref(false)

onMounted(() => {
  email.value = sessionStorage.getItem('signup_email') || ''
})

const resendEmail = async () => {
  try {
    if (!email.value) {
      toast.add({
        title: 'Error',
        description: 'Email not found. Please try signing up again.',
        color: 'error'
      })
      return
    }
    
    isResending.value = true
    await resendConfirmationEmail(email.value)
    toast.add({
      title: 'Email sent',
      description: `A confirmation email has been resent to ${email.value}`
    })
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.message,
      color: 'error'
    })
  } finally {
    isResending.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center">
        <div class="flex justify-center mb-4">
          <UIcon name="i-lucide-mail" class="w-12 h-12 text-primary" />
        </div>
        <h1 class="text-3xl font-bold mb-2">Check your email</h1>
        <p class="text-gray-600 dark:text-gray-400">
          We've sent a confirmation link to <span class="font-semibold">{{ email }}</span>
        </p>
      </div>

      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Click the link in the email to confirm your account. The link will expire in 24 hours.
        </p>
      </div>

      <div class="space-y-3">
        <UButton
          block
          size="lg"
          @click="goToLogin"
        >
          Back to login
        </UButton>

        <UButton
          block
          variant="soft"
          size="lg"
          :loading="isResending"
          @click="resendEmail"
        >
          Resend confirmation email
        </UButton>
      </div>

      <p class="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
        Already confirmed? <ULink
          to="/login"
          class="text-primary font-medium"
        >Login here</ULink>.
      </p>
    </div>
  </div>
</template>

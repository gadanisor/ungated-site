<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Confirm email',
  description: 'Confirm your email address'
})

const router = useRouter()
const route = useRoute()
const toast = useToast()
const { confirmEmail, resendConfirmationEmail } = useSupabaseAuth()

const isLoading = ref(false)
const isConfirmed = ref(false)
const hasError = ref(false)
const email = ref('')

useSeoMeta({
  title: 'Email confirmed',
  description: 'Your email has been confirmed successfully'
})

onMounted(async () => {
  // Get the confirmation token from URL hash (Supabase sends it as #access_token=...)
  const hash = window.location.hash
  const token = new URLSearchParams(hash.substring(1)).get('access_token')
  
  // Also check for token in query params as fallback
  const queryToken = route.query.token as string
  
  email.value = sessionStorage.getItem('signup_email') || ''
  
  if (token || queryToken) {
    await handleConfirmation(token || queryToken)
  } else {
    hasError.value = true
    toast.add({
      title: 'Error',
      description: 'No confirmation token provided',
      color: 'error'
    })
  }
})

const handleConfirmation = async (token: string) => {
  try {
    isLoading.value = true
    await confirmEmail(token, 'email')
    isConfirmed.value = true
    
    toast.add({
      title: 'Success',
      description: 'Your email has been confirmed successfully'
    })
    
    // Clear the email from storage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('signup_email')
    }
    
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  } catch (error: any) {
    hasError.value = true
    toast.add({
      title: 'Error',
      description: error.message || 'Failed to confirm email',
      color: 'error'
    })
  } finally {
    isLoading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}

const goToDashboard = () => {
  router.push('/dashboard')
}

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
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4">
    <div class="w-full max-w-md">
      <div v-if="isConfirmed" class="text-center">
        <div class="flex justify-center mb-4">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20">
            <UIcon name="i-lucide-check" class="w-8 h-8 text-green-600" />
          </div>
        </div>
        <h1 class="text-3xl font-bold mb-2">Email confirmed</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          Your email has been verified successfully. Redirecting to dashboard...
        </p>

        <UButton
          block
          size="lg"
          @click="goToDashboard"
        >
          Go to dashboard
        </UButton>
      </div>

      <div v-else-if="isLoading" class="text-center">
        <div class="flex justify-center mb-4">
          <UIcon name="i-lucide-loader" class="w-12 h-12 text-primary animate-spin" />
        </div>
        <h1 class="text-2xl font-bold mb-2">Confirming your email</h1>
        <p class="text-gray-600 dark:text-gray-400">
          Please wait while we verify your email address...
        </p>
      </div>

      <div v-else class="text-center">
        <div class="flex justify-center mb-4">
          <UIcon name="i-lucide-alert-circle" class="w-12 h-12 text-red-600" />
        </div>
        <h1 class="text-2xl font-bold mb-2">Confirmation failed</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          The confirmation link is invalid or has expired.
        </p>

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
            @click="resendEmail"
          >
            Request new confirmation
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserProfile } from '~/composables/useSupabaseAuth'

useSeoMeta({
  title: 'Dashboard',
  description: 'Your account dashboard'
})

const router = useRouter()
const toast = useToast()
const { getUser, getProfile, signOut, supabase } = useSupabaseAuth()

const user = ref<any>(null)
const profile = ref<UserProfile | null>(null)
const isLoading = ref(true)
const isSavingProfile = ref(false)

const editMode = ref(false)
const editForm = ref({
  name: '',
  username: '',
  avatar_url: ''
})

onMounted(async () => {
  try {
    isLoading.value = true

    // first try to fetch the user from the server (auth.getUser())
    let currentUser = await getUser()

    // if the API returned null we may still have a valid session stored
    // locally; this can happen during an OAuth callback race.  fall back to
    // checking getSession() and use the user from there before giving up.
    if (!currentUser) {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        currentUser = session.user
      }
    }

    if (!currentUser) {
      await router.push('/login')
      return
    }

    user.value = currentUser

    const userProfile = await getProfile(currentUser.id)
    profile.value = userProfile

    if (userProfile) {
      editForm.value = {
        name: userProfile.name,
        username: userProfile.username,
        avatar_url: userProfile.avatar_url
      }
    }
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: 'Failed to load profile',
      color: 'error'
    })
    await router.push('/login')
  } finally {
    isLoading.value = false
  }
})

const handleSignOut = async () => {
  try {
    await signOut()
    await router.push('/login')
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.message,
      color: 'error'
    })
  }
}

const saveProfile = async () => {
  if (!user.value || !profile.value) return

  try {
    isSavingProfile.value = true
    await useSupabaseAuth().updateProfile(user.value.id, {
      name: editForm.value.name,
      username: editForm.value.username,
      avatar_url: editForm.value.avatar_url
    })

    profile.value.name = editForm.value.name
    profile.value.username = editForm.value.username
    profile.value.avatar_url = editForm.value.avatar_url

    editMode.value = false
    toast.add({
      title: 'Success',
      description: 'Profile updated successfully'
    })
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.message,
      color: 'error'
    })
  } finally {
    isSavingProfile.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="p-6 max-w-4xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">
            Manage your account settings and profile
          </p>
        </div>
        <UButton
          color="error"
          variant="soft"
          @click="handleSignOut"
        >
          Sign Out
        </UButton>
      </div>

      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="flex justify-center items-center py-12"
      >
        <div class="animate-spin">
          <Icon name="lucide:loader" class="w-8 h-8 text-primary" />
        </div>
      </div>

      <!-- Profile Card -->
      <template v-else>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div class="flex items-start justify-between mb-6">
            <div class="flex items-center gap-4">
              <div
                v-if="profile?.avatar_url"
                class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden"
              >
                <img
                  :src="profile.avatar_url"
                  :alt="profile.name"
                  class="w-full h-full object-cover"
                >
              </div>
              <div
                v-else
                class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <Icon name="lucide:user" class="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                  {{ profile?.name || 'User' }}
                </h2>
                <p class="text-gray-600 dark:text-gray-400">
                  @{{ profile?.username }}
                </p>
              </div>
            </div>
            <UButton
              v-if="!editMode"
              @click="editMode = true"
            >
              Edit Profile
            </UButton>
          </div>

          <!-- Edit Mode -->
          <div
            v-if="editMode"
            class="space-y-4 border-t pt-6"
          >
            <UFormGroup label="Full Name">
              <UInput
                v-model="editForm.name"
                placeholder="Enter your full name"
              />
            </UFormGroup>

            <UFormGroup label="Username">
              <UInput
                v-model="editForm.username"
                placeholder="Enter your username"
              />
            </UFormGroup>

            <UFormGroup label="Avatar URL">
              <UInput
                v-model="editForm.avatar_url"
                placeholder="Enter avatar image URL"
              />
            </UFormGroup>

            <div class="flex gap-2">
              <UButton
                @click="saveProfile"
                :loading="isSavingProfile"
              >
                Save Changes
              </UButton>
              <UButton
                color="secondary"
                @click="editMode = false"
              >
                Cancel
              </UButton>
            </div>
          </div>
        </div>

        <!-- Profile Details Grid -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Email -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div class="flex items-center gap-3 mb-2">
              <Icon name="lucide:mail" class="w-5 h-5 text-primary" />
              <h3 class="font-semibold text-gray-900 dark:text-white">Email</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              {{ user?.email || profile?.email }}
            </p>
          </div>

          <!-- Plan -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div class="flex items-center gap-3 mb-2">
              <Icon name="lucide:zap" class="w-5 h-5 text-primary" />
              <h3 class="font-semibold text-gray-900 dark:text-white">Plan</h3>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-gray-600 dark:text-gray-400 capitalize">
                {{ profile?.plan || 'free' }}
              </p>
              <UBadge v-if="profile?.plan === 'free'" color="neutral">
                Free
              </UBadge>
              <UBadge v-else color="primary">
                Premium
              </UBadge>
            </div>
          </div>

          <!-- Billing Status -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div class="flex items-center gap-3 mb-2">
              <Icon name="lucide:credit-card" class="w-5 h-5 text-primary" />
              <h3 class="font-semibold text-gray-900 dark:text-white">
                Billing Status
              </h3>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-gray-600 dark:text-gray-400 capitalize">
                {{ profile?.billing_status || 'inactive' }}
              </p>
              <UBadge
                v-if="profile?.billing_status === 'active'"
                color="success"
              >
                Active
              </UBadge>
              <UBadge v-else color="neutral">
                Inactive
              </UBadge>
            </div>
          </div>

          <!-- Member Since -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div class="flex items-center gap-3 mb-2">
              <Icon name="lucide:calendar" class="w-5 h-5 text-primary" />
              <h3 class="font-semibold text-gray-900 dark:text-white">
                Member Since
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              {{ profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'N/A' }}
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

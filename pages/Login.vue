<script setup lang="ts">

import {useIsLoadingStore} from "~/store/auth";
import {useAuthStore} from "~/store/auth";
import {v4 as uuid} from 'uuid';

const emailRef = ref('')
const passwordRef = ref('')
const nameRef = ref('')

const router = useRouter();
const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const errors = ref<string | null>(null)

const emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
const passwordRegex = '^.{8,}$'

const login = async () => {

  if (!emailRef.value || !passwordRef.value) {
    errors.value = 'Please enter email and password'
    return
  } else if (!emailRef.value.match(emailRegex)) {
    errors.value = 'Please enter valid email'
    return
  } else if (!passwordRef.value.match(passwordRegex)) {
    errors.value = 'Password must be at least 8 characters'
    return
  }


  try {
    await account.createEmailSession(emailRef.value, passwordRef.value)
    const response = await account.get()
    if (response) {
      isLoadingStore.set(true)
      authStore.set({
        email: response.email,
        name: response.name,
        status: response.status
      })
      emailRef.value = ''
      passwordRef.value = ''
      nameRef.value = ''
      await router.push('/')
    }
  } catch (error) {
    errors.value = 'Invalid email or password'
  } finally {
    isLoadingStore.set(false)
  }
}


const register = async () => {
  errors.value = null

  if (!emailRef.value || !passwordRef.value) {
    errors.value = 'Please enter email and password'
    return
  } else if (!emailRef.value.match(emailRegex)) {
    errors.value = 'Please enter valid email'
    return
  } else if (!passwordRef.value.match(passwordRegex)) {
    errors.value = 'Password must be at least 6 characters'
    return
  }
  await account.create(uuid(), emailRef.value, passwordRef.value, nameRef.value)
  await login();
}

useHead({
  title: 'Login | CRM System'
})
</script>


<template>
    <div class="flex items-center justify-center min-h-screen w-full">
      <div class="rounded bg-sidebar xl:w-1/4 min-md:w-1/2 p-5">
        <h1 class="font-bold text-2xl mb-5 text-center">Login</h1>

        <form>
            <UiInput @input="errors=null" v-model="emailRef" placeholder="Email" type="email"  class="mb-3" />
            <UiInput @input="errors=null" v-model="passwordRef" placeholder="Password" type="password"  class="mb-3" />
            <UiInput @input="errors=null" v-model="nameRef" placeholder="Name" type="name"  class="mb-3" />

            <span v-if="errors">
                <p class="text-red-800">
                  * {{errors}}
                </p>
            </span>

          <div class="flex items-center gap-3 justify-start mt-4 flex-wrap">
              <UiButton @click="login" variant="ghost" type="button">Login</UiButton>
              <UiButton @click="register" variant="ghost" type="button">Register</UiButton>
          </div>
        </form>
      </div>
    </div>
</template>


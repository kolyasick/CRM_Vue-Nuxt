<script setup>

import {useIsLoadingStore} from "~/store/auth.ts";
import {useAuthStore} from "~/store/auth.ts";
import {v4 as uuid} from 'uuid';

const emailRef = ref('')
const passwordRef = ref('')
const nameRef = ref('')

const router = useRouter();
const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();

const login = async () => {
  isLoadingStore.set(true)
  await account.createEmailSession(emailRef.value, passwordRef.value)
  const response = await account.get();
  if (response) {
    authStore.set({
      email: response.email,
      name: response.name,
      status: response.status
  })
    emailRef.value = ''
    passwordRef.value = ''
    nameRef.value = ''

    await router.push('/')
    isLoadingStore.set(false)
}}

const register = async () => {
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
            <UiInput v-model="emailRef" placeholder="Email" type="email"  class="mb-3" />
            <UiInput v-model="passwordRef" placeholder="Password" type="password"  class="mb-3" />
            <UiInput v-model="nameRef" placeholder="Name" type="name"  class="mb-3" />

          <div class="flex items-center gap-3 justify-start mt-4 flex-wrap">
              <UiButton @click="login" variant="ghost" type="button">Login</UiButton>
              <UiButton @click="register" variant="ghost" type="button">Register</UiButton>
          </div>
        </form>
      </div>
    </div>
</template>


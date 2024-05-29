<template>
  <LayoutLoader v-if="isLoadingStore.isLoading"/>
    <section v-else :class="{grid: authStore.isAuth}" style="min-height: 100vh">
        <aside>
            <LayoutSidebar v-if="authStore.isAuth"/>
        </aside>
        <div>
            <slot />
        </div>
    </section>
</template>

<script setup>
import {account} from "~/utils/appwrite.ts";
import {useIsLoadingStore, useAuthStore} from "~/store/auth.ts";

const router = useRouter();
const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();

onMounted(async () => {
   try {
     const user = await account.get()
     if (user) {
        authStore.set(user)
     }
   } catch(e) {
     await router.push('/login')
   }
   finally {
     isLoadingStore.set(false)
   }
})

</script>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: 1fr 6fr;
}


@media (max-width: 640px) {
  .grid{
    grid-template-columns: 6fr;
  }
}

</style>

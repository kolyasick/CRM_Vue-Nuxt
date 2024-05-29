<template>
    <div class="burger-menu p-5">
        <Icon size="40" name="iconamoon:menu-burger-horizontal-bold" label="Open" @click="isOpen = true" />

        <USlideover style="width: 200px;" side="left" v-model="isOpen">
            <div class="p-4 flex-1 bg-sidebar">
                <NuxtLink to="/" class="mb-10 block">
                    <NuxtImg src="/logo.svg" width="120px" class="mx-auto"/>
                </NuxtLink>

                <button @click="logout" class="absolute top-2 right-3 transition-colors hover:text-purple-400">
                    <Icon name="line-md:logout" size="25px" />
                </button>

                <LayoutMenu/>
            </div>
        </USlideover>
  </div>
    <aside class="sidebar px-5 py-8 bg-input h-full relative w-full">
        <NuxtLink to="/" class="mb-10 block">
            <NuxtImg src="/logo.svg" width="120px" class="mx-auto"/>
        </NuxtLink>

        <button @click="logout" class="absolute top-2 right-3 transition-colors hover:text-purple-400">
            <Icon name="line-md:logout" size="25px" />
        </button>

        <LayoutMenu/>

    </aside>
</template>

<script setup>
const isOpen = ref(false)
const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
    isLoadingStore.set(true)
    await account.deleteSession('current')
    authStore.clear()
    await router.push('/login')
    isLoadingStore.set(false)

}
</script>

<style>

.burger-menu{
    display: none;
}

@media (max-width: 640px) {
    .burger-menu{
        display: block;
    }
    .sidebar{
        display: none;
    }
}

</style>

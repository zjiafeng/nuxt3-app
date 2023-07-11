<template>
    <NConfigProvider inline-theme-disabled :theme="theme">
        <NuxtLayout>
            <NuxtPage>
            </NuxtPage>
        </NuxtLayout>
        <NGlobalStyle />
    </NConfigProvider>
</template>
<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, useOsTheme, darkTheme } from 'naive-ui'
import { useGlobalStore } from '@/stores'
const globalConfig = useGlobalStore().state.globalConfig
if (!globalConfig.domain) {
    useGlobalStore().nuxtServerInit()
}
const osThemeRef = useOsTheme()
const theme = computed(() => (osThemeRef.value === 'dark' ? darkTheme : null))
useHead({
    titleTemplate: (productCategory) => {
        return productCategory
            ? `${productCategory} - Site Title`
            : 'Site Title'
    }
})

useServerSeoMeta({
    title: '网站标题',
    ogTitle: '网站标题',
    description: '这是我的神奇网站，让我告诉您所有相关信息。',
    ogDescription: '这是我的神奇网站，让我告诉您所有相关信息。',
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',
})
</script>
<style lang="scss">
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>
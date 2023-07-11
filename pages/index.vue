<template>
    <div>
        <h1>欢迎来到主页</h1>
        <NuxtLink to="/about">About page</NuxtLink>
        <n-pagination v-model:page="page" :page-count="100" show-quick-jumper>
            <template #goto>
                请回答
            </template>
        </n-pagination>
    </div>
</template>

<script lang="ts" setup>
import { NPagination } from 'naive-ui'


const page = ref(1)
</script>
<template>
    <i class="iconfont" :class="type"></i>
</template>

<script lang="ts" setup>
const props = defineProps({
    type: {
        type: String,
        default: ''
    }
})
</script>
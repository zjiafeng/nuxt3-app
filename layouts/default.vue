<template>
    <div id="app">
        <app-header />
        <slot />
    </div>
</template>

<script lang="ts" setup>
import AppHeader from './components/appHeader.vue';
</script>
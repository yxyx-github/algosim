<template>
    <FColumn class="relative z-0 bg-bg h-screen">
        <RouterView/>
    </FColumn>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import FColumn from '@/components/lib/flex/FColumn.vue'
</script>

<template>
    <FColumn class="relative z-0 bg-bg h-screen">
        <MainNavigation/>
        <FColumn :is="ContentBox">
            <RouterView/>
        </FColumn>
    </FColumn>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import FColumn from '@/components/lib/layout/FColumn.vue'
import MainNavigation from '@/components/app/MainNavigation.vue'
import ContentBox from '@/components/lib/layout/ContentBox.vue'
</script>

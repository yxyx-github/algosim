<template>
    <Menubar :model="itemsWithHighlighting" :exact="false"/>
</template>

<script setup lang="ts">
import Menubar from 'primevue/menubar'
import { computed, ref } from 'vue'
import type { MenuItem } from 'primevue/menuitem'
import router from '@/router'

interface NavMenuItem extends MenuItem {
    name: string
}

const items: NavMenuItem[] = [
    {
        label: 'Home',
        name: 'home',
    }, {
        label: 'Sorting Algorithms',
        name: 'sort',
    }, {
        label: 'Search Algorithms',
        name: 'search',
        // class: 'p-highlight',
    }
]

function selectRoute(name: string) {
    router.push({ name: name })
}

const itemsWithHighlighting = computed(() => items.map(item => (
    {
        command: () => router.push({ name: item.name }),
        ...item,
        class: router.currentRoute.value.name === item.name ? 'p-highlight' : '',
    }
)))
</script>

<style scoped>
</style>

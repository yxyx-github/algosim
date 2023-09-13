<template>
    <svg viewBox="0 0 9 9">
        <rect x="0" y="0" width="2" height="2" class="corner"/>
        <rect x="2" y="0" width="5" height="2" class="border"/>
        <rect x="4" y="0" width="1" height="2" class="connection"/>
        <rect x="4" y="0" width="1" height="5" class="connected"/>

        <rect x="7" y="0" width="2" height="2" class="corner"/>
        <rect x="7" y="2" width="2" height="5" class="border"/>
        <rect x="7" y="4" width="2" height="1" class="connection"/>
        <rect x="4" y="4" width="5" height="1" class="connected"/>

        <rect x="7" y="7" width="2" height="2" class="corner"/>
        <rect x="2" y="7" width="5" height="2" class="border"/>
        <rect x="4" y="7" width="1" height="2" class="connection"/>
        <rect x="4" y="4" width="1" height="5" class="connected"/>

        <rect x="0" y="7" width="2" height="2" class="corner"/>
        <rect x="0" y="2" width="2" height="5" class="border"/>
        <rect x="0" y="4" width="2" height="1" class="connection"/>
        <rect x="0" y="4" width="5" height="1" class="connected"/>
    </svg>
</template>

<script setup lang="ts">
import type { GraphFormItem } from '@/main/algorithms/search/graphForm/types'

const props = defineProps<{
    item: GraphFormItem,
}>()
</script>

<style scoped>
.corner, .border {
    fill: #000000;
}
.connection, .connected {
    fill: #ff0000;
}
</style>

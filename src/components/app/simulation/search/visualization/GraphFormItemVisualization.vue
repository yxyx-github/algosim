<template>
    <svg viewBox="0 0 90 90">
        <rect x="0" y="0" width="20" height="20" class="corner"/>
        <rect x="20" y="0" width="50" height="20" class="border"/>
        <rect x="40" y="0" width="10" height="20" class="connection"/>
        <rect x="40" y="0" width="10" height="50" class="connected"/>

        <rect x="70" y="0" width="20" height="20" class="corner"/>
        <rect x="70" y="20" width="20" height="50" class="border"/>
        <rect x="70" y="40" width="20" height="10" class="connection"/>
        <rect x="40" y="40" width="50" height="10" class="connected"/>

        <rect x="70" y="70" width="20" height="20" class="corner"/>
        <rect x="20" y="70" width="50" height="20" class="border"/>
        <rect x="40" y="70" width="10" height="20" class="connection"/>
        <rect x="40" y="40" width="10" height="50" class="connected"/>

        <rect x="0" y="70" width="20" height="20" class="corner"/>
        <rect x="0" y="20" width="20" height="50" class="border"/>
        <rect x="0" y="40" width="20" height="10" class="connection"/>
        <rect x="0" y="40" width="50" height="10" class="connected"/>

        <text x="45" y="45" class="label">label</text>
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
.label {
    dominant-baseline: middle;
    text-anchor: middle;
}
</style>

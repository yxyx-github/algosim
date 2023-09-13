<template>
    <svg :width="size" :height="size" viewBox="0 0 90 90">
        <rect x="0" y="0" width="90" height="90" class="wrapper"/>

        <rect x="0" y="0" width="20" height="20" class="corner"/>
        <rect v-if="!props.item.connections.top" x="20" y="0" width="50" height="20" class="border"/>
        <rect v-if="props.item.highlight.top" x="40" y="0" width="10" height="20" class="highlighted"/>
        <rect v-if="props.item.connect.top" x="40" y="0" width="10" height="50" class="connected"/>

        <rect x="70" y="0" width="20" height="20" class="corner"/>
        <rect v-if="!props.item.connections.right" x="70" y="20" width="20" height="50" class="border"/>
        <rect v-if="props.item.highlight.right" x="70" y="40" width="20" height="10" class="highlighted"/>
        <rect v-if="props.item.connect.right" x="40" y="40" width="50" height="10" class="connected"/>

        <rect x="70" y="70" width="20" height="20" class="corner"/>
        <rect v-if="!props.item.connections.bottom" x="20" y="70" width="50" height="20" class="border"/>
        <rect v-if="props.item.highlight.bottom" x="40" y="70" width="10" height="20" class="highlighted"/>
        <rect v-if="props.item.connect.bottom" x="40" y="40" width="10" height="50" class="connected"/>

        <rect x="0" y="70" width="20" height="20" class="corner"/>
        <rect v-if="!props.item.connections.left" x="0" y="20" width="20" height="50" class="border"/>
        <rect v-if="props.item.highlight.left" x="0" y="40" width="20" height="10" class="highlighted"/>
        <rect v-if="props.item.connect.left" x="0" y="40" width="50" height="10" class="connected"/>

        <text x="45" y="45" class="label">{{ props.item.label }}</text>
    </svg>
</template>

<script setup lang="ts">
import type { GraphFormItem } from '@/main/algorithms/search/graphForm/types'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
    item: GraphFormItem,
    scale?: number,
}>(), {
    scale: 1,
})

const size = computed(() => `${props.scale * 9}rem`)
</script>

<style scoped>
.wrapper {
    fill: #dddddd;
}
.corner, .border {
    fill: #000000;
}
.highlighted, .connected {
    fill: #ff0000;
}
.label {
    dominant-baseline: middle;
    text-anchor: middle;
}
</style>

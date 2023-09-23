<template>
    <svg :class="maxHeight" :style="`max-height: ${maxHeight}`" :viewBox="`0 0 ${viewBoxWidth} ${viewBoxHeight}`">
        <rect
                v-for="(value, index) in props.step.sortedValues"
                :key="index"
                :x="index"
                :y="viewBoxHeight - value.value"
                width="1"
                :height="value.value"
                :fill="value.displayColor"
        />
    </svg>
</template>

<script setup lang="ts">
import type { SortSimulationStep } from '@/main/algorithms/sort/types'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
    step: SortSimulationStep
    scale?: number
    maxHeight?: string
}>(), {

    scale: 1,
})

const maxValue = computed(() => Math.max(...props.step.sortedValues.map(value => value.value)))
const viewBoxWidth = computed(() => props.step.sortedValues.length)
const viewBoxHeight = computed(() => maxValue.value)
const maxSelfHeight = computed(() => viewBoxHeight.value * props.scale)
const maxHeight = computed(() => props.maxHeight === undefined ? `${maxSelfHeight.value}rem` : `min(${props.maxHeight},${maxSelfHeight.value}rem)`)
</script>

<style scoped>

</style>

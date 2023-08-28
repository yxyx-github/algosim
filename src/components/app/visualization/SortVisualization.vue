<template>
    <svg :style="`max-height: ${maxHeight}rem;`" :viewBox="`0 0 ${viewBoxWidth} ${viewBoxHeight}`">
        <rect
                v-for="(value, index) in props.step.sortedValues"
                :key="index"
                :x="index"
                :y="viewBoxHeight - value"
                width="1"
                :height="value"
                :fill="isHighlighted(index) ? props.highlightColor : props.neutralColor"
        />
    </svg>
</template>

<script setup lang="ts">
import type { SortSimulationStep } from '@/algorithms/sort'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
    step: SortSimulationStep
    scale?: number
    neutralColor?: string
    highlightColor?: string
}>(), {
    neutralColor: '#8b8b8b',
    highlightColor: '#ff0000',
    scale: 1,
})

const maxValue = computed(() => Math.max(...props.step.sortedValues))
const viewBoxWidth = computed(() => props.step.sortedValues.length)
const viewBoxHeight = computed(() => maxValue.value)
const maxHeight = computed(() => viewBoxHeight.value * props.scale)

function isHighlighted(index: number): boolean {
    return props.step.highlightedIndices.includes(index)
}
</script>

<style scoped>
</style>

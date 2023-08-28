<template>
    <svg :viewBox="`0 0 ${width} ${height}`">
        <rect
                v-for="(value, index) in props.step.sortedValues"
                :key="index"
                :x="index"
                :y="height - value"
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
    neutralColor?: string
    highlightColor?: string
}>(), {
    neutralColor: '#8b8b8b',
    highlightColor: '#ff0000',
})

const maxValue = computed(() => Math.max(...props.step.sortedValues))
const width = computed(() => props.step.sortedValues.length)
const height = computed(() => maxValue.value)

function isHighlighted(index: number): boolean {
    return props.step.highlightedIndices.includes(index)
}
</script>

<style scoped>
</style>

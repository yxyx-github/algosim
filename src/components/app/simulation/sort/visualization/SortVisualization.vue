<template>
    <svg :class="maxHeight" :style="`max-height: ${maxHeight}`" :viewBox="`0 0 ${viewBoxWidth} ${viewBoxHeight}`">
        <rect
                v-for="(value, index) in props.step.sortedValues"
                :key="index"
                :x="index"
                :y="viewBoxHeight - value"
                width="1"
                :height="value"
                :fill="fill(index)"
        />
    </svg>
</template>

<script setup lang="ts">
import type { SortSimulationStep, HighlightColor, SortColors } from '@/main/algorithms/sort/types'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
    step: SortSimulationStep
    scale?: number
    colors?: SortColors
    maxHeight?: string
}>(), {
    colors: () => ({}),
    scale: 1,
})

const maxValue = computed(() => Math.max(...props.step.sortedValues))
const viewBoxWidth = computed(() => props.step.sortedValues.length)
const viewBoxHeight = computed(() => maxValue.value)
const maxSelfHeight = computed(() => viewBoxHeight.value * props.scale)
const maxHeight = computed(() => props.maxHeight === undefined ? `${maxSelfHeight.value}rem` : `min(${props.maxHeight},${maxSelfHeight.value}rem)`)

const mergedColors = computed(() => ({
    current: '#ff0000',
    threshold: '#000000',
    neutral: '#8b8b8b',
    ...props.colors,
}))

function fill(index: number): string {
    const highlightType: HighlightColor = props.step.highlightedIndices.find(highlightedIndex => highlightedIndex.index === index)?.type ?? 'neutral'
    return mergedColors.value[highlightType]
}
</script>

<style scoped>
</style>

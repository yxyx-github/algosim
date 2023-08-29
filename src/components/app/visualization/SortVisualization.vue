<template>
    <svg :style="`max-height: ${maxHeight}rem;`" :viewBox="`0 0 ${viewBoxWidth} ${viewBoxHeight}`">
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
import type { SortSimulationStep } from '@/algorithms/sort'
import { computed } from 'vue'
import type { HighlightColor, SortColors } from '@/algorithms/sort/types'

const props = withDefaults(defineProps<{
    step: SortSimulationStep
    scale?: number
    colors?: SortColors
}>(), {
    colors: {},
    scale: 1,
})

const maxValue = computed(() => Math.max(...props.step.sortedValues))
const viewBoxWidth = computed(() => props.step.sortedValues.length)
const viewBoxHeight = computed(() => maxValue.value)
const maxHeight = computed(() => viewBoxHeight.value * props.scale)

const mergedColors = computed(() => ({
    current: '#ff0000',
    threshold: '#000000',
    neutral: '#8b8b8b',
    ...props.colors,
}))

function fill(index: number): string {
    const highlightType: HighlightColor = props.step.highlightedIndices.find(highlightedIndex => highlightedIndex.index === index)?.type ?? 'neutral'
    console.log('i:', index, 'hT:', highlightType)
    return mergedColors.value[highlightType]
}
</script>

<style scoped>
</style>

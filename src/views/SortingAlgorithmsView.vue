<template>
    <SimulationLayout>
        <template #form>
            Form to configure algorithm
        </template>
        <template #simulation>
            <SimulationView :simulation="simulation">
                <template #step="{ stepData, index }">
                    <SortVisualizationAlt :simulation="simulation" :step="index"/>
                    <SortVisualization :step="stepData" style="max-height: 80vh"/>
                </template>
            </SimulationView>
        </template>
    </SimulationLayout>
</template>

<script setup lang="ts">
import SimulationLayout from '@/components/app/SimulationLayout.vue'
import SimulationView from '@/components/app/simulation/SimulationView.vue'
import { ref } from 'vue'
import type { SortSimulation, SortSimulationStep } from '@/algorithms/sort'
import { SortVisualiser } from '@/visualisation/sortVisualiser'
import SortVisualization from '@/components/app/visualization/SortVisualization.vue'
import SortVisualizationAlt from '@/components/app/visualization/SortVisualizationAlt.vue'

const simulation = ref({
    steps: [
        { sortedValues: [3, 4, 2, 7], highlightedIndices: [0, 1, 3] },
        { sortedValues: [3, 2, 4, 7], highlightedIndices: [1, 2, 3] },
        { sortedValues: [3, 2, 4, 7], highlightedIndices: [2, 3, 3] },
        { sortedValues: [2, 3, 4, 7], highlightedIndices: [0, 1, 2] },
        { sortedValues: [2, 3, 4, 7], highlightedIndices: [1, 2, 2] },
        { sortedValues: [2, 3, 4, 7], highlightedIndices: [0, 1, 1] },
    ],
    result: { sortedValues: [2, 3, 4, 7] }
} as SortSimulation)
</script>

<style scoped>
</style>

<template>
    <SimulationLayout>
        <template #form>
            Form to configure algorithm
        </template>
        <template #simulation>
            <SimulationView :simulation="simulation">
                <template #step="{ stepData }">
                    <SortVisualization :step="(stepData as SortSimulationStep)" class="h-full max-h-[calc(100vh-137px)]"/>
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
import SortVisualization from '@/components/app/visualization/SortVisualization.vue'

const simulation = ref({
    steps: [
        { sortedValues: [3, 4, 2, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }, { type: 'threshold', index: 3 }] },
        { sortedValues: [3, 2, 4, 7], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 2 }, { type: 'threshold', index: 3 }] },
        { sortedValues: [3, 2, 4, 7], highlightedIndices: [{ type: 'current', index: 2 }, { type: 'current', index: 3 }, { type: 'threshold', index: 3 }] },
        { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }, { type: 'threshold', index: 2 }] },
        { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 2 }, { type: 'threshold', index: 2 }] },
        { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }, { type: 'threshold', index: 1 }] },
    ],
    result: { sortedValues: [2, 3, 4, 7] }
} as SortSimulation)
</script>

<style scoped>
</style>

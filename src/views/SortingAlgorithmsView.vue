<template>
    <SimulationLayout>
        <template #form>
            Form to configure algorithm
        </template>
        <template #simulation>
            <SimulationView :simulation="simulation">
                <template #step="{ stepData }">
                    Visual simulation
                    {{ (stepData as SortSimulationStep).sortedValues }}
                </template>
            </SimulationView>
        </template>
    </SimulationLayout>
</template>

<script setup lang="ts">
import SimulationLayout from '@/components/app/SimulationLayout.vue'
import SimulationView from '@/components/app/simulationView/SimulationView.vue'
import { ref } from 'vue'
import type { SortSimulation, SortSimulationStep } from '@/algorithms/sort'

const simulation = ref({
    steps: [
        {
            sortedValues: [1, 4, 3, 2],
            highlightedIndices: [],
        }, {
            sortedValues: [1, 3, 4, 2],
            highlightedIndices: [],
        }, {
            sortedValues: [1, 3, 2, 4],
            highlightedIndices: [],
        }, {
            sortedValues: [1, 2, 3, 4],
            highlightedIndices: [],
        }
    ],
    result: {
        sortedValues: [1, 2, 3, 4],
    },
} as SortSimulation)
</script>

<style scoped>
</style>

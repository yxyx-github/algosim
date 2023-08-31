<template>
    <SimulationLayout>
        <template #form>
            <SortSimulationForm @submit="updateSimulation" @reset="() => simulation = null"/>
        </template>
        <template #simulation>
            <div v-if="simulation === null" class="self-center">Please sort some numbers first.</div>
            <SimulationView v-else :simulation="simulation">
                <template #step="{ stepData }">
                    <SortVisualization :step="(stepData as SortSimulationStep)" class="h-full max-h-[calc(100vh-9.9375rem)]"/>
                </template>
            </SimulationView>
        </template>
    </SimulationLayout>
</template>

<script setup lang="ts">
import SimulationLayout from '@/components/app/simulation/SimulationLayout.vue'
import SimulationView from '@/components/app/simulation/SimulationView.vue'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { SortSimulation, SortSimulationStep } from '@/algorithms/sort/types'
import SortVisualization from '@/components/app/simulation/visualization/SortVisualization.vue'
import SortSimulationForm from '@/components/app/simulation/sort/SortSimulationForm.vue'

const simulation: Ref<SortSimulation | null> = ref(null)

function updateSimulation(sim: SortSimulation) {
    simulation.value = sim
}
</script>

<style scoped>
</style>

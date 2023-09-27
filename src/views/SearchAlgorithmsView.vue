<template>
    <SimulationLayout>
        <template #form>
            <SearchSimulationForm @submit="updateSimulation" @reset="() => simulation = null" @updateDescription="updateDescription"/>
        </template>
        <template v-if="simulation !== null" #simulation>
            <SimulationView :simulation="simulation">
                <template #step="{ stepData }">
                    SimulationStep
                </template>
            </SimulationView>
        </template>
        <template #description>
            <TextViewer :text="description"/>
        </template>
    </SimulationLayout>
</template>

<script setup lang="ts">
import SimulationView from '@/components/app/simulation/SimulationView.vue'
import SimulationLayout from '@/components/app/simulation/SimulationLayout.vue'
import TextViewer from '@/components/lib/TextViewer.vue'
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { SearchSimulation } from '@/main/algorithms/search/algorithms/types'
import SearchSimulationForm from '@/components/app/simulation/search/SearchSimulationForm.vue'

const simulation: Ref<SearchSimulation | null> = ref(null)
const description: Ref<string[]> = ref([])

function updateSimulation(sim: SearchSimulation) {
    simulation.value = sim
}

function updateDescription(desc: string[]) {
    description.value = desc
}
</script>

<style scoped>
</style>

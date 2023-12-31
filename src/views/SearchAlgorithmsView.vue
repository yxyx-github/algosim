<template>
    <SimulationLayout>
        <template #form>
            <KeepAlive>
                <SearchSimulationForm v-if="showSimulationForm" @submit="updateSimulation" @reset="() => simulation = null" @updateDescription="updateDescription"/>
                <ButtonBar v-else>
                    <Button @click="updateSimulation(null)" aria-label="Edit" label="Edit"/>
                </ButtonBar>
            </KeepAlive>
        </template>
        <template v-if="simulation !== null" #simulation>
            <SimulationView :simulation="simulation">
                <template #step="{ stepData }">
                    <SearchSimulationStepVisualization :step="stepData"/>
                </template>
            </SimulationView>
        </template>
        <template #description>
            <DescriptionViewer :text="description"/>
        </template>
    </SimulationLayout>
</template>

<script setup lang="ts">
import SimulationView from '@/components/app/simulation/SimulationView.vue'
import SimulationLayout from '@/components/app/simulation/SimulationLayout.vue'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import type { SearchSimulation } from '@/main/algorithms/search/algorithms/types'
import SearchSimulationForm from '@/components/app/simulation/search/SearchSimulationForm.vue'
import SearchSimulationStepVisualization from '@/components/app/simulation/search/visualization/SearchSimulationStepVisualization.vue'
import ButtonBar from '@/components/lib/controls/ButtonBar.vue'
import Button from 'primevue/button'
import DescriptionViewer from '@/components/app/simulation/DescriptionViewer.vue'

const simulation: Ref<SearchSimulation | null> = ref(null)
const description: Ref<string[]> = ref([])

const showSimulationForm = computed(() => simulation.value === null)

function updateSimulation(sim: SearchSimulation | null) {
    simulation.value = sim
}

function updateDescription(desc: string[]) {
    if (JSON.stringify(description.value) !== JSON.stringify(desc)) {
        description.value = desc
    }
}
</script>

<style scoped>
</style>

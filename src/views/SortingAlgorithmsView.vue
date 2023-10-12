<template>
    <SimulationLayout>
        <template #form>
            <SortSimulationForm @submit="updateSimulation" @reset="() => simulation = null" @updateDescription="updateDescription"/>
        </template>
        <template #simulation>
            <div v-if="simulation === null" class="self-center">
                Please sort some numbers first.
                Or try the <Link :to="{ name: 'sort.quiz' }">Quiz</Link>.
            </div>
            <SimulationView v-else :simulation="simulation">
                <template #step="{ stepData }">
                    <SortVisualization :step="stepData" class="h-full" maxHeight="100vh - 10.9375rem"/>
                </template>
            </SimulationView>
        </template>
        <template #description>
            <TextViewer :text="description"/>
        </template>
    </SimulationLayout>
</template>

<script setup lang="ts">
import SimulationLayout from '@/components/app/simulation/SimulationLayout.vue'
import SimulationView from '@/components/app/simulation/SimulationView.vue'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { SortSimulation } from '@/main/algorithms/sort/types'
import SortVisualization from '@/components/app/simulation/sort/visualization/SortVisualization.vue'
import SortSimulationForm from '@/components/app/simulation/sort/SortSimulationForm.vue'
import TextViewer from '@/components/lib/TextViewer.vue'
import Link from '@/components/lib/controls/Link.vue'

const simulation: Ref<SortSimulation | null> = ref(null)
const description: Ref<string[]> = ref([])

function updateSimulation(sim: SortSimulation) {
    simulation.value = sim
}

function updateDescription(desc: string[]) {
    description.value = desc
}
</script>

<style scoped>
</style>

<template>
    <SimulationLayout>
        <template #form>
            <SearchSimulationForm/>
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
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { SearchSimulation } from '@/main/algorithms/search/types'
import SearchSimulationForm from '@/components/app/simulation/sort/SearchSimulationForm.vue'

const simulation: Ref<SearchSimulation | null> = ref(null)
const description: Ref<string[]> = ref([])
</script>

<style scoped>
</style>

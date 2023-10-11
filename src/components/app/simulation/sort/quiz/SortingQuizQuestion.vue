<template>
    <FColumn v-if="![question.algorithm, question.simulation].includes(undefined)">
        Below you can see a simulation of a sort algorithm. Please select the correct algorithm.
        <ButtonBar :direction="{ mb: 'col', md: 'row' }">
            <Dropdown v-model="predictedAlgorithm" optionLabel="label" optionValue="value" :options="algorithms" placeholder="Select the algorithm you guess is correct"/>
            <Button @click="evaluate" icon="pi pi-check" label="Check your answer" aria-label="Check your answer"/>
        </ButtonBar>
        <SimulationView :simulation="question.simulation">
            <template #step="{ stepData }">
                <SortVisualization :step="stepData" class="h-full" maxHeight="100vh - 20rem"/>
            </template>
        </SimulationView>
        <Dialog v-model:visible="showEvalDialog" modal header="Evaluation">
            EvaluationDialog
        </Dialog>
    </FColumn>
</template>

<script setup lang="ts">
import FColumn from '@/components/lib/layout/FColumn.vue'
import ButtonBar from '@/components/lib/controls/ButtonBar.vue'
import type { Ref } from 'vue'
import { SearchAlgorithm } from '@/main/algorithms/search/algorithms/types'
import { reactive, ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import { SortAlgorithm, SortSimulation, SortSimulationStep, SortWorkerResponse } from '@/main/algorithms/sort/types'
import { generateNumbers, getRandomIntBetween } from '@/main/algorithms/sort'
import SortWorker from '@/main/algorithms/sort/sortWorker?worker'
import { simulationFromStream } from '@/main/simulation/stream'
import SortVisualization from '@/components/app/simulation/sort/visualization/SortVisualization.vue'
import SimulationView from '@/components/app/simulation/SimulationView.vue'
import Dialog from 'primevue/dialog'

const question = reactive<{
    algorithm: SearchAlgorithm | undefined,
    simulation: SortSimulation | undefined,
}>({
    algorithm: undefined,
    simulation: undefined,
})

const predictedAlgorithm: Ref<SearchAlgorithm | undefined> = ref()
const showEvalDialog = ref(false)

// TODO: extract somewhere else
const algorithms = [
    {
        label: 'Bubblesort',
        value: SortAlgorithm.BUBBLE,
    }, {
        label: 'Combsort',
        value: SortAlgorithm.COMBSORT,
    }, {
        label: 'Heapsort',
        value: SortAlgorithm.HEAPSORT,
    }, {
        label: 'Insertionsort',
        value: SortAlgorithm.INSERTION,
    }, {
        label: 'Mergesort',
        value: SortAlgorithm.MERGESORT,
    }, {
        label: 'Quicksort',
        value: SortAlgorithm.QUICKSORT,
    }, {
        label: 'Selectionsort',
        value: SortAlgorithm.SELECTION,
    }, {
        label: 'Shellsort',
        value: SortAlgorithm.SHELLSORT,
    }
]

function evaluate() {
    showEvalDialog.value = true
}

function initQuestion() {
    const numbersToSort = generateNumbers(100, 0, 100)
    question.algorithm = algorithms[getRandomIntBetween(0, algorithms.length - 1)].value

    const sortWorker = new SortWorker()
    sortWorker.onmessage = (e: MessageEvent<SortWorkerResponse>) => {
        if (e.data.name === 'sorted') {
            simulationFromStream<SortSimulation, SortSimulationStep>(e.data.value).then((simulation: SortSimulation) => {
                question.simulation = simulation
                sortWorker.terminate()
            })
        }
    }
    sortWorker.postMessage({ algorithm: question.algorithm, numbersToSort: numbersToSort })
}
initQuestion()
</script>

<style scoped>
</style>

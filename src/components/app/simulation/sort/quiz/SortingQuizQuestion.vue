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
        <!--TODO: override default close-->
        <Dialog v-model:visible="evaluation.showDialog" modal header="Evaluation">
            {{ answerIsCorrect ? 'Your answer is correct.' : 'Your answer is wrong.' }}
            {{ evaluation.showSolution ? 'solution' : '' }}<!--TODO: show solution-->
            <template #footer>
                <Button v-if="!answerIsCorrect" @click="evaluation.showDialog = false" label="Retry" aria-label="Retry"/>
                <Button v-if="!answerIsCorrect" :disabled="evaluation.showSolution" @click="evaluation.showSolution = true" label="Show solution" aria-label="Show solution"/>
                <Button @click="init" label="New question" aria-label="New question"/>
            </template>
        </Dialog>
    </FColumn>
</template>

<script setup lang="ts">
import FColumn from '@/components/lib/layout/FColumn.vue'
import ButtonBar from '@/components/lib/controls/ButtonBar.vue'
import type { Ref } from 'vue'
import { SearchAlgorithm } from '@/main/algorithms/search/algorithms/types'
import { computed, reactive, ref } from 'vue'
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

const evaluation = reactive<{
    showDialog: boolean,
    showSolution: boolean,
    trialCount: number,
}>({
    showDialog: false,
    showSolution: false,
    trialCount: 0,
})

const answerIsCorrect = computed(() => predictedAlgorithm.value === question.algorithm)

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
    evaluation.trialCount++
    evaluation.showDialog = true
}

function init() {
    // TODO: extract into separate methods, e.g.: initEvaluation, initQuestion
    evaluation.showDialog = false
    evaluation.showSolution = false
    evaluation.trialCount = 0
    predictedAlgorithm.value = undefined
    question.simulation = undefined

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
init()
</script>

<style scoped>
</style>

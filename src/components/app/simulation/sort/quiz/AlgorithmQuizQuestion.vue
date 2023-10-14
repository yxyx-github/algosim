<template>
    <FColumn v-if="![question.algorithm, question.simulation].includes(undefined)">
        Below you can see a simulation of a sort algorithm. Please select the correct algorithm.
        <ButtonBar :direction="{ mb: 'col', md: 'row' }">
            <Dropdown v-model="predictedAlgorithm" optionLabel="label" optionValue="value" :options="sortAlgorithmData" placeholder="Select the algorithm you guess is correct"/>
            <Button @click="evaluate" icon="pi pi-check" label="Check your answer" aria-label="Check your answer"/>
        </ButtonBar>
        <slot :simulation="question.simulation as Simulation<S>"/>
        <Dialog v-model:visible="evaluation.showDialog" modal header="Evaluation" :closable="false">
            <div v-if="answerIsCorrect" class="text-green-600">
                Your answer is correct.
            </div>
            <div v-else class="text-red-600">
                Your answer is wrong.
            </div>
            <div>
                Trial number: {{ evaluation.trialCount }}
            </div>
            <div v-if="evaluation.showSolution">
                Solution: {{ solutionAlgorithmLabel }}
            </div>
            <template #footer>
                <Button v-if="!answerIsCorrect" :disabled="evaluation.showSolution" @click="retry" label="Retry" aria-label="Retry"/>
                <Button v-if="!answerIsCorrect" :disabled="evaluation.showSolution" @click="evaluation.showSolution = true" label="Show solution" aria-label="Show solution"/>
                <Button @click="init" label="New question" aria-label="New question"/>
            </template>
        </Dialog>
    </FColumn>
    <div v-else>
        Preparing question...
    </div>
</template>

<script setup lang="ts" generic="S extends SimulationStep, A">
import FColumn from '@/components/lib/layout/FColumn.vue'
import ButtonBar from '@/components/lib/controls/ButtonBar.vue'
import type { Ref } from 'vue'
import { computed, reactive, ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast'
import { sortAlgorithmData } from '@/main/algorithms/sort'
import type { Simulation, SimulationStep } from '@/main/simulation/types'
import type { AlgorithmData } from '@/main/algorithms/types'

const toast = useToast()

const props = defineProps<{
    generateQuestion: () => Promise<{ algorithm: A, simulation: Simulation<S> }>,
    algorithms: AlgorithmData<A>[],
}>()

const question = reactive<{
    algorithm: A | undefined,
    simulation: Simulation<S> | undefined,
}>({
    algorithm: undefined,
    simulation: undefined,
})

const predictedAlgorithm: Ref<A | undefined> = ref()

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
const solutionAlgorithmLabel = computed(() => props.algorithms.filter((algorithm: AlgorithmData<A>) => algorithm.value === question.algorithm).map((algorithm: AlgorithmData<A>) => algorithm.label)[0] ?? '')

function evaluate() {
    if (predictedAlgorithm.value === undefined) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'You must specify an algorithm', life: 4000 })
    } else {
        evaluation.trialCount++
        evaluation.showDialog = true
    }
}

function retry() {
    predictedAlgorithm.value = undefined
    evaluation.showDialog = false
}

function reset() {
    evaluation.showDialog = false
    evaluation.showSolution = false
    evaluation.trialCount = 0
    predictedAlgorithm.value = undefined
    question.simulation = undefined
}

function init() {
    reset()
    props.generateQuestion().then(({ algorithm, simulation }) => {
        // @ts-ignore
        question.algorithm = algorithm
        // @ts-ignore
        question.simulation = simulation
    })
}

init()
</script>

<style scoped>
</style>

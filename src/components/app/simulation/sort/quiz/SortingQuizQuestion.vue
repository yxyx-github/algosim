<template>
    <AlgorithmQuizQuestion :generateQuestion="generateQuestion" :algorithms="sortAlgorithmData" v-slot="{ simulation }">
        <SimulationView :simulation="simulation">
            <template #step="{ stepData }">
                <SortVisualization :step="stepData" class="h-full" maxHeight="100vh - 20rem"/>
            </template>
        </SimulationView>
    </AlgorithmQuizQuestion>
</template>

<script setup lang="ts">
import type { SortSimulation, SortSimulationStep, SortWorkerResponse } from '@/main/algorithms/sort/types'
import { generateNumbers, getRandomIntBetween } from '@/main/algorithms/sort'
import SortWorker from '@/main/algorithms/sort/sortWorker?worker'
import { simulationFromStream } from '@/main/simulation/stream'
import { sortAlgorithmData } from '@/main/algorithms/sort'
import AlgorithmQuizQuestion from '@/components/app/simulation/sort/quiz/AlgorithmQuizQuestion.vue'
import { SortAlgorithm } from '@/main/algorithms/sort/types'
import SimulationView from '@/components/app/simulation/SimulationView.vue'
import SortVisualization from '@/components/app/simulation/sort/visualization/SortVisualization.vue'


function generateQuestion(completed: (algorithm: SortAlgorithm, simulation: SortSimulation) => void) {
    const numbersToSort = generateNumbers(100, 0, 100)
    const algorithm = sortAlgorithmData[getRandomIntBetween(0, sortAlgorithmData.length - 1)].value

    const sortWorker = new SortWorker()
    sortWorker.onmessage = (e: MessageEvent<SortWorkerResponse>) => {
        if (e.data.name === 'sorted') {
            simulationFromStream<SortSimulation, SortSimulationStep>(e.data.value).then((simulation: SortSimulation) => {
                completed(algorithm, simulation)
                sortWorker.terminate()
            })
        }
    }
    sortWorker.postMessage({ algorithm: algorithm, numbersToSort: numbersToSort })
}
</script>

<style scoped>
</style>

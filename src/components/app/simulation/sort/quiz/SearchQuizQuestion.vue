<template>
    <AlgorithmQuizQuestion
        :generateQuestion="generateQuestion"
        label="Below you can see a simulation of a search algorithm in a graph. Please select the correct algorithm."
        :algorithms="searchAlgorithmData"
        v-slot="{ simulation }"
    >
        <SimulationView :simulation="simulation">
            <template #step="{ stepData }">
                <SearchSimulationStepVisualization :step="stepData"/>
            </template>
        </SimulationView>
    </AlgorithmQuizQuestion>
</template>

<script setup lang="ts">
import { getRandomIntBetween } from '@/main/algorithms/sort'
import AlgorithmQuizQuestion from '@/components/app/simulation/sort/quiz/AlgorithmQuizQuestion.vue'
import SimulationView from '@/components/app/simulation/SimulationView.vue'
import { SearchAlgorithm } from '@/main/algorithms/search/algorithms/types'
import type { SearchSimulation } from '@/main/algorithms/search/algorithms/types'
import { rawGraphFormInputs } from '@/main/algorithms/search/predefinedGraphs'
import { importRawGraphForm } from '@/main/algorithms/search/algorithms/dataHelpers'
import { searchAlgorithmData, SearchFactory } from '@/main/algorithms/search/algorithms'
import SearchSimulationStepVisualization from '@/components/app/simulation/search/visualization/SearchSimulationStepVisualization.vue'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormConverter } from '@/main/algorithms/search/graphForm/graphFormConverter'
import { Graph } from '@/main/algorithms/search/graph/graph'
import type { EdgeValue, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { Vertex } from '@/main/algorithms/search/graph/vertex'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

function generateQuestion(): Promise<{ algorithm: SearchAlgorithm, simulation: SearchSimulation }> {
    return new Promise(resolve => {
        const availableGraphForms = rawGraphFormInputs.map(rawGraphForm => importRawGraphForm(rawGraphForm))
        const graphForm = availableGraphForms[getRandomIntBetween(0, availableGraphForms.length - 1)]
        const algorithm = searchAlgorithmData[getRandomIntBetween(0, searchAlgorithmData.length - 1)].value;

        (graphForm as GraphForm).validateStartEnd()
        if ((graphForm as GraphForm).getStartItem() === null || (graphForm as GraphForm).getEndItem() === null) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'You must specify a start and end vertex', life: 4000 })
            return
        }

        const converter = new GraphFormConverter(graphForm as GraphForm)
        const graph: Graph<VertexValue, EdgeValue> = converter.toGraph()
        const startVertex: Vertex<VertexValue> | undefined = graph.findVertex(v => v.getValue().item === (graphForm as GraphForm).getStartItem())
        const endVertex: Vertex<VertexValue> | undefined = graph.findVertex(v => v.getValue().item === (graphForm as GraphForm).getEndItem())

        if (startVertex !== undefined && endVertex !== undefined) {
            const simulation = SearchFactory.create(algorithm).run(graph, (graphForm as GraphForm).toGrid(), startVertex, endVertex)
            resolve({ algorithm, simulation })
        } else {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Start and end vertex are invalid', life: 4000 })
        }
    })
}
</script>

<style scoped>
</style>

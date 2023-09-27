import type { Simulation, SimulationStep } from '@/main/simulation/types'
import { Graph } from '@/main/algorithms/search/graph/graph'
import type { EdgeValue, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { Vertex } from '@/main/algorithms/search/graph/vertex'

export enum SearchAlgorithm {
    BREADTH_SEARCH,
}

// TODO: extend AlgorithmImplementation
export interface SearchAlgorithmImplementation {
    run: (graph: Graph<VertexValue, EdgeValue>, start: Vertex<VertexValue>, end: Vertex<VertexValue>) => SearchSimulation,
    description: () => string[],
}

interface SearchSimulationStep extends SimulationStep {
}

export interface SearchSimulation extends Simulation<SearchSimulationStep> {}

import type { Simulation, SimulationStep } from '@/main/simulation/types'
import { Graph } from '@/main/algorithms/search/graph/graph'
import type { EdgeValue, GraphFormGrid, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { Vertex } from '@/main/algorithms/search/graph/vertex'
import type { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import type { AlgorithmImplementation } from '@/main/algorithms/types'

export enum SearchAlgorithm {
    BREADTH_SEARCH,
    DEPTH_FIRST_SEARCH,
    DIJKSTRA,
}

export interface SearchAlgorithmImplementation extends AlgorithmImplementation<SearchSimulationStep> {
    run: (graph: Graph<VertexValue, EdgeValue>, grid: GraphFormGrid, start: Vertex<VertexValue>, end: Vertex<VertexValue>) => SearchSimulation,
}

export interface SearchSimulationStep extends SimulationStep {
    grid: GraphFormGrid,
    start?: GraphFormItem,
    end?: GraphFormItem,
}

export interface SearchSimulation extends Simulation<SearchSimulationStep> {}

import type { SearchAlgorithmImplementation, SearchSimulation } from '@/main/algorithms/search/algorithms/types'
import type { Graph } from '@/main/algorithms/search/graph/graph'
import type { EdgeValue, VertexValue } from '@/main/algorithms/search/graphForm/types'
import type { Vertex } from '@/main/algorithms/search/graph/vertex'

export class BreadthSearch implements SearchAlgorithmImplementation {
    run(graph: Graph<VertexValue, EdgeValue>, start: Vertex<VertexValue>, end: Vertex<VertexValue>): SearchSimulation {
        return undefined as any
    }

    description(): string[] {
        return [`
            BreadthSearch description
        `]
    }
}

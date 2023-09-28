import type { SearchAlgorithmImplementation, SearchSimulation, SearchSimulationStep } from '@/main/algorithms/search/algorithms/types'
import type { Graph } from '@/main/algorithms/search/graph/graph'
import type { EdgeValue, VertexValue } from '@/main/algorithms/search/graphForm/types'
import type { Vertex } from '@/main/algorithms/search/graph/vertex'
import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'

export class BreadthSearch implements SearchAlgorithmImplementation {
    run(graph: Graph<VertexValue, EdgeValue>, start: Vertex<VertexValue>, end: Vertex<VertexValue>): SearchSimulation {
        const pb = new ProtocolBuilder<SearchSimulationStep>()
        let visitedVertices: Vertex<VertexValue>[] = []
        this.breadthSearch(graph, start, visitedVertices, pb)
        return pb.build()
    }

    private breadthSearch(graph: Graph<VertexValue, EdgeValue>, start: Vertex<VertexValue>, visitedVertices: Vertex<VertexValue>[], pb: ProtocolBuilder<SearchSimulationStep>) {
        const edgesToNeighbours = graph.getEdges().filter(e => e.getFrom() === start)
        const neighbours: Vertex<VertexValue>[] = []
        edgesToNeighbours.forEach(e => {
            const to = e.getTo()
            if (!visitedVertices.includes(to) && !neighbours.includes(to)) {
                // TODO: create step
                neighbours.push(to)
            }
            visitedVertices.push(to)
        })
        neighbours.forEach(neighbour => this.breadthSearch(graph, neighbour, visitedVertices, pb))
    }

    description(): string[] {
        return [`
            BreadthSearch description
        `]
    }
}

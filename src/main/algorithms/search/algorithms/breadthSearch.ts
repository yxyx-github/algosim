import type { SearchAlgorithmImplementation, SearchSimulation, SearchSimulationStep } from '@/main/algorithms/search/algorithms/types'
import type { Graph } from '@/main/algorithms/search/graph/graph'
import type { EdgeValue, GraphFormGrid, VertexValue } from '@/main/algorithms/search/graphForm/types'
import type { Vertex } from '@/main/algorithms/search/graph/vertex'
import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'

export class BreadthSearch implements SearchAlgorithmImplementation {
    run(graph: Graph<VertexValue, EdgeValue>, grid: GraphFormGrid, start: Vertex<VertexValue>, end: Vertex<VertexValue>): SearchSimulation {
        const pb = new ProtocolBuilder<SearchSimulationStep>()
        pb.setStepCloner((step: SearchSimulationStep) => ({ grid: this.cloneGrid(step.grid) }))
        let visitedVertices: Vertex<VertexValue>[] = []
        this.breadthSearch(graph, grid, start, visitedVertices, pb)
        return pb.build()
    }

    private breadthSearch(graph: Graph<VertexValue, EdgeValue>, grid: GraphFormGrid, start: Vertex<VertexValue>, visitedVertices: Vertex<VertexValue>[], pb: ProtocolBuilder<SearchSimulationStep>) {
        const edgesToNeighbours = graph.getEdges().filter(e => e.getFrom() === start)
        visitedVertices.push(start)
        pb.step(this.createStep(graph, grid, start, visitedVertices))
        const neighbours: Vertex<VertexValue>[] = []
        edgesToNeighbours.forEach(e => {
            const to = e.getTo()
            if (!visitedVertices.includes(to) && !neighbours.includes(to)) {
                neighbours.push(to)
            }
        })
        neighbours.forEach(neighbour => this.breadthSearch(graph, grid, neighbour, visitedVertices, pb))
    }

    private createStep(graph: Graph<VertexValue, EdgeValue>, grid: GraphFormGrid, start: Vertex<VertexValue>, visitedVertices: Vertex<VertexValue>[]): SearchSimulationStep {
        const highlightedGrid = this.cloneGrid(grid)
        visitedVertices.forEach(v => {
            const x = v.getValue().item.data().coords.x
            const y = v.getValue().item.data().coords.y
            const item = highlightedGrid[y][x]
            highlightedGrid[y][x] = new GraphFormItem({
                ...item.data(),
                highlight: { ...item.data().highlight, center: true }
            })
        })
        return { grid: highlightedGrid }
    }

    private cloneGrid(grid: GraphFormGrid): GraphFormGrid {
        return grid.map(row =>
            row.map(item =>
                new GraphFormItem(JSON.parse(JSON.stringify(item.data()))) // TODO: figure out why structuredClone() does not work
            )
        )
    }

    description(): string[] {
        return [`
            BreadthSearch description
        `]
    }
}

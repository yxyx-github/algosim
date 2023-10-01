import type { SearchAlgorithmImplementation, SearchSimulation, SearchSimulationStep } from '@/main/algorithms/search/algorithms/types'
import type { Graph } from '@/main/algorithms/search/graph/graph'
import type { Coords, EdgeValue, GraphFormGrid, VertexValue } from '@/main/algorithms/search/graphForm/types'
import type { Vertex } from '@/main/algorithms/search/graph/vertex'
import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import type { Edge } from '@/main/algorithms/search/graph/edge'

export class BreadthSearch implements SearchAlgorithmImplementation {
    run(graph: Graph<VertexValue, EdgeValue>, grid: GraphFormGrid, start: Vertex<VertexValue>, end: Vertex<VertexValue>): SearchSimulation {
        const pb = new ProtocolBuilder<SearchSimulationStep>()
        pb.setStepCloner((step: SearchSimulationStep) => this.cloneSimulationStep(step))
        const startItemCoords = start.getValue().item.data().coords
        let visitedVertices: Vertex<VertexValue>[] = []

        visitedVertices.push(start)
        this.createStep(graph, grid, start, startItemCoords, visitedVertices, pb)
        this.breadthSearch(graph, grid, start, startItemCoords, visitedVertices, pb)

        return pb.build()
    }

    private breadthSearch(graph: Graph<VertexValue, EdgeValue>, grid: GraphFormGrid, current: Vertex<VertexValue>, startItemCoords: Coords, visitedVertices: Vertex<VertexValue>[], pb: ProtocolBuilder<SearchSimulationStep>) {
        const edgesToNeighbours = graph.getEdges().filter(e => e.getFrom() === current)
        const neighbours: Vertex<VertexValue>[] = []
        edgesToNeighbours.forEach(e => {
            const to = e.getTo()
            if (!visitedVertices.includes(to) && !neighbours.includes(to)) {
                neighbours.push(to)

                this.createEdgeSteps(graph, grid, e, startItemCoords, visitedVertices, pb)
                visitedVertices.push(to)
                this.createStep(graph, grid, to, startItemCoords, visitedVertices, pb)
            }
        })
        neighbours.forEach(neighbour => this.breadthSearch(graph, grid, neighbour, startItemCoords, visitedVertices, pb))
    }

    private createEdgeSteps(graph: Graph<VertexValue, EdgeValue>, grid: GraphFormGrid, edge: Edge<VertexValue, EdgeValue>, startItemCoords: Coords, visitedVertices: Vertex<VertexValue>[], pb: ProtocolBuilder<SearchSimulationStep>) {
        const highlightedItems: GraphFormItem[] = []
        edge.getValue().items.forEach(item => {
            highlightedItems.push(item)
            const highlightedGrid = this.cloneGrid(grid)
            this.highlightVerticesInGrid(highlightedGrid, visitedVertices)
            highlightedItems.forEach(item => {
                const x = item.data().coords.x
                const y = item.data().coords.y
                const highlightedItem = highlightedGrid[y][x]
                highlightedGrid[y][x] = new GraphFormItem({
                    ...highlightedItem.data(),
                    connect: {
                        top: highlightedItem.data().connections.top,
                        right: highlightedItem.data().connections.right,
                        bottom: highlightedItem.data().connections.bottom,
                        left: highlightedItem.data().connections.left,
                    }
                })
            })
            return pb.step({
                grid: highlightedGrid,
                start: highlightedGrid[startItemCoords.y][startItemCoords.x]
            })
        })
    }

    private createStep(graph: Graph<VertexValue, EdgeValue>, grid: GraphFormGrid, current: Vertex<VertexValue>, startItemCoords: Coords, visitedVertices: Vertex<VertexValue>[], pb: ProtocolBuilder<SearchSimulationStep>) {
        const highlightedGrid = this.cloneGrid(grid)
        this.highlightVerticesInGrid(highlightedGrid, visitedVertices)
        return pb.step({
            grid: highlightedGrid,
            start: highlightedGrid[startItemCoords.y][startItemCoords.x]
        })
    }

    private highlightVerticesInGrid(grid: GraphFormGrid, vertices: Vertex<VertexValue>[]) {
        vertices.forEach(v => {
            const x = v.getValue().item.data().coords.x
            const y = v.getValue().item.data().coords.y
            const item = grid[y][x]
            grid[y][x] = new GraphFormItem({
                ...item.data(),
                highlight: { ...item.data().highlight, center: true }
            })
        })
    }

    private cloneGrid(grid: GraphFormGrid): GraphFormGrid {
        return grid.map(row =>
            row.map(item =>
                new GraphFormItem(JSON.parse(JSON.stringify(item.data()))) // TODO: figure out why structuredClone() does not work
            )
        )
    }

    private cloneSimulationStep(step: SearchSimulationStep): SearchSimulationStep {
        const startCoords = step.start?.data().coords
        const endCoords = step.start?.data().coords
        const clonedGrid = this.cloneGrid(step.grid)
        return {
            grid: clonedGrid,
            start: startCoords !== undefined ? clonedGrid[startCoords.y][startCoords.x] : undefined,
            end: endCoords !== undefined ? clonedGrid[endCoords.y][endCoords.x] : undefined,
        }
    }

    description(): string[] {
        return [`
            BreadthSearch description
        `]
    }
}

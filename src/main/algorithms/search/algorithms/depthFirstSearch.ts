import type { SearchAlgorithmImplementation, SearchSimulation, SearchSimulationStep } from '@/main/algorithms/search/algorithms/types'
import type { Graph } from '@/main/algorithms/search/graph/graph'
import type { Coords, EdgeValue, GraphFormGrid, VertexValue } from '@/main/algorithms/search/graphForm/types'
import type { Vertex } from '@/main/algorithms/search/graph/vertex'
import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import type { Edge } from '@/main/algorithms/search/graph/edge'
import { cloneGrid, cloneSearchSimulationStep } from '@/main/algorithms/search/algorithms/index'

export interface VertexDepthFirstSearchValue extends VertexValue {
    visited?: boolean
    predecessor?: Edge<VertexDepthFirstSearchValue, EdgeValue>
}

export class DepthFirstSearch implements SearchAlgorithmImplementation {

    run(graph: Graph<VertexDepthFirstSearchValue, EdgeValue>, grid: GraphFormGrid, start: Vertex<VertexDepthFirstSearchValue>, end: Vertex<VertexDepthFirstSearchValue>): SearchSimulation {
        const pb = new ProtocolBuilder<SearchSimulationStep>()
        pb.setStepCloner((step: SearchSimulationStep) => cloneSearchSimulationStep(step))
        const startItemCoords = start.getValue().item.data().coords
        const endItemCoords = end.getValue().item.data().coords

        const vertexStack: Vertex<VertexDepthFirstSearchValue>[] = [start]

        let highlightedGrid = this.createStep(graph.getVertices(), grid)
        pb.step({ grid: highlightedGrid, start: highlightedGrid[startItemCoords.y][startItemCoords.x], end: highlightedGrid[endItemCoords.y][endItemCoords.x] })

        while (vertexStack.length > 0) {
            const current: Vertex<VertexDepthFirstSearchValue> = vertexStack.pop() as Vertex<VertexDepthFirstSearchValue>
            if (current.getValue().visited??false) continue

            current.getValue().visited = true

            highlightedGrid = this.createStep(graph.getVertices(), grid)
            pb.step({ grid: highlightedGrid, start: highlightedGrid[startItemCoords.y][startItemCoords.x], end: highlightedGrid[endItemCoords.y][endItemCoords.x] })

            if (current === end) break

            const edgesToNeighbours = graph.getEdges().filter(e => e.getFrom() === current)
            edgesToNeighbours.forEach(edge => {
                const to = edge.getTo()
                if ((to.getValue().visited??false) || vertexStack.includes(to)) {
                    return
                }
                to.getValue().predecessor = edge
                vertexStack.push(to)

                if (edge.getWeight() <= 1) {
                    return
                }
                this.visualiseEdgeSteps(edge, startItemCoords, endItemCoords, highlightedGrid, pb)
                highlightedGrid = this.createStep(graph.getVertices(), grid)
            })
        }

        this.createPathStep(grid, end, startItemCoords, pb)
        return pb.build()
    }

    private visualiseEdgeSteps(edge: Edge<VertexDepthFirstSearchValue, EdgeValue>, start: Coords, end: Coords, grid: GraphFormGrid, pb: ProtocolBuilder<SearchSimulationStep>) {
        let highlightedGrid = cloneGrid(grid)
        edge.getValue().items.forEach(item => {
            highlightedGrid = cloneGrid(highlightedGrid)
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
                },
            })
            pb.step({ grid: highlightedGrid, start: highlightedGrid[start.y][start.x], end: highlightedGrid[end.y][end.x] })
        })

    }

    private createPathStep(grid: GraphFormGrid, end: Vertex<VertexDepthFirstSearchValue>, startItemCoords: Coords, pb: ProtocolBuilder<SearchSimulationStep>) {
        const highlightedGrid: GraphFormGrid = cloneGrid(grid)
        if (!(end.getValue().visited??false)) {
            pb.step({
                grid: highlightedGrid,
                start: highlightedGrid[startItemCoords.y][startItemCoords.x],
                end: highlightedGrid[end.getValue().item.data().coords.y][end.getValue().item.data().coords.x],
            })
            return
        }

        let current: Vertex<VertexDepthFirstSearchValue> = end;
        this.highlightVertex(highlightedGrid, end)

        while (current.getValue().predecessor != undefined) {
            this.highlightEdge(highlightedGrid, current.getValue().predecessor as Edge<VertexDepthFirstSearchValue, EdgeValue>)
            current = current.getValue().predecessor?.getFrom() as Vertex<VertexDepthFirstSearchValue>
            this.highlightVertex(highlightedGrid, current)

        }
        pb.step({ grid: highlightedGrid, start: highlightedGrid[startItemCoords.y][startItemCoords.x], end: highlightedGrid[end.getValue().item.data().coords.y][end.getValue().item.data().coords.x] })
    }

    private highlightVertex(grid: GraphFormGrid, vertex: Vertex<VertexDepthFirstSearchValue>) {
        if (!(vertex.getValue().visited??false)) {
            return
        }
        const x = vertex.getValue().item.data().coords.x
        const y = vertex.getValue().item.data().coords.y
        const item = grid[y][x]

        grid[y][x] = new GraphFormItem({
            ...item.data(),
            highlight: { ...item.data().highlight, center: true },
        })
    }

    private highlightEdge(grid: GraphFormGrid, edge: Edge<VertexDepthFirstSearchValue, EdgeValue>) {
        edge.getValue().items.forEach(item => {
            const x = item.data().coords.x
            const y = item.data().coords.y
            const highlightedItem = grid[y][x]

            grid[y][x] = new GraphFormItem({
                ...highlightedItem.data(),
                connect: {
                    top: highlightedItem.data().connections.top,
                    right: highlightedItem.data().connections.right,
                    bottom: highlightedItem.data().connections.bottom,
                    left: highlightedItem.data().connections.left,
                },
            })
        })
    }

    private createStep(vertices: Vertex<VertexDepthFirstSearchValue>[], grid: GraphFormGrid) {
        const highlightedGrid = cloneGrid(grid)
        this.highlightVerticesInGrid(highlightedGrid, vertices)
        return highlightedGrid
    }

    private highlightVerticesInGrid(grid: GraphFormGrid, vertices: Vertex<VertexDepthFirstSearchValue>[]) {
        vertices.forEach(v => {
            this.highlightVertex(grid, v)
            if (v.getValue().predecessor != undefined) {
                this.highlightEdge(grid, v.getValue().predecessor as Edge<VertexDepthFirstSearchValue, EdgeValue>)
            }
        })
    }

    description(): string[] {
        return [`
            DFS description
        `]
    }
}

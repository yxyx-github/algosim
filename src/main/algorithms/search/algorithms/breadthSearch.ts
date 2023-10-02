import type { SearchAlgorithmImplementation, SearchSimulation, SearchSimulationStep } from '@/main/algorithms/search/algorithms/types'
import type { Graph } from '@/main/algorithms/search/graph/graph'
import type { Coords, EdgeValue, GraphFormGrid, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'
import type { Vertex } from '@/main/algorithms/search/graph/vertex'
import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import type { Edge } from '@/main/algorithms/search/graph/edge'

export class BreadthSearch implements SearchAlgorithmImplementation {
    run(graph: Graph<VertexValue, EdgeValue>, grid: GraphFormGrid, start: Vertex<VertexValue>, end: Vertex<VertexValue>): SearchSimulation {
        const pb = new ProtocolBuilder<SearchSimulationStep>()
        pb.setStepCloner((step: SearchSimulationStep) => this.cloneSimulationStep(step))
        const startItemCoords = start.getValue().item.data().coords
        const endItemCoords = end.getValue().item.data().coords

        const visitedVertices: Vertex<VertexValue>[] = [start]
        const vertexQueue: Vertex<VertexValue>[] = [start]
        const current: Vertex<VertexValue> = start

        const path: GraphFormItem[] = [start.getValue().item]
        this.createStep(graph, grid, start, startItemCoords, endItemCoords, visitedVertices, pb)

        while (vertexQueue.length > 0) {
            const current: Vertex<VertexValue> = vertexQueue.shift() as Vertex<VertexValue>

            if (current === end) break

            const edgesToNeighbours = graph.getEdges().filter(e => e.getFrom() === current)
            for (const edge of edgesToNeighbours) {
                const to = edge.getTo()
                if (!visitedVertices.includes(to) && !vertexQueue.includes(to)) {
                    vertexQueue.push(to)

                    this.createEdgeSteps(graph, grid, edge, startItemCoords, endItemCoords, visitedVertices, pb)
                    path.push(...edge.getValue().items)
                    visitedVertices.push(to)
                    this.createStep(graph, grid, to, startItemCoords, endItemCoords, visitedVertices, pb)
                    path.push(to.getValue().item)

                    if (to === end) break
                }
            }
        }

        this.createPathStep(graph, grid, path, startItemCoords, endItemCoords, pb)

        return pb.build()
    }

    private createPathStep(graph: Graph<VertexValue, EdgeValue>, grid: GraphFormGrid, path: GraphFormItem[], startItemCoords: Coords, endItemCoords: Coords, pb: ProtocolBuilder<SearchSimulationStep>) {
        const highlightedGrid = this.cloneGrid(grid)
        path.forEach((item, index) => {
            const x = item.data().coords.x
            const y = item.data().coords.y
            const highlightedItem = highlightedGrid[y][x]
            if (highlightedItem.data().type === GraphFormItemType.EDGE) {
                highlightedGrid[y][x] = new GraphFormItem({
                    ...highlightedItem.data(),
                    connect: {
                        top: highlightedItem.data().connections.top,
                        right: highlightedItem.data().connections.right,
                        bottom: highlightedItem.data().connections.bottom,
                        left: highlightedItem.data().connections.left,
                    },
                    label: index.toString(),
                })
            } else {
                highlightedGrid[y][x] = new GraphFormItem({
                    ...highlightedItem.data(),
                    highlight: { ...highlightedItem.data().highlight, center: true },
                    label: index.toString(),
                })
            }
        })
        pb.step({
            grid: highlightedGrid,
            start: highlightedGrid[startItemCoords.y][startItemCoords.x],
            end: highlightedGrid[endItemCoords.y][endItemCoords.x],
        })
    }

    private createEdgeSteps(graph: Graph<VertexValue, EdgeValue>, grid: GraphFormGrid, edge: Edge<VertexValue, EdgeValue>, startItemCoords: Coords, endItemCoords: Coords, visitedVertices: Vertex<VertexValue>[], pb: ProtocolBuilder<SearchSimulationStep>) {
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
                    },
                })
            })
            pb.step({
                grid: highlightedGrid,
                start: highlightedGrid[startItemCoords.y][startItemCoords.x],
                end: highlightedGrid[endItemCoords.y][endItemCoords.x],
            })
        })
    }

    private createStep(graph: Graph<VertexValue, EdgeValue>, grid: GraphFormGrid, current: Vertex<VertexValue>, startItemCoords: Coords, endItemCoords: Coords, visitedVertices: Vertex<VertexValue>[], pb: ProtocolBuilder<SearchSimulationStep>) {
        const highlightedGrid = this.cloneGrid(grid)
        this.highlightVerticesInGrid(highlightedGrid, visitedVertices)
        pb.step({
            grid: highlightedGrid,
            start: highlightedGrid[startItemCoords.y][startItemCoords.x],
            end: highlightedGrid[endItemCoords.y][endItemCoords.x],
        })
    }

    private highlightVerticesInGrid(grid: GraphFormGrid, vertices: Vertex<VertexValue>[]) {
        vertices.forEach(v => {
            const x = v.getValue().item.data().coords.x
            const y = v.getValue().item.data().coords.y
            const item = grid[y][x]
            grid[y][x] = new GraphFormItem({
                ...item.data(),
                highlight: { ...item.data().highlight, center: true },
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
        const endCoords = step.end?.data().coords
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

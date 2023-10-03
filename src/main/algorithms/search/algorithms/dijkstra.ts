import type { SearchAlgorithmImplementation, SearchSimulation, SearchSimulationStep } from '@/main/algorithms/search/algorithms/types'
import type { Graph } from '@/main/algorithms/search/graph/graph'
import type { Coords, EdgeValue, GraphFormGrid, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'
import type { Vertex } from '@/main/algorithms/search/graph/vertex'
import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import type { Edge } from '@/main/algorithms/search/graph/edge'
import {cloneGrid, cloneSearchSimulationStep} from '@/main/algorithms/search/algorithms/index'

export class Dijkstra implements SearchAlgorithmImplementation {

    run(graph: Graph<VertexValue, EdgeValue>, grid: GraphFormGrid, start: Vertex<VertexValue>, end: Vertex<VertexValue>): SearchSimulation {
        const pb = new ProtocolBuilder<SearchSimulationStep>()
        pb.setStepCloner((step: SearchSimulationStep) => cloneSearchSimulationStep(step))
        const startItemCoords = start.getValue().item.data().coords
        const endItemCoords = end.getValue().item.data().coords

        const completedVertices: Set<Vertex<VertexValue>> = new Set()
        const predecessorMap: Map<Vertex<VertexValue>, Vertex<VertexValue>> = new Map()
        const priorityQueue: PriorityQueue<Vertex<VertexValue>> = new PriorityQueue<Vertex<VertexValue>>()
        priorityQueue.offer(start, 0)
        completedVertices.add(start)


        this.createStep(graph, grid, start, startItemCoords, endItemCoords, completedVertices, pb)

        while (!priorityQueue.isEmpty()) {
            const current: { priority: number, value: Vertex<VertexValue> } = priorityQueue.poll() as { priority: number, value: Vertex<VertexValue> }
            completedVertices.add(current.value)

            if (current.value === end) break

            const edgesToNeighbours = graph.getEdges().filter(e => e.getFrom() === current.value)

            for (const edge of edgesToNeighbours) {
                const to = edge.getTo()
                if (completedVertices.has(to)) {
                    continue
                }

                const distance = edge.getWeight() + current.priority
                const currentQueueEntry = priorityQueue.getData().find(e => e.value === edge.getTo())

                if (currentQueueEntry != undefined) {
                    if (currentQueueEntry.priority > distance) {
                        currentQueueEntry.priority = distance;
                        predecessorMap.set(to, current.value)
                    }
                } else {
                    priorityQueue.offer(to, distance)
                    predecessorMap.set(to, current.value)
                }
            }
        }

        const path: GraphFormItem[] = []

        if (completedVertices.has(end)) {
            path.push(end.getValue().item)

            let current = end;
            while (predecessorMap.has(current)) {
                const predecessor: Vertex<VertexValue> = predecessorMap.get(current) as Vertex<VertexValue>
                path.push(predecessor.getValue().item)
                current = predecessor
            }
        }
        path.reverse()

        this.createPathStep(graph, grid, path, startItemCoords, endItemCoords, pb)

        return pb.build()
    }


    private createPathStep(graph: Graph<VertexValue, EdgeValue>, grid: GraphFormGrid, path: GraphFormItem[], startItemCoords: Coords, endItemCoords: Coords, pb: ProtocolBuilder<SearchSimulationStep>) {
        const highlightedGrid = cloneGrid(grid)
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
            const highlightedGrid = cloneGrid(grid)
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

    private createStep(graph: Graph<VertexValue, EdgeValue>, grid: GraphFormGrid, current: Vertex<VertexValue>, startItemCoords: Coords, endItemCoords: Coords, visitedVertices: Set<Vertex<VertexValue>>, pb: ProtocolBuilder<SearchSimulationStep>) {
        const highlightedGrid = cloneGrid(grid)
        this.highlightVerticesInGrid(highlightedGrid, visitedVertices)
        pb.step({
            grid: highlightedGrid,
            start: highlightedGrid[startItemCoords.y][startItemCoords.x],
            end: highlightedGrid[endItemCoords.y][endItemCoords.x],
        })
    }

    private highlightVerticesInGrid(grid: GraphFormGrid, vertices: Set<Vertex<VertexValue>>) {
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

    description(): string[] {
        return [`
            BreadthSearch description
        `]
    }
}

class PriorityQueue<T> {
    private readonly data: { priority: number, value: T }[] = []

    public getData(): { priority: number, value: T }[] {
        return this.data
    }

    public offer(element: T, priority: number) {
        this.data.push({ priority, value: element })
    }

    public poll() {
        if (this.isEmpty()) {
            return null
        }
        let min = 0
        this.data.forEach((val, i) => {
            if (val.priority < this.data[min].priority) {
                min = i
            }
        })

        let res = this.data[min]
        this.data.splice(min, 1)
        return res
    }

    public isEmpty(): boolean {
        return this.size() == 0
    }

    public size(): number {
        return this.data.length
    }
}

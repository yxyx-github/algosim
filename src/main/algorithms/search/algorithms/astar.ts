import type {
    SearchAlgorithmImplementation,
    SearchSimulation,
    SearchSimulationStep
} from '@/main/algorithms/search/algorithms/types'
import type { Graph } from '@/main/algorithms/search/graph/graph'
import type { Coords, EdgeValue, GraphFormGrid, VertexValue } from '@/main/algorithms/search/graphForm/types'
import type { Vertex } from '@/main/algorithms/search/graph/vertex'
import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import { cloneGrid, cloneSearchSimulationStep } from '@/main/algorithms/search/algorithms/index'
import type { Edge } from '@/main/algorithms/search/graph/edge'

interface AStarDijkstraValue extends VertexValue {
    completed?: boolean
    distance?: number
    heuristicDistance? : number
    predecessor?: Edge<AStarDijkstraValue, EdgeValue>
}

export class AStar implements SearchAlgorithmImplementation {

    run(graph: Graph<AStarDijkstraValue, EdgeValue>, grid: GraphFormGrid, start: Vertex<AStarDijkstraValue>, end: Vertex<AStarDijkstraValue>): SearchSimulation {
        const pb = new ProtocolBuilder<SearchSimulationStep>()
        pb.setStepCloner((step: SearchSimulationStep) => cloneSearchSimulationStep(step))

        const startItemCoords = start.getValue().item.data().coords
        const endItemCoords = end.getValue().item.data().coords

        let highlightedGrid = this.createStep(graph.getVertices(), grid)
        pb.step({ grid: highlightedGrid, start: highlightedGrid[startItemCoords.y][startItemCoords.x], end: highlightedGrid[endItemCoords.y][endItemCoords.x] })

        const queue: AStarQueue = new AStarQueue(graph.getVertices())
        start.getValue().distance = 0
        start.getValue().heuristicDistance = 0

        highlightedGrid = this.createStep(graph.getVertices(), grid)
        pb.step({ grid: highlightedGrid, start: highlightedGrid[startItemCoords.y][startItemCoords.x], end: highlightedGrid[endItemCoords.y][endItemCoords.x] })

        while (!queue.isEmpty()) {
            const current: Vertex<AStarDijkstraValue> = queue.poll() as Vertex<AStarDijkstraValue>
            if (current.getValue().distance == undefined) break

            current.getValue().completed = true

            highlightedGrid = this.createStep(graph.getVertices(), grid)
            pb.step({ grid: highlightedGrid, start: highlightedGrid[startItemCoords.y][startItemCoords.x], end: highlightedGrid[endItemCoords.y][endItemCoords.x] })

            if (current === end) break
            this.checkEdges(graph, current, startItemCoords, endItemCoords, grid, pb)
        }

        this.createPathStep(grid, end, startItemCoords, pb)
        return pb.build()
    }

    private checkEdges(graph: Graph<AStarDijkstraValue, EdgeValue>, current: Vertex<AStarDijkstraValue>, start: Coords, end: Coords, grid: GraphFormGrid, pb: ProtocolBuilder<SearchSimulationStep>) {
        let highlightedGrid = this.createStep(graph.getVertices(), grid)

        graph.getEdges().filter(e => e.getFrom() === current).forEach(edge => {
            const to = edge.getTo()
            if (to.getValue().completed??false) {
                return
            }

            this.visualiseEdgeSteps(edge, start, end, highlightedGrid, pb)

            let visualiseStep: boolean = false

            const distance = edge.getWeight() + (current.getValue().distance??0)
            if (to.getValue().heuristicDistance == undefined) {
                to.getValue().heuristicDistance = this.calculateHeuristicDistance(end, to)
            }

            if ((to.getValue().distance??Infinity) > distance) {
                to.getValue().distance = distance
                to.getValue().predecessor = edge
                visualiseStep = true
            }
            highlightedGrid = this.createStep(graph.getVertices(), grid)
            if (visualiseStep) {
                pb.step({ grid: highlightedGrid, start: highlightedGrid[start.y][start.x], end: highlightedGrid[end.y][end.x] })
            }
        })
    }

    private calculateHeuristicDistance(end: Coords, vertex: Vertex<AStarDijkstraValue>) {
        const vertexCoords = vertex.getValue().item.data().coords
        return Math.abs(vertexCoords.x - end.x) + Math.abs(vertexCoords.y - end.y)
    }

    private visualiseEdgeSteps(edge: Edge<AStarDijkstraValue, EdgeValue>, start: Coords, end: Coords, grid: GraphFormGrid, pb: ProtocolBuilder<SearchSimulationStep>) {
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

    private createPathStep(grid: GraphFormGrid, end: Vertex<AStarDijkstraValue>, startItemCoords: Coords, pb: ProtocolBuilder<SearchSimulationStep>) {
        const highlightedGrid: GraphFormGrid = cloneGrid(grid)
        if (!(end.getValue().completed??false)) {
            pb.step({
                grid: highlightedGrid,
                start: highlightedGrid[startItemCoords.y][startItemCoords.x],
                end: highlightedGrid[end.getValue().item.data().coords.y][end.getValue().item.data().coords.x],
            })
            return
        }

        let current: Vertex<AStarDijkstraValue> = end;
        this.highlightVertex(highlightedGrid, end)

        while (current.getValue().predecessor != undefined) {
            this.highlightEdge(highlightedGrid, current.getValue().predecessor as Edge<AStarDijkstraValue, EdgeValue>)
            current = current.getValue().predecessor?.getFrom() as Vertex<AStarDijkstraValue>
            this.highlightVertex(highlightedGrid, current)

        }
        pb.step({
            grid: highlightedGrid,
            start: highlightedGrid[startItemCoords.y][startItemCoords.x],
            end: highlightedGrid[end.getValue().item.data().coords.y][end.getValue().item.data().coords.x],
        })
    }

    private highlightVertex(grid: GraphFormGrid, vertex: Vertex<AStarDijkstraValue>) {
        if ((vertex.getValue().distance == undefined) && !(vertex.getValue().completed??false)) {
            return
        }
        const x = vertex.getValue().item.data().coords.x
        const y = vertex.getValue().item.data().coords.y
        const item = grid[y][x]

        grid[y][x] = new GraphFormItem({
            ...item.data(),
            highlight: {...item.data().highlight, center: vertex.getValue().completed??false},
            label: "d: " + (vertex.getValue().distance?.toString()??"") + ", h: " + (vertex.getValue().heuristicDistance?.toString()??"")
        })
    }

    private highlightEdge(grid: GraphFormGrid, edge: Edge<AStarDijkstraValue, EdgeValue>) {
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


    private createStep(vertices: Vertex<AStarDijkstraValue>[], grid: GraphFormGrid) {
        const highlightedGrid = cloneGrid(grid)
        this.highlightVerticesInGrid(highlightedGrid, vertices)
        return highlightedGrid
    }

    private highlightVerticesInGrid(grid: GraphFormGrid, vertices: Vertex<AStarDijkstraValue>[]) {
        vertices.forEach(v => {
            this.highlightVertex(grid, v)
            if (v.getValue().predecessor != undefined) {
                this.highlightEdge(grid, v.getValue().predecessor as Edge<AStarDijkstraValue, EdgeValue>)
            }
        })
    }

    description(): string[] {
        return [`
            A* description
        `]
    }
}

class AStarQueue {

    private readonly vertices: Vertex<AStarDijkstraValue>[]

    constructor(vertices: Vertex<AStarDijkstraValue>[]) {
        this.vertices = Array<Vertex<AStarDijkstraValue>>(...vertices)
    }

    public offer(element: Vertex<AStarDijkstraValue>) {
        this.vertices.push(element)
    }

    public poll() {
        if (this.isEmpty()) {
            return null
        }
        let min = 0
        this.vertices.forEach((val, i) => {
            if ((val.getValue().distance??Infinity) + (val.getValue().heuristicDistance??Infinity) < (this.vertices[min].getValue().distance??Infinity) + (this.vertices[min].getValue().heuristicDistance??Infinity)) {
                min = i
            }
        })
        let res = this.vertices[min]
        this.vertices.splice(min, 1)
        return res
    }

    public isEmpty(): boolean {
        return this.size() == 0
    }

    public size(): number {
        return this.vertices.length
    }
}

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
import { DijkstraQueue } from '@/main/dataStructures/DijkstraQueue'

export interface VertexDijkstraValue extends VertexValue {
    completed?: boolean
    distance?: number
    predecessor?: Edge<VertexDijkstraValue, EdgeValue>
}

export class Dijkstra implements SearchAlgorithmImplementation {

    run(graph: Graph<VertexDijkstraValue, EdgeValue>, grid: GraphFormGrid, start: Vertex<VertexDijkstraValue>, end: Vertex<VertexDijkstraValue>): SearchSimulation {
        const pb = new ProtocolBuilder<SearchSimulationStep>()
        pb.setStepCloner((step: SearchSimulationStep) => cloneSearchSimulationStep(step))

        const startItemCoords = start.getValue().item.data().coords
        const endItemCoords = end.getValue().item.data().coords

        let highlightedGrid = this.createStep(graph.getVertices(), grid)
        pb.step({
            grid: highlightedGrid,
            start: highlightedGrid[startItemCoords.y][startItemCoords.x],
            end: highlightedGrid[endItemCoords.y][endItemCoords.x],
        })

        const queue: DijkstraQueue = new DijkstraQueue(graph.getVertices())
        start.getValue().distance = 0

        highlightedGrid = this.createStep(graph.getVertices(), grid)
        pb.step({
            grid: highlightedGrid,
            start: highlightedGrid[startItemCoords.y][startItemCoords.x],
            end: highlightedGrid[endItemCoords.y][endItemCoords.x],
        })

        while (!queue.isEmpty()) {
            const current: Vertex<VertexDijkstraValue> = queue.poll() as Vertex<VertexDijkstraValue>
            current.getValue().completed = true

            highlightedGrid = this.createStep(graph.getVertices(), grid)
            pb.step({
                grid: highlightedGrid,
                start: highlightedGrid[startItemCoords.y][startItemCoords.x],
                end: highlightedGrid[endItemCoords.y][endItemCoords.x],
            })

            if (current === end) break
            this.checkEdges(graph, current, startItemCoords, endItemCoords, grid, pb)
        }

        this.createPathStep(grid, end, startItemCoords, pb)
        return pb.build()
    }

    private checkEdges(graph: Graph<VertexDijkstraValue, EdgeValue>, current: Vertex<VertexDijkstraValue>, start: Coords, end: Coords, grid: GraphFormGrid, pb: ProtocolBuilder<SearchSimulationStep>) {
        let highlightedGrid = this.createStep(graph.getVertices(), grid)

        graph.getEdges().filter(e => e.getFrom() === current).forEach(edge => {
            const to = edge.getTo()
            if (to.getValue().completed ?? false) {
                return
            }

            this.visualiseEdgeSteps(edge, start, end, highlightedGrid, pb)

            let visualiseStep: boolean = false

            const distance = edge.getWeight() + (current.getValue().distance ?? 0)
            if ((to.getValue().distance ?? Infinity) > distance) {
                to.getValue().distance = distance
                to.getValue().predecessor = edge
                visualiseStep = true
            }
            highlightedGrid = this.createStep(graph.getVertices(), grid)
            if (visualiseStep) {
                pb.step({
                    grid: highlightedGrid,
                    start: highlightedGrid[start.y][start.x],
                    end: highlightedGrid[end.y][end.x],
                })
            }
        })
    }

    private visualiseEdgeSteps(edge: Edge<VertexDijkstraValue, EdgeValue>, start: Coords, end: Coords, grid: GraphFormGrid, pb: ProtocolBuilder<SearchSimulationStep>) {
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

    private createPathStep(grid: GraphFormGrid, end: Vertex<VertexDijkstraValue>, startItemCoords: Coords, pb: ProtocolBuilder<SearchSimulationStep>) {
        const highlightedGrid: GraphFormGrid = cloneGrid(grid)
        if (!(end.getValue().completed ?? false)) {
            pb.step({
                grid: highlightedGrid,
                start: highlightedGrid[startItemCoords.y][startItemCoords.x],
                end: highlightedGrid[end.getValue().item.data().coords.y][end.getValue().item.data().coords.x],
            })
            return
        }

        let current: Vertex<VertexDijkstraValue> = end;
        this.highlightVertex(highlightedGrid, end)

        while (current.getValue().predecessor != undefined) {
            this.highlightEdge(highlightedGrid, current.getValue().predecessor as Edge<VertexDijkstraValue, EdgeValue>)
            current = current.getValue().predecessor?.getFrom() as Vertex<VertexDijkstraValue>
            this.highlightVertex(highlightedGrid, current)

        }
        pb.step({
            grid: highlightedGrid,
            start: highlightedGrid[startItemCoords.y][startItemCoords.x],
            end: highlightedGrid[end.getValue().item.data().coords.y][end.getValue().item.data().coords.x],
        })
    }

    private highlightVertex(grid: GraphFormGrid, vertex: Vertex<VertexDijkstraValue>) {
        if ((vertex.getValue().distance == undefined) && !(vertex.getValue().completed ?? false)) {
            return
        }
        const x = vertex.getValue().item.data().coords.x
        const y = vertex.getValue().item.data().coords.y
        const item = grid[y][x]

        grid[y][x] = new GraphFormItem({
            ...item.data(),
            highlight: { ...item.data().highlight, center: vertex.getValue().completed ?? false },
            label: vertex.getValue().distance?.toString() ?? ""
        })
    }

    private highlightEdge(grid: GraphFormGrid, edge: Edge<VertexDijkstraValue, EdgeValue>) {
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


    private createStep(vertices: Vertex<VertexDijkstraValue>[], grid: GraphFormGrid) {
        const highlightedGrid = cloneGrid(grid)
        this.highlightVerticesInGrid(highlightedGrid, vertices)
        return highlightedGrid
    }

    private highlightVerticesInGrid(grid: GraphFormGrid, vertices: Vertex<VertexDijkstraValue>[]) {
        vertices.forEach(v => {
            this.highlightVertex(grid, v)
            if (v.getValue().predecessor != undefined) {
                this.highlightEdge(grid, v.getValue().predecessor as Edge<VertexDijkstraValue, EdgeValue>)
            }
        })
    }

    description(): string[] {
        return [`
            Dijkstra ist ein Suchalgorithmus, welcher versucht den kostengünstigsten Pfad zwischen einem Start und einem
            Endknoten zu bestimmen. Dabei wird jedem Knoten eine Entfernung zum Startknoten zugeordnet. In dieser Implementation
            handelt es sich dabei um die euklidische Entfernung, da diese optimiert werden soll. Zu Beginn werden
            alle Knoten außer der Startknoten mit der Entfernung "unendlich" initialisiert. Der Startknoten hat selbstverständlich
            die Entfernung "0" zu sich selbst. Nun wird in jedem Iterationsschritt immer der Knoten gewählt, welcher die kürzeste
            Entfernung zum Startknoten aufweist und welcher noch nicht als permanent gekennzeichnet wurde. Dieser Knoten
            kann nun als permanent gekennzeichnet werden, da der kürzeste Weg zu dem Knoten bereits gefunden wurde. Damit können nun alle seine
            Nachbarn können betrachtet werden um zu schauen, ob der Weg über den jetzigen Knoten kürzer ist als der Bisherige. Wenn dies
            der Fall ist, dann wird die Entfernung des benachbarten Knotens aktualisiert und der jetzige Knoten als Vorgänger
            des Nachbarknotens eingetragen. Sobald der Endknoten als permanent gekennzeichnet wurde, wurde der kürzeste
            Weg vom Start bis zum Ende gefunden. Diesen Pfad kann man über die rekursive Nachverfolgung der Vorgängerknoten
            des Endknotens rekonstruiert werden.`,
            `
            In der hier gewählten Darstellung wird die Entfernung zum Startknoten als Zahl dargestellt. Wenn ein Knoten als
            permanent gekennzeichnet wurde, dann wird er rot hervorgehoben. Wenn die Entfernung eines Knotens "unendlich"
            beträgt, dann wird die Entfernung in der Darstellung ausgeblendet.`
        ]
    }
}

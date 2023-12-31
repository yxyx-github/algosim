import type { SearchAlgorithmImplementation, SearchSimulation, SearchSimulationStep } from '@/main/algorithms/search/algorithms/types'
import type { Graph } from '@/main/algorithms/search/graph/graph'
import type { Coords, EdgeValue, GraphFormGrid, VertexValue } from '@/main/algorithms/search/graphForm/types'
import type { Vertex } from '@/main/algorithms/search/graph/vertex'
import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import type { Edge } from '@/main/algorithms/search/graph/edge'
import { cloneGrid, cloneSearchSimulationStep } from '@/main/algorithms/search/algorithms/index'

interface VertexDepthFirstSearchValue extends VertexValue {
    visited?: boolean
    predecessor?: Edge<VertexDepthFirstSearchValue, EdgeValue>
}

export class DepthFirstSearch implements SearchAlgorithmImplementation {

    run(graph: Graph<VertexDepthFirstSearchValue, EdgeValue>, grid: GraphFormGrid, start: Vertex<VertexDepthFirstSearchValue>, end: Vertex<VertexDepthFirstSearchValue>): SearchSimulation {
        const pb = new ProtocolBuilder<SearchSimulationStep>()
        pb.setStepCloner((step: SearchSimulationStep) => cloneSearchSimulationStep(step))
        const startItemCoords = start.getValue().item.data().coords
        const endItemCoords = end.getValue().item.data().coords

        const edgeStack: Edge<VertexDepthFirstSearchValue, EdgeValue>[] = []

        let highlightedGrid = this.calculateStep(graph.getVertices(), grid)
        pb.step({
            grid: highlightedGrid,
            start: highlightedGrid[startItemCoords.y][startItemCoords.x],
            end: highlightedGrid[endItemCoords.y][endItemCoords.x],
        })

        start.getValue().visited = true

        highlightedGrid = this.calculateStep(graph.getVertices(), grid)
        pb.step({ grid: highlightedGrid, start: highlightedGrid[startItemCoords.y][startItemCoords.x], end: highlightedGrid[endItemCoords.y][endItemCoords.x] })

        const edgesToNeighbours = graph.getEdges().filter(e => e.getFrom() === start)
        for (const edge of edgesToNeighbours) {
            const to = edge.getTo()
            to.getValue().predecessor = edge
            edgeStack.push(edge)
        }

        while (edgeStack.length > 0) {
            const currentEdge: Edge<VertexDepthFirstSearchValue, EdgeValue> = edgeStack.pop() as Edge<VertexDepthFirstSearchValue, EdgeValue>
            const current: Vertex<VertexDepthFirstSearchValue> = currentEdge.getTo()

            if (current.getValue().visited ?? false) continue
            current.getValue().visited = true

            this.visualiseEdgeSteps(currentEdge, startItemCoords, endItemCoords, highlightedGrid, pb)
            highlightedGrid = this.calculateStep(graph.getVertices(), grid)
            pb.step({ grid: highlightedGrid, start: highlightedGrid[startItemCoords.y][startItemCoords.x], end: highlightedGrid[endItemCoords.y][endItemCoords.x] })

            if (current === end) break

            const edgesToNeighbours = graph.getEdges().filter(e => e.getFrom() === current)
            for (const edge of edgesToNeighbours) {
                const to = edge.getTo()
                if ((to.getValue().visited ?? false) || edgeStack.includes(edge)) {
                    continue
                }
                to.getValue().predecessor = edge
                edgeStack.push(edge)
            }
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
        if (!(end.getValue().visited ?? false)) {
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
        if (!(vertex.getValue().visited ?? false)) {
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

    private calculateStep(vertices: Vertex<VertexDepthFirstSearchValue>[], grid: GraphFormGrid) {
        const highlightedGrid = cloneGrid(grid)
        this.highlightVerticesInGrid(highlightedGrid, vertices)
        return highlightedGrid
    }

    private highlightVerticesInGrid(grid: GraphFormGrid, vertices: Vertex<VertexDepthFirstSearchValue>[]) {
        vertices.forEach(v => {
            this.highlightVertex(grid, v)
            if (v.getValue().predecessor != undefined && (v.getValue().visited ?? false)) {
                this.highlightEdge(grid, v.getValue().predecessor as Edge<VertexDepthFirstSearchValue, EdgeValue>)
            }
        })
    }

    description(): string[] {
        return [
            `Die Depth - First search, auch DFS oder Tiefensuche genannt, ist ein uninformierter Suchalgorithmus, welcher zum
            Durchsuchen von Graphen verwendet wird. Der Algorithmus beginnt beim Startknoten und durchsucht einen der Nachbarknoten.
            Dabei werden alle besuchten Knoten als besucht markiert, um doppelte Abläufe zu vermeiden.
            DFS geht bis zum letzten Knoten eines Zweiges, bevor er zurückkehrt, um einen anderen
            unerforschten Zweig zu durchlaufen, dabei wird sich das Speicherprinzip eines Stapels (Datenstruktur "Stack") zu nutze gemacht.
            Die Laufzeitkomplexität von DFS beträgt in der Regel O(|V| + |E|), wobei |V| die Anzahl der Knoten und |E| die
            Anzahl der Kanten im Graphen ist.`
        ]
    }
}

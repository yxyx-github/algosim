import type { SearchAlgorithmImplementation, SearchSimulation, SearchSimulationStep } from '@/main/algorithms/search/algorithms/types'
import type { Graph } from '@/main/algorithms/search/graph/graph'
import type { Coords, EdgeValue, GraphFormGrid, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'
import type { Vertex } from '@/main/algorithms/search/graph/vertex'
import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import type { Edge } from '@/main/algorithms/search/graph/edge'
import { cloneGrid, cloneSearchSimulationStep } from '@/main/algorithms/search/algorithms/index'

export class DepthFirstSearch implements SearchAlgorithmImplementation {

    run(graph: Graph<VertexValue, EdgeValue>, grid: GraphFormGrid, start: Vertex<VertexValue>, end: Vertex<VertexValue>): SearchSimulation {
        const pb = new ProtocolBuilder<SearchSimulationStep>()
        pb.setStepCloner((step: SearchSimulationStep) => cloneSearchSimulationStep(step))
        const startItemCoords = start.getValue().item.data().coords
        const endItemCoords = end.getValue().item.data().coords

        const visitedVertices: Vertex<VertexValue>[] = [start]
        const edgeStack: Edge<VertexValue, EdgeValue>[] = graph.getEdges().filter(e => e.getFrom() === start)

        const path: GraphFormItem[] = [start.getValue().item]
        this.createStep(graph, grid, start, startItemCoords, endItemCoords, visitedVertices, pb)

        while (edgeStack.length > 0) {
            const currentEdge: Edge<VertexValue, EdgeValue> = edgeStack.pop() as Edge<VertexValue, EdgeValue>
            const current: Vertex<VertexValue> = currentEdge.getTo()

            if (visitedVertices.includes(current)) continue

            path.push(...currentEdge.getValue().items)
            this.createEdgeSteps(graph, grid, currentEdge, startItemCoords, endItemCoords, visitedVertices, pb)
            visitedVertices.push(current)
            this.createStep(graph, grid, current, startItemCoords, endItemCoords, visitedVertices, pb)
            path.push(current.getValue().item)

            if (current === end) break

            const edgesToNeighbours = graph.getEdges().filter(e => e.getFrom() === current)
            for (const edge of edgesToNeighbours) {
                const to = edge.getTo()
                if (visitedVertices.includes(to)) {
                    continue
                }
                edgeStack.push(edge)
            }
        }

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

    private createStep(graph: Graph<VertexValue, EdgeValue>, grid: GraphFormGrid, current: Vertex<VertexValue>, startItemCoords: Coords, endItemCoords: Coords, visitedVertices: Vertex<VertexValue>[], pb: ProtocolBuilder<SearchSimulationStep>) {
        const highlightedGrid = cloneGrid(grid)
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

    description(): string[] {
        return [`
        Die Depth-First search auch DFS oder Tiefensuche ist eine Suchalgorithmus zur Durchsuchung von Graphen.
        Es handelt sich bei der Depth-First search um eine uninformierte Suche. Der Algorithmus beginnt beim Startknoten
        und durchsucht einen der Nachbarknoten. Dabei werden alle besuchten Knoten als besucht markiert, um doppelte
        Abläufe zu vermeiden. DFS geht bis zum letzten Knoten eines Zweiges, bevor er zurückkehrt, um einen anderen
        unerforschten Zweig zu durchlaufen, dabei wird sich das Speicherprinzip eines Stacks (Datenstruktur) zu nutze gemacht.
        Die Laufzeitkomplexität von DFS beträgt in der Regel O(|V| + |E|), wobei |V| die Anzahl der Knoten und |E| die
        Anzahl der Kanten im Graphen ist.`
        ]
    }
}

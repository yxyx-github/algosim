import { describe, expect, test } from 'vitest'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormConverter } from '@/main/algorithms/search/graphForm/graphFormConverter'
import { Graph } from '@/main/algorithms/search/graph/graph'
import type { Coords, EdgeValue, TRBL, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import { Vertex } from '@/main/algorithms/search/graph/vertex'
import { Edge } from '@/main/algorithms/search/graph/edge'

describe('GraphFormConverter', () => {
    function getItemWithConnections(coords: Coords, connections: TRBL<boolean>): GraphFormItem {
        return new GraphFormItem({
            type: GraphFormItemType.VERTEX,
            label: '',
            coords: { x: coords.x, y: coords.y },
            connections: connections,
            connect: { top: false, right: false, bottom: false, left: false },
            highlight: { top: false, right: false, bottom: false, left: false, center: false },
        })
    }

    function generateEdgeId(v1: Vertex<VertexValue>, v2: Vertex<VertexValue>, weight: number, edgeItems: GraphFormItem[]): string {
        return `${v1.getId()}==${weight}==${edgeItems.map(item => `${item.generateItemId()}`)}=>${v2.getId()}`
    }

    function generateEdge(v1: Vertex<VertexValue>, v2: Vertex<VertexValue>, weight: number, edgeItems: GraphFormItem[]): Edge<VertexValue, EdgeValue> {
        return new Edge<VertexValue, EdgeValue>(generateEdgeId(v1, v2, weight, edgeItems), v1, v2, weight, { items: edgeItems })
    }

    function assertGraph(graph: Graph<VertexValue, EdgeValue>, expectedGraph: Graph<VertexValue, EdgeValue>) {
        expect(graph.getVertices().length).to.equal(expectedGraph.getVertices().length)
        graph.getVertices().forEach(vertex => {
            const expectedVertex = expectedGraph.findVertexById(vertex.getId())
            expect(vertex).to.deep.equal(expectedVertex)
        })

        expect(graph.getEdges().length).to.equal(expectedGraph.getEdges().length)
        graph.getEdges().forEach(edge => {
            const foundExpectedEdge = expectedGraph.findEdge((e: Edge<VertexValue, EdgeValue>) =>
                e.getId() === edge.getId()
            )

            expect(foundExpectedEdge).to.not.undefined

            const expectedEdge = foundExpectedEdge as Edge<VertexValue, EdgeValue>

            expect(edge.getFrom()).to.deep.equal(expectedEdge.getFrom())
            expect(edge.getTo()).to.deep.equal(expectedEdge.getTo())
            expect(edge.getWeight()).to.equal(expectedEdge.getWeight());
            expect(edge.getValue().items).to.deep.equal(expectedEdge.getValue().items)
        })
    }

    test('can convert empty initial GraphForm', () => {
        const graphForm = new GraphForm()
        const converter = new GraphFormConverter(graphForm)

        expect(converter.toGraph()).to.deep.equal(new Graph<VertexValue, EdgeValue>())
    })

    test('can convert empty GraphForm with more rows and cols', () => {
        const graphForm = new GraphForm()
        graphForm.addRow()
        graphForm.addColumn()
        graphForm.addRow()
        graphForm.addColumn()
        const converter = new GraphFormConverter(graphForm)

        expect(converter.toGraph()).to.deep.equal(new Graph<VertexValue, EdgeValue>())
    })

    test('can convert empty GraphForm with more rows and cols and invalid connection', () => {
        const graphForm = new GraphForm()
        graphForm.addRow()
        graphForm.addColumn()
        graphForm.addRow()
        graphForm.addColumn()
        const expectedGraphForm = structuredClone(graphForm)
        const item00 = getItemWithConnections({ x: 0, y: 0, }, { top: false, right: false, bottom: false, left: true })
        const item11 = getItemWithConnections({ x: 1, y: 1, }, { top: true, right: false, bottom: false, left: false })
        graphForm.updateItem(item00)
        graphForm.updateItem(item11)
        const converter = new GraphFormConverter(graphForm)

        expect(converter.toGraph()).to.deep.equal(new Graph<VertexValue, EdgeValue>())
        expect(graphForm).to.deep.equal(expectedGraphForm)
    })

    test('can convert GraphForm with two vertex items next to each other', () => {
        const item01 = getItemWithConnections({ x: 0, y: 1, }, { top: false, right: true, bottom: false, left: false })
        const item11 = getItemWithConnections({ x: 1, y: 1, }, { top: false, right: false, bottom: false, left: true })

        const expectedGraph = new Graph<VertexValue, EdgeValue>()
        const v1 = new Vertex<VertexValue>('x:0y:1', {
            item: item01,
        })
        expectedGraph.addVertex(v1)
        const v2 = new Vertex<VertexValue>('x:1y:1', {
            item: item11,
        })
        expectedGraph.addVertex(v2)
        expectedGraph.addEdge(generateEdge(v1, v2, 1, []))
        expectedGraph.addEdge(generateEdge(v2, v1, 1, [].reverse()))

        const graphForm = new GraphForm()
        graphForm.addRow()
        graphForm.addColumn()
        graphForm.addRow()
        graphForm.addColumn()

        graphForm.updateItem(item01)
        graphForm.updateItem(item11)

        const converter = new GraphFormConverter(graphForm)

        assertGraph(converter.toGraph(), expectedGraph)
    })

    test('can convert GraphForm with two vertex items with edge items between', () => {
        const item01 = getItemWithConnections({ x: 0, y: 1, }, { top: false, right: true, bottom: false, left: false })
        const item11 = getItemWithConnections({ x: 1, y: 1, }, { top: false, right: false, bottom: true, left: true })
        const item12 = getItemWithConnections({ x: 1, y: 2, }, { top: true, right: true, bottom: false, left: false })
        const item22 = getItemWithConnections({ x: 2, y: 2, }, { top: false, right: false, bottom: false, left: true })

        const expectedGraph = new Graph<VertexValue, EdgeValue>()
        const v1 = new Vertex<VertexValue>('x:0y:1', {
            item: item01,
        })
        expectedGraph.addVertex(v1)
        const v2 = new Vertex<VertexValue>('x:2y:2', {
            item: item22,
        })
        expectedGraph.addVertex(v2)
        expectedGraph.addEdge(generateEdge(v1, v2, 3, [item11, item12]))
        expectedGraph.addEdge(generateEdge(v2, v1, 3, [item11, item12].reverse()))

        const graphForm = new GraphForm()
        graphForm.addRow()
        graphForm.addColumn()
        graphForm.addRow()
        graphForm.addColumn()

        graphForm.updateItem(item01)
        graphForm.updateItem(item11)
        graphForm.updateItem(item12)
        graphForm.updateItem(item22)

        const converter = new GraphFormConverter(graphForm)

        assertGraph(converter.toGraph(), expectedGraph)
    })

    test('can convert GraphForm with one edge with equal from and to', () => {
        const item00 = getItemWithConnections({ x: 0, y: 0, }, { top: false, right: true, bottom: true, left: false })
        const item10 = getItemWithConnections({ x: 1, y: 0, }, { top: false, right: true, bottom: false, left: true })
        const item20 = getItemWithConnections({ x: 2, y: 0, }, { top: false, right: false, bottom: true, left: true })
        const item01 = getItemWithConnections({ x: 0, y: 1, }, { top: true, right: true, bottom: true, left: false })
        const item11 = getItemWithConnections({ x: 1, y: 1, }, { top: false, right: false, bottom: false, left: true })
        const item21 = getItemWithConnections({ x: 2, y: 1, }, { top: true, right: false, bottom: true, left: false })
        const item02 = getItemWithConnections({ x: 0, y: 2, }, { top: true, right: true, bottom: false, left: false })
        const item12 = getItemWithConnections({ x: 1, y: 2, }, { top: false, right: true, bottom: false, left: true })
        const item22 = getItemWithConnections({ x: 2, y: 2, }, { top: true, right: false, bottom: false, left: true })

        const expectedGraph = new Graph<VertexValue, EdgeValue>()
        const v1 = new Vertex<VertexValue>('x:0y:1', {
            item: item01,
        })
        expectedGraph.addVertex(v1)
        const v2 = new Vertex<VertexValue>('x:1y:1', {
            item: item11,
        })
        expectedGraph.addVertex(v2)
        expectedGraph.addEdge(generateEdge(v1, v2, 1, []))
        expectedGraph.addEdge(generateEdge(v2, v1, 1, [].reverse()))
        expectedGraph.addEdge(generateEdge(v1, v1, 8, [item00, item10, item20, item21, item22, item12, item02]))
        expectedGraph.addEdge(generateEdge(v1, v1, 8, [item00, item10, item20, item21, item22, item12, item02].reverse()))

        const graphForm = new GraphForm()
        graphForm.addRow()
        graphForm.addColumn()
        graphForm.addRow()
        graphForm.addColumn()

        graphForm.updateItem(item00)
        graphForm.updateItem(item10)
        graphForm.updateItem(item20)
        graphForm.updateItem(item01)
        graphForm.updateItem(item11)
        graphForm.updateItem(item21)
        graphForm.updateItem(item02)
        graphForm.updateItem(item12)
        graphForm.updateItem(item22)

        const converter = new GraphFormConverter(graphForm)

        assertGraph(converter.toGraph(), expectedGraph)
    })

    test('can convert GraphForm with all items as vertices (except corners)', () => {
        const item00 = getItemWithConnections({ x: 0, y: 0, }, { top: false, right: true, bottom: true, left: false })
        const item10 = getItemWithConnections({ x: 1, y: 0, }, { top: false, right: true, bottom: true, left: true })
        const item20 = getItemWithConnections({ x: 2, y: 0, }, { top: false, right: false, bottom: true, left: true })
        const item01 = getItemWithConnections({ x: 0, y: 1, }, { top: true, right: true, bottom: true, left: false })
        const item11 = getItemWithConnections({ x: 1, y: 1, }, { top: true, right: true, bottom: true, left: true })
        const item21 = getItemWithConnections({ x: 2, y: 1, }, { top: true, right: false, bottom: true, left: true })
        const item02 = getItemWithConnections({ x: 0, y: 2, }, { top: true, right: true, bottom: false, left: false })
        const item12 = getItemWithConnections({ x: 1, y: 2, }, { top: true, right: true, bottom: false, left: true })
        const item22 = getItemWithConnections({ x: 2, y: 2, }, { top: true, right: false, bottom: false, left: true })

        const expectedGraph = new Graph<VertexValue, EdgeValue>()
        const v1 = new Vertex<VertexValue>('x:1y:0', {
            item: item10,
        })
        expectedGraph.addVertex(v1)
        const v2 = new Vertex<VertexValue>('x:0y:1', {
            item: item01,
        })
        expectedGraph.addVertex(v2)
        const v3 = new Vertex<VertexValue>('x:1y:1', {
            item: item11,
        })
        expectedGraph.addVertex(v3)
        const v4 = new Vertex<VertexValue>('x:2y:1', {
            item: item21,
        })
        expectedGraph.addVertex(v4)
        const v5 = new Vertex<VertexValue>('x:1y:2', {
            item: item12,
        })
        expectedGraph.addVertex(v5)
        expectedGraph.addEdge(generateEdge(v1, v3, 1, []))
        expectedGraph.addEdge(generateEdge(v3, v1, 1, [].reverse()))
        expectedGraph.addEdge(generateEdge(v3, v5, 1, []))
        expectedGraph.addEdge(generateEdge(v5, v3, 1, [].reverse()))
        expectedGraph.addEdge(generateEdge(v2, v3, 1, []))
        expectedGraph.addEdge(generateEdge(v3, v2, 1, [].reverse()))
        expectedGraph.addEdge(generateEdge(v3, v4, 1, []))
        expectedGraph.addEdge(generateEdge(v4, v3, 1, [].reverse()))
        expectedGraph.addEdge(generateEdge(v1, v2, 2, [item00]))
        expectedGraph.addEdge(generateEdge(v2, v1, 2, [item00].reverse()))
        expectedGraph.addEdge(generateEdge(v1, v4, 2, [item20]))
        expectedGraph.addEdge(generateEdge(v4, v1, 2, [item20].reverse()))
        expectedGraph.addEdge(generateEdge(v5, v2, 2, [item02]))
        expectedGraph.addEdge(generateEdge(v2, v5, 2, [item02].reverse()))
        expectedGraph.addEdge(generateEdge(v5, v4, 2, [item22]))
        expectedGraph.addEdge(generateEdge(v4, v5, 2, [item22].reverse()))

        const graphForm = new GraphForm()
        graphForm.addRow()
        graphForm.addColumn()
        graphForm.addRow()
        graphForm.addColumn()

        graphForm.updateItem(item00)
        graphForm.updateItem(item10)
        graphForm.updateItem(item20)
        graphForm.updateItem(item01)
        graphForm.updateItem(item11)
        graphForm.updateItem(item21)
        graphForm.updateItem(item02)
        graphForm.updateItem(item12)
        graphForm.updateItem(item22)

        const converter = new GraphFormConverter(graphForm)

        assertGraph(converter.toGraph(), expectedGraph)
    })

    test('can convert GraphForm with circle of edge items', () => {
        const item00 = getItemWithConnections({ x: 0, y: 0, }, { top: false, right: true, bottom: true, left: false })
        const item10 = getItemWithConnections({ x: 1, y: 0, }, { top: false, right: true, bottom: false, left: true })
        const item20 = getItemWithConnections({ x: 2, y: 0, }, { top: false, right: false, bottom: true, left: true })
        const item01 = getItemWithConnections({ x: 0, y: 1, }, { top: true, right: false, bottom: true, left: false })
        const item11 = getItemWithConnections({ x: 1, y: 1, }, { top: false, right: false, bottom: false, left: false })
        const item21 = getItemWithConnections({ x: 2, y: 1, }, { top: true, right: false, bottom: true, left: false })
        const item02 = getItemWithConnections({ x: 0, y: 2, }, { top: true, right: true, bottom: false, left: false })
        const item12 = getItemWithConnections({ x: 1, y: 2, }, { top: false, right: true, bottom: false, left: true })
        const item22 = getItemWithConnections({ x: 2, y: 2, }, { top: true, right: false, bottom: false, left: true })

        const expectedGraph = new Graph<VertexValue, EdgeValue>()

        const graphForm = new GraphForm()
        graphForm.addRow()
        graphForm.addColumn()
        graphForm.addRow()
        graphForm.addColumn()

        graphForm.updateItem(item00)
        graphForm.updateItem(item10)
        graphForm.updateItem(item20)
        graphForm.updateItem(item01)
        graphForm.updateItem(item11)
        graphForm.updateItem(item21)
        graphForm.updateItem(item02)
        graphForm.updateItem(item12)
        graphForm.updateItem(item22)

        const converter = new GraphFormConverter(graphForm)

        assertGraph(converter.toGraph(), expectedGraph)
    })

    test('can convert GraphForm to non-contiguous graph', () => {
        const item00 = getItemWithConnections({ x: 0, y: 0, }, { top: false, right: false, bottom: true, left: false })
        const item10 = getItemWithConnections({ x: 1, y: 0, }, { top: false, right: false, bottom: false, left: false })
        const item20 = getItemWithConnections({ x: 2, y: 0, }, { top: false, right: false, bottom: true, left: false })
        const item01 = getItemWithConnections({ x: 0, y: 1, }, { top: true, right: false, bottom: true, left: false })
        const item11 = getItemWithConnections({ x: 1, y: 1, }, { top: false, right: false, bottom: false, left: false })
        const item21 = getItemWithConnections({ x: 2, y: 1, }, { top: true, right: false, bottom: true, left: false })
        const item02 = getItemWithConnections({ x: 0, y: 2, }, { top: true, right: false, bottom: false, left: false })
        const item12 = getItemWithConnections({ x: 1, y: 2, }, { top: false, right: false, bottom: false, left: false })
        const item22 = getItemWithConnections({ x: 2, y: 2, }, { top: true, right: false, bottom: false, left: false })

        const expectedGraph = new Graph<VertexValue, EdgeValue>()
        const v1 = new Vertex<VertexValue>('x:0y:0', {
            item: item00,
        })
        expectedGraph.addVertex(v1)
        const v2 = new Vertex<VertexValue>('x:0y:2', {
            item: item02,
        })
        expectedGraph.addVertex(v2)
        const v3 = new Vertex<VertexValue>('x:2y:0', {
            item: item20,
        })
        expectedGraph.addVertex(v3)
        const v4 = new Vertex<VertexValue>('x:2y:2', {
            item: item22,
        })
        expectedGraph.addVertex(v4)
        expectedGraph.addEdge(generateEdge(v1, v2, 2, [item01]))
        expectedGraph.addEdge(generateEdge(v2, v1, 2, [item01].reverse()))
        expectedGraph.addEdge(generateEdge(v3, v4, 2, [item21]))
        expectedGraph.addEdge(generateEdge(v4, v3, 2, [item21].reverse()))

        const graphForm = new GraphForm()
        graphForm.addRow()
        graphForm.addColumn()
        graphForm.addRow()
        graphForm.addColumn()

        graphForm.updateItem(item00)
        graphForm.updateItem(item10)
        graphForm.updateItem(item20)
        graphForm.updateItem(item01)
        graphForm.updateItem(item11)
        graphForm.updateItem(item21)
        graphForm.updateItem(item02)
        graphForm.updateItem(item12)
        graphForm.updateItem(item22)

        const converter = new GraphFormConverter(graphForm)

        assertGraph(converter.toGraph(), expectedGraph)
    })

    test('can convert GraphForm to multi graph with 3 edges between two vertices', () => {
        const item00 = getItemWithConnections({ x: 0, y: 0, }, { top: false, right: true, bottom: true, left: false })
        const item10 = getItemWithConnections({ x: 1, y: 0, }, { top: false, right: true, bottom: false, left: true })
        const item20 = getItemWithConnections({ x: 2, y: 0, }, { top: false, right: false, bottom: true, left: true })
        const item01 = getItemWithConnections({ x: 0, y: 1, }, { top: true, right: true, bottom: true, left: false })
        const item11 = getItemWithConnections({ x: 1, y: 1, }, { top: false, right: true, bottom: false, left: true })
        const item21 = getItemWithConnections({ x: 2, y: 1, }, { top: true, right: false, bottom: true, left: true })
        const item02 = getItemWithConnections({ x: 0, y: 2, }, { top: true, right: true, bottom: false, left: false })
        const item12 = getItemWithConnections({ x: 1, y: 2, }, { top: false, right: true, bottom: false, left: true })
        const item22 = getItemWithConnections({ x: 2, y: 2, }, { top: true, right: false, bottom: false, left: true })

        const expectedGraph = new Graph<VertexValue, EdgeValue>()
        const v1 = new Vertex<VertexValue>('x:0y:1', {
            item: item01,
        })
        expectedGraph.addVertex(v1)
        const v2 = new Vertex<VertexValue>('x:2y:1', {
            item: item21,
        })
        expectedGraph.addVertex(v2)
        expectedGraph.addEdge(generateEdge(v1, v2, 4, [item00, item10, item20]))
        expectedGraph.addEdge(generateEdge(v2, v1, 4, [item00, item10, item20].reverse()))
        expectedGraph.addEdge(generateEdge(v1, v2, 2, [item11]))
        expectedGraph.addEdge(generateEdge(v2, v1, 2, [item11].reverse()))
        expectedGraph.addEdge(generateEdge(v1, v2, 4, [item02, item12, item22]))
        expectedGraph.addEdge(generateEdge(v2, v1, 4, [item02, item12, item22].reverse()))

        const graphForm = new GraphForm()
        graphForm.addRow()
        graphForm.addColumn()
        graphForm.addRow()
        graphForm.addColumn()

        graphForm.updateItem(item00)
        graphForm.updateItem(item10)
        graphForm.updateItem(item20)
        graphForm.updateItem(item01)
        graphForm.updateItem(item11)
        graphForm.updateItem(item21)
        graphForm.updateItem(item02)
        graphForm.updateItem(item12)
        graphForm.updateItem(item22)

        const converter = new GraphFormConverter(graphForm)

        assertGraph(converter.toGraph(), expectedGraph)
    })
})

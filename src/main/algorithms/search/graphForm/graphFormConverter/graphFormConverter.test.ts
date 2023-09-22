import { describe, expect, test } from 'vitest'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormConverter } from '@/main/algorithms/search/graphForm/graphFormConverter'
import { Graph } from '@/main/algorithms/search/graph/graph'
import { Coords, EdgeValue, GraphFormItemType, TRBL, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import { Vertex } from '@/main/algorithms/search/graph/vertex'
import type { Edge } from '@/main/algorithms/search/graph/edge'

describe('GraphFormConverter', () => {
    function getItemWithConnections(coords: Coords, connections: TRBL<boolean>): GraphFormItem {
        return new GraphFormItem({
            type: GraphFormItemType.VERTEX,
            label: '',
            coords: { x: coords.x, y: coords.y },
            connections: connections,
            connect: { top: false, right: false, bottom: false, left: false },
            highlight: { top: false, right: false, bottom: false, left: false },
            isStart: false,
            isEnd: false,
        })
    }

    function assertGraph(graph: Graph<VertexValue, EdgeValue>, expectedGraph: Graph<VertexValue, EdgeValue>) {
        expect(graph.getVertices().length).to.equal(expectedGraph.getVertices().length)
        graph.getVertices().forEach(vertex => {
            const expectedVertex = expectedGraph.findVertexById(vertex.getId())
            expect(vertex).to.deep.equal(expectedVertex)
        })

        expect(graph.getEdges().length).to.equal(expectedGraph.getEdges().length)
        graph.getEdges().forEach(edge => {
            const expectedEdge = expectedGraph.findEdge((e: Edge<VertexValue, EdgeValue>) =>
                e.getTo().getId() === edge.getTo().getId() &&
                e.getFrom().getId() === edge.getFrom().getId()
            )

            expect(edge.getFrom()).to.deep.equal(expectedEdge?.getFrom())
            expect(edge.getTo()).to.deep.equal(expectedEdge?.getTo())
            expect(edge.getWeight()).to.deep.equal(expectedEdge?.getWeight())
            expectedEdge.getValue().items.forEach(item => {
                expect(edge.getValue().items).to.contain(item)
            })
            expect(edge.getValue().items.length).to.equal(expectedEdge?.getValue().items.length)
        })
    }

    test('can convert empty initial GraphForm', () => {
        const graphForm = new GraphForm()
        const converter = new GraphFormConverter(graphForm)

        expect(converter.toGraph()).to.deep.equal(new Graph())
    })

    test('can convert empty GraphForm with more rows and cols', () => {
        const graphForm = new GraphForm()
        graphForm.addRow()
        graphForm.addColumn()
        graphForm.addRow()
        graphForm.addColumn()
        const converter = new GraphFormConverter(graphForm)

        expect(converter.toGraph()).to.deep.equal(new Graph())
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

        expect(converter.toGraph()).to.deep.equal(new Graph())
        expect(graphForm).to.deep.equal(expectedGraphForm)
    })

    test('can convert GraphForm with two vertex items next to each other', () => {
        const item01 = getItemWithConnections({ x: 0, y: 1, }, { top: false, right: true, bottom: false, left: false })
        const item11 = getItemWithConnections({ x: 1, y: 1, }, { top: false, right: false, bottom: false, left: true })

        const expectedGraph = new Graph()
        const v1 = new Vertex<VertexValue>('x:0y:1', {
            item: item01,
        })
        expectedGraph.addVertex(v1)
        const v2 = new Vertex<VertexValue>('x:1y:1', {
            item: item11,
        })
        expectedGraph.addVertex(v2)
        expectedGraph.addEdgeBetween(v1, v2, 0, {
            items: [],
        })

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

    test('can convert GraphForm with two vertex items next with edge items between', () => {
        const item01 = getItemWithConnections({ x: 0, y: 1, }, { top: false, right: true, bottom: false, left: false })
        const item11 = getItemWithConnections({ x: 1, y: 1, }, { top: false, right: false, bottom: true, left: true })
        const item12 = getItemWithConnections({ x: 1, y: 2, }, { top: true, right: true, bottom: false, left: false })
        const item22 = getItemWithConnections({ x: 2, y: 2, }, { top: false, right: false, bottom: false, left: true })

        const expectedGraph = new Graph()
        const v1 = new Vertex<VertexValue>('x:0y:1', {
            item: item01,
        })
        expectedGraph.addVertex(v1)
        const v2 = new Vertex<VertexValue>('x:2y:2', {
            item: item22,
        })
        expectedGraph.addVertex(v2)
        expectedGraph.addEdgeBetween(v1, v2, 2, {
            items: [item11, item12],
        })

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

    // TODO: test edge with equal from and to
})

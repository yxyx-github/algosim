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

        graph.getEdges().map(edge =>
            console.log(`${edge.getFrom().getId()} ==${edge.getWeight()}=> ${edge.getTo().getId()} - ${edge.getValue().items.map(item => item.generateItemId())}`)
        )
        expect(graph.getEdges().length).to.equal(expectedGraph.getEdges().length)
        graph.getEdges().forEach(edge => {
            const foundExpectedEdge = expectedGraph.findEdge((e: Edge<VertexValue, EdgeValue>) =>
                e.getTo().getId() === edge.getTo().getId() &&
                e.getFrom().getId() === edge.getFrom().getId() &&
                e.getWeight() === edge.getWeight()
            )

            expect(foundExpectedEdge).to.not.undefined

            const expectedEdge = foundExpectedEdge as Edge<VertexValue, EdgeValue>

            expect(edge.getFrom()).to.deep.equal(expectedEdge.getFrom())
            expect(edge.getTo()).to.deep.equal(expectedEdge.getTo())
            expect(edge.getWeight()).to.equal(expectedEdge.getWeight());
            // TODO: cannot test items because no non-random id can be generated
            /*(expectedEdge as Edge<VertexValue, EdgeValue>).getValue().items.forEach(item => {
                expect(edge.getValue().items).to.contain(item)
            })*/
            expect(edge.getValue().items.length).to.equal(expectedEdge.getValue().items.length)
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
        expectedGraph.addEdgeBetween(`${v1.getId()}==0=>${v2.getId()}`, `${v2.getId()}==0=>${v1.getId()}`, v1, v2, 0, {
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
        expectedGraph.addEdgeBetween(`${v1.getId()}==2=>${v2.getId()}`, `${v2.getId()}==2=>${v1.getId()}`, v1, v2, 2, {
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
        expectedGraph.addEdgeBetween(`${v1.getId()}==0=>${v2.getId()}`, `${v2.getId()}==0=>${v1.getId()}`, v1, v2, 0, {
            items: [],
        })
        expectedGraph.addEdgeBetween(`${v1.getId()}==7=>${v1.getId()}`, `${v1.getId()}==7=>${v1.getId()}`, v1, v1, 7, {
            items: [item00, item10, item20, item21, item22, item12, item02],
        })

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
        expectedGraph.addEdgeBetween(`${v1.getId()}==0=>${v3.getId()}`, `${v3.getId()}==0=>${v1.getId()}`, v1, v3, 0, {
            items: [],
        })
        expectedGraph.addEdgeBetween(`${v3.getId()}==0=>${v5.getId()}`, `${v5.getId()}==0=>${v3.getId()}`, v3, v5, 0, {
            items: [],
        })
        expectedGraph.addEdgeBetween(`${v2.getId()}==0=>${v3.getId()}`, `${v3.getId()}==0=>${v2.getId()}`, v2, v3, 0, {
            items: [],
        })
        expectedGraph.addEdgeBetween(`${v3.getId()}==0=>${v4.getId()}`, `${v4.getId()}==0=>${v3.getId()}`, v3, v4, 0, {
            items: [],
        })
        expectedGraph.addEdgeBetween(`${v1.getId()}==1=>${v2.getId()}`, `${v2.getId()}==1=>${v1.getId()}`, v1, v2, 1, {
            items: [item00],
        })
        expectedGraph.addEdgeBetween(`${v1.getId()}==1=>${v4.getId()}`, `${v4.getId()}==1=>${v1.getId()}`, v1, v4, 1, {
            items: [item20],
        })
        expectedGraph.addEdgeBetween(`${v5.getId()}==1=>${v2.getId()}`, `${v2.getId()}==1=>${v5.getId()}`, v5, v2, 1, {
            items: [item02],
        })
        expectedGraph.addEdgeBetween(`${v5.getId()}==1=>${v4.getId()}`, `${v4.getId()}==1=>${v5.getId()}`, v5, v4, 1, {
            items: [item22],
        })

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
        expectedGraph.addEdgeBetween(`${v1.getId()}==1=>${v2.getId()}`, `${v2.getId()}==1=>${v1.getId()}`, v1, v2, 1, {
            items: [item01],
        })
        expectedGraph.addEdgeBetween(`${v3.getId()}==1=>${v4.getId()}`, `${v4.getId()}==1=>${v3.getId()}`, v3, v4, 1, {
            items: [item21],
        })

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
        expectedGraph.addEdgeBetween(`${v1.getId()}==3=>${v2.getId()}`, `${v2.getId()}==3=>${v1.getId()}`, v1, v2, 3, {
            items: [item00, item10, item20],
        })
        expectedGraph.addEdgeBetween(`${v1.getId()}==1=>${v2.getId()}`, `${v2.getId()}==1=>${v1.getId()}`, v1, v2, 1, {
            items: [item11],
        })
        expectedGraph.addEdgeBetween(`${v1.getId()}==3=>${v2.getId()}`, `${v2.getId()}==3=>${v1.getId()}`, v1, v2, 3, {
            items: [item02, item12, item22],
        })

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

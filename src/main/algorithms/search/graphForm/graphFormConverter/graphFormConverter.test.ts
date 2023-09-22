import { describe, expect, test } from 'vitest'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormConverter } from '@/main/algorithms/search/graphForm/graphFormConverter'
import { Graph } from '@/main/algorithms/search/graph/graph'
import { Coords, GraphFormItemType, TRBL, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import { Vertex } from '@/main/algorithms/search/graph/vertex'

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

    test('can convert GraphForm with two vertices next to each other', () => {
        const item01 = getItemWithConnections({ x: 0, y: 1, }, { top: false, right: true, bottom: false, left: false })
        const item11 = getItemWithConnections({ x: 1, y: 1, }, { top: false, right: false, bottom: false, left: true })

        const expectedGraph = new Graph()
        const v2 = new Vertex<VertexValue>('x:1y:1', {
            item: item11,
        })
        expectedGraph.addVertex(v2)
        const v1 = new Vertex<VertexValue>('x:0y:1', {
            item: item01,
        })
        expectedGraph.addVertex(v1)
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

        expect(converter.toGraph()).to.deep.equal(expectedGraph)
    })
})

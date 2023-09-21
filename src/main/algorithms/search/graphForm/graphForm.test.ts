import { describe, expect, test } from 'vitest'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import type { Coords, TRBL } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'

describe('GraphForm', () => {
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

    test('can create GraphForm', () => {
        const graphForm = new GraphForm()
        expect(graphForm.toGrid()).to.deep.equal([[GraphFormItem.createBlank(0, 0)]])
    })

    test('can add rows and columns', () => {
        const graphForm = new GraphForm()
        graphForm.addRow()
        graphForm.addColumn()
        graphForm.addRow()
        graphForm.addColumn()
        graphForm.addColumn()
        expect(graphForm.toGrid()).to.deep.equal([
            [GraphFormItem.createBlank(0, 0), GraphFormItem.createBlank(1, 0), GraphFormItem.createBlank(2, 0), GraphFormItem.createBlank(3, 0)],
            [GraphFormItem.createBlank(0, 1), GraphFormItem.createBlank(1, 1), GraphFormItem.createBlank(2, 1), GraphFormItem.createBlank(3, 1)],
            [GraphFormItem.createBlank(0, 2), GraphFormItem.createBlank(1, 2), GraphFormItem.createBlank(2, 2), GraphFormItem.createBlank(3, 2)],
        ])
        expect(graphForm.rows()).to.equal(3)
        expect(graphForm.cols()).to.equal(4)
    })

    test('can update and get item', () => {
        const graphForm = new GraphForm()
        graphForm.addRow()
        graphForm.addColumn()

        const newItem: GraphFormItem = new GraphFormItem({
            type: GraphFormItemType.EDGE,
            label: '',
            coords: { x: 0, y: 1 },
            connections: { top: false, right: false, bottom: true, left: true },
            connect: { top: false, right: false, bottom: false, left: false },
            highlight: { top: false, right: false, bottom: false, left: false },
            isStart: false,
            isEnd: false,
        })

        expect(graphForm.toGrid()).to.deep.equal([
            [GraphFormItem.createBlank(0, 0), GraphFormItem.createBlank(1, 0)],
            [GraphFormItem.createBlank(0, 1), GraphFormItem.createBlank(1, 1)],
        ])
        graphForm.updateItem(newItem)
        expect(graphForm.toGrid()).to.deep.equal([
            [GraphFormItem.createBlank(0, 0), GraphFormItem.createBlank(1, 0)],
            [newItem, GraphFormItem.createBlank(1, 1)],
        ])
        expect(graphForm.rows()).to.equal(2)
        expect(graphForm.cols()).to.equal(2)

        expect(graphForm.getItem(0, 1)).to.deep.equal(newItem)
        expect(graphForm.getItem(1, 3)).to.undefined
        expect(graphForm.getItem(2, 1)).to.undefined
    })

    test('can getConnectedNeighbours', () => {
        const graphForm = new GraphForm()
        graphForm.addRow()
        graphForm.addColumn()
        graphForm.addRow()
        graphForm.addColumn()

        const item = getItemWithConnections({ x: 1, y: 1 }, { top: false, right: true, bottom: true, left: true })
        const topNeighbour = getItemWithConnections({ x: 1, y: 0 }, { top: false, right: false, bottom: true, left: false })
        const rightNeighbour = getItemWithConnections({ x: 2, y: 1 }, { top: false, right: false, bottom: false, left: false })
        const bottomNeighbour = getItemWithConnections({ x: 1, y: 2 }, { top: true, right: false, bottom: false, left: false })
        const leftNeighbour = getItemWithConnections({ x: 0, y: 1 }, { top: false, right: true, bottom: false, left: false })

        graphForm.updateItem(item)

        graphForm.updateItem(topNeighbour)
        graphForm.updateItem(rightNeighbour)
        graphForm.updateItem(bottomNeighbour)
        graphForm.updateItem(leftNeighbour)

        expect(graphForm.getConnectedNeighbours(item)).to.deep.equal({
            top: undefined,
            right: undefined,
            bottom: bottomNeighbour,
            left: leftNeighbour,
        })
    })

    test('can validateConnections', () => {
        const graphForm = new GraphForm()
        graphForm.addRow()
        graphForm.addColumn()
        graphForm.addRow()
        graphForm.addColumn()

        const item = getItemWithConnections({ x: 1, y: 1 }, { top: false, right: true, bottom: true, left: true })
        const topNeighbour = getItemWithConnections({ x: 1, y: 0 }, { top: false, right: false, bottom: true, left: false })
        const rightNeighbour = getItemWithConnections({ x: 2, y: 1 }, { top: false, right: false, bottom: false, left: false })
        const bottomNeighbour = getItemWithConnections({ x: 1, y: 2 }, { top: true, right: false, bottom: false, left: false })
        const leftNeighbour = getItemWithConnections({ x: 0, y: 1 }, { top: false, right: true, bottom: false, left: false })

        const expectedItem = getItemWithConnections({ x: 1, y: 1 }, { top: false, right: false, bottom: true, left: true })

        graphForm.updateItem(item)

        graphForm.updateItem(topNeighbour)
        graphForm.updateItem(rightNeighbour)
        graphForm.updateItem(bottomNeighbour)
        graphForm.updateItem(leftNeighbour)

        graphForm.validateConnections(item)

        expect(graphForm.toGrid()).to.deep.equal([
            [GraphFormItem.createBlank(0, 0), topNeighbour, GraphFormItem.createBlank(2, 0)],
            [leftNeighbour, expectedItem, rightNeighbour],
            [GraphFormItem.createBlank(0, 2), bottomNeighbour, GraphFormItem.createBlank(2, 2)],
        ])
    })

    test('can generate oppositeSite', () => {
        const graphForm = new GraphForm()
        expect(graphForm.oppsiteSide('top')).to.equal('bottom')
        expect(graphForm.oppsiteSide('right')).to.equal('left')
        expect(graphForm.oppsiteSide('bottom')).to.equal('top')
        expect(graphForm.oppsiteSide('left')).to.equal('right')
    })
})

import { describe, expect, test } from 'vitest'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import type { Coords, TRBL } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItemType, Side } from '@/main/algorithms/search/graphForm/types'

describe('GraphForm', () => {
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

    test('can create GraphForm', () => {
        const graphForm = new GraphForm()
        expect(graphForm.toGrid()).to.deep.equal([[GraphFormItem.createBlank(0, 0)]])
    })

    test('can create GraphForm from grid', () => {
        const expectedGrid = [
            [GraphFormItem.createBlank(0, 0), GraphFormItem.createBlank(1, 0), GraphFormItem.createBlank(2, 0), GraphFormItem.createBlank(3, 0), GraphFormItem.createBlank(4, 0), GraphFormItem.createBlank(5, 0)],
            [GraphFormItem.createBlank(0, 1), GraphFormItem.createBlank(1, 1), GraphFormItem.createBlank(2, 1), GraphFormItem.createBlank(3, 1), GraphFormItem.createBlank(4, 1), GraphFormItem.createBlank(5, 1)],
            [GraphFormItem.createBlank(0, 2), GraphFormItem.createBlank(1, 2), GraphFormItem.createBlank(2, 2), GraphFormItem.createBlank(3, 2), GraphFormItem.createBlank(4, 2), GraphFormItem.createBlank(5, 2)],
            [GraphFormItem.createBlank(0, 3), GraphFormItem.createBlank(1, 3), GraphFormItem.createBlank(2, 3), GraphFormItem.createBlank(3, 3), GraphFormItem.createBlank(4, 3), GraphFormItem.createBlank(5, 3)],
            [GraphFormItem.createBlank(0, 4), GraphFormItem.createBlank(1, 4), GraphFormItem.createBlank(2, 4), GraphFormItem.createBlank(3, 4), GraphFormItem.createBlank(4, 4), GraphFormItem.createBlank(5, 4)],
        ]
        const graphForm = new GraphForm(expectedGrid)
        expect(graphForm.toGrid()).to.deep.equal(expectedGrid)
    })

    test('can add rows and columns', () => {
        const graphForm = new GraphForm()
        graphForm.addRow()
        graphForm.addColumn()
        graphForm.addRow()
        graphForm.addColumn()
        graphForm.addColumn()
        graphForm.addRow(0)
        graphForm.addColumn(0)
        graphForm.addRow(2)
        graphForm.addColumn(2)
        expect(graphForm.toGrid()).to.deep.equal([
            [GraphFormItem.createBlank(0, 0), GraphFormItem.createBlank(1, 0), GraphFormItem.createBlank(2, 0), GraphFormItem.createBlank(3, 0), GraphFormItem.createBlank(4, 0), GraphFormItem.createBlank(5, 0)],
            [GraphFormItem.createBlank(0, 1), GraphFormItem.createBlank(1, 1), GraphFormItem.createBlank(2, 1), GraphFormItem.createBlank(3, 1), GraphFormItem.createBlank(4, 1), GraphFormItem.createBlank(5, 1)],
            [GraphFormItem.createBlank(0, 2), GraphFormItem.createBlank(1, 2), GraphFormItem.createBlank(2, 2), GraphFormItem.createBlank(3, 2), GraphFormItem.createBlank(4, 2), GraphFormItem.createBlank(5, 2)],
            [GraphFormItem.createBlank(0, 3), GraphFormItem.createBlank(1, 3), GraphFormItem.createBlank(2, 3), GraphFormItem.createBlank(3, 3), GraphFormItem.createBlank(4, 3), GraphFormItem.createBlank(5, 3)],
            [GraphFormItem.createBlank(0, 4), GraphFormItem.createBlank(1, 4), GraphFormItem.createBlank(2, 4), GraphFormItem.createBlank(3, 4), GraphFormItem.createBlank(4, 4), GraphFormItem.createBlank(5, 4)],
        ])
        expect(graphForm.rows()).to.equal(5)
        expect(graphForm.cols()).to.equal(6)
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
            highlight: { top: false, right: false, bottom: false, left: false, center: false },
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

        graphForm.validateItemConnections(item)

        expect(graphForm.toGrid()).to.deep.equal([
            [GraphFormItem.createBlank(0, 0), topNeighbour, GraphFormItem.createBlank(2, 0)],
            [leftNeighbour, expectedItem, rightNeighbour],
            [GraphFormItem.createBlank(0, 2), bottomNeighbour, GraphFormItem.createBlank(2, 2)],
        ])
    })

    test('can generate oppositeSite', () => {
        const graphForm = new GraphForm()
        expect(graphForm.oppsiteSide(Side.TOP)).to.equal(Side.BOTTOM)
        expect(graphForm.oppsiteSide(Side.RIGHT)).to.equal(Side.LEFT)
        expect(graphForm.oppsiteSide(Side.BOTTOM)).to.equal(Side.TOP)
        expect(graphForm.oppsiteSide(Side.LEFT)).to.equal(Side.RIGHT)
    })

    test('can set valid start and end item and reset after clear', () => {
        const graphForm = new GraphForm()
        graphForm.addColumn()
        graphForm.addRow()

        const startItem = new GraphFormItem({ ...GraphFormItem.createBlank(0, 0).data(), connections: { top: false, right: true, bottom: false, left: false} })
        const endItem = new GraphFormItem({ ...GraphFormItem.createBlank(1, 0).data(), connections: { top: false, right: false, bottom: false, left: true} })

        graphForm.updateItem(startItem)
        graphForm.updateItem(endItem)

        graphForm.setStartItem(startItem)
        graphForm.setEndItem(endItem)

        expect(graphForm.getStartItem()).to.equal(startItem)
        expect(graphForm.getEndItem()).to.equal(endItem)

        graphForm.clear()

        expect(graphForm.getStartItem()).to.null
        expect(graphForm.getEndItem()).to.null
    })

    test('can set valid start and end item and validate after updateItem', () => {
        const graphForm = new GraphForm()
        graphForm.addColumn()
        graphForm.addRow()

        const startItem = new GraphFormItem({ ...GraphFormItem.createBlank(0, 0).data(), connections: { top: false, right: true, bottom: false, left: false} })
        const endItem = new GraphFormItem({ ...GraphFormItem.createBlank(1, 0).data(), connections: { top: false, right: false, bottom: false, left: true} })

        graphForm.updateItem(startItem)
        graphForm.updateItem(endItem)

        graphForm.setStartItem(startItem)
        graphForm.setEndItem(endItem)

        expect(graphForm.getStartItem()).to.equal(startItem)
        expect(graphForm.getEndItem()).to.equal(endItem)

        const newStartItem = new GraphFormItem({ ...GraphFormItem.createBlank(1, 0).data(), connections: { top: false, right: false, bottom: false, left: true } })
        const newEndItem = new GraphFormItem({ ...GraphFormItem.createBlank(0, 0).data(), connections: { top: false, right: true, bottom: false, left: false } })

        graphForm.updateItem(newStartItem)
        graphForm.updateItem(newEndItem)

        expect(graphForm.getStartItem()).to.null
        expect(graphForm.getEndItem()).to.null
    })

    test('cannot set invalid start and end item', () => {
        const graphForm = new GraphForm()
        graphForm.addColumn()
        graphForm.addRow()

        const startItem = GraphFormItem.createBlank(0, 0)
        const endItem = GraphFormItem.createBlank(1, 0)

        graphForm.updateItem(startItem)
        graphForm.updateItem(endItem)

        graphForm.setStartItem(startItem)
        graphForm.setEndItem(endItem)

        expect(graphForm.getStartItem()).to.null
        expect(graphForm.getEndItem()).to.null
    })

    test('can detect not included start or end item as invalid', () => {
        const graphForm = new GraphForm()
        graphForm.addColumn()
        graphForm.addRow()

        expect(graphForm.getStartItem()).to.null
        expect(graphForm.getEndItem()).to.null

        graphForm.setStartItem(GraphFormItem.createBlank(0, 0))
        graphForm.setEndItem(GraphFormItem.createBlank(1, 0))

        expect(graphForm.getStartItem()).to.null
        expect(graphForm.getEndItem()).to.null
    })
})

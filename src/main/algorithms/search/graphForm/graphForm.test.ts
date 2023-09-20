import { describe, expect, test } from 'vitest'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'

describe('GraphForm', () => {
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

    test('can update item', () => {
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
    })
})

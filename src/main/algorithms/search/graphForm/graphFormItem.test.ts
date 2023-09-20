import { describe, expect, test } from 'vitest'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import { GraphFormItemData, GraphFormItemType, TRBL } from '@/main/algorithms/search/graphForm/types'

describe('GraphFormItem', () => {
    function getItemWithConnections(connections: TRBL<boolean>): GraphFormItem {
        return new GraphFormItem({
            type: GraphFormItemType.VERTEX,
            label: '',
            coords: { x: 3, y: 4 },
            connections: connections,
            connect: { top: false, right: false, bottom: false, left: false },
            highlight: { top: false, right: false, bottom: false, left: false },
            isStart: false,
            isEnd: false,
        })
    }

    test('can create blank GraphFormItem', () => {
        const expectedItemData: GraphFormItemData = {
            type: GraphFormItemType.VERTEX,
            label: '',
            coords: { x: 3, y: 4 },
            connections: { top: false, right: false, bottom: false, left: false },
            connect: { top: false, right: false, bottom: false, left: false },
            highlight: { top: false, right: false, bottom: false, left: false },
            isStart: false,
            isEnd: false,
        }

        const graphFormItem = GraphFormItem.createBlank(3, 4)

        expect(graphFormItem).to.deep.equal(new GraphFormItem(expectedItemData))
        expect(graphFormItem.data()).to.deep.equal(expectedItemData)
    })

    test('GraphFormItem hasConnections', () => {
        expect(GraphFormItem.createBlank(3, 4).hasConnections()).to.false
        expect(getItemWithConnections({ top: false, right: false, bottom: false, left: false }).hasConnections()).to.false
        expect(getItemWithConnections({ top: true, right: false, bottom: false, left: false }).hasConnections()).to.true
        expect(getItemWithConnections({ top: false, right: true, bottom: false, left: false }).hasConnections()).to.true
        expect(getItemWithConnections({ top: false, right: false, bottom: true, left: false }).hasConnections()).to.true
        expect(getItemWithConnections({ top: false, right: false, bottom: false, left: true }).hasConnections()).to.true
        expect(getItemWithConnections({ top: true, right: true, bottom: true, left: true }).hasConnections()).to.true
    })

    test('can toggleConnection', () => {
        const input1 = getItemWithConnections({ top: false, right: false, bottom: false, left: false })
        input1.toggleConnection('top')
        expect(input1).to.deep.equal(getItemWithConnections({ top: true, right: false, bottom: false, left: false }))
        expect(input1.data().type).to.equal(GraphFormItemType.VERTEX)

        const input2 = getItemWithConnections({ top: true, right: false, bottom: false, left: false })
        input2.toggleConnection('top')
        expect(input2).to.deep.equal(getItemWithConnections({ top: false, right: false, bottom: false, left: false }))
        expect(input2.data().type).to.equal(GraphFormItemType.VERTEX)

        const input3 = getItemWithConnections({ top: true, right: false, bottom: false, left: false })
        input3.toggleConnection('right')
        expect(input3).to.deep.equal(getItemWithConnections({ top: true, right: true, bottom: false, left: false }))
        expect(input3.data().type).to.equal(GraphFormItemType.EDGE)
    })
})

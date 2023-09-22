import { describe, expect, test } from 'vitest'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { VisitedItems } from '@/main/algorithms/search/graphForm/graphFormConverter/visitedItems'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import type { Coords, TRBL } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'

describe('VisitedItems', () => {
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

    test('can create VisitedItems', () => {
        const graphForm = new GraphForm()
        graphForm.addRow()
        graphForm.addColumn()

        const item00 = getItemWithConnections({ x: 0, y: 0, }, { top: false, right: true, bottom: true, left: false })
        const item01 = GraphFormItem.createBlank(0, 1)
        const item10 = GraphFormItem.createBlank(1, 0)
        const item11 = getItemWithConnections({ x: 1, y: 1, }, { top: true, right: false, bottom: false, left: true })

        graphForm.updateItem(item00)
        graphForm.updateItem(item01)
        graphForm.updateItem(item10)
        graphForm.updateItem(item11)

        const visitedItems1 = new VisitedItems(graphForm, false)
        expect(visitedItems1.hasUnvisitedVertexItems()).to.true;

        [item10, item01].forEach(item => {
            expect(visitedItems1.isVisited(item)).to.false
            expect(visitedItems1.nextUnvisitedVertexItem()).to.deep.equal(item)
            visitedItems1.setVisited(item)
            expect(visitedItems1.isVisited(item)).to.true
        });

        expect(visitedItems1.hasUnvisitedVertexItems()).to.false;

        [item00, item11].forEach(item => {
            expect(visitedItems1.isVisited(item)).to.false
            visitedItems1.setVisited(item)
            expect(visitedItems1.isVisited(item)).to.true
        })

        expect(visitedItems1.hasUnvisitedVertexItems()).to.false
        expect(visitedItems1.nextUnvisitedVertexItem()).to.undefined

        const visitedItems2 = new VisitedItems(graphForm, true)
        expect(visitedItems2.hasUnvisitedVertexItems()).to.false

        expect(visitedItems2.isVisited(item00)).to.true
        expect(visitedItems2.isVisited(item10)).to.true
        expect(visitedItems2.isVisited(item01)).to.true
        expect(visitedItems2.isVisited(item11)).to.true

        expect(visitedItems2.nextUnvisitedVertexItem()).to.undefined
    })
})

import { describe, expect, test } from 'vitest'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { VisitedItems } from '@/main/algorithms/search/graphForm/graphFormConverter/visitedItems'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'

describe('VisitedItems', () => {
    test('can create VisitedItems', () => {
        const graphForm = new GraphForm()
        graphForm.addRow()
        graphForm.addColumn()

        const visitedItems1 = new VisitedItems(graphForm, false)
        expect(visitedItems1.hasUnvisited()).to.true

        const visitedItems2 = new VisitedItems(graphForm, true)
        expect(visitedItems2.hasUnvisited()).to.false

        graphForm.toItems().forEach((item: GraphFormItem) => {
            expect(visitedItems1.isVisited(item)).to.false
            expect(visitedItems2.isVisited(item)).to.true

            expect(visitedItems1.nextUnvisited()).to.deep.equal(item)
            visitedItems1.setVisited(item)
        })

        expect(visitedItems1.nextUnvisited()).to.undefined
        expect(visitedItems2.nextUnvisited()).to.undefined
    })
})

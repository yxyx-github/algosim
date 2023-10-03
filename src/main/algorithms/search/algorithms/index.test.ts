import { describe, expect, test } from 'vitest'
import { BreadthSearch } from '@/main/algorithms/search/algorithms/breadthSearch'
import { SearchAlgorithm } from '@/main/algorithms/search/algorithms/types'
import { cloneGrid, SearchFactory } from '@/main/algorithms/search/algorithms/index'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'

describe('SearchFactory', () => {
    test('can create BreadthSearch', () => {
        const breadth = SearchFactory.create(SearchAlgorithm.BREADTH_SEARCH)
        expect(breadth).to.instanceof(BreadthSearch)
    })
});

describe('cloneGrid', () => {
    test('can cloneGrid', () => {
        const grid = [
            [
                new GraphFormItem({ 'type': 0, 'label': '', 'coords': { 'x': 0, 'y': 0 }, 'connections': { 'top': false, 'right': true, 'bottom': false, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
                new GraphFormItem({ 'type': 0, 'label': '', 'coords': { 'x': 1, 'y': 0 }, 'connections': { 'top': false, 'right': true, 'bottom': true, 'left': true }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
                new GraphFormItem({ 'type': 0, 'label': '', 'coords': { 'x': 2, 'y': 0 }, 'connections': { 'top': false, 'right': false, 'bottom': false, 'left': true }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
            ], [
                new GraphFormItem({ 'type': 0, 'label': '', 'coords': { 'x': 0, 'y': 1 }, 'connections': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
                new GraphFormItem({ 'type': 1, 'label': '', 'coords': { 'x': 1, 'y': 1 }, 'connections': { 'top': true, 'right': false, 'bottom': false, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
                new GraphFormItem({ 'type': 0, 'label': '', 'coords': { 'x': 2, 'y': 1 }, 'connections': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
            ],
        ]
        const clonedGrid = cloneGrid(grid)
        expect(clonedGrid).to.not.equal(grid)
        clonedGrid.forEach((row, index) => {
            expect(grid).to.not.include(row)
            row.forEach(item =>
                expect(grid[index]).to.not.include(item)
            )
        })
        expect(clonedGrid).to.deep.equal(grid)
    })
})

describe('cloneSimulationStep', () => {
    test('can cloneSimulationStep', () => {
    })
})

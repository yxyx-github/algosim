import { describe, expect, test, vi } from 'vitest'
import * as expectedResultData from './breadthSearch.test.json'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import type { SearchSimulation } from '@/main/algorithms/search/algorithms/types'
import type { GraphFormItemData } from '@/main/algorithms/search/graphForm/types'
import { GraphFormConverter } from '@/main/algorithms/search/graphForm/graphFormConverter'
import { Graph } from '@/main/algorithms/search/graph/graph'
import type { EdgeValue, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { Vertex } from '@/main/algorithms/search/graph/vertex'
import { BreadthSearch } from '@/main/algorithms/search/algorithms/breadthSearch'

type SearchSimulationResultData = {
    steps: {
        grid: {
            itemData: GraphFormItemData,
        }[][],
        start: {
            itemData: GraphFormItemData,
        },
        end: {
            itemData: GraphFormItemData,
        },
    }[]
}

describe('BreadthSearch', () => {
    function createSimulationFromResultData(result: SearchSimulationResultData): SearchSimulation {
        return {
            steps: result.steps.map(step => ({
                grid: step.grid.map(row =>
                    row.map(item =>
                        new GraphFormItem(item.itemData)
                    )
                ),
                start: new GraphFormItem(step.start.itemData),
                end: new GraphFormItem(step.end.itemData),
            }))
        }
    }

    test('search graph with protocol', () => {
        const gf = new GraphForm([
            [
                new GraphFormItem({ 'type': 0, 'label': '', 'coords': { 'x': 0, 'y': 0 }, 'connections': { 'top': false, 'right': true, 'bottom': false, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
                new GraphFormItem({ 'type': 0, 'label': '', 'coords': { 'x': 1, 'y': 0 }, 'connections': { 'top': false, 'right': true, 'bottom': true, 'left': true }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
                new GraphFormItem({ 'type': 0, 'label': '', 'coords': { 'x': 2, 'y': 0 }, 'connections': { 'top': false, 'right': false, 'bottom': false, 'left': true }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
            ], [
                new GraphFormItem({ 'type': 0, 'label': '', 'coords': { 'x': 0, 'y': 1 }, 'connections': { 'top': false, 'right': false, 'bottom': true, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
                new GraphFormItem({ 'type': 1, 'label': '', 'coords': { 'x': 1, 'y': 1 }, 'connections': { 'top': true, 'right': false, 'bottom': true, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
                new GraphFormItem({ 'type': 0, 'label': '', 'coords': { 'x': 2, 'y': 1 }, 'connections': { 'top': false, 'right': false, 'bottom': true, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
            ], [
                new GraphFormItem({ 'type': 1, 'label': '', 'coords': { 'x': 0, 'y': 2 }, 'connections': { 'top': true, 'right': false, 'bottom': true, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
                new GraphFormItem({ 'type': 1, 'label': '', 'coords': { 'x': 1, 'y': 2 }, 'connections': { 'top': true, 'right': false, 'bottom': true, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
                new GraphFormItem({ 'type': 1, 'label': '', 'coords': { 'x': 2, 'y': 2 }, 'connections': { 'top': true, 'right': false, 'bottom': true, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
            ], [
                new GraphFormItem({ 'type': 1, 'label': '', 'coords': { 'x': 0, 'y': 3 }, 'connections': { 'top': true, 'right': true, 'bottom': false, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
                new GraphFormItem({ 'type': 0, 'label': '', 'coords': { 'x': 1, 'y': 3 }, 'connections': { 'top': true, 'right': true, 'bottom': false, 'left': true }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
                new GraphFormItem({ 'type': 1, 'label': '', 'coords': { 'x': 2, 'y': 3 }, 'connections': { 'top': true, 'right': false, 'bottom': false, 'left': true }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
            ]
        ])
        gf.setStartItem(gf.toItems()[0])
        gf.setEndItem(gf.toItems()[5])

        const converter = new GraphFormConverter(gf)
        const graph: Graph<VertexValue, EdgeValue> = converter.toGraph()
        const startVertex: Vertex<VertexValue> = graph.findVertex(v => v.getValue().item === gf.getStartItem()) as Vertex<VertexValue>
        const endVertex: Vertex<VertexValue> = graph.findVertex(v => v.getValue().item === gf.getEndItem()) as Vertex<VertexValue>

        const result = new BreadthSearch().run(graph, gf.toGrid(), startVertex, endVertex)
        const expectedResult = createSimulationFromResultData(expectedResultData)
        expect(result).to.deep.equal(expectedResult)
    })
})

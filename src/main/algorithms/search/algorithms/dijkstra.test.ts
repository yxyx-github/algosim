import { describe, expect, test } from 'vitest'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import { convertGraphForm, createSimulationFromResultData } from '@/main/algorithms/search/algorithms/testHelpers'
import * as expectedResultData from '@/main/algorithms/search/algorithms/dijkstra.test.json'
import { Dijkstra } from '@/main/algorithms/search/algorithms/dijkstra'

describe('Dijkstra', () => {
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

        const { graph, startVertex, endVertex } = convertGraphForm(gf)

        const result = new Dijkstra().run(graph, gf.toGrid(), startVertex, endVertex)
        const expectedResult = createSimulationFromResultData(expectedResultData)
        expect(result.steps[5]).to.deep.equal(expectedResult.steps[5])
    })
})

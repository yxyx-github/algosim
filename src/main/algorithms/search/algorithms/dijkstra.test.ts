import { describe, expect, test } from 'vitest'
import { convertGraphForm } from '@/main/algorithms/search/algorithms/testHelpers'
import * as expectedResultData from '@/main/algorithms/search/algorithms/dijkstra.test.result.json'
import * as rawGraphForm from '@/main/algorithms/search/algorithms/dijkstra.test.input.json'
import { Dijkstra } from '@/main/algorithms/search/algorithms/dijkstra'
import { importRawGraphForm, importRawSearchSimulation } from '@/main/algorithms/search/algorithms/dataHelpers'

describe('Dijkstra', () => {
    test('search graph with protocol', () => {
        const gf= importRawGraphForm(rawGraphForm)
        const { graph, startVertex, endVertex } = convertGraphForm(gf)

        const result = new Dijkstra().run(graph, gf.toGrid(), startVertex, endVertex)
        const expectedResult = importRawSearchSimulation(expectedResultData)
        expect(result.steps[5]).to.deep.equal(expectedResult.steps[5])
    })
})

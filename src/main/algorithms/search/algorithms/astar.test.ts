import { describe, expect, test } from 'vitest'
import * as expectedResultData from './astar.test.result.json'
import * as rawGraphForm from './astar.test.input.json'
import { convertGraphForm } from '@/main/algorithms/search/algorithms/testHelpers'
import { AStar } from '@/main/algorithms/search/algorithms/astar'
import { importRawGraphForm, importRawSearchSimulation } from '@/main/algorithms/search/algorithms/dataHelpers'

describe('A*', () => {
    test('search graph with protocol', () => {
        const gf = importRawGraphForm(rawGraphForm)
        const { graph, startVertex, endVertex } = convertGraphForm(gf)

        const result = new AStar().run(graph, gf.toGrid(), startVertex, endVertex)
        const expectedResult = importRawSearchSimulation(expectedResultData)
        expect(result).to.deep.equal(expectedResult)
    })
})

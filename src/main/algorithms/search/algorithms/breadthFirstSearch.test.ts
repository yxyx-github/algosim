import { describe, expect, test, vi } from 'vitest'
import * as expectedResultData from './breadthFirstSearch.test.result.json'
import * as graphFormInput from './breadthFirstSearch.test.input.json'
import { BreadthFirstSearch } from '@/main/algorithms/search/algorithms/breadthFirstSearch'
import { convertGraphForm } from '@/main/algorithms/search/algorithms/testHelpers'
import { importRawGraphForm, importRawSearchSimulation } from '@/main/algorithms/search/algorithms/dataHelpers'

describe('BreadthSearch', () => {
    test('search graph with protocol', () => {
        const gf = importRawGraphForm(graphFormInput)
        const { graph, startVertex, endVertex } = convertGraphForm(gf)

        const result = new BreadthFirstSearch().run(graph, gf.toGrid(), startVertex, endVertex)
        const expectedResult = importRawSearchSimulation(expectedResultData)
        expect(result).to.deep.equal(expectedResult)
    })
})

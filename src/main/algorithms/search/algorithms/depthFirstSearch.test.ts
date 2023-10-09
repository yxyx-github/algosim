import { describe, expect, test, vi } from 'vitest'
import type { ProgressHandler, TrackableProgress } from '@/main/progressTracker/types'
import { convertGraphForm } from '@/main/algorithms/search/algorithms/testHelpers'
import * as expectedResultData from '@/main/algorithms/search/algorithms/depthFirstSearch.test.result.json'
import * as rawGraphForm from '@/main/algorithms/search/algorithms/depthFirstSearch.test.input.json'
import { DepthFirstSearch } from '@/main/algorithms/search/algorithms/depthFirstSearch'
import {importRawGraphForm, importRawSearchSimulation} from '@/main/algorithms/search/algorithms/dataHelpers'

describe('DepthFirstSearch', () => {
    const mockTracker: TrackableProgress = {
        init: (overall: number) => {},
        track: (current: number, overall?: number) => {},
        trackNext: () => {},
        onTrack: (handler: ProgressHandler, intervalCount?: number) => {},
    }

    test('search graph with protocol', () => {
        const gf = importRawGraphForm(rawGraphForm)
        const { graph, startVertex, endVertex } = convertGraphForm(gf)

        const result = new DepthFirstSearch().run(graph, gf.toGrid(), startVertex, endVertex)
        const expectedResult = importRawSearchSimulation(expectedResultData)
        expect(result).to.deep.equal(expectedResult)
    })
})

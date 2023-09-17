import { describe, expect, test, vi } from 'vitest'
import type { SortSimulation } from '@/main/algorithms/sort/types'
import type { ProgressHandler, TrackableProgress } from '@/main/progressTracker/types'
import { HeapSort } from '@/main/algorithms/sort/heapSort'
import { SortSimulationStepFactory } from '@/main/algorithms/sort/sortSimulationStepFactory'
import { SortColor } from '@/main/algorithms/sort/sortColor'

describe('HeapSort', () => {
    const mockTracker: TrackableProgress = {
        init: (overall: number) => {},
        track: (current: number, overall?: number) => {},
        trackNext: () => {},
        onTrack: (handler: ProgressHandler, intervalCount?: number) => {},
    }

    test('sort numbers with protocol', () => {
        const colors: string[] = ['#e89ffa', '#a03cef', '#f323a6', '#fa7a37', '#f4e476', '#c0ed4c', '#6ef6a6', '#3794df', '#283af3', '#0f1e7f']
        const input = [3, 4, 2, 7]
        const expected: SortSimulation = {
            steps: [

                SortSimulationStepFactory.createSimulationStep([3, 4, 2, 7]),
                { sortedValues: [{value: 3, displayColor: colors[0]}, {value: 4, displayColor: SortColor.CURRENT }, {value: 2, displayColor: colors[1] }, {value: 7, displayColor: SortColor.CURRENT}] },
                { sortedValues: [{value: 3, displayColor: colors[0]}, {value: 7, displayColor: SortColor.CURRENT }, {value: 2, displayColor: colors[1] }, {value: 4, displayColor: SortColor.CURRENT}] },
                { sortedValues: [{value: 3, displayColor: SortColor.CURRENT}, {value: 7, displayColor: SortColor.CURRENT }, {value: 2, displayColor: colors[1] }, {value: 4, displayColor: colors[2]}] },
                { sortedValues: [{value: 7, displayColor: SortColor.CURRENT}, {value: 3, displayColor: SortColor.CURRENT }, {value: 2, displayColor: colors[1] }, {value: 4, displayColor: colors[2]}] },
                { sortedValues: [{value: 7, displayColor: colors[0]}, {value: 3, displayColor: SortColor.CURRENT }, {value: 2, displayColor: colors[1] }, {value: 4, displayColor: SortColor.CURRENT}] },
                { sortedValues: [{value: 7, displayColor: colors[0]}, {value: 4, displayColor: SortColor.CURRENT }, {value: 2, displayColor: colors[1] }, {value: 3, displayColor: SortColor.CURRENT}] },
                { sortedValues: [{value: 7, displayColor: SortColor.CURRENT}, {value: 4, displayColor: colors[1] }, {value: 2, displayColor: colors[1] }, {value: 3, displayColor: SortColor.CURRENT}] },
                { sortedValues: [{value: 3, displayColor: SortColor.CURRENT}, {value: 4, displayColor: colors[1] }, {value: 2, displayColor: colors[1] }, {value: 7, displayColor: SortColor.CURRENT}] },
                { sortedValues: [{value: 3, displayColor: SortColor.CURRENT}, {value: 4, displayColor: SortColor.CURRENT},  {value: 2, displayColor: colors[1] }, {value: 7, displayColor: SortColor.THRESHOLD}] },
                { sortedValues: [{value: 4, displayColor: SortColor.CURRENT}, {value: 3, displayColor: SortColor.CURRENT}, {value: 2, displayColor: colors[1] }, {value: 7, displayColor: SortColor.THRESHOLD}] },
                { sortedValues: [{value: 4, displayColor: SortColor.CURRENT}, {value: 3, displayColor: colors[1]}, {value: 2, displayColor: SortColor.CURRENT }, {value: 7, displayColor: SortColor.THRESHOLD}] },
                { sortedValues: [{value: 2, displayColor: SortColor.CURRENT}, {value: 3, displayColor: colors[1]}, {value: 4, displayColor: SortColor.CURRENT }, {value: 7, displayColor: SortColor.THRESHOLD}] },
                { sortedValues: [{value: 2, displayColor: SortColor.CURRENT}, {value: 3, displayColor: SortColor.CURRENT }, {value: 4, displayColor: SortColor.THRESHOLD }, {value: 7, displayColor: SortColor.NEUTRAL}] },
                { sortedValues: [{value: 3, displayColor: SortColor.CURRENT}, {value: 2, displayColor: SortColor.CURRENT }, {value: 4, displayColor: SortColor.THRESHOLD }, {value: 7, displayColor: SortColor.NEUTRAL}] },
                { sortedValues: [{value: 3, displayColor: SortColor.CURRENT}, {value: 2, displayColor: SortColor.CURRENT }, {value: 4, displayColor: SortColor.THRESHOLD }, {value: 7, displayColor: SortColor.NEUTRAL}] },
                { sortedValues: [{value: 2, displayColor: SortColor.CURRENT}, {value: 3, displayColor: SortColor.CURRENT }, {value: 4, displayColor: SortColor.THRESHOLD }, {value: 7, displayColor: SortColor.NEUTRAL}] },
                { sortedValues: [{value: 2, displayColor: SortColor.CURRENT}, {value: 3, displayColor: SortColor.THRESHOLD }, {value: 4, displayColor: SortColor.NEUTRAL }, {value: 7, displayColor: SortColor.NEUTRAL}] },
                { sortedValues: [{value: 2, displayColor: SortColor.CURRENT}, {value: 3, displayColor: SortColor.THRESHOLD }, {value: 4, displayColor: SortColor.NEUTRAL }, {value: 7, displayColor: SortColor.NEUTRAL}] },
                SortSimulationStepFactory.createSimulationStep([2, 3, 4, 7])
            ]
        }

        const result = new HeapSort().sort(input)
        expect(result).to.deep.equal(expected)
    })

    test('sort numbers with protocol and track progress', () => {
        const colors: string[] = ['#e89ffa', '#a03cef', '#f323a6', '#fa7a37', '#f4e476', '#c0ed4c', '#6ef6a6', '#3794df', '#283af3', '#0f1e7f']
        const input = [3, 4, 2, 7]
        const expected: SortSimulation = {
            steps: [

                SortSimulationStepFactory.createSimulationStep([3, 4, 2, 7]),
                { sortedValues: [{value: 3, displayColor: colors[0]}, {value: 4, displayColor: SortColor.CURRENT }, {value: 2, displayColor: colors[1] }, {value: 7, displayColor: SortColor.CURRENT}] },
                { sortedValues: [{value: 3, displayColor: colors[0]}, {value: 7, displayColor: SortColor.CURRENT }, {value: 2, displayColor: colors[1] }, {value: 4, displayColor: SortColor.CURRENT}] },
                { sortedValues: [{value: 3, displayColor: SortColor.CURRENT}, {value: 7, displayColor: SortColor.CURRENT }, {value: 2, displayColor: colors[1] }, {value: 4, displayColor: colors[2]}] },
                { sortedValues: [{value: 7, displayColor: SortColor.CURRENT}, {value: 3, displayColor: SortColor.CURRENT }, {value: 2, displayColor: colors[1] }, {value: 4, displayColor: colors[2]}] },
                { sortedValues: [{value: 7, displayColor: colors[0]}, {value: 3, displayColor: SortColor.CURRENT }, {value: 2, displayColor: colors[1] }, {value: 4, displayColor: SortColor.CURRENT}] },
                { sortedValues: [{value: 7, displayColor: colors[0]}, {value: 4, displayColor: SortColor.CURRENT }, {value: 2, displayColor: colors[1] }, {value: 3, displayColor: SortColor.CURRENT}] },
                { sortedValues: [{value: 7, displayColor: SortColor.CURRENT}, {value: 4, displayColor: colors[1] }, {value: 2, displayColor: colors[1] }, {value: 3, displayColor: SortColor.CURRENT}] },
                { sortedValues: [{value: 3, displayColor: SortColor.CURRENT}, {value: 4, displayColor: colors[1] }, {value: 2, displayColor: colors[1] }, {value: 7, displayColor: SortColor.CURRENT}] },
                { sortedValues: [{value: 3, displayColor: SortColor.CURRENT}, {value: 4, displayColor: SortColor.CURRENT},  {value: 2, displayColor: colors[1] }, {value: 7, displayColor: SortColor.THRESHOLD}] },
                { sortedValues: [{value: 4, displayColor: SortColor.CURRENT}, {value: 3, displayColor: SortColor.CURRENT}, {value: 2, displayColor: colors[1] }, {value: 7, displayColor: SortColor.THRESHOLD}] },
                { sortedValues: [{value: 4, displayColor: SortColor.CURRENT}, {value: 3, displayColor: colors[1]}, {value: 2, displayColor: SortColor.CURRENT }, {value: 7, displayColor: SortColor.THRESHOLD}] },
                { sortedValues: [{value: 2, displayColor: SortColor.CURRENT}, {value: 3, displayColor: colors[1]}, {value: 4, displayColor: SortColor.CURRENT }, {value: 7, displayColor: SortColor.THRESHOLD}] },
                { sortedValues: [{value: 2, displayColor: SortColor.CURRENT}, {value: 3, displayColor: SortColor.CURRENT }, {value: 4, displayColor: SortColor.THRESHOLD }, {value: 7, displayColor: SortColor.NEUTRAL}] },
                { sortedValues: [{value: 3, displayColor: SortColor.CURRENT}, {value: 2, displayColor: SortColor.CURRENT }, {value: 4, displayColor: SortColor.THRESHOLD }, {value: 7, displayColor: SortColor.NEUTRAL}] },
                { sortedValues: [{value: 3, displayColor: SortColor.CURRENT}, {value: 2, displayColor: SortColor.CURRENT }, {value: 4, displayColor: SortColor.THRESHOLD }, {value: 7, displayColor: SortColor.NEUTRAL}] },
                { sortedValues: [{value: 2, displayColor: SortColor.CURRENT}, {value: 3, displayColor: SortColor.CURRENT }, {value: 4, displayColor: SortColor.THRESHOLD }, {value: 7, displayColor: SortColor.NEUTRAL}] },
                { sortedValues: [{value: 2, displayColor: SortColor.CURRENT}, {value: 3, displayColor: SortColor.THRESHOLD }, {value: 4, displayColor: SortColor.NEUTRAL }, {value: 7, displayColor: SortColor.NEUTRAL}] },
                { sortedValues: [{value: 2, displayColor: SortColor.CURRENT}, {value: 3, displayColor: SortColor.THRESHOLD }, {value: 4, displayColor: SortColor.NEUTRAL }, {value: 7, displayColor: SortColor.NEUTRAL}] },
                SortSimulationStepFactory.createSimulationStep([2, 3, 4, 7])
            ]
        }

        const spyInit = vi.spyOn(mockTracker, 'init')
        const spyTrack = vi.spyOn(mockTracker, 'track')
        const spyTrackNext = vi.spyOn(mockTracker, 'trackNext')

        const result = new HeapSort().sort(input, mockTracker)
        expect(result).to.deep.equal(expected)

        expect(spyInit).toHaveBeenCalledOnce()
        expect(spyInit).toHaveBeenCalledWith(4)
        expect(spyTrack).toHaveBeenCalledTimes(0)
        expect(spyTrackNext).toHaveBeenCalledTimes(4)
    })
})

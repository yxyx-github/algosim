import { describe, expect, test, vi } from "vitest";
import type { ProgressHandler, TrackableProgress } from '@/main/progressTracker/types'
import type { SortSimulation } from '@/main/algorithms/sort/types'
import { MergeSort } from '@/main/algorithms/sort/mergeSort'
import { SortSimulationStepFactory } from '@/main/algorithms/sort/sortSimulationStepFactory'
import { SortColor } from '@/main/algorithms/sort/types'

describe('MergeSort', () => {
    const mockTracker: TrackableProgress = {
        init: (overall: number) => {},
        track: (current: number, overall?: number) => {},
        trackNext: () => {},
        onTrack: (handler: ProgressHandler, intervalCount?: number) => {},
    }

    test('sort numbers with protocol', () => {
        const input = [3, 4, 2, 7, 4]
        const expected: SortSimulation = {
            steps: [
                SortSimulationStepFactory.createSimulationStep([3, 4, 2, 7, 4]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 4],[{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 4],[{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 4],[{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.THRESHOLD, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 4],[{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 4],[{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 2 }, { color: SortColor.THRESHOLD, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 4],[{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.THRESHOLD, index: 1 }, { color: SortColor.THRESHOLD, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 4],[{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 0 }, { color: SortColor.THRESHOLD, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 4, 2, 7, 4],[{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.THRESHOLD, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 2, 7, 4],[{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 2 }, { color: SortColor.THRESHOLD, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 7, 4],[{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.THRESHOLD, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 7, 4],[{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.CURRENT, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 7, 4],[{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 4],[{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 3 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 2 }, { color: SortColor.THRESHOLD, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 0 }, { color: SortColor.THRESHOLD, index: 2 }, { color: SortColor.THRESHOLD, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 0 }, { color: SortColor.THRESHOLD, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 0 }, { color: SortColor.THRESHOLD, index: 2 }, { color: SortColor.THRESHOLD, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 0 }, { color: SortColor.THRESHOLD, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.THRESHOLD, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 4 }, { color: SortColor.THRESHOLD, index: 0}]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.THRESHOLD, index: 4 }, { color: SortColor.THRESHOLD, index: 0}]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 4 }, { color: SortColor.THRESHOLD, index: 0}]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 0}]),
                SortSimulationStepFactory.createSimulationStep([2, 3, 4, 4, 7])
            ]
        }

        const result = new MergeSort().sort(input)
        expect(result).to.deep.equal(expected)
    })

    test('sort numbers with protocol and track progress', () => {
        const input = [3, 4, 2, 7, 4]
        const expected: SortSimulation = {
            steps: [
                SortSimulationStepFactory.createSimulationStep([3, 4, 2, 7, 4]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 4],[{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 4],[{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 4],[{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.THRESHOLD, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 4],[{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 4],[{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 2 }, { color: SortColor.THRESHOLD, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 4],[{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.THRESHOLD, index: 1 }, { color: SortColor.THRESHOLD, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 4],[{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 0 }, { color: SortColor.THRESHOLD, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 4, 2, 7, 4],[{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.THRESHOLD, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 2, 7, 4],[{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 2 }, { color: SortColor.THRESHOLD, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 7, 4],[{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.THRESHOLD, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 7, 4],[{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.CURRENT, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 7, 4],[{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 4],[{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 3 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 2 }, { color: SortColor.THRESHOLD, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 0 }, { color: SortColor.THRESHOLD, index: 2 }, { color: SortColor.THRESHOLD, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 0 }, { color: SortColor.THRESHOLD, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 0 }, { color: SortColor.THRESHOLD, index: 2 }, { color: SortColor.THRESHOLD, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 0 }, { color: SortColor.THRESHOLD, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.THRESHOLD, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 4 }, { color: SortColor.THRESHOLD, index: 0}]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.THRESHOLD, index: 4 }, { color: SortColor.THRESHOLD, index: 0}]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 4 }, { color: SortColor.THRESHOLD, index: 0}]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 3, 4, 4, 7],[{ color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 0}]),
                SortSimulationStepFactory.createSimulationStep([2, 3, 4, 4, 7])
            ]
        }

        const spyInit = vi.spyOn(mockTracker, 'init')
        const spyTrack = vi.spyOn(mockTracker, 'track')
        const spyTrackNext = vi.spyOn(mockTracker, 'trackNext')

        const result = new MergeSort().sort(input, mockTracker)
        expect(result).to.deep.equal(expected)

        expect(spyInit).toHaveBeenCalledOnce()
        expect(spyInit).toHaveBeenCalledWith(5)
        expect(spyTrack).toHaveBeenCalledTimes(0)
        expect(spyTrackNext).toHaveBeenCalledTimes(5)
    })
})

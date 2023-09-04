import { describe, expect, test, vi } from 'vitest'
import type { SortSimulation } from '@/algorithms/sort/types'
import { BubbleSort } from '@/algorithms/sort/bubbleSort'
import type { ProgressHandler, TrackableProgress } from '@/progressTracker/types'

describe('BubbleSort', () => {
    const mockTracker: TrackableProgress = {
        init: (overall: number) => {},
        track: (current: number, overall?: number) => {},
        trackNext: () => {},
        onTrack: (handler: ProgressHandler, intervalCount?: number) => {},
    }

    test('sort numbers with protocol', () => {
        const input = [3, 4, 2, 7]
        const expected: SortSimulation = {
            steps: [
                { sortedValues: [3, 4, 2, 7], highlightedIndices: [] },
                { sortedValues: [3, 4, 2, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }, { type: 'threshold', index: 3 }] },
                { sortedValues: [3, 4, 2, 7], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 2 }, { type: 'threshold', index: 3 }] },
                { sortedValues: [3, 2, 4, 7], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 2 }, { type: 'threshold', index: 3 }] },
                { sortedValues: [3, 2, 4, 7], highlightedIndices: [{ type: 'current', index: 2 }, { type: 'current', index: 3 }] },
                { sortedValues: [3, 2, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }, { type: 'threshold', index: 2 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }, { type: 'threshold', index: 2 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 2 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [] },
            ],
        }

        const result = new BubbleSort().sort(input)
        expect(result).to.deep.equal(expected)
    })

    test('sort numbers with protocol and track progress', () => {
        const input = [3, 4, 2, 7]
        const expected: SortSimulation = {
            steps: [
                { sortedValues: [3, 4, 2, 7], highlightedIndices: [] },
                { sortedValues: [3, 4, 2, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }, { type: 'threshold', index: 3 }] },
                { sortedValues: [3, 4, 2, 7], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 2 }, { type: 'threshold', index: 3 }] },
                { sortedValues: [3, 2, 4, 7], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 2 }, { type: 'threshold', index: 3 }] },
                { sortedValues: [3, 2, 4, 7], highlightedIndices: [{ type: 'current', index: 2 }, { type: 'current', index: 3 }] },
                { sortedValues: [3, 2, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }, { type: 'threshold', index: 2 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }, { type: 'threshold', index: 2 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 2 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [] },
            ],
        }

        const spyInit = vi.spyOn(mockTracker, 'init')
        const spyTrack = vi.spyOn(mockTracker, 'track')
        const spyTrackNext = vi.spyOn(mockTracker, 'trackNext')

        const result = new BubbleSort().sort(input, mockTracker)
        expect(result).to.deep.equal(expected)

        expect(spyInit).toHaveBeenCalledOnce()
        expect(spyInit).toHaveBeenCalledWith(6)
        expect(spyTrack).toHaveBeenCalledTimes(0)
        expect(spyTrackNext).toHaveBeenCalledTimes(6)
    })
})

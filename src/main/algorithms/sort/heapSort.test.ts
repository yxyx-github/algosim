import { describe, expect, test, vi } from 'vitest'
import type { SortSimulation } from '@/main/algorithms/sort/types'
import type { ProgressHandler, TrackableProgress } from '@/main/progressTracker/types'
import { HeapSort } from '@/main/algorithms/sort/heapSort'

describe('HeapSort', () => {
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
                { sortedValues: [3, 4, 2, 7], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 3 }] },
                { sortedValues: [3, 7, 2, 4], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 3 }] },
                { sortedValues: [3, 7, 2, 4], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }] },
                { sortedValues: [7, 3, 2, 4], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }] },
                { sortedValues: [7, 3, 2, 4], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 3 }] },
                { sortedValues: [7, 4, 2, 3], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 3 }] },
                { sortedValues: [7, 4, 2, 3], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 3 }] },
                { sortedValues: [3, 4, 2, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 3 }] },
                { sortedValues: [3, 4, 2, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }, { type: 'threshold', index: 3 }] },
                { sortedValues: [4, 3, 2, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 },  { type: 'threshold', index: 3 }] },
                { sortedValues: [4, 3, 2, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 2 },  { type: 'threshold', index: 3 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 2 },  { type: 'threshold', index: 3 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 },  { type: 'threshold', index: 2 }] },
                { sortedValues: [3, 2, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 },  { type: 'threshold', index: 2 }] },
                { sortedValues: [3, 2, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 },  { type: 'threshold', index: 2 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 },  { type: 'threshold', index: 2 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'threshold', index: 1 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'threshold', index: 1 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [] },
            ],
        }

        const result = new HeapSort().sort(input)
        expect(result).to.deep.equal(expected)
    })

    test('sort numbers with protocol and track progress', () => {
        const input = [3, 4, 2, 7]
        const expected: SortSimulation = {
            steps: [
                { sortedValues: [3, 4, 2, 7], highlightedIndices: [] },
                { sortedValues: [3, 4, 2, 7], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 3 }] },
                { sortedValues: [3, 7, 2, 4], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 3 }] },
                { sortedValues: [3, 7, 2, 4], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }] },
                { sortedValues: [7, 3, 2, 4], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }] },
                { sortedValues: [7, 3, 2, 4], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 3 }] },
                { sortedValues: [7, 4, 2, 3], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 3 }] },
                { sortedValues: [7, 4, 2, 3], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 3 }] },
                { sortedValues: [3, 4, 2, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 3 }] },
                { sortedValues: [3, 4, 2, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }, { type: 'threshold', index: 3 }] },
                { sortedValues: [4, 3, 2, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 },  { type: 'threshold', index: 3 }] },
                { sortedValues: [4, 3, 2, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 2 },  { type: 'threshold', index: 3 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 2 },  { type: 'threshold', index: 3 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 },  { type: 'threshold', index: 2 }] },
                { sortedValues: [3, 2, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 },  { type: 'threshold', index: 2 }] },
                { sortedValues: [3, 2, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 },  { type: 'threshold', index: 2 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 },  { type: 'threshold', index: 2 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'threshold', index: 1 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'threshold', index: 1 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [] },
            ],
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

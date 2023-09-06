import { describe, expect, test, vi } from "vitest";
import type { SortSimulation } from '@/main/algorithms/sort/types'
import { QuickSort } from '@/main/algorithms/sort/quickSort'
import { ProgressHandler, TrackableProgress } from '@/main/progressTracker/types'


describe('quickSort', () => {
    const mockTracker: TrackableProgress = {
        init: (overall: number) => {},
        track: (current: number, overall?: number) => {},
        trackNext: () => {},
        onTrack: (handler: ProgressHandler, intervalCount?: number) => {},
    }

    test('sort numbers with protocol', () => {
        const input = [3, 4, 2, 7, 10, 1, 2, 2, 4, 12]
        const expected: SortSimulation = {
            steps: [
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 0 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 0 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 1 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 1 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 2 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 2 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 3 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 3 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 4 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 4 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 5 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 5 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 6 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 6 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 7 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 7 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 8 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }] },

                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 0 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 0 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 1 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 1 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 2 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 2 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 3 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 4 }, { type: 'threshold', index: 3 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 5 }, { type: 'threshold', index: 3 }] },
                { sortedValues: [3, 4, 2, 1, 10, 7, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 3 }] },
                { sortedValues: [3, 4, 2, 1, 10, 7, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 6 }, { type: 'threshold', index: 4 }] },
                { sortedValues: [3, 4, 2, 1, 2, 7, 10, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 6 }, { type: 'current', index: 4 }] },
                { sortedValues: [3, 4, 2, 1, 2, 7, 10, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 7 }, { type: 'threshold', index: 5 }] },
                { sortedValues: [3, 4, 2, 1, 2, 2, 10, 7, 4, 12], highlightedIndices: [{ type: 'current', index: 7 }, { type: 'current', index: 5 }] },
                { sortedValues: [3, 4, 2, 1, 2, 2, 10, 7, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 6 }] },
                { sortedValues: [3, 4, 2, 1, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 6 }] },

                { sortedValues: [3, 4, 2, 1, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 0 }] },
                { sortedValues: [3, 4, 2, 1, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 1 }, { type: 'threshold', index: 0 }] },
                { sortedValues: [3, 4, 2, 1, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 2 }, { type: 'threshold', index: 0 }] },
                { sortedValues: [2, 4, 3, 1, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 2 }, { type: 'current', index: 0 }] },
                { sortedValues: [2, 4, 3, 1, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 3 }, { type: 'threshold', index: 1 }] },
                { sortedValues: [2, 1, 3, 4, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 3 }, { type: 'current', index: 1 }] },
                { sortedValues: [2, 1, 3, 4, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 4 }, { type: 'threshold', index: 2 }] },
                { sortedValues: [2, 1, 2, 4, 3, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 4 }, { type: 'current', index: 2 }] },
                { sortedValues: [2, 1, 2, 4, 3, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 3 }] },
                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 3 }] },

                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 2 }, { type: 'current', index: 0 }] },
                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 0 }] },
                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 2 }, { type: 'current', index: 1 }] },
                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 1 }] },
                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 2 }] },
                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 2 }] },

                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 0 }] },
                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 0 }] },
                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 0 }] },
                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 4 }] },
                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 4 }] },
                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }] },
                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }] },

                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 7 }] },
                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 7 }] },
                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 8 }] },
                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 8 }] },


                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [] },
            ]
        }

        const result = new QuickSort().sort(input)
        expect(result).toEqual(expected)
    })

    test('sort numbers with protocol and track progress', () => {
        const input = [3, 4, 2, 7, 10, 1, 2, 2, 4, 12]
        const expected: SortSimulation = {
            steps: [
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 0 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 0 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 1 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 1 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 2 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 2 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 3 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 3 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 4 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 4 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 5 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 5 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 6 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 6 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 7 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 7 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 8 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }] },

                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 0 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 0 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 1 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 1 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 2 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 2 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 3 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 4 }, { type: 'threshold', index: 3 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 5 }, { type: 'threshold', index: 3 }] },
                { sortedValues: [3, 4, 2, 1, 10, 7, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 3 }] },
                { sortedValues: [3, 4, 2, 1, 10, 7, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 6 }, { type: 'threshold', index: 4 }] },
                { sortedValues: [3, 4, 2, 1, 2, 7, 10, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 6 }, { type: 'current', index: 4 }] },
                { sortedValues: [3, 4, 2, 1, 2, 7, 10, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 7 }, { type: 'threshold', index: 5 }] },
                { sortedValues: [3, 4, 2, 1, 2, 2, 10, 7, 4, 12], highlightedIndices: [{ type: 'current', index: 7 }, { type: 'current', index: 5 }] },
                { sortedValues: [3, 4, 2, 1, 2, 2, 10, 7, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 6 }] },
                { sortedValues: [3, 4, 2, 1, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 6 }] },

                { sortedValues: [3, 4, 2, 1, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 0 }] },
                { sortedValues: [3, 4, 2, 1, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 1 }, { type: 'threshold', index: 0 }] },
                { sortedValues: [3, 4, 2, 1, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 2 }, { type: 'threshold', index: 0 }] },
                { sortedValues: [2, 4, 3, 1, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 2 }, { type: 'current', index: 0 }] },
                { sortedValues: [2, 4, 3, 1, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 3 }, { type: 'threshold', index: 1 }] },
                { sortedValues: [2, 1, 3, 4, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 3 }, { type: 'current', index: 1 }] },
                { sortedValues: [2, 1, 3, 4, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 4 }, { type: 'threshold', index: 2 }] },
                { sortedValues: [2, 1, 2, 4, 3, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 4 }, { type: 'current', index: 2 }] },
                { sortedValues: [2, 1, 2, 4, 3, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 3 }] },
                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 3 }] },

                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 2 }, { type: 'current', index: 0 }] },
                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 0 }] },
                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 2 }, { type: 'current', index: 1 }] },
                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 1 }] },
                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 2 }] },
                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 2 }] },

                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 0 }] },
                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 0 }] },
                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 0 }] },
                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 4 }] },
                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 4 }] },
                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }] },
                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }] },

                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 7 }] },
                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 7 }] },
                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 8 }] },
                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 8 }] },


                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [] },
            ]
        }


        const spyInit = vi.spyOn(mockTracker, 'init')
        const spyTrack = vi.spyOn(mockTracker, 'track')
        const spyTrackNext = vi.spyOn(mockTracker, 'trackNext')

        const result = new QuickSort().sort(input, mockTracker)
        expect(result).toEqual(expected)


        expect(spyInit).toHaveBeenCalledOnce()
        expect(spyInit).toHaveBeenCalledWith(10)
        expect(spyTrack).toHaveBeenCalledTimes(0)
        expect(spyTrackNext).toHaveBeenCalledTimes(10)
    })
})

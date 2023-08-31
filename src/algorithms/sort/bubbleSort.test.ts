import { describe, expect, test } from 'vitest'
import type { SortSimulation } from '@/algorithms/sort/types'
import { bubbleSort } from '@/algorithms/sort/bubbleSort'

describe('bubbleSort', () => {
    test('sort numbers with protocol', () => {
        const input = [3, 4, 2, 7]
        const expected: SortSimulation = {
            steps: [
                { sortedValues: [3, 4, 2, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }, { type: 'threshold', index: 3 }] },
                { sortedValues: [3, 2, 4, 7], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 2 }, { type: 'threshold', index: 3 }] },
                { sortedValues: [3, 2, 4, 7], highlightedIndices: [{ type: 'current', index: 2 }, { type: 'current', index: 3 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }, { type: 'threshold', index: 2 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 2 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }] },
            ],
            result: { sortedValues: [2, 3, 4, 7] }
        }

        const result = bubbleSort(input)
        expect(result).toEqual(expected)
    })
})

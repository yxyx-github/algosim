import { describe, expect, test } from 'vitest'
import type { SortSimulation } from '@/algorithms/sort/types'
import { bubbleSort } from '@/algorithms/sort/bubbleSort'

describe('bubbleSort', () => {
    test('sort numbers with protocol', () => {
        const input = [3, 4, 2, 7]
        const expected: SortSimulation = {
            steps: [
                { sortedValues: [3, 4, 2, 7], highlightedIndices: [0, 1, 3] },
                { sortedValues: [3, 2, 4, 7], highlightedIndices: [1, 2, 3] },
                { sortedValues: [3, 2, 4, 7], highlightedIndices: [2, 3, 3] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [0, 1, 2] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [1, 2, 2] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [0, 1, 1] },
            ],
            result: { sortedValues: [2, 3, 4, 7] }
        }

        const result = bubbleSort(input)
        expect(result).toEqual(expected)
    })
})

import { describe, expect, test } from 'vitest'
import {selectionSort} from "@/algorithms/sort/selectionSort";
import type { SortSimulation } from '@/algorithms/sort/types'

describe('selectionSort', () => {
    test('sort numbers with protocol', () => {
        const input = [3, 4, 2, 7]
        const expected: SortSimulation = {
            steps: [
                { sortedValues: [3, 4, 2, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 1 }] },
                { sortedValues: [3, 4, 2, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 2 }] },
                { sortedValues: [3, 4, 2, 7], highlightedIndices: [{ type: 'current', index: 2 }, { type: 'current', index: 3 }, { type: 'threshold', index: 0 }] },
                { sortedValues: [2, 4, 3, 7], highlightedIndices: [{ type: 'current', index: 0 }, { type: 'current', index: 2 }] },
                { sortedValues: [2, 4, 3, 7], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 2 }] },
                { sortedValues: [2, 4, 3, 7], highlightedIndices: [{ type: 'current', index: 2 }, { type: 'current', index: 3 }, { type: 'threshold', index: 1 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 2 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 2 }, { type: 'current', index: 3 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 2 }] },
                { sortedValues: [2, 3, 4, 7], highlightedIndices: [{ type: 'current', index: 3}] },
            ],
            result: { sortedValues: [2, 3, 4, 7] }
        }

        const result = selectionSort(input)
        expect(result).toEqual(expected)
    })
})

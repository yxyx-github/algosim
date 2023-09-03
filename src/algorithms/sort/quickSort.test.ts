import {describe, expect, test} from "vitest";
import {SortSimulation} from "@/algorithms/sort/types";
import {QuickSort} from "@/algorithms/sort/quickSort";
import * as console from "console";

describe('quickSort', () => {
    test('sort numbers with protocol', () => {
        const input = [3, 4, 2, 7, 10, 1, 2, 2, 4, 12]
        const expected: SortSimulation = {
            steps: [
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 0 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 1 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 2 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 3 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 4 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 5 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 6 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 7 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }, { type: 'current', index: 8 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 9 }] },

                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 0 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 1 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 2 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 3 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 4 }] },
                { sortedValues: [3, 4, 2, 7, 10, 1, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 5 }] },
                { sortedValues: [3, 4, 2, 1, 10, 7, 2, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 6 }] },
                { sortedValues: [3, 4, 2, 1, 2, 7, 10, 2, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 7 }] },
                { sortedValues: [3, 4, 2, 1, 2, 2, 10, 7, 4, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 6 }] },

                { sortedValues: [3, 4, 2, 1, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 0 }] },
                { sortedValues: [3, 4, 2, 1, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 1 }] },
                { sortedValues: [3, 4, 2, 1, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 2 }] },
                { sortedValues: [2, 4, 3, 1, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 3 }] },
                { sortedValues: [2, 1, 3, 4, 2, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 4 }] },
                { sortedValues: [2, 1, 2, 4, 3, 2, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 3 }] },
                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 2 }, { type: 'current', index: 0 }] },
                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 2 }, { type: 'current', index: 1 }] },
                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 2 }] },

                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 0 }] },
                { sortedValues: [2, 1, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 1 }, { type: 'current', index: 0 }] },
                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }, { type: 'current', index: 4 }] },
                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 5 }] },

                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 8 }, { type: 'current', index: 7 }] },
                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: [{ type: 'current', index: 8 }] },


                { sortedValues: [1, 2, 2, 2, 3, 4, 4, 7, 10, 12], highlightedIndices: []},

            ]
        }

        const result = new QuickSort().sort(input)
        expect(result).toEqual(expected)
    })
})

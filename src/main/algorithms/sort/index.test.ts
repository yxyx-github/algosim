import { describe, expect, test } from 'vitest'
import { generateNumbers, SortFactory } from '@/main/algorithms/sort/index'
import { SortAlgorithm } from '@/main/algorithms/sort/types'
import { BubbleSort } from '@/main/algorithms/sort/bubbleSort'

describe('SortFactory', () => {
    test('can create BubbleSort', () => {
        const bubble = SortFactory.create(SortAlgorithm.BUBBLE)
        expect(bubble).to.instanceof(BubbleSort)
    })
});

describe('generateNumbers', () => {
    test('can generate numbers', () => {
        const count = 10
        const min = 5
        const max = 10
        const numbers: number[] = generateNumbers(count, min, max)
        expect(numbers).toHaveLength(count)
        numbers.forEach(number =>
            expect(number).to
                .greaterThanOrEqual(min)
                .lessThanOrEqual(max)
        )
    })
})

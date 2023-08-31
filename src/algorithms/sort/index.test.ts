import { describe, expect, test } from 'vitest'
import { generateNumbers, SortFactory } from '@/algorithms/sort/index'
import { SortAlgorithm } from '@/algorithms/sort/types'
import { BubbleSort } from '@/algorithms/sort/bubbleSort'

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
        console.log(numbers)
        expect(numbers).toHaveLength(count)
        numbers.forEach(number =>
            expect(number).to
                .greaterThanOrEqual(min)
                .lessThanOrEqual(max)
        )
    })
})

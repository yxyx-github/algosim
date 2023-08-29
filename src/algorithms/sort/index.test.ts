import { describe, expect, test } from 'vitest'
import { SortFactory } from '@/algorithms/sort/index'
import { SortAlgorithms } from '@/algorithms/sort/types'
import { BubbleSort } from '@/algorithms/sort/bubbleSort'

describe('SortFactory', () => {
    test('can create BubbleSort', () => {
        const bubble = SortFactory.create(SortAlgorithms.BUBBLE)
        expect(bubble).toBeInstanceOf(BubbleSort)
    })
});

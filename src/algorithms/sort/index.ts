import type { SortAlgorithms } from '@/algorithms/sort/types'
import { BubbleSort } from '@/algorithms/sort/bubbleSort'

export class SortFactory {
    static create(algorithm: SortAlgorithms) {
        // TODO: implement
        return new BubbleSort()
    }
}

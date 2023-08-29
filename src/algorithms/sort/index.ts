import { SortAlgorithms } from '@/algorithms/sort/types'
import { BubbleSort } from '@/algorithms/sort/bubbleSort'

export class SortFactory {
    static create(algorithm: SortAlgorithms) {
        switch (algorithm) {
            default:
            case SortAlgorithms.BUBBLE:
                return new BubbleSort()
        }
    }
}

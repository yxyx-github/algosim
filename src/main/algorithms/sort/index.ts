import {SortAlgorithm} from '@/main/algorithms/sort/types'
import {BubbleSort} from '@/main/algorithms/sort/bubbleSort'
import {SelectionSort} from '@/main/algorithms/sort/selectionSort'
import {QuickSort} from '@/main/algorithms/sort/quickSort'
import {MergeSort} from '@/main/algorithms/sort/mergeSort'
import {HeapSort} from "@/main/algorithms/sort/heapSort";

export class SortFactory {
    static create(algorithm: SortAlgorithm) {
        switch (algorithm) {
            case SortAlgorithm.SELECTION:
                return new SelectionSort()
            case SortAlgorithm.QUICKSORT:
                return new QuickSort()
            case SortAlgorithm.MERGESORT:
                return new MergeSort()
            case SortAlgorithm.HEAPSORT:
                return new HeapSort()
            default:
            case SortAlgorithm.BUBBLE:
                return new BubbleSort()
        }
    }
}

export function generateNumbers(count: number, min: number, max: number): number[] {
    const numbers: number[] = []
    for (let i = 0; i < count; i++) {
        numbers.push(getRandomIntBetween(min, max))
    }
    return numbers
}

function getRandomIntBetween(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.ceil(Math.random() * (max - min) + min)
}

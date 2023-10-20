import { SortAlgorithm } from '@/main/algorithms/sort/types'
import { BubbleSort } from '@/main/algorithms/sort/bubbleSort'
import { SelectionSort } from '@/main/algorithms/sort/selectionSort'
import { QuickSort } from '@/main/algorithms/sort/quickSort'
import { MergeSort } from '@/main/algorithms/sort/mergeSort'
import { InsertionSort } from '@/main/algorithms/sort/insertionSort'
import { HeapSort } from '@/main/algorithms/sort/heapSort'
import { CombSort } from '@/main/algorithms/sort/combSort'
import { ShellSort } from '@/main/algorithms/sort/shellSort'
import type { AlgorithmData } from '@/main/algorithms/types'

export class SortFactory {
    static create(algorithm: SortAlgorithm) {
        switch (algorithm) {
            case SortAlgorithm.SHELLSORT:
                return new ShellSort()
            case SortAlgorithm.SELECTION:
                return new SelectionSort()
            case SortAlgorithm.QUICKSORT:
                return new QuickSort()
            case SortAlgorithm.MERGESORT:
                return new MergeSort()
            case SortAlgorithm.INSERTION:
                return new InsertionSort()
            case SortAlgorithm.HEAPSORT:
                return new HeapSort()
            case SortAlgorithm.COMBSORT:
                return new CombSort()
            default:
            case SortAlgorithm.BUBBLE:
                return new BubbleSort()
        }
    }
}

export const sortAlgorithmData: AlgorithmData<SortAlgorithm>[] = [
    {
        label: 'Bubblesort',
        value: SortAlgorithm.BUBBLE,
    }, {
        label: 'Combsort',
        value: SortAlgorithm.COMBSORT,
    }, {
        label: 'Heapsort',
        value: SortAlgorithm.HEAPSORT,
    }, {
        label: 'Insertionsort',
        value: SortAlgorithm.INSERTION,
    }, {
        label: 'Mergesort',
        value: SortAlgorithm.MERGESORT,
    }, {
        label: 'Quicksort',
        value: SortAlgorithm.QUICKSORT,
    }, {
        label: 'Selectionsort',
        value: SortAlgorithm.SELECTION,
    }, {
        label: 'Shellsort',
        value: SortAlgorithm.SHELLSORT,
    }
]

export function generateNumbers(count: number, min: number, max: number): number[] {
    const numbers: number[] = []
    for (let i = 0; i < count; i++) {
        numbers.push(getRandomIntBetween(min, max))
    }
    return numbers
}

export function getRandomIntBetween(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max + 1 - min)) + min
}

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

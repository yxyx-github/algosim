import type {
    HighlightedIndex,
    SortAlgorithmImplementation,
    SortSimulation,
    SortSimulationStep
} from '@/main/algorithms/sort/types'
import type { TrackableProgress } from '@/main/progressTracker/types'
import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'

export class MergeSort implements SortAlgorithmImplementation {

    sort(numbers: number[], progressTracker?: TrackableProgress): SortSimulation {
        progressTracker?.init(numbers.length)
        const pB = new ProtocolBuilder<SortSimulationStep>()
        pB.step({
            sortedValues: numbers,
            highlightedIndices: [],
        })
        this.mergeSort(numbers, 0, numbers.length - 1, pB, progressTracker)
        pB.step({
            sortedValues: numbers,
            highlightedIndices: [],
        })
        return pB.build()
    }

    description(): string[] {
        return ['Mergesort', 'description']
    }

    private mergeSort(numbers: number[], left: number, right: number, pB: ProtocolBuilder<SortSimulationStep>, progressTracker?: TrackableProgress) {
        if (left >= right) {
            progressTracker?.trackNext()
            return
        }
        const mid: number = Math.floor((right - left) / 2) + left

        this.mergeSort(numbers, left, mid, pB, progressTracker)
        this.mergeSort(numbers, mid + 1, right, pB, progressTracker)
        this.merge(numbers, left, right, mid, pB)
    }

    private merge(numbers: number[], left: number, right: number, mid: number, pB: ProtocolBuilder<SortSimulationStep>) {
        let i: number = left;
        let j: number = mid + 1;
        let k: number = 0;
        let res: number[] = new Array(right - left + 1)

        while (i <= mid && j <= right) {
            pB.step({
                sortedValues: numbers,
                highlightedIndices: [
                    { type: 'current', index: i },
                    { type: 'current', index: j },
                    ...(i === left ? [] : [{ type: 'threshold', index: left }]),
                    ...(i === mid || left === mid ? [] : [{ type: 'threshold', index: mid }]),
                    ...(j === right ? [] : [{ type: 'threshold', index: right }]),
                ] as HighlightedIndex[],
            })
            res[k++] = numbers[numbers[i] <= numbers[j] ? i++ : j++];
        }
        while (i <= mid) {
            pB.step({
                sortedValues: numbers,
                highlightedIndices: [
                    { type: 'current', index: i },
                    ...(i === left ? [] : [{ type: 'threshold', index: left }]),
                    ...(i === mid || left === mid ? [] : [{ type: 'threshold', index: mid }]),
                    { type: 'threshold', index: right },
                ] as HighlightedIndex[],
            })
            res[k++] = numbers[i++];
        }
        while (j <= right) {
            pB.step({
                sortedValues: numbers,
                highlightedIndices: [
                    { type: 'current', index: j },
                    { type: 'threshold', index: left },
                    ...(mid === left ? [] : [{ type: 'threshold', index: mid }]),
                    ...(j === right ? [] : [{ type: 'threshold', index: right }]),
                ] as HighlightedIndex[],
            })
            res[k++] = numbers[j++];
        }

        for (let l = 0; l < res.length; l++) {
            numbers[left + l] = res[l]
            pB.step({
                sortedValues: numbers,
                highlightedIndices: [
                    { type: 'current', index: l + left },
                    ...(l + left === right ? [] : [{ type: 'threshold', index: right }]),
                    ...(l + left === left ? [] : [{ type: 'threshold', index: left }]),
                ] as HighlightedIndex[],
            })
        }
    }
}

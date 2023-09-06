import type {
    HighlightedIndex,
    SortAlgorithmImplementation,
    SortSimulation,
    SortSimulationStep
} from '@/main/algorithms/sort/types'
import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import type { TrackableProgress } from '@/main/progressTracker/types'


export class QuickSort implements SortAlgorithmImplementation {

    sort(numbers: number[], progressTracker?: TrackableProgress): SortSimulation {
        const pB = new ProtocolBuilder<SortSimulationStep>()
        progressTracker?.init(numbers.length)
        pB.step({
            sortedValues: numbers,
            highlightedIndices: []
        })
        this.quickSort(numbers, 0, numbers.length - 1, pB, progressTracker)
        pB.step({
            sortedValues: numbers,
            highlightedIndices: []
        })
        return pB.build()
    }

    private quickSort(numbers: number[], begin: number, end: number, pB: ProtocolBuilder<SortSimulationStep>, progressTracker?: TrackableProgress) {
        if (begin >= end) {
            progressTracker?.trackNext()
            return
        }
        let partitionIndex = this.partition(numbers, begin, end, pB);

        this.quickSort(numbers, begin, partitionIndex - 1, pB, progressTracker);
        this.quickSort(numbers, partitionIndex + 1, end, pB, progressTracker);
    }

    private partition(numbers: number[], begin: number, end: number, pB: ProtocolBuilder<SortSimulationStep>) {
        let pivot: number = numbers[end];
        let i = (begin - 1);

        for (let j = begin; j < end; j++) {
            pB.step({
                sortedValues: numbers,
                highlightedIndices: [
                    { type: 'current', index: end },
                    { type: 'current', index: j },
                    ...((i + 1) === j ? [] : [{ type: 'threshold', index: i + 1 }]),
                ] as HighlightedIndex[],
            })

            if (numbers[j] <= pivot) {
                i++;
                let temp = numbers[i];
                numbers[i] = numbers[j];
                numbers[j] = temp;
                pB.step({
                    sortedValues: numbers,
                    highlightedIndices: [
                        { type: 'current', index: j },
                        ...((i) === j ? [] : [{ type: 'current', index: i }]),
                    ] as HighlightedIndex[],
                })
            }
        }

        pB.step({
            sortedValues: numbers,
            highlightedIndices: [
                { type: 'current', index: end },
                ...((i + 1) === end ? [] : [{ type: 'current', index: i + 1 }]),
            ] as HighlightedIndex[],
        })

        let temp = numbers[i + 1];
        numbers[i + 1] = numbers[end];
        numbers[end] = temp;

        pB.step({
            sortedValues: numbers,
            highlightedIndices: [
                { type: 'current', index: end },
                ...((i + 1) === end ? [] : [{ type: 'current', index: i + 1 }]),
            ] as HighlightedIndex[],
        })
        return i + 1;
    }

    description(): string {
        return 'Quicksort description'
    }
}

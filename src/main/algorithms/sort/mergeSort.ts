import type {SortAlgorithmImplementation, SortSimulation, SortSimulationStep} from "@/main/algorithms/sort/types";
import type {TrackableProgress} from "@/main/progressTracker/types";
import {ProtocolBuilder} from "@/main/simulation/protocolBuilder";

export class MergeSort implements SortAlgorithmImplementation {

    sort(numbers: number[], progressTracker?: TrackableProgress): SortSimulation {
        progressTracker?.init(numbers.length)
        const pB = new ProtocolBuilder<SortSimulationStep>()
        pB.step({
            sortedValues: numbers,
            highlightedIndices: [],
        })
        this.mergeSort(numbers, numbers.length, pB, progressTracker)
        pB.step({
            sortedValues: numbers,
            highlightedIndices: [],
        })
        return pB.build()
    }

    description(): string {
        return 'Mergesort description'
    }

    private mergeSort(numbers: number[], len: number, pB: ProtocolBuilder<SortSimulationStep>, progressTracker?: TrackableProgress) {
        if (len < 2) {
            progressTracker?.trackNext()
            return
        }
        const mid: number = Math.floor(len / 2)
        let l: number[] = new Array(mid)
        let r: number[] = new Array(len - mid)

        for (let i = 0; i < mid; i++) {
            l[i] = numbers[i]
        }

        for (let i = mid; i < len; i++) {
            r[i - mid] = numbers[i]
        }

        this.mergeSort(l, mid, pB, progressTracker)
        this.mergeSort(r, len - mid, pB, progressTracker)
        this.merge(numbers, l, r, mid, len - mid)
    }

    private merge(numbers: number[], l: number[], r: number[], left: number, right: number) {
        let i: number = 0;
        let j: number = 0;
        let k: number = 0;

        while (i < left && j < right) {
            if (l[i] <= r[j]) {
                numbers[k++] = l[i++];
            }
            else {
                numbers[k++] = r[j++];
            }
        }
        while (i < left) {
            numbers[k++] = l[i++];
        }
        while (j < right) {
            numbers[k++] = r[j++];
        }
    }
}

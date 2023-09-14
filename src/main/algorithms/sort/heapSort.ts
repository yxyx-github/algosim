import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import type { HighlightedIndex, SortAlgorithmImplementation, SortSimulation, SortSimulationStep } from '@/main/algorithms/sort/types'
import type { TrackableProgress } from '@/main/progressTracker/types'

export class HeapSort implements SortAlgorithmImplementation {

    sort(numbers: number[], progressTracker?: TrackableProgress): SortSimulation {
        progressTracker?.init(numbers.length)
        const pB = new ProtocolBuilder<SortSimulationStep>()
        pB.step({
            sortedValues: numbers,
            highlightedIndices: [],
        })

        for (let i = Math.floor(numbers.length / 2) - 1; i >= 0; i--) {
            this.heapify(numbers, numbers.length, i, pB, progressTracker);
        }

        for (let i = numbers.length - 1; i >= 0; i--) {
            progressTracker?.trackNext()
            pB.step({
                sortedValues: numbers,
                highlightedIndices: [
                    { type: 'current', index: 0 },
                    ...(i === 0 ? [] : [{ type: 'current', index: i }]),
                    ...(i + 1 === numbers.length ? [] : [{ type: 'threshold', index: i + 1 }]),

                ] as HighlightedIndex[],
            })
            let temp = numbers[0];
            numbers[0] = numbers[i];
            numbers[i] = temp;

            pB.step({
                sortedValues: numbers,
                highlightedIndices: [
                    { type: 'current', index: 0 },
                    ...(i === 0 ? [] : [{ type: 'current', index: i }]),
                    ...(i + 1 === numbers.length ? [] : [{ type: 'threshold', index: i + 1 }]),
                ] as HighlightedIndex[],
            })

            this.heapify(numbers, i, 0, pB, progressTracker);
        }

        pB.step({
            sortedValues: numbers,
            highlightedIndices: [],
        })
        return pB.build()
    }

    private heapify(numbers: number[], n: number, i: number, pB: ProtocolBuilder<SortSimulationStep>, progressTracker?: TrackableProgress) {
        let largest = i;
        let l = 2 * i + 1;
        let r = 2 * i + 2;

        if (l < n && numbers[l] > numbers[largest]) {
            largest = l;
        }

        if (r < n && numbers[r] > numbers[largest]) {
            largest = r;
        }

        if (largest != i) {
            pB.step({
                sortedValues: numbers,
                highlightedIndices: [
                    { type: 'current', index: i },
                    { type: 'current', index: largest },
                    ...(n === numbers.length ? [] : [{ type: 'threshold', index: n }]),
                ] as HighlightedIndex[],
            })

            let swap = numbers[i];
            numbers[i] = numbers[largest];
            numbers[largest] = swap;

            pB.step({
                sortedValues: numbers,
                highlightedIndices: [
                    { type: 'current', index: i },
                    { type: 'current', index: largest },
                    ...(n === numbers.length ? [] : [{ type: 'threshold', index: n }]),
                ] as HighlightedIndex[],
            })

            this.heapify(numbers, n, largest, pB, progressTracker);
        }
    }

    description(): string[] {
        return [`Heapsort ist ein Sortierverfahren, welches auf dem binären Heap als zentrale Datenstruktur aufbaut. \
        Im ersten Schritt wird die Liste in einen binären Max-Heap umgewandelt. Danach kann die Wurzel des Heaps \
        an das Ende bewegt werden, da es sich um das größte Element der Liste handelt. Der Heap wird dabei um dieses \
        Element gekürzt. Da der Heap nun kein Max-Heap mehr ist muss er heapified werden. Das Finden des größten Elements wird \
        wiederholt bis alle Elemente der Liste sortiert sind. In dieser Hinsicht lässt sich eine Parallele zu Selectionsort \
        erkennen. Heapsort hat eine Laufzeitkomplexität von O(n*log(n)) und benötigt keinen zusätzlichen Speicherlatz.`,
        `Ein binärer Heap ist ein Binärbaum, bei dem alle Ebenen bis auf die unterste Ebene vollständig ausgefüllt sind. \
        Man unterscheidet zusätzlich zwischen Max-Heap und Min-Heap. Der Max-Heap hat zusätzlich die Bedingung, dass \
        alle Kinder eines Knoten kleiner gleich dem Knoten selbst sind. Der Min-Heap hat eine analoge Bedingung. \
        Ein Heap kann als Liste dargestellt werden, dabei werden die Ebenen des Heaps hintereinander von links nach \
        rechts gelesen dargestellt. Das bedeutet, dass die Wurzel eines Heaps immer den Index 0 hat. Bei einem Max-Heap \
        handelt es sich dabei auch um das größte Element des Heaps.`,
        `Heapify stellt sicher, dass es sich beim Heap um einen Max- bzw. Min-Heap handelt. Dazu wird ein Knoten mit \
         seinen Kindern verglichen und getauscht, sofern es sich nicht um das größte bzw. kleinste Element handelt. Dieser \
         Vorgang wird rekursiv verkettet, so dass auch die Unterbäume Max- bzw. Min-Heaps sind.`]
    }
}

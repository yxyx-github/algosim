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
        return ['Heapsort ist eine Sortierverfahren, welches auf dem binären Heap als zentrale Datenstruktur aufbaut. \
        Im ersten Schritt verändert Heapsort die Struktur der Liste in einer solchen Form, dass ein binärer Max-Heap \
        entsteht. In einem binären Max-Heap steht das größte Element an erster Stelle. Demnach kann das erste Element des \
        Heap an das Ende bewegt werden und eine neuer Heap erstellt werden, in welchem das letzte Element nichtmehr \
        teil des Heaps ist. Da der Heap die Heapbedingungen wahrscheinlich nich mehr erfüllt muss die Liste an die \
        Datenstruktur angepasst werden. Diese Anpassung wird auch heapify genannt. Das finden des größen Elements wird \
        wiederholt bis alle Elemente der Liste sortiert sind. In dieser Hinsicht lässt sich eine parallele zu Selectionsort\
        erkennen. Heapsort hat eine Laufzeitkomplexität von O(n*log(n)) und benötigt keinen zusätzlichen Speicherlatz.\
        ',
        'Ein binärer Heap ist ein Binärbaum, bei dem alle Ebenen bis auf die unterste vollständige ausgefüllt sind. Der \
        Max-Heap hat zusätzlich die Bedingung, dass alle Kinder eines Knoten kleinere Werte haben als der Knoten selbst \
        oder sie haben den gleichen Wert. Ein Heap kann als Liste dargestellt werden, dabei werden die Ebenen des Heaps \
        hintereinander von links nach rechts gelesen dargestellt. Das bedeutet das die Wurzel eines Heaps immer dem Index\
        0 hat.']
    }
}

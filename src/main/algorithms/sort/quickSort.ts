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

    description(): string[] {
        return ['Quicksort ist ein rekursiver Sortieralgorithmus, der auf dem divide-and-conquer-Prinzip basiert. Die \
        Funktionsweise von Quicksort basiert auf dem unterteilen der Liste in Teillisten. Diese Unterteilung wird mit\
        einem Pivotelement vorgenommen. Das Pivotelement wird klassischerweise als das letzte Element der Liste gewählt. \
        Es gibt allerdings auch alternative Ansätze bei der Wahl des Pivots. Anschließend müssen aller Elemte, welche\
        kleiner sind als der Pivot, links vom Pivot stehen. Alle Elemente, die größer sind, müssen rechts stehen. Die \
        Elemente, die den gleichen Wert wie der Pivot haben keine vorgeschriebene Position zu haben. Nachdem diese \
        Vorsortierung vorgenommen wurde, müssen nur noch die Teillisten sortiert werden. Diese Sortierung wird durch \
        einen rekursiven Aufruf von Quicksort erreicht. Leere Listen und Listen mit der Länge 1 werden als bereits sortiert \
        gewertet und fungieren somit als Abbruchbedingung. Die Laufzeitkomplexität von Quicksort hängt maßgeblich mit \
        der Wahl des Pivotelements zusammen. Im Wost-Case hat Quicksort eine Laufzeitkomplexität von O(n²), während der \
        durchschnittliche Aufwand O(n*log(n)) ist. Ein Vorteil von Quicksort ist allerdings, dass Quicksort kein \
        zusätzlichen Speicherplatz benötigt, da es sich um ein in-place-Verfahren handelt. Außerdem lässt sich Quicksort sehr \
        einfach parallelisieren.']
    }

    private quickSort(numbers: number[], begin: number, end: number, pB: ProtocolBuilder<SortSimulationStep>, progressTracker?: TrackableProgress) {
        if (begin >= end) {
            if (begin === end) {
                progressTracker?.trackNext()
            }
            return
        }
        let partitionIndex = this.partition(numbers, begin, end, pB, progressTracker);

        this.quickSort(numbers, begin, partitionIndex - 1, pB, progressTracker);
        this.quickSort(numbers, partitionIndex + 1, end, pB, progressTracker);
    }

    private partition(numbers: number[], begin: number, end: number, pB: ProtocolBuilder<SortSimulationStep>, progressTracker?: TrackableProgress) {
        progressTracker?.trackNext()
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
}

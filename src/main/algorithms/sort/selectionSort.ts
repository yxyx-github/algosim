import type { SortAlgorithmImplementation, HighlightedIndex, SortSimulation, SortSimulationStep } from "@/main/algorithms/sort/types";
import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import type { TrackableProgress } from '@/main/progressTracker/types'

export class SelectionSort implements SortAlgorithmImplementation {

    sort(numbers: number[], progressTracker?: TrackableProgress): SortSimulation {
        progressTracker?.init(numbers.length * ((numbers.length - 1) / 2))
        const pB = new ProtocolBuilder<SortSimulationStep>()
        pB.step({
            sortedValues: numbers,
            highlightedIndices: [],
        })
        for (let i = 0; i < numbers.length; i++) {
            let minIndex = i
            for (let j = i + 1; j < numbers.length; j++) {
                pB.step({
                    sortedValues: numbers,
                    highlightedIndices: [
                        { type: 'current', index: minIndex },
                        { type: 'current', index: j },
                        ...((i) === minIndex ? [] : [{ type: 'threshold', index: i }]),
                    ] as HighlightedIndex[],
                })

                if (numbers[minIndex] > numbers[j]) {
                    minIndex = j
                }

                progressTracker?.trackNext()
            }
            let temp = numbers[minIndex]
            numbers[minIndex] = numbers[i]
            numbers[i] = temp

            pB.step({
                sortedValues: numbers,
                highlightedIndices: [
                    { type: 'current', index: i },
                    ...((i) === minIndex ? [] : [{ type: 'current', index: minIndex }]),
                ] as HighlightedIndex[],
            })
        }
        pB.step({
            sortedValues: numbers,
            highlightedIndices: [],
        })

        return pB.build()
    }

    description(): string[] {
        return ['Selectionsort ist ein weiterer naiver Sortieralgorithmus, dessen Funktionsweise simpel ist. ' +
            'Die Liste wird mehrfach durchlaufen. ' +
            'Bei jeder Iteration wird das kleinste Element ermittelt, indem jedes Element mit dem bisherigen kleinsten Element verglichen wird. ' +
            'Das kleinste Element wird anschließend an den Beginn der unsortierten Liste bewegt und als sortiert gekennzeichnet. ' +
            'Es entsteht eine Unterteilung in eine sortierte und einen unsortierte Liste. ' +
            'Wie zu erkennen ist, wird bei jedem Iterieren über die unsortierte Liste ein Element sortiert. ' +
            'Somit muss die Liste für jedes jedes Element einmal durchlaufen werden. ' +
            'Deshalb spricht man bei Selectionsort von einer Laufzeitkomplexität von O(n^2).' +
            'Ein Vorteil von Selectionsort ist hingegen sein Speicherverbrauch in der Größenordnung O(1).']
    }
}

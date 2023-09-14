import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import type { HighlightedIndex, SortAlgorithmImplementation, SortSimulation, SortSimulationStep } from '@/main/algorithms/sort/types'
import type { TrackableProgress } from '@/main/progressTracker/types'

export class BubbleSort implements SortAlgorithmImplementation {
    sort(values: number[], progressTracker?: TrackableProgress): SortSimulation {
        progressTracker?.init(values.length * ((values.length - 1) / 2))
        const pB = new ProtocolBuilder<SortSimulationStep>()
        pB.step({
            sortedValues: values,
            highlightedIndices: [],
        })
        let item = -1
        for (let lastElement = values.length - 1; lastElement > 0; lastElement--) {
            for (let pointer = 0; pointer < lastElement; pointer++) {
                if (values[pointer] > values[pointer + 1]) {
                    pB.step(this.createStep(values, pointer, lastElement))
                    item = values[pointer]
                    values[pointer] = values[pointer + 1]
                    values[pointer + 1] = item
                }
                pB.step(this.createStep(values, pointer, lastElement))
                progressTracker?.trackNext()
            }
        }
        pB.step({
            sortedValues: values,
            highlightedIndices: [],
        })
        return pB.build()
    }

    description(): string[] {
        return ['Der Bubble-Sort-Algorithmus ist ein einfacher Sortieralgorithmus. ' +
                'Er durchläuft wiederholt eine Liste, vergleicht jeweils zwei aufeinanderfolgende Elemente und tauscht sie aus, wenn sie in der falschen Reihenfolge sind. ' +
                'Dieser Prozess wird so oft wiederholt, bis keine weiteren Austausche mehr erforderlich sind, was darauf hinweist, dass die Liste sortiert ist.' +
                'Bei diesem Algorithmus werden immer zwei Elemente miteinander verglichen. ' +
                'Wenn das erste Element größer ist, werden die beiden Elemente getauscht. ' +
                'Wenn nicht, geht der Algorithmus einen Schritt weiter. ' +
                'Dieser Vorgang wird so oft wiederholt, bis alle Elemente sortiert sind.' +
                'Obwohl der Bubble-Sort-Algorithmus nicht der effizienteste Sortieralgorithmus für große Datensätze ist, ist er einfach zu verstehen und zu implementieren. ' +
                'Er hat eine durchschnittliche und schlechteste Zeitkomplexität von O(n^2), wobei n die Anzahl der Elemente in der Liste ist.',
            ]
    }

    private createStep(values: number[], pointer: number, lastElement: number): SortSimulationStep {
        return {
            sortedValues: values,
            highlightedIndices: [
                { type: 'current', index: pointer },
                { type: 'current', index: pointer + 1 },
                ...((pointer + 1) === lastElement ? [] : [{ type: 'threshold', index: lastElement }]),
            ] as HighlightedIndex[],
        }
    }
}

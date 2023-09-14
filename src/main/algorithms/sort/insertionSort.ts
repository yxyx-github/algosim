import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import type { HighlightedIndex, SortAlgorithmImplementation, SortSimulation, SortSimulationStep } from '@/main/algorithms/sort/types'
import type { TrackableProgress } from '@/main/progressTracker/types'

export class InsertionSort implements SortAlgorithmImplementation {
    sort(values: number[], progressTracker?: TrackableProgress): SortSimulation {
        progressTracker?.init(values.length)
        const pB = new ProtocolBuilder<SortSimulationStep>()
        pB.step({
            sortedValues: values,
            highlightedIndices: [],
        })
        let item = -1
        for (let currentElement = 1; currentElement < values.length; currentElement++) {
            progressTracker?.trackNext()
            for (let pointer = currentElement - 1; pointer >= 0; pointer--) {
                pB.step(this.createStep(values, pointer, currentElement))
                if (values[pointer] < values[pointer + 1]) {
                    break;
                }
                item = values[pointer]
                values[pointer] = values[pointer + 1]
                values[pointer + 1] = item
                pB.step(this.createStep(values, pointer, currentElement))
            }
        }
        progressTracker?.trackNext()
        pB.step({
            sortedValues: values,
            highlightedIndices: [],
        })
        return pB.build()
    }

    description(): string[] {
        return [`
            InsertionSort ist ein einfacher stabiler Sortieralgorithmus, bei dem die Sortierung durch Einfügung erfolgt. Das erste Element der Liste kann als bereits sortierter 
            Teil betrachtet werden. InsertionSort wählt nun immer das nächste Element des unsortierten Teils aus und vergleicht es so lange mit dem bereits sortieren Teil der Liste, 
            bis die passende Stelle zum Einfügen gefunden wurde. Ist das passiert, erhöht sich der Anteil des sortierten Teils und es wird das nächste Element des unsortierten Teils gewählt. 
            Die Laufzeitkomplexität des Verfahrens ist von der Anordnung der Eingabewerte abhängig. Sie liegt im Worst Case bei O(n²) und im Best Case bei O(n). 
            Da der Algorithmus In-Place arbeitet, liegt die Speicherkomplexität bei O(1). Für eine Weiterentwicklung dieses Sortieralgorithmus siehe ShellSort.`
        ]
    }

    private createStep(values: number[], pointer: number, currentElement: number): SortSimulationStep {
        return {
            sortedValues: values,
            highlightedIndices: [
                { type: 'current', index: pointer },
                { type: 'current', index: pointer + 1 },
                ...((pointer + 1) === currentElement ? [] : [{ type: 'threshold', index: currentElement }]),
            ] as HighlightedIndex[],
        }
    }
}

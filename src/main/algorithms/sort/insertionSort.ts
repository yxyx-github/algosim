import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import type { SortAlgorithmImplementation, SortSimulation, SortSimulationStep } from '@/main/algorithms/sort/types'
import type { TrackableProgress } from '@/main/progressTracker/types'
import { SortSimulationStepFactory } from '@/main/algorithms/sort/sortSimulationStepFactory'
import { SortColor } from '@/main/algorithms/sort/types'

export class InsertionSort implements SortAlgorithmImplementation {
    run(values: number[], progressTracker?: TrackableProgress): SortSimulation {
        progressTracker?.init(values.length)
        const pB = new ProtocolBuilder<SortSimulationStep>()
        pB.step(SortSimulationStepFactory.create(values))
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
        pB.step(SortSimulationStepFactory.create(values))
        return pB.build()
    }

    description(): string[] {
        return [`
            Insertionsort ist ein einfacher, stabiler Sortieralgorithmus, bei dem die Sortierung durch Einfügung erfolgt.
            Das erste Element der Liste wird als bereits sortierter Teil betrachtet.
            Der Algorithmus wählt nun immer das erste Element des unsortierten Teils aus und vergleicht es mit dem bereits sortieren Abschnitt der Liste.
            Wurde eine passende Stelle gefunden, wird das Element eingefügt.
            Dadurch erhöht sich der Anteil des sortierten Teils um eins und der Prozess wird wiederholt.
            Die Laufzeitkomplexität des Verfahrens ist von der Anordnung der Eingabewerte abhängig.
            Sie liegt im Worst Case sowie im Average Case bei O(n²) und im Best Case bei O(n).
            Da der Algorithmus In-Place arbeitet, liegt die Speicherkomplexität bei O(1).
            Einige andere Sortierverfahren, wie beispielsweise Shellsort, bauen auf Insertionsort auf.`
        ]
    }

    private createStep(values: number[], pointer: number, currentElement: number): SortSimulationStep {
        return SortSimulationStepFactory.create(values,
            [
                { color: SortColor.CURRENT, index: pointer },
                { color: SortColor.CURRENT, index: pointer + 1 },
                ...(pointer + 1 === currentElement ? [] : [{ color: SortColor.THRESHOLD, index: currentElement }]),
            ])
    }
}

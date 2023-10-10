import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import type { SortAlgorithmImplementation, SortSimulation, SortSimulationStep } from '@/main/algorithms/sort/types'
import type { TrackableProgress } from '@/main/progressTracker/types'
import { SortSimulationStepFactory } from '@/main/algorithms/sort/sortSimulationStepFactory'
import { SortColor } from '@/main/algorithms/sort/types'

export class CombSort implements SortAlgorithmImplementation {

    run(numbers: number[], progressTracker?: TrackableProgress): SortSimulation {
        progressTracker?.init(this.calculateGapSteps(numbers.length))
        const pB = new ProtocolBuilder<SortSimulationStep>()

        pB.step(SortSimulationStepFactory.create(numbers))
        let gap = numbers.length
        let swapped = false

        while (gap != 1 || swapped) {
            gap = Math.floor((gap * 10) / 13) < 1 ? 1 : Math.floor((gap * 10) / 13)
            swapped = false;
            if (gap > 1) {
                progressTracker?.trackNext()
            }

            for (let i = 0; i < numbers.length - gap; i++) {
                pB.step(this.createStep(numbers, i, gap))
                if (numbers[i] <= numbers[i + gap]) {
                    continue
                }
                let temp = numbers[i];
                numbers[i] = numbers[i + gap];
                numbers[i + gap] = temp;
                swapped = true;
                pB.step(this.createStep(numbers, i, gap))
            }
        }
        progressTracker?.trackNext()
        pB.step(SortSimulationStepFactory.create(numbers))
        return pB.build()
    }

    private createStep(numbers: number[], pointer: number, gap: number): SortSimulationStep {
        return SortSimulationStepFactory.create(numbers,
            [
                { color: SortColor.CURRENT, index: pointer },
                { color: SortColor.CURRENT, index: pointer + gap },
            ])
    }

    private calculateGapSteps(n: number): number {
        let count = 0;
        while (n > 1) {
            count++
            n = Math.floor((n * 10) / 13)
        }
        return count
    }

    description(): string[] {
        return [
            `Combsort ist ein In-Place Sortieralgorithmus, der auf Bubblesort basiert.
            Anders als bei diesem Algorithmus vergleicht und tauscht Combsort aber nicht nur benachbarte Elemente.
            Stattdessen nutzt er Elemente mit einer bestimmten Entfernung zueinander, der sogenannten Gap.
            Nach jeder Iteration wird die Gap durch 1,3 dividiert.
            Wenn die Gap 1 beträgt, werden wie beim Bubblesort-Algorithmus direkt benachbarte Elemente betrachtet.
            Als sortiert gilt die Liste, sobald ein Durchlauf mit Gap = 1 keine Elemente vertauscht hat.
            Die Laufzeitkomplexität des Algorithmus beträgt O(n²).
            Da es sich bei Combsort um ein In-Place-Verfahren handelt, wird kein weiterer Speicherplatz benötigt.`
        ]
    }
}

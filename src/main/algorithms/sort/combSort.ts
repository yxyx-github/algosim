import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import type { SortAlgorithmImplementation, SortSimulation, SortSimulationStep } from '@/main/algorithms/sort/types'
import type { TrackableProgress } from '@/main/progressTracker/types'
import { SortSimulationStepFactory } from '@/main/algorithms/sort/sortSimulationStepFactory'
import { SortColor } from '@/main/algorithms/sort/types'

export class CombSort implements SortAlgorithmImplementation {

    sort(numbers: number[], progressTracker?: TrackableProgress): SortSimulation {
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
        return [`
        Combsort ist ein In-Place Sortieralgorithmus. Die Funktionsweise von Combsort basiert auf Bubblesort. Anders als
        bei Bubblesort werden allerdings nicht nur benachbarte Elemente verglichen. Stattdessen beginnt Combsort damit
        Elemente mit einer bestimmten Entfernung zueinander zu vergleichen und optional zu tauschen. Diese Entfernung wird
        gap genannt. Nach jeder Iteration wird das gap durch 1,3 dividiert. Wenn mit einem gap von 1 ein Durchlauf ohne
        Vertauschung erfolgt, dann ist die Liste sortiert. Die Laufzeitkomplexität von Combsort beträgt O(n²). Da es sich
        bei Combsort um ein In-Place-Verfahren handelt, wird kein weiterer Speicherplatz benötigt.`
        ]
    }
}

import type { SortAlgorithmImplementation, SortSimulation, SortSimulationStep } from '@/main/algorithms/sort/types'
import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import type { TrackableProgress } from '@/main/progressTracker/types'
import { SortSimulationStepFactory } from '@/main/algorithms/sort/sortSimulationStepFactory'
import { SortColor } from '@/main/algorithms/sort/sortColor'

export class SelectionSort implements SortAlgorithmImplementation {

    sort(numbers: number[], progressTracker?: TrackableProgress): SortSimulation {
        progressTracker?.init(numbers.length * ((numbers.length - 1) / 2))
        const pB = new ProtocolBuilder<SortSimulationStep>()
        pB.step(SortSimulationStepFactory.create(numbers))
        for (let i = 0; i < numbers.length; i++) {
            let minIndex = i
            for (let j = i + 1; j < numbers.length; j++) {
                pB.step(this.createCompareStep(numbers, i, j, minIndex))

                if (numbers[minIndex] > numbers[j]) {
                    minIndex = j
                }

                progressTracker?.trackNext()
            }
            let temp = numbers[minIndex]
            numbers[minIndex] = numbers[i]
            numbers[i] = temp

            pB.step(this.createSwapStep(numbers, i, minIndex))
        }
        pB.step(SortSimulationStepFactory.create(numbers))

        return pB.build()
    }

    description(): string[] {
        return [
            `Selectionsort ist ein weiterer naiver Sortieralgorithmus, dessen Funktionsweise simpel ist.
            Die zu sortierende Liste wird dabei mehrfach durchlaufen.
            Bei jeder Iteration wird das kleinste Element ermittelt, indem jedes Element mit dem bisherigen kleinsten Element verglichen wird.
            Das kleinste Element wird anschließend an den Beginn der unsortierten Liste verschoben und als sortiert gekennzeichnet.
            Es entsteht eine Unterteilung in eine sortierte und eine unsortierte Liste.
            Wie zu erkennen ist, wird bei jeder Iteration über die unsortierte Liste ein Element sortiert.
            Somit muss die Liste für jedes Element einmal durchlaufen werden.
            Deshalb spricht man bei Selectionsort von einer Laufzeitkomplexität von O(n²).
            Ein Vorteil von Selectionsort ist hingegen sein Speicherverbrauch in der Größenordnung O(1).`
        ]
    }

    private createCompareStep(numbers: number[], i: number, j: number, minIndex: number): SortSimulationStep {
        return SortSimulationStepFactory.create(numbers,
            [
                {color: SortColor.CURRENT, index: minIndex},
                {color: SortColor.CURRENT, index: j},
                ...(i === minIndex ? [] : [{color: SortColor.THRESHOLD, index: i}]),
            ])
    }

    private createSwapStep(numbers: number[], i: number, minIndex: number): SortSimulationStep {
        return SortSimulationStepFactory.create(numbers,
            [
                {color: SortColor.CURRENT, index: i},
                ...(i === minIndex ? [] : [{color: SortColor.CURRENT, index: minIndex}]),
            ])
    }
}

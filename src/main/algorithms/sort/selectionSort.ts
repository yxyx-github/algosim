import type { SortAlgorithmImplementation, SortSimulation, SortSimulationStep } from '@/main/algorithms/sort/types'
import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import type { TrackableProgress } from '@/main/progressTracker/types'
import { SortSimulationStepFactory } from '@/main/algorithms/sort/sortSimulationStepFactory'
import { SortColor } from '@/main/algorithms/sort/types'

export class SelectionSort implements SortAlgorithmImplementation {

    run(numbers: number[], progressTracker?: TrackableProgress): SortSimulation {
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
            `Selectionsort ist ein einfacher, iterativer Sortieralgorithmus.
            Die zu sortierende Liste wird dabei mehrfach durchlaufen, um in jeder Iteration das kleinste Element zu ermitteln.
            Dieses wird anschließend an den Beginn der unsortierten Liste verschoben und als sortiert gekennzeichnet.
            Dadurch entsteht eine Unterteilung in eine sortierte und eine unsortierte Liste.
            Da in jedem Durchlauf ein Element sortiert wird, ergibt sich eine Laufzeitkomplexität von O(n²).
            Ein Vorteil von Selectionsort ist hingegen sein Speicherverbrauch mit der Größenordnung O(1).`
        ]
    }

    private createCompareStep(numbers: number[], i: number, j: number, minIndex: number): SortSimulationStep {
        return SortSimulationStepFactory.create(numbers,
            [
                { color: SortColor.CURRENT, index: minIndex },
                { color: SortColor.CURRENT, index: j },
                ...(i === minIndex ? [] : [{ color: SortColor.THRESHOLD, index: i }]),
            ])
    }

    private createSwapStep(numbers: number[], i: number, minIndex: number): SortSimulationStep {
        return SortSimulationStepFactory.create(numbers,
            [
                { color: SortColor.CURRENT, index: i },
                ...(i === minIndex ? [] : [{ color: SortColor.CURRENT, index: minIndex }]),
            ])
    }
}

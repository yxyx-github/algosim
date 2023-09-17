import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import type {SortAlgorithmImplementation, SortSimulation, SortSimulationStep } from '@/main/algorithms/sort/types'
import type { TrackableProgress } from '@/main/progressTracker/types'
import { SortSimulationStepFactory } from '@/main/algorithms/sort/sortSimulationStepFactory'
import { SortColor } from '@/main/algorithms/sort/sortColor'

export class BubbleSort implements SortAlgorithmImplementation {
    sort(values: number[], progressTracker?: TrackableProgress): SortSimulation {
        progressTracker?.init(values.length * ((values.length - 1) / 2))
        const pB = new ProtocolBuilder<SortSimulationStep>()
        pB.step(SortSimulationStepFactory.create(values))
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
        pB.step(SortSimulationStepFactory.create(values))
        return pB.build()
    }

    description(): string[] {
        return [`
        Der Bubble-Sort-Algorithmus ist ein einfacher Sortieralgorithmus.
        Im Sortierprozess iteriert Bubblesort mehrfach über die Liste, dabei werden jeweils immer die benachbarten Elemente
        verglichen. Falls das erste Element das größere ist, werden beide Elemente vertauscht. Nach jeder Iteration wurde
        das größte Element des noch nicht sortierten Teils der Liste an das Ende dieser Liste befördert. Somit wird in
        jedem Schleifendurchlauf ein Element sortiert. Man spricht auch von einer Laufzeitkomplexität von O(n²).`]
    }

    private createStep(values: number[], pointer: number, lastElement: number): SortSimulationStep {
        return SortSimulationStepFactory.create(values,
            [
                { color: SortColor.CURRENT, index: pointer },
                { color: SortColor.CURRENT, index: pointer + 1 },
                ...((pointer + 1) === lastElement ? [] : [{ color: SortColor.THRESHOLD, index: lastElement }]),
            ])
    }
}

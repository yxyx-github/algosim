import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import type { SortAlgorithmImplementation, SortSimulation, SortSimulationStep } from '@/main/algorithms/sort/types'
import type { TrackableProgress } from '@/main/progressTracker/types'
import { SortSimulationStepFactory } from '@/main/algorithms/sort/sortSimulationStepFactory'
import { SortColor } from '@/main/algorithms/sort/sortColor'

export class InsertionSort implements SortAlgorithmImplementation {
    sort(values: number[], progressTracker?: TrackableProgress): SortSimulation {
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
        return ['InsertionSort', 'description']
    }

    private createStep(values: number[], pointer: number, currentElement: number): SortSimulationStep {
        return SortSimulationStepFactory.create(values,
            [
                {color: SortColor.CURRENT, index: pointer},
                {color: SortColor.CURRENT, index: pointer + 1},
                ...(pointer + 1 === currentElement ? [] : [{color: SortColor.THRESHOLD, index: currentElement}]),
            ])
    }
}

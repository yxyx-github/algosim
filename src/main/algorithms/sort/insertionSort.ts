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
                if (values[pointer] < values[pointer + 1]) {
                    pB.step(this.createStep(values, pointer, currentElement))
                    break;
                }
                pB.step(this.createStep(values, pointer, currentElement))
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
        return ['InsertionSort', 'description']
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

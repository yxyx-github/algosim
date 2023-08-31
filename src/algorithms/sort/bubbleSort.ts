import { ProtocolBuilder } from '@/simulation/protocolBuilder'
import type { HighlightedIndex, SortAlgorithmImplementation, SortSimulation, SortSimulationStep } from '@/algorithms/sort/types'

export class BubbleSort implements SortAlgorithmImplementation {
    sort(values: number[]): SortSimulation {
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
            }
        }
        pB.step({
            sortedValues: values,
            highlightedIndices: [],
        })
        return pB.build()
    }

    description(): string {
        console.log('desc()')
        return 'BubbleSort description'
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

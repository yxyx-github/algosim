import { ProtocolBuilder } from '@/simulation/protocolBuilder'
import type { HighlightedIndex, SortAlgorithm, SortSimulation, SortSimulationResult, SortSimulationStep } from '@/algorithms/sort/types'

export class BubbleSort implements SortAlgorithm {
    sort(values: number[]): SortSimulation {
        const pB = new ProtocolBuilder<SortSimulationStep, SortSimulationResult>()
        pB.step({
            sortedValues: values,
            highlightedIndices: [],
        })
        let item = -1
        for (let lastElement = values.length - 1; lastElement > 0; lastElement--) {
            for (let pointer = 0; pointer < lastElement; pointer++) {
                if (values[pointer] > values[pointer + 1]) {
                    item = values[pointer]
                    values[pointer] = values[pointer + 1]
                    values[pointer + 1] = item
                }
                pB.step({
                    sortedValues: values,
                    highlightedIndices: [
                        { type: 'current', index: pointer },
                        { type: 'current', index: pointer + 1 },
                        ...((pointer + 1) === lastElement ? [] : [{ type: 'threshold', index: lastElement }]),
                    ] as HighlightedIndex[],
                })
            }
        }
        return pB.buildFromResult({ sortedValues: values })
    }

    description(): string {
        return 'BubbleSort description'
    }
}

import type { SortAlgorithmImplementation, HighlightedIndex, SortSimulation, SortSimulationStep } from "@/main/algorithms/sort/types";
import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import type { TrackableProgress } from '@/main/progressTracker/types'

export class SelectionSort implements SortAlgorithmImplementation {

    sort(numbers: number[], progressTracker?: TrackableProgress): SortSimulation {
        progressTracker?.init(numbers.length * ((numbers.length - 1) / 2))
        const pB = new ProtocolBuilder<SortSimulationStep>()
        pB.step({
            sortedValues: numbers,
            highlightedIndices: [],
        })
        for (let i = 0; i < numbers.length; i++) {
            let minIndex = i
            for (let j = i + 1; j < numbers.length; j++) {
                pB.step({
                    sortedValues: numbers,
                    highlightedIndices: [
                        { type: 'current', index: minIndex },
                        { type: 'current', index: j },
                        ...((i) === minIndex ? [] : [{ type: 'threshold', index: i }]),
                    ] as HighlightedIndex[],
                })

                if (numbers[minIndex] > numbers[j]) {
                    minIndex = j
                }

                progressTracker?.trackNext()
            }
            let temp = numbers[minIndex]
            numbers[minIndex] = numbers[i]
            numbers[i] = temp

            pB.step({
                sortedValues: numbers,
                highlightedIndices: [
                    { type: 'current', index: i },
                    ...((i) === minIndex ? [] : [{ type: 'current', index: minIndex }]),
                ] as HighlightedIndex[],
            })
        }
        pB.step({
            sortedValues: numbers,
            highlightedIndices: [],
        })

        return pB.build()
    }

    description(): string[] {
        return ['Selectionsort', 'description']
    }
}

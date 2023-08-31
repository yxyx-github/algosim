import type { SortAlgorithmImplementation, HighlightedIndex, SortSimulation, SortSimulationStep } from "@/algorithms/sort/types";
import { ProtocolBuilder } from '@/simulation/protocolBuilder'

export class SelectionSort implements SortAlgorithmImplementation {

    sort(numbers: number[]): SortSimulation {
        const pB = new ProtocolBuilder<SortSimulationStep>()
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

        return pB.build()
    }

    description(): string {
        return 'Selectionsort description'
    }
}

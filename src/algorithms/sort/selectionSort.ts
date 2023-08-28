import {SortSimulation, SortSimulationResult, SortSimulationStep} from "@/algorithms/sort/types";
import {ProtocolBuilder} from "@/simulation/protocolBuilder";

export function selectionSort(numbers: number[]): SortSimulation {
    const pB = new ProtocolBuilder<SortSimulationStep, SortSimulationResult>()
    for (let i= 0; i < numbers.length; i++) {
        let minIndex = i
        for (let j= i + 1; j < numbers.length; j++) {
            pB.step({
                sortedValues: numbers,
                highlightedIndices: minIndex != i ? [i, minIndex, j] : [minIndex, j],
            })

            if (numbers[i] > numbers[j]) {
                minIndex = j
            }
        }
        let temp = numbers[minIndex]
        numbers[minIndex] = numbers[i]
        numbers[i] = temp

        pB.step({
            sortedValues: numbers,
            highlightedIndices: minIndex != i ? [i, minIndex] : [i],
        })

    }

    return pB.buildFromResult({ sortedValues: numbers })
}

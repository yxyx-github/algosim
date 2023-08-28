import { ProtocolBuilder } from '@/simulation/protocolBuilder'
import type { SortSimulation, SortSimulationResult, SortSimulationStep } from '@/algorithms/sort/types'

export function bubbleSort(numbers: number[]): SortSimulation {
    const pB = new ProtocolBuilder<SortSimulationStep, SortSimulationResult>()
    let item = -1
    for (let lastElement = numbers.length - 1; lastElement > 0; lastElement--) {
        for (let pointer = 0; pointer < lastElement; pointer++) {
            if (numbers[pointer] > numbers[pointer + 1]) {
                item = numbers[pointer]
                numbers[pointer] = numbers[pointer + 1]
                numbers[pointer + 1] = item
            }
            pB.step({
                sortedValues: numbers,
                highlightedIndices: [pointer, pointer + 1],
            })
        }
    }
    return pB.buildFromResult({ sortedValues: numbers })
}

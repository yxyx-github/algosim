import type { Simulation, SimulationResult, SimulationStep } from '@/simulation/types'

export interface SortSimulationStep extends SimulationStep {
    sortedValues: number[]
    highlightedIndices: number[]
}

export interface SortSimulationResult extends SimulationResult {
    sortedValues: number[]
}

export interface SortSimulation extends Simulation<SortSimulationStep, SortSimulationResult> {
}

export function bubbleSort(numbers: number[]): number[] {
    let item = -1
    for (let lastElement = numbers.length - 1; lastElement > 0; lastElement--) {
        for (let pointer = 0; pointer < lastElement; pointer++) {
            if (numbers[pointer] > numbers[pointer + 1]) {
                item = numbers[pointer]
                numbers[pointer] = numbers[pointer + 1]
                numbers[pointer + 1] = item
            }
        }
    }
    return numbers
}

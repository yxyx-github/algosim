import type { SimulationResult, SimulationStep } from '@/simulation'

export interface SortSimulationStep extends SimulationStep {
    sortedValues: number[]
    highlightedIndices: number[]
}

export interface SortSimulationResult extends SimulationResult {
    sortedValues: number[]
}

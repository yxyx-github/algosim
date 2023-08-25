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

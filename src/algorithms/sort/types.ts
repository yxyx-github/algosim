import type { Simulation, SimulationResult, SimulationStep } from '@/simulation/types'

export type HighlightType = 'current' | 'threshold'
export type HighlightColor = HighlightType | 'neutral'

export type SortColors = {
    [key in HighlightColor]?: string
}

export interface HighlightedIndex {
    type: HighlightType
    index: number
}

export enum SortAlgorithms {
    BUBBLE
}

export interface SortAlgorithm {
    sort: (values: number[]) => SortSimulation,
}

export interface SortSimulationStep extends SimulationStep {
    sortedValues: number[]
    highlightedIndices: HighlightedIndex[]
}

export interface SortSimulationResult extends SimulationResult {
    sortedValues: number[]
}

export interface SortSimulation extends Simulation<SortSimulationStep, SortSimulationResult> {
}

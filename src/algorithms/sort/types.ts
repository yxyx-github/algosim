import type { Simulation, SimulationStep } from '@/simulation/types'

export type HighlightType = 'current' | 'threshold'
export type HighlightColor = HighlightType | 'neutral'

export type SortColors = {
    [key in HighlightColor]?: string
}

export interface HighlightedIndex {
    type: HighlightType
    index: number
}

export enum SortAlgorithm {
    BUBBLE,
    SELECTION,
    QUICKSORT
}

export enum SortInputMode {
    GENERATE,
    CUSTOM,
}

export interface SortAlgorithmImplementation {
    sort: (values: number[]) => SortSimulation,
    description: () => string,
}

export interface SortSimulationStep extends SimulationStep {
    sortedValues: number[]
    highlightedIndices: HighlightedIndex[]
}

export interface SortSimulation extends Simulation<SortSimulationStep> {
}

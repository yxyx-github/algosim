import type { Simulation, SimulationStep } from '@/simulation/types'
import type { TrackableProgress } from '@/progressTracker/types'

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
}

export enum SortInputMode {
    GENERATE,
    CUSTOM,
}

export interface SortAlgorithmImplementation {
    sort: (values: number[], progressTracker?: TrackableProgress) => SortSimulation,
    description: () => string,
}

export interface SortSimulationStep extends SimulationStep {
    sortedValues: number[]
    highlightedIndices: HighlightedIndex[]
}

export interface SortSimulation extends Simulation<SortSimulationStep> {
}

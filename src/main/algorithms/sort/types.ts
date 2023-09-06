import type { Simulation, SimulationStep } from '@/main/simulation/types'
import type {TrackableProgress, ProgressProvider, ProgressTrackerConfig} from '@/main/progressTracker/types'

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
    MERGESORT,
    SELECTION,
}

export enum SortInputMode {
    GENERATE,
    CUSTOM,
}

export type SortWorkerRequest = {
    algorithm: SortAlgorithm,
    numbersToSort: number[],
    progressTrackerConfig?: ProgressTrackerConfig
}

export type SortWorkerResponse =
    { name: 'sorted', value: ReadableStream<SortSimulationStep> } |
    { name: 'progress', value: ProgressProvider } |
    { name: 'resultCount', value: number }

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

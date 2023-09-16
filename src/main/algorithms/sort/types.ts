import type { Simulation, SimulationStep } from '@/main/simulation/types'
import type { TrackableProgress, ProgressProvider, ProgressTrackerConfig } from '@/main/progressTracker/types'

export enum SortAlgorithm {
    BUBBLE,
    HEAPSORT,
    INSERTION,
    MERGESORT,
    QUICKSORT,
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
    description: () => string[],
}

export class SortColor {
    static readonly NEUTRAL: string= '#8b8b8b'
    static readonly CURRENT: string= '#ff0000'
    static readonly THRESHOLD: string= '#000000'
}

export interface SortIndex {
    value: number
    displayColor: string
}

export interface SortSimulationStep extends SimulationStep {
    sortedValues: SortIndex[]
}

export interface SortSimulation extends Simulation<SortSimulationStep> {
}

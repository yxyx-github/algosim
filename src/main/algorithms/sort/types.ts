import type { Simulation, SimulationStep } from '@/main/simulation/types'
import type { TrackableProgress, ProgressProvider, ProgressTrackerConfig } from '@/main/progressTracker/types'

export type HighlightedIndex = {
    color: string
    index: number
}

export enum SortAlgorithm {
    BUBBLE,
    COMBSORT,
    HEAPSORT,
    INSERTION,
    MERGESORT,
    QUICKSORT,
    SELECTION,
    SHELLSORT,
}

export enum SortColor {
    NEUTRAL = '#8b8b8b',
    CURRENT= '#ff0000',
    THRESHOLD ='#000000',
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

export interface SortedValue {
    value: number
    displayColor: string
}

export interface SortSimulationStep extends SimulationStep {
    sortedValues: SortedValue[]
}

export interface SortSimulation extends Simulation<SortSimulationStep> {
}

import type { SortAlgorithm, SortSimulation, SortSimulationStep } from '@/main/algorithms/sort/types'
import { SortFactory } from '@/main/algorithms/sort/index'
import { ProgressTracker } from '@/main/progressTracker/progressTracker'
import type { ProgressTrackerConfig } from '@/main/progressTracker/types'
import { createSimulationStream } from '@/main/simulation/stream'

self.onmessage = (e: { data: { algorithm: SortAlgorithm, numbersToSort: number[], progressTrackerConfig?: ProgressTrackerConfig } }) => {

    const progressTracker = new ProgressTracker(e.data.progressTrackerConfig)
    progressTracker.onTrack((progress) => self.postMessage({ name: 'progress', value: progress }))

    const sorted = SortFactory.create(e.data.algorithm).sort(e.data.numbersToSort, progressTracker)

    self.postMessage({ name: 'resultCount', value: sorted.steps.length })

    const stepReader = createSimulationStream<SortSimulation, SortSimulationStep>(sorted)
    self.postMessage({ name: 'sorted', value: stepReader }, [stepReader] as any)
}

import type { SortSimulation, SortSimulationStep, SortWorkerRequest } from '@/main/algorithms/sort/types'
import { SortFactory } from '@/main/algorithms/sort/index'
import { ProgressTracker } from '@/main/progressTracker/progressTracker'
import { createSimulationStream } from '@/main/simulation/stream'

self.onmessage = (e: MessageEvent<SortWorkerRequest>) => {

    const progressTracker = new ProgressTracker(e.data.progressTrackerConfig)
    progressTracker.onTrack((progress) => self.postMessage({ name: 'progress', value: progress }))

    const sorted = SortFactory.create(e.data.algorithm).run(e.data.numbersToSort, progressTracker)

    self.postMessage({ name: 'resultCount', value: sorted.steps.length })

    const stepReader = createSimulationStream<SortSimulation, SortSimulationStep>(sorted)
    self.postMessage({ name: 'sorted', value: stepReader }, [stepReader] as any)
}
